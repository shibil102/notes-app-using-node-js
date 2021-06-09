const yargs = require("yargs");
const notes = require("./notes.js");

// to change the yargs version
yargs.version("1.0.0");

// console.log(process.argv)

// add new command for adding new notes
yargs.command({
  command: "add",
  description: "Add new note",
  builder: {
    title: {
      describe: "note title",
      demandOption: true,
      type: "string",
    },
    body: {
      describe: "this is body",
      demandOption: true,
      type: "string",
    },
  },
  handler(argv) {
    notes.addNotes(argv.title, argv.body);
  },
});

// add new command for remove notes
yargs.command({
  command: "remove",
  description: "Remove new note",
  builder: {
    title: {
      describe: "note title",
      demandOption: true,
      type: "string",
    },
  },
  handler(argv) {
    notes.removeNotes(argv.title);
  },
});

// add new command for read note
yargs.command({
  command: "read",
  description: "Read new note",
  handler(argv) {
    notes.readingNotes(argv.title);
  },
});

// add new command for listing note
yargs.command({
  command: "list",
  description: "List new note",
  handler() {
    notes.listNotes();
  },
});

yargs.parse();

// console.log(yargs.argv);
