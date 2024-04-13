const Ajv = require("ajv"); // Importing the Ajv library for JSON schema validation
const ajv = new Ajv(); // Creating a new Ajv instance

const noteDao = require("../../dao/note-dao.js"); // Importing the note data access object (DAO)

// Defining the JSON schema for the note object
const noteSchema = {
  type: "object",
  properties: {
    id: { type: "string" }, // The note object should have an "id" property of type string
  },
  required: ["id"], // The "id" property is required
  additionalProperties: false, // No additional properties are allowed
};

// The DeleteAbl function is an asynchronous function that handles the deletion of a note
async function DeleteAbl(req, res) {
  try {
    // The note data is expected to be in the request body
    const reqParams = req.body;

    // Validate the note data against the schema
    const valid = ajv.validate(noteSchema, reqParams);
    if (!valid) { // If the data is not valid
      // Respond with a 400 status code and a JSON object containing the validation errors
      res.status(400).json({
        code: "dtoInIsNotValid",
        note: "dtoIn is not valid",
        validationError: ajv.errors,
      });
      return; // End the function
    }

    // If the data is valid, remove the note using the note DAO
    noteDao.remove(reqParams.id);
    // Respond with an empty JSON object
    res.json({});
  } catch (e) { // If an error occurs
    // Respond with a 500 status code and a JSON object containing the error message
    res.status(500).json({ note: e.note });
  }
}

module.exports = DeleteAbl; // Export the DeleteAbl function
