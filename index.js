require('dotenv').config()
const express = require('express')
var morgan = require('morgan')
const app = express()
const cors = require('cors')
const Person = require('./models/person')
const { request, response } = require('express')

app.use(express.static('build'))
app.use(express.json())
app.use(cors())
app.use(morgan('tiny'))
console.log(morgan('tiny'))


const errorHandler = (error, request, response, next) => {
  console.error(error.message)

  if (error.name === 'CastError') {
    return response.status(400).send({ error: 'malformatted id' })
  }

  next(error)
}

app.get('/api/persons', (req, res) => {
  Person.find({}).then(persons => {
    res.json(persons)
  })
})

app.get('/info', (req, res) => {
  let vari = 0;
    Person.find({}).then(result => {
      result.foreach(person => {
        vari++
      })
    })
    console.log('<p>Phonebook has info for ' + vari + ' people</p>' + new Date())
})

app.get('/api/persons/:id', (req, res, next) => {
  Person.findById(req.params.id).then(person => {
    if(person) {
      res.json(person)
    } else {
      res.status(404).end()
    }
  })
  .catch(error => next(error))
})

app.post('/api/persons', (req, res) => {
  const body = req.body

  if (!body.name) {
    return res.status(400).json({ 
      error: 'name missing' 
    })
  } else if (!body.number) {
    return res.status(400).json({ 
      error: 'number missing' 
    })
  }

  //persons.map(pers => {
  //  if(body.name === pers.name) {
  //    return res.status(400).json({
  //      error: 'name already exists'
  //    })
  //  }
  //})

  const person = new Person({
    //id: generateId(),
    name: body.name,
    number: body.number
  })

  person.save().then(savedPerson => {
    res.json(savedPerson)
  })
})

//const generateId = () => {
//  console.log(Math.floor(Math.random() * 1000))
//  return Math.floor(Math.random() * 1000)
//}

app.delete('/api/persons/:id', (req, res, next) => {
  Person.findByIdAndRemove(req.params.id)
  .then(result => {
    res.status(204).end()
  })
  .catch(error => next(error))
})

const unknownEndpoint = (req, res) => {
  res.status(404).send({ error: 'unknown endpoint' })
}

app.use(unknownEndpoint)

app.use(errorHandler)

const PORT = process.env.PORT
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`)
})