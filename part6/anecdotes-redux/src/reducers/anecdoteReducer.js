import services from "../services/anecdotes";

export const voteCounter = (anecdote) => {
  return async (dispatch) => {
    const objToChange = {
      ...anecdote,
      votes: anecdote.votes + 1,
    };
    const idToVoteFor = await services.vote(anecdote.id, objToChange);
    dispatch({
      type: "VOTE",
      data: idToVoteFor,
    });
  };
};

export const newNote = (content) => {
  return async (dispatch) => {
    const newAnecdote = await services.createAnecdote(content);
    dispatch({
      type: "ADD_NOTE",
      data: newAnecdote,
    });
  };
};

export const initializeAnecdotes = () => {
  return async (dispatch) => {
    const anecdotes = await services.getAll();
    dispatch({
      type: "INIT_ANECDOTES",
      data: anecdotes,
    });
  };
};

const anecdoteReducer = (state = [], action) => {
  console.log(action.data);
  switch (action.type) {
    case "VOTE":
      const id = action.data.id;
      return state.map((anecdote) =>
        anecdote.id === id ? action.data : anecdote
      );

    case "ADD_NOTE":
      return [...state, action.data];
    case "INIT_ANECDOTES":
      return action.data;
    default:
      return state;
  }
};

export default anecdoteReducer;
