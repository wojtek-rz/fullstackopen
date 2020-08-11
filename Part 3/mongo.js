/* eslint-disable new-cap */
const mongoose = require('mongoose')
require('dotenv').config()

const url = process.env.MONGODB_URI
const pName = process.argv[2]
const pNumber = process.argv[3]

mongoose.connect(url, { useNewUrlParser: true, useUnifiedTopology: true })

const db = mongoose.connection
db.on('error', () => console.log('connection error'))
db.once('open', () => {
  console.log('connected to db')

  const personSchema = new mongoose.Schema({
    name: String,
    number: String,
  })

  const Person = new mongoose.model('Person', personSchema)

  if (process.argv.length === 4) {
    const person = new Person({ name: pName, number: pNumber })

    person.save().then((result) => {
      console.log(`${result.name} number ${result.number} added to phonebook`)
      mongoose.connection.close()
    })
  } else {
    Person.find({ name: 'Anna' }).exec().then((result) => {
      console.log(result)
      // result.forEach( person => console.log(person) )
      mongoose.connection.close()
    })
  }
})
