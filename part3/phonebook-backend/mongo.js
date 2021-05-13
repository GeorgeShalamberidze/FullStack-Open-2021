const mongoose = require('mongoose')

if (process.argv.length < 3) {
  console.log('Please provide the password as an argument: node mongo.js <password>')
  process.exit(1)
}

const password = process.argv[2]

const url =
  `mongodb://ggeoart:${password}@cluster01-shard-00-00.9aama.mongodb.net:27017,cluster01-shard-00-01.9aama.mongodb.net:27017,cluster01-shard-00-02.9aama.mongodb.net:27017/phonebookDB?ssl=true&replicaSet=atlas-wwdj6h-shard-0&authSource=admin&retryWrites=true&w=majority`

mongoose.connect(url, { useNewUrlParser: true, useUnifiedTopology: true, useFindAndModify: false, useCreateIndex: true })

const personSchema = new mongoose.Schema({
  name: String,
  number: String,
})

const Person = mongoose.model('Person', personSchema)

const person = new Person({
  name: 'Mongoose',
  number: "5555555",
})


person.save().then(result => {
  console.log("added")
  mongoose.connection.close()
})

Person.find({}).then(result => {
  result.forEach(p => {
    console.log("foreach")
  })
  mongoose.connection.close()
})

process.argv.forEach((val, index) => {
  console.log(`${index}: ${val}`);
});


console.log("process.arg[0]: ", process.argv[3])