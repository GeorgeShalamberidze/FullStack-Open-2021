import React, { useState, useEffect } from 'react'
import Filter from './components/Filter'
import PersonForm from "./components/PersonForm"
import Contacts from './components/Contacts'
import FilteredContacts from "./components/FilteredContacts"
import service from './services/module'
import Notification from "./components/Notification"

const App = () => {
  const [persons, setPersons] = useState([])
  const [newName, setNewName] = useState('')
  const [newNumber, setNewNumber] = useState('')
  const [search, setSearch] = useState('')
  const [notification, setNotification] = useState(null)
  const [handleError, setHandleError] = useState(null)

  let filteredContacts = search == '' ? [] : persons.filter(p => p.name.toLowerCase().includes(search.toLowerCase()))

  const changeNumber = (id) => {
    const duplicateContact = persons.find(p => p.id === id)
    const newContact = { ...duplicateContact, number: newNumber }

    service
      .update(id, newContact)
      .then(res => {
        setPersons(persons.map(p => p.id !== id ? p : res))
      })
      .catch(err => {
        console.log(err)
      })
  }

  useEffect(() => {
    service
      .getAll()
      .then(res => {
        setPersons(res)
      })
  }, [])

  const handleSubmit = (e) => {
    const duplicate = persons.find(p => p.name === newName)
    e.preventDefault()

    if (persons.some(p => p.name === newName)) {
      if (window.confirm(`${duplicate.name} already exists. Want to replace old number with current one ?`)) {
        changeNumber(duplicate.id)
        setNotification(`${duplicate.name}'s number has been changed`)
        setTimeout(() => {
          setNotification(null)
        }, 4000)
        setNewName('')
        setNewNumber('')
      }
    }
    else if (!newNumber === "" && persons.some(p => p.number === newNumber) && persons.some(p => p.name === newName)) {
      alert(`${newNumber} Already Exists`)
    }
    else if (!newNumber == "" && !newName == "") {
      const noteObj = {
        name: newName,
        number: newNumber
      }
      service
        .create(noteObj)
        .then(res => {
          setPersons(persons.concat(res))
          setNewName('')
          setNewNumber('')
          setNotification(`${res.name} has been added`)
          setTimeout(() => {
            setNotification(null)
          }, 4000)
        })
        .catch(err => {
          console.log(err)
        })
    }
  }

  const deleteGod = (id) => {
    const clickedOne = persons.find(p => p.id === id)
    if (window.confirm(`Delete ${clickedOne.name} ?`)) {
      service
        .deleteUser(id)
        .then(res => {
          setPersons(persons.filter(p => p.id !== id))
          setNewName('')
          setNewNumber('')
        })
        .catch(err => {
          setHandleError(`Contact: ${clickedOne.name} has already been deleted`)
          setTimeout(() => {
            setHandleError(null)
          }, 4000)
          setPersons(persons.filter(p => p.id !== id))
        })
    }
  }

  const handleChange = (e) => setNewName(e.target.value)
  const handleNumberChange = (e) => setNewNumber(e.target.value)
  const handleSearch = (e) => setSearch(e.target.value)

  return (
    <div>
      <h2>Phonebook</h2>
      <Notification
        message={notification}
        error={handleError}
      />
      <Filter
        search={search}
        handleSearch={handleSearch}
      />
      <h2>Add new Contact</h2>
      <PersonForm
        newName={newName}
        handleChange={handleChange}
        newNumber={newNumber}
        numberChange={handleNumberChange}
        handleSubmit={handleSubmit}
      />
      <Contacts
        persons={persons}
        deleteGod={deleteGod}
      />
      <FilteredContacts filteredContacts={filteredContacts} />
    </div>
  )
}

export default App