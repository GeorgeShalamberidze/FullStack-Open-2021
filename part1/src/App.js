import React from "react"

const Hello = (props) => {
  console.log(props)
  return (
    <div>
      <p>Hello {props.name}</p>
    </div>
  )
}

const App = () => {
  const now = new Date()
  const a = 10
  const b = 20
  return (
    <div>
      <p>Hey, its {now.toString()}</p>
      <p>Hello there</p>
      <p>
        {a} plus {b} is {a + b}
      </p>
      <Hello name="George"/>
    </div>
  )
}


export default App;
