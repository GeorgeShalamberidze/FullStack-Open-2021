import React, { useState } from 'react'

const App = () => {
  const [persons, setPersons] = useState([
    { name: 'Arto Hellas', id: 0 }
  ])
  const [newName, setNewName] = useState('')

  const handleSubmit = (e) => {
    e.preventDefault()
    setNewName("")
    if (persons.some(p => p.name === newName)) {
      alert(`${newName} Already Exists`)
    }
    else {
      setPersons(persons.concat({ name: newName, id: persons[persons.length - 1].id + 1 }))
    }
  }

  const handleChange = (e) => {
    setNewName(e.target.value)
  }

  return (
    <div>
      <h2>Phonebook</h2>
      <form onSubmit={(e) => e.preventDefault()}>
        <div>
          name: <input value={newName} onChange={handleChange} />
        </div>
        <div>
          <button type="submit" onClick={handleSubmit}>add</button>
        </div>
      </form>
      <h2>Numbers</h2>
      {persons.map(person => {
        return (
          <p key={person.id}>{person.name}</p>
        )
      })}
    </div>
  )
}

export default App