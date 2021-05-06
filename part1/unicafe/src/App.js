import React from 'react'


const App = () => {
  const course = 'Half Stack application development'
  const parts = [
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

  return (
    <div>
      <Header course={course} />
      <Content parts={parts}/>
      <Total parts={parts} />
    </div>
  )
}

const Header = (props) => {
  console.log(props)
  return(
      <h1>{props.course}</h1>
  )
}

const Content = (props) => {
  console.log(props)

  const Part = (props) => {
    return(
      <p>
        {props.part} {props.exercises}
      </p>
    )
  }

  return(
    <>
      <Part part={props.parts[0].name} exercises={props.parts[0].exercises}/>
      <Part part={props.parts[1].name} exercises={props.parts[1].exercises}/>
      <Part part={props.parts[2].name} exercises={props.parts[2].exercises}/>
    </>
  )
}

const Total = (props) => {
  console.log("debug")
  console.log(props)
  return(
    <p>Number of exercises {props.parts.map(p => p.exercises).reduce((a,b) => a+b)}</p>
    )
}

export default App;
