import React, { useState, useEffect } from 'react';
import personService from './services/persons'
import Filter from './components/Filter'
import PersonForm from './components/PersonForm'
import ShowPersons from './components/ShowPersons'
import Notification from './components/Notification'


const App = () => {
  const [ persons, setPersons ] = useState([]) 
  const [ newName, setNewName ] = useState('')
  const [ newNumber, setNewNumber ] = useState('')
  const [ filter, setFilter ] = useState('')
  const [ notif, setNotif ] = useState({text: null, style: 'green'})

  useEffect(() => {
    console.log('effect')
    personService
      .getAll().then( returnedPersons => {
        console.log('promise fulfilled')
        setPersons(returnedPersons)
      })
  }, [])
  console.log('rendering', persons.length, 'persons')

  const personsToShow = (filter.length > 0 ?
    persons.filter((person) => (
      person.name.toLowerCase().includes(filter.toLowerCase())))
    : persons)

  const showNotification = (text, style) => {
    setNotif({text: text, style: style})          
    setTimeout(() => {
      setNotif({text: null})
    }, 5000)
  } 

  const addNewPerson = (event) => {
    event.preventDefault()
    
    console.log(persons)

    if (persons.some(person => person.name === newName)) {
      if (window.confirm(`${newName} is already added to the phonebook, replace the old number with the new one?`)) {
        //upadting person
        const formerPerson = persons.find(person => person.name === newName)
        const changedPerson = {...formerPerson, number: newNumber,}
        
        personService.update(formerPerson.id, changedPerson).then((returnedPerson) => {
          setPersons(persons.map(person => person.id !== returnedPerson.id ? person : returnedPerson))
          showNotification(`The number of ${returnedPerson.name} replaced`, 'green')
        }).catch(error => {
          showNotification(error.response.data.error, 'red')
          //showNotification(`Information of ${formerPerson.name} has been removed from server`, 'red')
        })
      }
    } else{
      const person = {
        name: newName,
        number: newNumber,
      }

      personService.create(person).then( returnedPerson => {
        setPersons(persons.concat(returnedPerson))
        setNewName('')
        setNewNumber('')
        showNotification(`Added ${returnedPerson.name}`, 'green')
      }).catch(error => {
        console.log(JSON.stringify(error))
        showNotification(error.response.data.error, 'red')
      })
    }
  }
  const deletePerson = (id) => {
    const personToDelete = persons.find(person => person.id === id)
    if (window.confirm(`Delete ${personToDelete.name} ?`)) {
      personService.del(id).then(response => {
        setPersons(persons.filter(person => person.id !== id))
        showNotification(`Removed ${personToDelete.name}`, 'green')
      })
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
      <Notification text={notif.text} style={notif.style}/>
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
        handleClick={deletePerson}
      />
    </div>
  )
}

export default App;
