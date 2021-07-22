import React from "react";
import { connect } from "react-redux";
import { voteCounter } from "../reducers/anecdoteReducer";
import { showNotification } from "../reducers/notificationReducer";

const AnecdoteList = (props) => {
  const vote = (anecdote) => {
    props.voteCounter(anecdote);
    props.showNotification(`you have voted for: ${anecdote.content}`, 2);
  };

  const orderedNumber = props.anecdote
    ?.filter((a) => a.content.toLowerCase().includes(props.filter))
    .sort((a, b) => (a.votes > b.votes ? -1 : 1));
  return (
    <div>
      {orderedNumber.map((anecdote) => (
        <div key={anecdote.id}>
          <div>{anecdote.content}</div>
          <div>
            has {anecdote.votes}
            <button onClick={() => vote(anecdote)}>vote</button>
          </div>
        </div>
      ))}
    </div>
  );
};

const mapStateToProps = (state) => {
  return {
    anecdote: state.anecdote,
    filter: state.filter,
  };
};

const mapDisptachToProps = {
  voteCounter,
  showNotification,
};

const ConnectedAnecdotesList = connect(
  mapStateToProps,
  mapDisptachToProps
)(AnecdoteList);

export default ConnectedAnecdotesList;
