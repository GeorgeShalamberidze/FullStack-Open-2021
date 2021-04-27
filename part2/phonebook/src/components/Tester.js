import React, { useState } from 'react'
import axios from "axios"

function Tester() {
    const [notes, setNotes] = useState([])
    axios
        .get('http://localhost:3001/notes')
        .then(res => {
            setNotes(res.data)
        })

    return (
        <div>
            {notes.map((note, id) => {
                return (
                    <li key={id}>{note.id} {note.content} {note.date}</li>
                )
            })}
        </div>
    )
}

export default Tester
