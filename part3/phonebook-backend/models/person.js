const mongoose = require('mongoose')
require('dotenv').config()

const url = process.env.MONGODB_URI

mongoose.connect(url, { useNewUrlParser: true, useUnifiedTopology: true, useFindAndModify: false, useCreateIndex: true })
    .then(result => { console.log('connected to MongoDB') })
    .catch(err => { console.log("error connecting to MongoDB: ", err.message )})

const personSchema = new mongoose.Schema({
  name: String,
  number: String,
})

personSchema.set("toJSON", {
    transform: (document, returnedObject) => {
        returnedObject.id = returnedObject._id.toString()
        delete returnedObject._id
        delete returnedObject.__v
    }
})

module.exports = mongoose.model('Person', personSchema)
//////////////////////////////////////////////////////

// const Person = mongoose.model('Person', personSchema)

// const person = new Person({
//   name: process.argv[3],
//   number: process.argv[4],
// })


// if (process.argv[3] || process.argv[4]) {
//   person.save().then(p => {
//     console.log(`${p.name} ${p.number} added to phonebook list`)
//   })
// }
// else {
//   Person.find({}).then(persons => {
//     persons.forEach(person => {
//       console.log(person.name, person.number)
//       mongoose.connection.close()
//     })
//   })
// }