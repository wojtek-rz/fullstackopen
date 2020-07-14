import React, { useState } from 'react';
import ReactDOM from 'react-dom';

const Statistic = ({text, counter}) => {
  return (
    <tr>
      <td>{text}</td>
      <td>{counter}</td>
    </tr>
  )
}

const Button = ({text, handleClick}) => {
  return (
    <button onClick={handleClick}>
      {text}
    </button>
  )
}

const Statistics = ({good, neutral, bad}) => {
  const sum = good + neutral + bad
  const average = ( (good - bad)/sum ).toFixed(2)
  const positive = ( (good / sum * 100).toFixed(1)) + ' %'

  if (sum === 0) {
    return (
      <div>No feedback given</div>
    )
  }

  return (
    <table>
      <tbody>
        <Statistic text='good' counter={good} />
        <Statistic text='neutral' counter={neutral} />
        <Statistic text='bad' counter={bad} />
        <Statistic text='all' counter={ sum } />
        <Statistic text='average' counter={ average } />
        <Statistic text='positive' counter={ positive } />
      </tbody>
    </table>
  )
}

const App = () => {
  // save clicks of each button to own state
  const [good, setGood] = useState(0)
  const [neutral, setNeutral] = useState(0)
  const [bad, setBad] = useState(0)

  const handleGood = () => setGood(good + 1)
  const handleNeutral = () => setNeutral(neutral + 1)
  const handleBad = () => setBad(bad + 1)


  return (
    <div>
      <h1>give feedback</h1>
      <Button text='good' handleClick={handleGood} />
      <Button text='neutral' handleClick={handleNeutral} />
      <Button text='bad' handleClick={handleBad} />
      <h1>statistics</h1>
      <Statistics good={good} neutral={neutral} bad={bad} />
    </div>
  )
}

ReactDOM.render(
  <App />,
  document.getElementById('root')
);
