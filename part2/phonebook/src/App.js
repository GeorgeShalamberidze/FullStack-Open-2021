import React, { useState } from 'react'

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
      <form onSubmit={(e) => e.preventDefault()}>
        <div>
          <input placeholder="Search..." value={search} onChange={handleSearch} />
        </div>
      </form>

      <h2>Add new Contact</h2>
      
      <form onSubmit={(e) => e.preventDefault()}>
        <div>
          name: <input value={newName} onChange={handleChange} placeholder="enter name..." />
        </div>
        <div>
          number: <input value={newNumber} onChange={handleNumberChange} placeholder="enter number..." />
        </div>

        <div>
          <button type="submit" onClick={handleSubmit}>add</button>
        </div>
      </form>
      <h2>Numbers</h2>
      {persons.map(person => {
        return (
          <p key={person.id}>{person.name} {person.number}</p>
        )
      })}

      <h1>Filtered: </h1>
      {filteredContacts.map(p => {
        return (
          <p key={p.id}>{p.name} {p.number}</p>
        )
      })}
    </div>
  )
}

export default App