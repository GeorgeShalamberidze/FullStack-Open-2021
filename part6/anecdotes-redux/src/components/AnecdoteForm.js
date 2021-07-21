import React from "react";
import { newNote } from "../reducers/anecdoteReducer";
import { useDispatch } from "react-redux";

const AnecdoteForm = () => {
  const dispatch = useDispatch();
  const addNote = (e) => {
    e.preventDefault();
    const content = e.target.note.value;
    e.target.note.value = "";
    dispatch(newNote(content));
  };

  return (
    <div>
      <h2>create new</h2>
      <form onSubmit={addNote}>
        <div>
          <input name="note" />
        </div>
        <button>create</button>
      </form>
    </div>
  );
};

export default AnecdoteForm;
