import axios from "axios";
const baseURL = " http://localhost:3001/anecdotes";

const getAll = async () => {
  const response = await axios.get(baseURL);
  return response.data;
};

const createAnecdote = async (content) => {
  const obj = {
    content,
    votes: 0,
  };
  const response = await axios.post(baseURL, obj);
  return response.data;
};

const vote = async (id, newObj) => {
  const response = await axios.put(`${baseURL}/${id}`, newObj);
  return response.data;
};

export default {
  getAll,
  createAnecdote,
  vote,
};
