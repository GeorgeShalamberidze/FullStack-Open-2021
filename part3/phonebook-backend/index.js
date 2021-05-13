const express = require('express')
const app = express()
const morgan = require("morgan")
const morganBody = require('morgan-body')
const bodyParser = require('body-parser')
const cors = require("cors")
require('dotenv').config()
const Person = require("./models/person")

app.use(express.json())
app.use(cors())
app.use(express.static('build'))

morgan.token("post", (req, res) => {
  return JSON.stringify(req.body)
})
app.use(morgan(":method :url :status :res[content-length] - :response-time ms / :post"))

app.get("/api/persons", (req, res) => {
  Person
    .find({})
    .then(persons => {
      res.json(persons)
    })
})

app.get('/info', (req, res) => {
  Person
    .find({})
    .then(p => {
      res.send(
        `Phonebook has info for ${p.length} people
        <br />
        <br />
        ${new Date()}`
      )
    })
})

app.get("/api/persons/:id", (req, res) => {
  const id = req.params.id
  Person
    .findById(id)
    .then(p => {
      p ? res.json(p) : res.status(404).end
    })
    .catch(err => console.log(err.message))
})

app.delete("/api/persons/:id", (req, res) => {
  const id = parseInt(req.params.id)
  persons = persons.filter(p => p.id !== id)

  res.status(204).end()
})

app.get("/", (req, res) => {
  res.send("<h1>Hello World</h1>")
})

app.post("/api/persons", (req, res) => {
  const reqBody = req.body
  const newPerson = new Person({
    name: reqBody.name,
    number: reqBody.number
  })

  if (!reqBody.name || !reqBody.number) {
    return res.status(400).json({
      error: "Name and/or number is missing"
    })
  }

  Person.find({})
    .then(p => {
      if (p.some(per => per.name === reqBody.name)) {
        return res.status(400).json({
          error: "That name already exists in phonebook"
        })
      }
    })

  newPerson
    .save()
    .then(newP => {
      res.json(newP)
    })
})

const unknownEndpoint = (request, response) => {
  response.status(404).send({ error: 'unknown endpoint' })
}

app.use(unknownEndpoint)

const PORT = process.env.PORT
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`)
})