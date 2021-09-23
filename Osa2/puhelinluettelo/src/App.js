import React, { useState } from 'react'
import Filter from './components/Filter'
import Form from './components/Form'
import Persons from './components/Persons'

const App = () => {
  const [ persons, setPersons] = useState([
    { name: 'Arto Hellas', number: '555-5555555' },
    { name: 'Ada Lovelace', number: '39-44-5323523' },
    { name: 'Dan Abramov', number: '12-43-234345' },
    { name: 'Mary Poppendieck', number: '39-23-6423122' }

  ]) 
  const [ newName, setNewName ] = useState('')
  const [newNumber, setNewNumber] = useState('')
  const [newFilter, setNewFilter] = useState('')

  const addPerson = (event) => {
    let bool = true
    for(let p of persons) {
      if(p.name === newName || p.number === newNumber) {
        bool = false
        break
      }
    }
    if (bool) {
      event.preventDefault()
      const nameObj = {
        name: newName,
        number: newNumber,
        id: persons.length + 1
      }
      setPersons(persons.concat(nameObj))
      setNewName('')
      setNewNumber('')
    } else {
      window.alert(`${newName} or ${newNumber} is already added to phonebook`)
    }
  }

  const handleChange = (event) => {
    setNewName(event.target.value)
  }

  const handleNumberChange = (event) => {
    setNewNumber(event.target.value)
  }

  const handleFilterChange = (event) => {
    console.log(event.target.value)
    setNewFilter(event.target.value)
  }

  const personsToShow = newFilter 
    ? persons.filter(person => person.name.includes(newFilter))
    : persons 

  return (
    <div>
      <h2>Phonebook</h2>
      <div>
      <Filter value={newFilter} handle={handleFilterChange}/>
      </div>
      <h2>Add new</h2>
      <Form add={addPerson} name={newName} handleName={handleChange} number={newNumber} handleNum={handleNumberChange}/>
      <h2>Numbers</h2>
      <Persons persons={personsToShow}/>
    </div>
  )

}

export default App