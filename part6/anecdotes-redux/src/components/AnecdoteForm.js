import React from "react";
import { newNote } from "../reducers/anecdoteReducer";
import { showNotification } from "../reducers/notificationReducer";
import { connect } from "react-redux";

const AnecdoteForm = (props) => {
  const addNote = async (e) => {
    e.preventDefault();
    const content = e.target.anecdote.value;
    e.target.anecdote.value = "";
    props.newNote(content);
    props.showNotification(`New Note Added: ${content}`, 2);
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

const mapDisptachToProps = {
  newNote,
  showNotification,
};

const ConnectedAnecdotesForm = connect(null, mapDisptachToProps)(AnecdoteForm);

export default ConnectedAnecdotesForm;
