import React, { useState } from 'react'

const Button = (props) => {
  const {text, handleClick} = props
  return (
    <button onClick={handleClick}>{text}</button>
  )
}

const Statistics = (props) => {
  const {label, value} = props
  return (
  <div>
    {label} {value}
  </div>
  )
}

const App = () => {
  // save clicks of each button to its own state
  const [good, setGood] = useState(0)
  const [neutral, setNeutral] = useState(0)
  const [bad, setBad] = useState(0)

  const all = good + neutral + bad
  const average = (good - bad) / all
  const positive = good / all

  return (
    <div>
      <h1>give feedback</h1>
      <Button handleClick={() => setGood(good + 1)} text="good" />
      <Button handleClick={() => setNeutral(neutral + 1)} text="neutral" />
      <Button handleClick={() => setBad(bad + 1)} text="bad" />
      <h1>statistics</h1>
      <Statistics label="good" value={good} />
      <Statistics label="neutral" value={neutral} />
      <Statistics label="bad" value={bad} />
      <Statistics label="all" value={all} />
      <Statistics label="average" value={average} />
      <Statistics label="positive" value={positive * 100 + " %"} /> {/* 数字と文字列を足し合わせるのはこれでいいのだろうか */}
    </div>
  )
}

export default App