const express = require('express')
var morgan = require('morgan')
const app = express()

app.use(express.json())

app.use(morgan('tiny'))
console.log(morgan('tiny'))


let persons = [
    {
      id: 1,
      name: "Arto Hellas",
      number: "040-123456"
    },
    {
      id: 2,
      name: "Ada Lovelace",
      number: "39-44-5323523"
    },
    {
      id: 3,
      name: "Dan Abramov",
      number: "12-43-234345" 
    },
    {
      id: 4,
      name: "Mary Poppendieck",
      number: "39-23-6423122"
    },
]

app.get('/api/persons', (req, res) => {
    res.json(persons)
})

app.get('/info', (req, res) => {
    console.log(persons.length)
    res.send('<p>Phonebook has info for ' + persons.length + ' people</p>' + new Date())
})

app.get('/api/persons/:id', (req, res) => {
    const id = Number(req.params.id)
    const person = persons.find(person => person.id === id)
  
    if (person) {
      res.json(person)
    } else {
      res.status(404).end()
    }
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

  persons.map(pers => {
    if(body.name === pers.name) {
      return res.status(400).json({
        error: 'name already exists'
      })
    }
  })

  const person = {
    id: generateId(),
    name: body.name,
    number: body.number
  }

  persons = persons.concat(person)

  res.json(person)
})

const generateId = () => {
  console.log(Math.floor(Math.random() * 1000))
  return Math.floor(Math.random() * 1000)
}

app.delete('/api/persons/:id', (req, res) => {
  const id = Number(req.params.id)
  persons = persons.filter(person => person.id !== id)

  res.status(204).end()
})

const PORT = 3001
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`)
})