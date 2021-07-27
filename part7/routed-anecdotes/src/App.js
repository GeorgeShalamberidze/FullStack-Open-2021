import React, { useState } from "react";
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link,
  useParams,
  useHistory,
} from "react-router-dom";

import useField from "./hooks";

const Menu = () => {
  const padding = {
    paddingRight: 5,
  };
  return (
    <div>
      <Link to="/" style={padding}>
        anecdotes
      </Link>
      <Link to="/create" style={padding}>
        create new
      </Link>
      <Link to="/about" style={padding}>
        about
      </Link>
    </div>
  );
};

const AnecdoteList = ({ anecdotes }) => {
  return (
    <div>
      <h2>Anecdotes</h2>
      <ul>
        {anecdotes.map((anecdote) => (
          <li>
            <Link to={`/anecdotes/${anecdote.id}`}>{anecdote.content}</Link>
          </li>
        ))}
      </ul>
    </div>
  );
};

const About = () => (
  <div>
    <h2>About anecdote app</h2>
    <p>According to Wikipedia:</p>

    <em>
      An anecdote is a brief, revealing account of an individual person or an
      incident. Occasionally humorous, anecdotes differ from jokes because their
      primary purpose is not simply to provoke laughter but to reveal a truth
      more general than the brief tale itself, such as to characterize a person
      by delineating a specific quirk or trait, to communicate an abstract idea
      about a person, place, or thing through the concrete details of a short
      narrative. An anecdote is "a story with a point."
    </em>

    <p>
      Software engineering is full of excellent anecdotes, at this app you can
      find the best and add more.
    </p>
  </div>
);

const Footer = () => (
  <div>
    Anecdote app for{" "}
    <a href="https://courses.helsinki.fi/fi/tkt21009">
      Full Stack -websovelluskehitys
    </a>
    . See{" "}
    <a href="https://github.com/fullstack-hy/routed-anecdotes/blob/master/src/App.js">
      https://github.com/fullstack-hy2019/routed-anecdotes/blob/master/src/App.js
    </a>{" "}
    for the source code.
  </div>
);

const CreateNew = (props) => {
  const history = useHistory();

  //Form Stuff Here
  const fieldContent = useField("content");
  const fieldAuthor = useField("author");
  const fieldInfo = useField("info");

  const { reset: contentReset, ...restContent } = fieldContent;
  const { reset: authorReset, ...restAuthor } = fieldAuthor;
  const { reset: infoReset, ...restInfo } = fieldInfo;

  console.log(contentReset);

  const resetFunc = () => {
    contentReset();
    authorReset();
    infoReset();
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    props.addNew({
      content: fieldContent.value,
      author: fieldAuthor.value,
      info: fieldInfo.value,
      votes: 0,
    });
    history.push("/");
  };

  return (
    <div>
      <h2>create a new anecdote</h2>
      <form onSubmit={handleSubmit}>
        <div>
          content
          <input {...restContent} />
        </div>
        <div>
          author
          <input {...restAuthor} />
        </div>
        <div>
          url for more info
          <input {...restInfo} />
        </div>
        <button>create</button>
        <button type="button" onClick={resetFunc}>
          reset
        </button>
      </form>
    </div>
  );
};

const SingleAnecdote = ({ anecdotes }) => {
  const id = useParams().id;
  const { content, author, info, votes } = anecdotes.find((a) => a.id === id);

  return (
    <div>
      <h2>{content}</h2>
      <p>
        Author: <strong>{author}</strong>
      </p>
      <p>
        Info: <a href={info}>{info}</a>
      </p>
      <p>
        Has <strong>{votes}</strong> Votes
      </p>
    </div>
  );
};

const App = () => {
  const [anecdotes, setAnecdotes] = useState([
    {
      content: "If it hurts, do it more often",
      author: "Jez Humble",
      info: "https://martinfowler.com/bliki/FrequencyReducesDifficulty.html",
      votes: 0,
      id: "1",
    },
    {
      content: "Premature optimization is the root of all evil",
      author: "Donald Knuth",
      info: "http://wiki.c2.com/?PrematureOptimization",
      votes: 0,
      id: "2",
    },
  ]);

  const [notification, setNotification] = useState("");

  const addNew = (anecdote) => {
    anecdote.id = (Math.random() * 10000).toFixed(0);
    setAnecdotes(anecdotes.concat(anecdote));
    setNotification(`New Anecdote: ${anecdote.content} Has Been Created`);
    setTimeout(() => {
      setNotification("");
    }, 10000);
  };

  // const anecdoteById = (id) => anecdotes.find((a) => a.id === id);

  // const vote = (id) => {
  //   const anecdote = anecdoteById(id);

  //   const voted = {
  //     ...anecdote,
  //     votes: anecdote.votes + 1,
  //   };

  //   setAnecdotes(anecdotes.map((a) => (a.id === id ? voted : a)));
  // };

  return (
    <div>
      <h1>Software anecdotes</h1>

      <Router>
        <Menu />
        {notification}
        <Switch>
          <Route path="/about">
            <About />
          </Route>
          <Route path="/create">
            <CreateNew addNew={addNew} />
          </Route>
          <Route path="/anecdotes/:id">
            <SingleAnecdote anecdotes={anecdotes} />
          </Route>
          <Route path="/">
            <AnecdoteList anecdotes={anecdotes} />
          </Route>
        </Switch>
      </Router>

      <Footer />
    </div>
  );
};

export default App;
