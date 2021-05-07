const express = require('express')
const app = express()
app.use(express.json())

const persons = [
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
  console.log(id)
  if (person) {
    res.send(person)
  }
  else{
    res.status(404).end()
  }
})

app.delete('/api/persons:/id', (req, res) => {
  const id = parseInt(req.params.id)
  persons = persons.filter(p => p.id !== id)

  console.log("id: ", id)

  res.status(404).end()
})

app.get("/", (req, res) => {
  res.send("<h1>Hello World</h1>")
})


const PORT = 3000
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`)
})