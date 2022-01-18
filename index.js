const express = require('express')
const chalk = require('chalk')
const path = require("path");
const {addNote, getNotes, removeNote, editNote} = require("./notes.controller");

const port = 3000
// const basePath = path.join(__dirname, 'pages')
const app = express()

app.set('view engine', 'ejs')
app.set('views', 'pages')

app.use(express.static(path.join(__dirname, 'public')))
app.use(express.json())
app.use(express.urlencoded({extended: true}))

app.get('/', async (req, res)=>{
    res.render('index', {
        title: 'Express page',
        notes: await getNotes(),
        created: false
    })
})

app.post('/', async (req, res)=>{
    await addNote(req.body.title)
    res.render('index',{
        title: 'Express page',
        notes: await getNotes(),
        created: true
    })
})

app.delete('/:id', async (req, res)=>{
    const id = req.params.id
    await removeNote(id)
    res.render('index',{
        title: 'Express page',
        notes: await getNotes(),
        created: false
    })
})

app.put('/:id', async (req, res)=>{
    const id = req.params.id
    const {title} = req.body
    await editNote(id, title)

    res.render('index',{
        title: 'Express page',
        notes: await getNotes(),
        created: false
    })
})

app.listen(port, ()=>{
    console.log( chalk.green(`Server start on port ${port}...`))
})
