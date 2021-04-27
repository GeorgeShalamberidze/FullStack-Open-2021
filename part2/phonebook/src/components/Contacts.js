import React from 'react'

function Contacts({ persons }) {
    return (
        <div>
            <h2>Contacts: </h2>
            {persons.map(person => {
                return (
                    <p key={person.id}>{person.name} {person.number}</p>
                )
            })}
        </div>
    )
}

export default Contacts
