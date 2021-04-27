import React from 'react'

function FilteredContacts({filteredContacts}) {
    return (
        <div>
            <h1>Filtered: </h1>
            {filteredContacts.map(p => {
                return (
                    <p key={p.id}>{p.name} {p.number}</p>
                )
            })}
        </div>
    )
}

export default FilteredContacts
