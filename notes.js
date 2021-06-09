const fs = require("fs");
const chalk = require("chalk");

const getNotes = () => {
  const welcome = chalk.blueBright.inverse.bold("Welcome to the notes app");
  return welcome;
};

//reusable success message
const successMessage = (quote) => {
  const message = chalk.greenBright.inverse(quote);
  console.log(message);
};

//reusable error message
const errorMessage = (quote) => {
  const message = chalk.redBright.inverse(quote);
  console.log(message);
};

//adding notes functions
const addNotes = (title, body) => {
  const notes = loadNotes();

  //checking duplication of data
  const duplicateNote = notes.find((item) => item.title === title);

  if (!duplicateNote) {
    //data pushing to the file
    notes.push({
      title: title,
      body: body,
    });
    saveNotes(notes);
    successMessage("Your note successfully added!");
  } else {
    errorMessage("Title is already exist!!");
  }
};

// data storing to the file
const saveNotes = (notes) => {
  const notesJson = JSON.stringify(notes);
  fs.writeFileSync("notes.json", notesJson);
};

//loading data from the file
const loadNotes = () => {
  /*
    checking try catch method if the 
    file named notes.json is didn't exist 
    it will be return a array
  */
  try {
    const dataBuffer = fs.readFileSync("notes.json");
    const valuesJson = dataBuffer.toString();
    return JSON.parse(valuesJson);
  } catch (e) {
    return [];
  }
};

// remove notes
const removeNotes = (title) => {
  const notes = loadNotes();

  const existingElements = notes.filter((note) => note.title !== title);

  if (notes.length > existingElements.length) {
    successMessage(title + " Successfully removed");
    saveNotes(existingElements);
  } else {
    errorMessage(title + " didn't found");
  }
};

//list notes
const listNotes = () => {
  const notes = loadNotes();
  const showMessage = chalk.blueBright.inverse.bold("Your notes!!");
  console.log(showMessage);
  notes.forEach((item) => {
    console.log(item.title);
  });
};

//reading notes
const readingNotes = (title) => {
  const notes = loadNotes();
  const titleClr = chalk.whiteBright.inverse.bold(title);
  const search = notes.find((item) => item.title === title);
  const searchBody = chalk.blueBright(search.body);
  if (search) {
    console.log(titleClr + " " + searchBody);
  } else {
    errorMessage("Unable to find");
  }
};

//multiple modules exporting
module.exports = {
  getNotes: getNotes,
  addNotes: addNotes,
  removeNotes: removeNotes,
  listNotes: listNotes,
  readingNotes: readingNotes,
};
