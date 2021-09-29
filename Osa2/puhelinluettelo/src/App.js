import React, { useEffect, useState } from 'react'
import Filter from './components/Filter'
import Form from './components/Form'
import List from './components/Persons'
import personService from './services/persons'

const App = () => {
  const [ persons, setPersons] = useState([]) 
  const [ newName, setNewName ] = useState('')
  const [newNumber, setNewNumber] = useState('')
  const [newFilter, setNewFilter] = useState('')

  useEffect(() => {
    personService
    .getAll()
    .then(persons => {
      setPersons(persons)
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
      let biggestId = 0;
      for (let i of persons) {
        if(i.id > biggestId) {
          biggestId = i.id
        }
      }
      const nameObj = {
        name: newName,
        number: newNumber,
        id: biggestId + 1
      }
      personService.create(nameObj)
      .then(returnedPerson => {
        setPersons(persons.concat(returnedPerson))
        setNewName('')
        setNewNumber('')
      })
    } else {
      window.alert(`${newName} or ${newNumber} is already added to phonebook`)
    }
  }

  const deleteSelectedPerson = id => {
    const person = persons.find(p => p.id === id)
    console.log(person)
    
    if(window.confirm("haluatko poistaa?")) {
      personService.deletePerson(id).then()
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
      <div> 
        {personsToShow.map(person => 
          <List
            key={person.name}
            person={person}
            selectDelete={() => deleteSelectedPerson(person.id)}
          />
        )}
      </div>
    </div>
  )

}

export default App