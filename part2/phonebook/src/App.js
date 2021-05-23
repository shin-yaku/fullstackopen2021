import React, { useState, useEffect } from 'react'
import axios from 'axios'

const Person = ({ person }) => {
  return (
    <li>{person.name} {person.number}</li>
  )
}

const PersonForm = (props) => {
  const {addPerson, newName, handleNameChange, newNumber, handleNumberChange} = props
  return (
      <form onSubmit={addPerson}>
        <div>
          name: <input 
            value={newName}
            onChange={handleNameChange}
          />
        </div>
        <div>
          number: <input 
            value={newNumber}
            onChange={handleNumberChange}
          />
        </div>
        <div>
          <button type="submit">add</button>
        </div>
      </form>
  )
}

const Persons = (props) => {
  const {persons} = props
  return (
      <ul>
        {persons.map(person =>
          <Person key={person.name} person={person} />
        )}
      </ul>
  )
}

const App = () => {
  const [ persons, setPersons ] = useState([]) 
  const [ newName, setNewName ] = useState('')
  const [ newNumber, setNewNumber ] = useState('')

  const hook = () => {
    console.log('effect')
    axios
      .get('http://localhost:3001/persons')
      .then(response => {
        console.log('promise fulfilled')
        setPersons(response.data)
      })
  }
  useEffect(hook, [])
  console.log('render', persons.length, 'persons')


  const addPerson = (event) => {
    event.preventDefault()
    const personObject = {
      name: newName,
      number: newNumber
    }

    if (persons.map(p => p.name).includes(newName)) {
      window.alert(`${newName} is already added to phonebook`)
    } else {
      setPersons(persons.concat(personObject))
      setNewName('')
      setNewNumber('')
    }
  }

  const handleNameChange = (event) => {
    setNewName(event.target.value)
  }
  const handleNumberChange = (event) => {
    setNewNumber(event.target.value)
  }

  return (
    <div>
      <h2>Phonebook</h2>

      <h3>Add a new</h3>

      <PersonForm
         addPerson={addPerson}
         newName={newName}
         handleNameChange={handleNameChange}
         newNumber={newNumber}
         handleNumberChange={handleNumberChange}
      />

      <h2>Numbers</h2>

      <Persons persons={persons}/>
    </div>
  )
}

export default App