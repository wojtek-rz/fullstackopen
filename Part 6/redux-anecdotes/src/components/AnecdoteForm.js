import React from 'react'
import { useDispatch } from 'react-redux'
import { createAnecdote } from '../reducers/anecdoteReducer'
import { setNotification } from '../reducers/notifiationReducer'

const AnecdoteForm = () => {
  const dispatch = useDispatch()

  const handleNewAnecdote = async (event) => {
    event.preventDefault()
    const anecdoteContent = event.target.anecdote.value
    event.target.anecdote.value = ''
    
    dispatch(createAnecdote(anecdoteContent))
    dispatch(setNotification(`You added '${anecdoteContent}'`, 5))
  }
  return (
    <form onSubmit={handleNewAnecdote}>
      <div><input name="anecdote"/></div>
      <button type="submit">create</button>
    </form>
  )
}

export default AnecdoteForm