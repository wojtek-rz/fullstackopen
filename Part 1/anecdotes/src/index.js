import React, { useState } from 'react'
import ReactDOM from 'react-dom'

const Button = ({text, action}) => {
  return (
    <button onClick={action}>
      {text}
    </button>
  )
}

const DisplayVotes = ({votes}) => {
  return <p>has {votes} votes</p>
}

const calc_max_index = (numbers) => {
  let max = numbers[0]
  let max_index = 0
  numbers.forEach((number, index) => {
    if (number > max) {
      max = number
      max_index = index
    }
  })

  return max_index
}

const App = ({anecdotes}) => {
  const [selected, setSelected] = useState(0)
  const [allVotes, setAllVotes] = useState(Array.from(Array(anecdotes.length), () => 0))
  const max_index = calc_max_index(allVotes)

  const nextAnecdote = () => {
    console.log(selected)
    return setSelected( Math.floor( Math.random() * anecdotes.length ))
  }
  const addVote = () => {
    const copy = [...allVotes];
    copy[selected] += 1
    setAllVotes(copy)
  }

  return (
    <div> 
      <h1>Anecdote of the day</h1>
      <div>{anecdotes[selected]}</div>
      <DisplayVotes votes={allVotes[selected]} /> 
      <Button text='vote' action={addVote} />
      <Button text='next anecdote' action={nextAnecdote} />
      <h1>Anecdote with most votes</h1>
      <div>{anecdotes[max_index]}</div>
      <DisplayVotes votes={allVotes[max_index]} />
    </div>
  )
}

const anecdotes = [
  'If it hurts, do it more often',
  'Adding manpower to a late software project makes it later!',
  'The first 90 percent of the code accounts for the first 90 percent of the development time...The remaining 10 percent of the code accounts for the other 90 percent of the development time.',
  'Any fool can write code that a computer can understand. Good programmers write code that humans can understand.',
  'Premature optimization is the root of all evil.',
  'Debugging is twice as hard as writing the code in the first place. Therefore, if you write the code as cleverly as possible, you are, by definition, not smart enough to debug it.'
]

ReactDOM.render(
  <App anecdotes={anecdotes} />,
  document.getElementById('root')
)