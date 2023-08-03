require("dotenv").config()
const Person = require("./models/person")
const express = require("express")
const morgan = require("morgan")
const cors = require("cors")
const app = express()

app.use(express.static("build"))
app.use(cors())
app.use(express.json())
morgan.token('body', (req) => JSON.stringify(req.body))
app.use(morgan(
    (tokens, req, res) => {
        return(
            [
                tokens.method(req, res),
                tokens.url(req, res),
                tokens.status(req, res),
                tokens.res(req, res, 'content-length'), '-',
                tokens['response-time'](req, res), 'ms',
                tokens.body(req)
            ].join(' ')
        )
    }
))

app.get("/api/persons", (request, response) => {
    Person.find({}).then(persons => {
        response.json(persons)
    })
})

app.get("/info", (request, response) => {
    curTime = new Date()
    response.send(`<p>Phonebook has info for ${persons.length} people.</p><p>${curTime}</p>`)
})

app.get("/api/persons/:id", (request, response) => {
    const id = Number(request.params.id)
    const person = persons.find(per => per.id === id)

    if (person) {
        response.json(person)
    } else {
        response.status(404).end()
    }
})
app.delete("/api/persons/:id", (request, response) => {
    const id = Number(request.params.id)
    persons = persons.filter(person => person.id !== id)
    
    response.status(204).end()
})

app.post("/api/persons", (request, response) => {
    const newPerson = {...request.body}
    let people = []
    Person.find({}).then(persons => { people = persons.map(per => per.name.toLowerCase())})
    console.log(people)
    if (!newPerson.name) {
        return response.status(400).json({error: "Name missing"})
    } else if (!newPerson.number) {
        return response.status(400).json({error: "Number missing"})
    } else if (people.includes(newPerson.name.toLowerCase())) {
        return response.status(400).json({error: "Name must be unique"})
    }
    const person = new Person(newPerson)
    person.save().then(savedPerson => {
        response.json(savedPerson)
    })
})

const PORT = process.env.PORT
app.listen(PORT, () => {
    console.log(`Server port: ${PORT}`)
  })