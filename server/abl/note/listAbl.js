const noteDao = require("../../dao/note-dao.js"); // Importing the note data access object (DAO)

// The ListAbl function is an asynchronous function that handles the listing of all notes
async function ListAbl(req, res) {
  try {
    const noteList = noteDao.list(); // Get the list of all notes using the note DAO
    res.json(noteList); // Respond with a JSON object containing the list of notes
  } catch (e) { // If an error occurs
    // Respond with a 500 status code and a JSON object containing the error message
    res.status(500).json({ note: e.note });
  }
}

module.exports = ListAbl; // Export the ListAbl function