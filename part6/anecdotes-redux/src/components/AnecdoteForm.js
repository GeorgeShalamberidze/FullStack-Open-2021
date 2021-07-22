import React from "react";
import { newNote } from "../reducers/anecdoteReducer";
import { useDispatch } from "react-redux";
import { showNotification } from "../reducers/notificationReducer";

const AnecdoteForm = () => {
  const dispatch = useDispatch();

  const addNote = async (e) => {
    e.preventDefault();
    const content = e.target.anecdote.value;
    e.target.anecdote.value = "";
    dispatch(newNote(content));
    dispatch(showNotification(`New Note Added: ${content}`), 2);
  };

  return (
    <div>
      <h2>create new</h2>
      <form onSubmit={addNote}>
        <div>
          <input name="anecdote" />
        </div>
        <button>create</button>
      </form>
    </div>
  );
};

export default AnecdoteForm;
