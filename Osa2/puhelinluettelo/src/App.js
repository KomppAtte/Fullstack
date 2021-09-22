import React, { useState } from 'react'

const List = (props) => (
  <p>{props.person.name} {props.person.number}</p>
)

const App = () => {
  const [ persons, setPersons] = useState([
    { name: 'Arto Hellas', number: '555-5555555' }
  ]) 
  const [ newName, setNewName ] = useState('')
  const [newNumber, setNewNumber] = useState('')

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

  return (
    <div>
      <h2>Phonebook</h2>
      <form onSubmit={addPerson}>
        <div>
          name: <input value={newName} onChange={handleChange}/>
          <br/>
          number: <input value={newNumber} onChange={handleNumberChange}/>
        </div>
        <div>
          <button type="submit">add</button>
        </div>
      </form>
      <h2>Numbers</h2>
      <div>
        {persons.map(person =>
          <List key={person.name} person={person}/>
        )}
      </div>
    </div>
  )

}

export default App