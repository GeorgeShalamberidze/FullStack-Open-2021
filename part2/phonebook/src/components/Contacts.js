import React from 'react'

function Contacts({ persons, deleteGod }) {
    return (
        <div>
            <h2>Contacts: </h2>
            {persons.map(person => {
                return (
                    <div key={person.id}>
                        <p style={{ display: "inline-block" }}>{person.name} {person.number}</p>
                        <button type="button" onClick={(e) => {
                            e.preventDefault()
                            deleteGod(person.id)
                        }}> delete</button>
                    </div>
                )
            })}
        </div>
    )
}

export default Contacts
