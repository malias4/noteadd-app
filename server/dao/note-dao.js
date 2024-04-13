const fs = require("fs"); // Importing the File System module
const path = require("path"); // Importing the Path module
const crypto = require("crypto"); // Importing the Crypto module

const noteFolderPath = path.join(__dirname, "storage", "noteList"); // Defining the path to the notes folder

// Method to read a note from a file
function get(noteId) {
  try {
    const filePath = path.join(noteFolderPath, `${noteId}.json`); // Constructing the path to the note file
    const fileData = fs.readFileSync(filePath, "utf8"); // Reading the file data
    return JSON.parse(fileData); // Parsing the file data from JSON string to JavaScript object
  } catch (error) {
    if (error.code === "ENOENT") return null; // If the file does not exist, return null
    throw { code: "failedToReadNote", note: error.note }; // If another error occurred, throw it
  }
}

// Method to write a note to a file
function create(note) {
  try {
    note.id = crypto.randomBytes(16).toString("hex"); // Generating a random ID for the note
    const filePath = path.join(noteFolderPath, `${note.id}.json`); // Constructing the path to the note file
    const fileData = JSON.stringify(note); // Converting the note object to a JSON string
    fs.writeFileSync(filePath, fileData, "utf8"); // Writing the note data to the file
    return note; // Returning the note object
  } catch (error) {
    throw { code: "failedToCreateNote", note: error.note }; // If an error occurred, throw it
  }
}

// Method to update a note in a file
function update(note) {
  try {
    const currentNote = get(note.id); // Getting the current note data
    if (!currentNote) return null; // If the note does not exist, return null
    const newNote = { ...currentNote, ...note }; // Merging the current note data with the new data
    const filePath = path.join(noteFolderPath, `${note.id}.json`); // Constructing the path to the note file
    const fileData = JSON.stringify(newNote); // Converting the new note object to a JSON string
    fs.writeFileSync(filePath, fileData, "utf8"); // Writing the new note data to the file
    return newNote; // Returning the new note object
  } catch (error) {
    throw { code: "failedToUpdateNote", note: error.note }; // If an error occurred, throw it
  }
}

// Method to remove a note from a file
function remove(noteId) {
  try {
    const filePath = path.join(noteFolderPath, `${noteId}.json`); // Constructing the path to the note file
    fs.unlinkSync(filePath); // Deleting the note file
    return {}; // Returning an empty object
  } catch (error) {
    if (error.code === "ENOENT") {
      return {}; // If the file does not exist, return an empty object
    }
    throw { code: "failedToRemoveNote", note: error.note }; // If another error occurred, throw it
  }
}

// Method to list notes in a folder
function list() {
  try {
    const files = fs.readdirSync(noteFolderPath); // Reading the names of all files in the notes folder
    const noteList = files.map((file) => { // Transforming each filename into a note object
      const fileData = fs.readFileSync(path.join(noteFolderPath, file), "utf8"); // Reading the file data
      return JSON.parse(fileData); // Parsing the file data from JSON string to JavaScript object
    });
    return noteList; // Returning the list of note objects
  } catch (error) {
    throw { code: "failedToListNotes", note: error.note }; // If an error occurred, throw it
  }
}

module.exports = {
  get,
  create,
  update,
  remove,
  list,
}; // Exporting the methods