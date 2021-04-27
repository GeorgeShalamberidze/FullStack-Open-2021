import React, { useState } from 'react'
import Filter from './components/Filter'
import PersonForm from "./components/PersonForm"
import Contacts from './components/Contacts'
import FilteredContacts from "./components/FilteredContacts"

const App = () => {
  const [persons, setPersons] = useState([
    { name: 'Arto Hellas', id: 0, number: 555555555 },
  ])
  const [newName, setNewName] = useState('')
  const [newNumber, setNewNumber] = useState('')
  const [search, setSearch] = useState('')
  let filteredContacts = search == '' ? [] : persons.filter(p => p.name.toLowerCase().includes(search.toLowerCase()))

  const handleSubmit = (e) => {
    e.preventDefault()
    if (persons.some(p => p.name === newName)) {
      alert(`${newName} Already Exists`)
    }
    else if (!newNumber === "" && persons.some(p => p.number === newNumber)) {
      alert(`${newNumber} Already Exists`)
    }
    else if (!newNumber == "" || !newName == "") {
      setPersons(persons.concat({ name: newName, id: persons[persons.length - 1].id + 1, number: newNumber }))
    }
    setNewName("")
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
      <Contacts persons={persons}/>
      <FilteredContacts filteredContacts={filteredContacts}/>
    </div>
  )
}

export default App