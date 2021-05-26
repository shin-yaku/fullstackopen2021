import React, { useState, useEffect } from 'react'
import personService from './services/persons'

const Person = ({ person, deleteFunc}) => {
  console.log(deleteFunc)
  return (
    <li>{person.name} {person.number} <button onClick={() => deleteFunc(person)}>delete</button></li>
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
  const {persons, deleteFunc} = props
  return (
      <ul>
        {persons.map(person =>
          <Person key={person.name} person={person} deleteFunc={deleteFunc}/>
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
    personService.getAll().then(persons => setPersons(persons))
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
      personService
        .create(personObject)
        .then(returnedPerson => {
            setPersons(persons.concat(returnedPerson))
            setNewName('')
            setNewNumber('')
        }
      )
    }
  }

  const handleNameChange = (event) => {
    setNewName(event.target.value)
  }
  const handleNumberChange = (event) => {
    setNewNumber(event.target.value)
  }

  const deleteFunc = person => {
    if (window.confirm(`Delete ${person.name} ?`)) {
      personService.deletePerson(person.id)
      const newPersons = persons.filter(p => p.id != person.id)

      setPersons(newPersons)
    }  
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

      <Persons persons={persons} deleteFunc={deleteFunc}/>
    </div>
  )
}

export default App