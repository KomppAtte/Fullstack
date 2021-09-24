import React, { useEffect, useState } from 'react'
import axios from 'axios'
import Filter from './components/Filter'
import Form from './components/Form'
import Persons from './components/Persons'

const App = () => {
  const [ persons, setPersons] = useState([]) 
  const [ newName, setNewName ] = useState('')
  const [newNumber, setNewNumber] = useState('')
  const [newFilter, setNewFilter] = useState('')

  useEffect(() => {
    axios
    .get('http://localhost:3001/persons')
    .then(response => {
      console.log(response.data)
      setPersons(response.data)
    })
  }, [])

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