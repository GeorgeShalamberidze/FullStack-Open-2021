import React from "react";
import { useSelector, useDispatch } from "react-redux";
import { voteCounter } from "../reducers/anecdoteReducer";
import { showNotification } from "../reducers/notificationReducer";

const AnecdoteList = () => {
  const anecdotes = useSelector((state) => state.anecdote);
  const filter = useSelector((state) => state.filter);

  const dispatch = useDispatch();

  const vote = (anecdote) => {
    dispatch(voteCounter(anecdote.id));
    dispatch(showNotification(`you have voted for: ${anecdote.content}`));
    setTimeout(() => {
      dispatch({
        type: "NOTIFICATION",
        data: null,
      });
    }, 2000);
  };

  const orderedNumber = anecdotes
    .filter((a) => a.content.toLowerCase().includes(filter))
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

export default AnecdoteList;
