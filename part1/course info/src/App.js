import React, { useState } from "react"

const Hello = (props) => {
  const bornYear = () => {
    const yearNow = new Date().getFullYear()
    return yearNow - props.age
  }
  return (
    <div>
      <p>
        Hello {props.name}, you are {props.age} years old
      </p>
      <p>So you were probably born in {bornYear()}</p>
    </div>
  )
}

const App = () => {
  const name = 'Peter'
  const age = 10

  return (
    <div>
      <h1>Greetings</h1>
      <Hello name="Maya" age={26 + 10} />
      <Hello name={name} age={age} />
    </div>
  )
}

const Header = ({course}) => {
  return (
    <>
      <h1>{course.name}</h1>
    </>
  )
}

const Part = ({name, exercise}) => {
  return (
    <p>{name} {exercise}</p>
  )
}

const Content = ({course}) => {
  return (
    <>
      <Part name={course.parts[0].name} exercise={course.parts[0].exercises}/>
      <Part name={course.parts[1].name} exercise={course.parts[1].exercises}/>
      <Part name={course.parts[2].name} exercise={course.parts[2].exercises}/>
    </>
  )
}

const Total = ({course}) => {
  return (
    <>
      <p>Number of exercises {course.parts[0].exercises + course.parts[1].exercises + course.parts[2].exercises}</p>
    </>
  )
}

const App = () => {
  const course = {
    name: 'Half Stack application development',
    parts: [
      {
        name: 'Fundamentals of React',
        exercises: 10
      },
      {
        name: 'Using props to pass data',
        exercises: 7
      },
      {
        name: 'State of a component',
        exercises: 14
      }
    ]
  }
  
  return (
    <div>
      <Header course={course} />
      <Content course={course}/>
      <Total  course={course}/>
    </div>
  )
}

export default App;