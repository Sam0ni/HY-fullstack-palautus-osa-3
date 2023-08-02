const express = require("express")
const app = express()

app.use(express.json())

let persons = [
    {
        id: 1,
        name: "Masayoshi Takanaka",
        number: "81-22-4466778"
    },
    {
        id: 2,
        name: "Edward Normal",
        number: "040-1234321"
    },
    {
        id: 3,
        name: "Dutch Schaefer",
        number: "22-22-5051505"
    }

]

const generateId = () => {
    return Math.floor(Math.random() * 1000000)
}

app.get("/api/persons", (request, response) => {
    response.json(persons)
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
    const newPerson = request.body
    if (!newPerson.name) {
        return response.status(400).json({error: "Name missing"})
    } else if (!newPerson.number) {
        return response.status(400).json({error: "Number missing"})
    } else if (persons.map(person => person.name.toLowerCase()).includes(newPerson.name.toLowerCase())) {
        return response.status(400).json({error: "Name must be unique"})
    }
    newPerson.id = generateId()

    persons = persons.concat(newPerson)
    
    response.json(newPerson)
})

const PORT = 3001
app.listen(PORT)