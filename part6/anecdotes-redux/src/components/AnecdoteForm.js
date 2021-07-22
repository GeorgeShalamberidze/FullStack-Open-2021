import React from "react";
import { newNote } from "../reducers/anecdoteReducer";
import { useDispatch } from "react-redux";
import { showNotification } from "../reducers/notificationReducer";

const AnecdoteForm = () => {
  const dispatch = useDispatch();

  const addNote = (e) => {
    e.preventDefault();
    const content = e.target.anecdote.value;
    e.target.anecdote.value = "";
    dispatch(newNote(content));
    dispatch(showNotification(`New Note Added: ${content}`));
    setTimeout(() => {
      dispatch({
        type: "NOTIFICATION",
        data: null,
      });
    }, 2000);
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
