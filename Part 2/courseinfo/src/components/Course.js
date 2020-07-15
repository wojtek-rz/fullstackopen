import React from 'react'

const Header = ({ course }) => {
  return (
    <h3>{course.name}</h3>
  )
}

const Total = ({ course }) => {
  const sum = course.parts.reduce( (sum, part) => (sum + part.exercises), 0) 
  return(
    <p><b>Total of {sum} exercises</b></p>
  ) 
}

const Part = ({part}) => {
  return (
    <li>
      {part.name}: {part.exercises}
    </li> 
  )
}

const Content = ({ course }) => {
  return (
    <div>
      <ul>
        {course.parts.map( (part) => 
          <Part part={part} key={part.id} />
        )}
      </ul>
    </div>
  )
}

const Course = ({course}) => {

  return (
    <div>
      <Header course={course} />
      <Content course={course} />
      <Total course={course} />
    </div>
  )
}

export default Course