import React, { useState } from 'react'

const Button = ({ clickHandler, text }) => {
  return (
    <button onClick={clickHandler}>{text}</button>
  )
}

const Statistics = ({ good, bad, neutral, total }) => {
  return (
    <>
      <Statistic text="good " value={good} />
      <Statistic text="neutral " value={neutral} />
      <Statistic text="bad " value={bad} />
      <Statistic text="all " value={total} />
      <Statistic text="average " value={total / 3} />
      <Statistic text="positive " value={total === 0 ? 0 : (good / total) * 100} />
    </>
  )
}

const Statistic = ({ text, value }) => {
  return (
      <table>
        <tbody>
          <tr>
            <td>{text}</td>
            <td>{value}</td>
          </tr>
        </tbody>
      </table>
  )
}

const App = () => {
  const [good, setGood] = useState(0)
  const [neutral, setNeutral] = useState(0)
  const [bad, setBad] = useState(0)

  const setGoodHandler = () => {
    setGood(good + 1)
  }

  const setNeutralHandler = () => {
    setNeutral(neutral + 1)
  }

  const setBadHandler = () => {
    setBad(bad + 1)
  }

  const total = good + bad + neutral

  return (
    <div>
      <h1>Give Feedback</h1>
      <Button clickHandler={setGoodHandler} text="good" />
      <Button clickHandler={setNeutralHandler} text="neutral" />
      <Button clickHandler={setBadHandler} text="bad" />

      <h2>Statistics: </h2>
      {total === 0 ? "No Feedback Given" :
        (<>
          <Statistics good={good} bad={bad} neutral={neutral} total={total} />
        </>
        )}
    </div>
  )
}

export default App

// <Statistics text="good: " score={good} />
// <Statistics text="neutral: " score={neutral} />
// <Statistics text="bad: " score={bad} />
// <Statistics text="all: " score={total} />
// <Statistics text="average: " score={(good * 1) + (bad * -1) + (neutral * 0)} />
// <Statistics text="positive: " score={total === 0 ? 0 : (good / total) * 100} />