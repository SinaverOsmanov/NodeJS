const yargs = require('yargs')
const pkg = require('./package')
const {addNote, printNotes, removeNote } = require('./notes.controller')

yargs.version(pkg.version)


yargs.command({
    command: 'add',
    describe: 'add node',
    builder: {
      title: {
          type: 'string',
          describe: 'Note title',
          demandOption: true
      }
    },
    async handler({title}){
        await addNote(title)
    }
})

yargs.command({
    command: 'list',
    describe: 'get nodes list',
    async handler(){
        console.log(await printNotes())
    }
})

yargs.command({
    command: 'remove',
    describe: 'Remove note by id',
    builder: {
        id: {
            type: 'number',
            describe: 'Note id',
            demandOption: true
        }
    },
    async handler({id}){
        await removeNote(id)
    }
})

yargs.parse()
