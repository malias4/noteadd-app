const Ajv = require("ajv"); // Importing the Ajv library for JSON schema validation
const ajv = new Ajv(); // Creating a new Ajv instance

const noteDao = require("../../dao/note-dao.js"); // Importing the note data access object (DAO)

// Defining the JSON schema for the note object
const noteSchema = {
  type: "object",
  properties: {
    category: { type: "string" },
    name: { type: "string" },
    content: { type: "string" },
  },
  required: ["category", "name", "content"], // The "category", "name" and "content" properties are required
  additionalProperties: false, // No additional properties are allowed
};

// The CreateAbl function is an asynchronous function that handles the creation of a note
async function CreateAbl(req, res) {
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
    
    // If the data is valid, create the note using the note DAO
    note = noteDao.create(note);    
    // Respond with a JSON object containing the created note
    res.json(note);   //this is what the database returns
  } catch (e) { // If an error occurs
    // Respond with a 500 status code and a JSON object containing the error message
    res.status(500).json({ note: e.note });
  }
}

module.exports = CreateAbl; // Export the CreateAbl function