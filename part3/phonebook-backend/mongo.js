const mongoose = require('mongoose')
require('dotenv').config()

if (process.argv.length < 3) {
  console.log('Please provide the password as an argument: node mongo.js <password>')
  process.exit(1)
}

const url = process.env.MONGODB_URI

console.log("connected to: ", url)

mongoose.connect(url, { useNewUrlParser: true, useUnifiedTopology: true, useFindAndModify: false, useCreateIndex: true })

const personSchema = new mongoose.Schema({
  name: String,
  number: String,
})

const Person = mongoose.model('Person', personSchema)

const person = new Person({
  name: process.argv[3],
  number: process.argv[4],
})


if (process.argv[3] || process.argv[4]) {
  person.save().then(p => {
    console.log(`${p.name} ${p.number} added to phonebook list`)
  })
}
else {
  Person.find({}).then(persons => {
    persons.forEach(person => {
      console.log(person.name, person.number)
      mongoose.connection.close()
    })
  })
}