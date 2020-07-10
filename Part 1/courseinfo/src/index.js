import React from 'react'
import ReactDOM from 'react-dom'

const Header = (props) => (
  <div>
    <h1>{props.name}</h1>
  </div>
)

const Part = (props) => (
  <>
    <p>{props.name} {props.exercises}</p>
  </>
)

const Content = (props) => (
  <div>
    <Part name={props.parts.part1} exercises={props.exercises.exercises1} />
    <Part name={props.parts.part2} exercises={props.exercises.exercises2} />
    <Part name={props.parts.part3} exercises={props.exercises.exercises3} />
  </div>
)

const Total = (props) => (
  <div>
    <p>Number of exercises {props.total}</p>
  </div>
)

const App = () => {
  const course = 'Half Stack application development'
  const part1 = 'Fundamentals of React'
  const exercises1 = 10
  const part2 = 'Using props to pass data'
  const exercises2 = 7
  const part3 = 'State of a component'
  const exercises3 = 14

  const parts = {
    part1,
    part2,
    part3,
  }
  const exercises = {
    exercises1,
    exercises2,
    exercises3,
  }

  return (
    <div>
      <Header name={course}/>
      <Content parts={parts} exercises={exercises}/>
      <Total total={exercises3 + exercises2 + exercises1}/>
    </div>
  )
}

ReactDOM.render(<App />, document.getElementById('root')) 