const express = require('express')
const app = express()
const morgan = require("morgan")
const morganBody = require('morgan-body')
const bodyParser = require('body-parser')
const cors = require("cors")

app.use(express.json())
app.use(cors())

morgan.token("post", (req, res) => {
  return JSON.stringify(req.body)
})
app.use(morgan(":method :url :status :res[content-length] - :response-time ms / :post"))

let persons = [
  {
    id: 1,
    name: "Arto Hellas",
    number: "11111"
  },
  {
    id: 2,
    name: "George Hellas",
    number: "22222"
  },
  {
    id: 3,
    name: "John Hellas",
    number: "33333"
  },
  {
    id: 4,
    name: "Wallace Hellas",
    number: "44444"
  },
]

app.get("/api/persons", (req, res) => {
  res.json(persons)
})

app.get('/info', (req, res) => {
  res.send(
    `Phonebook has info for ${persons.length} people
    <br />
    <br />
    ${new Date()}
    `
  )
})

app.get("/api/persons/:id", (req, res) => {
  const id = parseInt(req.params.id)
  const person = persons.find(n => n.id === id)
  if (person) {
    res.send(person)
  }
  else{
    res.status(404).end()
  }
})

app.delete("/api/persons:/id", (req, res) => {
  const id = parseInt(req.params.id)
  console.log("id", id)
  persons = persons.filter(p => p.id !== id)

  res.status(204).end()
})

app.get("/", (req, res) => {
  res.send("<h1>Hello World</h1>")
})

app.post("/api/persons", (req, res) => {
  const randomId = Math.floor(Math.random() * 100000)
  const reqBody = req.body
  const newPerson = {
    id: randomId,
    name: reqBody.name,
    number: reqBody.number
  }

  if (!reqBody.name || !reqBody.number){
    return res.status(400).json({
      error: "Name and/or number is missing"
    })
  }
  
  if (persons.some(p => p.name === reqBody.name)){
    return res.status(400).json({
      error: "That name already exists in phonebook"
    })
  } 

  persons = persons.concat(newPerson)
  res.json(reqBody)
  console.log(persons)
})

const unknownEndpoint = (request, response) => {
  response.status(404).send({ error: 'unknown endpoint' })
}

app.use(unknownEndpoint)


const PORT = process.env.PORT || 3000
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`)
})