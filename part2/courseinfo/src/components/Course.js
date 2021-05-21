import React from 'react'

const Header = ({ course }) => {
  return (
    <h1>{course.name}</h1>
  )
}

const Total = ({ course }) => {
  const sum = course.parts.map(part => part.exercises).reduce((a,b)=>a+b)
  return(
    <p><b>total of {sum} exercises</b></p>
  ) 
}

const Part = (props) => {
  return (
    <p>
      {props.part.name} {props.part.exercises}
    </p>    
  )
}

const Content = ({ course }) => {
  return (
    <div>
      {course.parts.map(part => <Part part={part} />)}
    </div>
  )
}

const Course = (props) => {
  const {course} = props

  return(
  <div>
    <Header course={course} />
    <Content course={course} />
    <Total course={course} />
  </div>
  )
}

export default Course