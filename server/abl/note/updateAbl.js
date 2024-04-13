const Ajv = require("ajv"); // Importing the Ajv library for JSON schema validation
const ajv = new Ajv(); // Creating a new Ajv instance

const noteDao = require("../../dao/note-dao.js"); // Importing the note data access object (DAO)

// Defining the JSON schema for the note object
const noteSchema = {
  type: "object",
  properties: {
    id: { type: "string" }, // The note object should have an "id" property of type string
    category: { type: "string" }, // The note object should have a "name" property of type string
    name: { type: "string" }, // The note object should have a "note" property of type string
    content: { type: "string" },
  },
  required: ["id", "category", "name", "content"], // The "id", "category", "name" and "content" properties are required
  additionalProperties: false, // No additional properties are allowed
};

// The UpdateAbl function is an asynchronous function that handles the updating of a note
async function UpdateAbl(req, res) {
  try {
    let note = req.body; // The note data is expected to be in the request body

    // Validate the note data against the schema
    const valid = ajv.validate(noteSchema, note);
    if (!valid) { // If the data is not valid
      // Respond with a 400 status code and a JSON object containing the validation errors
      res.status(400).json({
        code: "dtoInIsNotValid",
        note: "dtoIn is not valid",
        validationError: ajv.errors,
      });
      return; // End the function
    }

    // If the data is valid, update the note using the note DAO
    const updatedNote = noteDao.update(note);
    if (!updatedNote) { // If the note does not exist
      // Respond with a 404 status code and a JSON object containing an error message
      res.status(404).json({
        code: "noteNotFound",
        note: `Note ${note.id} not found`,
      });
      return; // End the function
    }

    // If the note exists, respond with a JSON object containing the updated note
    res.json(updatedNote);
  } catch (e) { // If an error occurs
    // Respond with a 500 status code and a JSON object containing the error message
    res.status(500).json({ note: e.note });
  }
}

module.exports = UpdateAbl; // Export the UpdateAbl function