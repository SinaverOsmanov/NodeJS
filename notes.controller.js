const fs = require("fs/promises");
const path = require("path");
const chalk = require("chalk");


const notesPath = path.join(__dirname, 'db.json')

async function addNote(title) {
    const notes = await getNotes()
    const note = {title, id: Date.now().toString()}

    notes.push(note)

    await writeNotesToDB(notes)
}

async function getNotes() {
    const notes = await fs.readFile(notesPath, {encoding: 'utf8'})

    return Array.isArray(JSON.parse(notes)) ? JSON.parse(notes): []

}

async function writeNotesToDB(notes){
    if(Array.isArray(notes)) {
        await fs.writeFile(notesPath, JSON.stringify((notes)))
    } else {
        console.log(chalk.bgRedBright(`${notes} it is not Array`))
    }
}

async function removeNote(id) {
    const notes = await getNotes()
    const filteredNotes = notes.filter(note => Number(note.id) !== id)
    // почему filteredNotes объект ???
    await writeNotesToDB(filteredNotes)
}

async function printNotes(){
    const notes = await getNotes()
    notes.forEach(note=> console.log( "id: " + chalk.bgGreen(note.id), "title: " + chalk.bgGreen(note.title)))
}

module.exports = {
    addNote, printNotes, removeNote
}
