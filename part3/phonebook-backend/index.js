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

// GET ALL
app.get("/api/persons", (req, res) => {
  Person
    .find({})
    .then(persons => {
      res.json(persons)
    })
})

// GET INFO for amount of persons registered in the list
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

// GET specific person with its ID
app.get("/api/persons/:id", (req, res, next) => {
  const id = req.params.id
  Person
    .findById(id)
    .then(p => {
      p ? res.json(p) : res.status(404).end
    })
    .catch(err => next(err))
})

// DELETE specific person with its ID
app.delete("/api/persons/:id", (req, res, next) => {
  const id = req.params.id
  Person
    .findByIdAndDelete(id)
    .then(result => {
      res.status(204).end()
    })
    .catch(err => next(err))
})

// POST add new person to the list
app.post("/api/persons", (req, res, next) => {
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

  Person
    .find({})
    .then(p => {
      if (p.some(per => per.name === reqBody.name)) {
        return res.status(400).json({
          error: "That name already exists in phonebook"
        })
      }
    })

  newPerson
    .save()
    .then(savedP => savedP.toJSON())
    .then(savedAndFormattedP => res.json(savedAndFormattedP))
    .catch(err => next(err))
})

// PUT update existing information on a person
app.put("/api/persons/:id", (req, res, next) => {
  const reqBody = req.body
  const id = req.params.id

  const newPerson = {
    name: reqBody.name,
    number: reqBody.number
  }

  Person
    .findByIdAndUpdate(id, newPerson, { new: true } )
    .then(updatedP => {
      res.json(updatedP)
    })
    .catch(err => next(err))
})

// ERROR HANDLING for unknown endpoint url
const unknownEndpoint = (request, response) => {
  response.status(404).send({ error: 'unknown endpoint' })
}
app.use(unknownEndpoint)

// Defining & Listening to Port
const PORT = process.env.PORT
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`)
})

// ERROR HANDLING middleware
const errorHandler = (err, req, res, next) => {
  console.error(err.message)

  if (err.name === 'CastError') {
    return res.status(400).send({ error: 'malformatted id' })
  } 
  else if (err.name === "ValidationError") {
    return res.status(400).json({ error: err.message })
  }
  next(err)
}
app.use(errorHandler)