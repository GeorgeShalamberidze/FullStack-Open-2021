import React, { useState } from 'react'

const App = () => {
  const anecdotes = [
    'If it hurts, do it more often',
    'Adding manpower to a late software project makes it later!',
    'The first 90 percent of the code accounts for the first 90 percent of the development time...The remaining 10 percent of the code accounts for the other 90 percent of the development time.',
    'Any fool can write code that a computer can understand. Good programmers write code that humans can understand.',
    'Premature optimization is the root of all evil.',
    'Debugging is twice as hard as writing the code in the first place. Therefore, if you write the code as cleverly as possible, you are, by definition, not smart enough to debug it.'
  ]
  const [selected, setSelected] = useState(anecdotes.length)
  const [vote, setVote] = useState([0, 0, 0, 0, 0, 0])
  const [counter, setCounter] = useState(0);
  const copy = [...vote]

  const random = () => {
    setSelected(Math.floor(Math.random() * anecdotes.length))
  }

  const voting = () => {
    copy[selected] += 1
    setVote(copy)
  }

  const ad = () => {
    setCounter(counter + 1)
    random()
  }

  const indexOfMaxVoted = copy.indexOf(Math.max(...copy))
  console.log('selected is ...', selected)
  console.log([...vote])
  console.log(indexOfMaxVoted)
  if (counter === 0) {
    return (
      <>
        <h2>Generate Quotes by Clicking the button</h2>
        <button onClick={() => ad()}>Start Generating</button>
      </>
    )
  }
  else {
    return (
      <div>
        <h1>Anectode of the day: </h1>
        
        <h3><em>{anecdotes[selected]}</em></h3>
        <p>has <strong>{copy[selected]}</strong> votes</p>

        <br />

        <button onClick={() => voting()}>Vote</button>
        <button onClick={() => random()}>Next Anectode</button>

        <h1>Anecdote with most votes: </h1>
        <h3><em>{anecdotes[indexOfMaxVoted]}</em></h3>
        <p>has <strong>{Math.max(...vote)}</strong> votes</p>
      </div>
    )
  }
}

export default App