import React, { useState, useEffect } from 'react'
import Filter from './components/Filter'
import PersonForm from "./components/PersonForm"
import Contacts from './components/Contacts'
import FilteredContacts from "./components/FilteredContacts"
import service from './services/module'

const App = () => {
  const [persons, setPersons] = useState([])
  const [newName, setNewName] = useState('')
  const [newNumber, setNewNumber] = useState('')
  const [search, setSearch] = useState('')
  let filteredContacts = search == '' ? [] : persons.filter(p => p.name.toLowerCase().includes(search.toLowerCase()))

  useEffect(() => {
    service
      .getAll()
      .then(res => {
        setPersons(res)
      })
  }, [])

  const handleSubmit = (e) => {
    e.preventDefault()
    if (persons.some(p => p.name === newName)) {
      alert(`${newName} Already Exists`)
    }
    else if (!newNumber === "" && persons.some(p => p.number === newNumber)) {
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
          console.log(res)
        })
        .catch(err => {
          console.log(err)
        })
      setPersons(persons.concat({ name: newName, id: persons[persons.length - 1].id + 1, number: newNumber }))
    }
    setNewName('')
    setNewNumber('')
  }

  const handleChange = (e) => setNewName(e.target.value)
  const handleNumberChange = (e) => setNewNumber(e.target.value)
  const handleSearch = (e) => setSearch(e.target.value)

  return (
    <div>
      <h2>Phonebook</h2>
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
      <Contacts persons={persons} />
      <FilteredContacts filteredContacts={filteredContacts} />
    </div>
  )
}

export default App