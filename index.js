const express = require("express")
const app = express()

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

app.get("/api/persons", (request, response) => {
    response.json(persons)
})

app.get("/info", (request, response) => {
    curTime = new Date()
    response.send(`<p>Phonebook has info for ${persons.length} people.</p><p>${curTime}</p>`)
})

const PORT = 3001
app.listen(PORT)