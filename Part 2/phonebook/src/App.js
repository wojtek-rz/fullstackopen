import React, { useState } from 'react';
import Filter from './components/Filter'
import PersonForm from './components/PersonForm'
import ShowPersons from './components/ShowPersons'


const App = () => {
  const [ persons, setPersons ] = useState([
    { name: 'Arto Hellas', number: '040-123456' },
    { name: 'Ada Lovelace', number: '39-44-5323523' },
    { name: 'Dan Abramov', number: '12-43-234345' },
    { name: 'Mary Poppendieck', number: '39-23-6423122' },
  ]) 
  const [ newName, setNewName ] = useState('')
  const [ newNumber, setNewNumber] = useState('')
  const [ filter, setFilter] = useState('')

  const personsToShow = (filter.length > 0 ?
    persons.filter((person) => (
      person.name.toLowerCase().includes(filter.toLowerCase())))
    : persons)

  const addNewPerson = (event) => {
    event.preventDefault()
    
    console.log(persons)

    if (persons.some(e => e.name === newName)) {
      window.alert(`${newName} is already added to the phonebook`);
    } else{
      const person = {
        name: newName,
        number: newNumber,
      }
      setPersons(persons.concat(person))
    }
  }

  const handleNameChange = (event) => {
    setNewName(event.target.value)
  }  
  const handleNumberChange = (event) => {
    setNewNumber(event.target.value)
  }
  const handleFilterChange = (event) => {
    setFilter(event.target.value)
  }

  return (
    <div>
    
      <h2>Phonebook</h2>
      <Filter 
        filter={filter} 
        filterChange={handleFilterChange} 
      />

      <h2>Add a new</h2>
      <PersonForm
        addNewPerson={addNewPerson}
        newName={newName}
        handleNameChange={handleNameChange}
        newNumber={newNumber}
        handleNumberChange={handleNumberChange}
      />

      <h2>Numbers</h2>
      <ShowPersons
        persons={personsToShow}
      />
    </div>
  )
}

export default App;
