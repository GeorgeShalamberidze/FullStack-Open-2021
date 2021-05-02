import React from 'react'

function PersonForm({newName, handleChange, newNumber, numberChange, handleSubmit}) {
    return (
        <form onSubmit={handleSubmit}>
            <div>
                name: <input value={newName} onChange={handleChange} placeholder="enter name..." />
            </div>
            <div>
                number: <input value={newNumber} onChange={numberChange} placeholder="enter number..." />
            </div>

            <div>
                <button type="submit">add</button>
            </div>
        </form>
    )
}

export default PersonForm
