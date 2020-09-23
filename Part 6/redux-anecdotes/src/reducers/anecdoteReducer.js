import anecdoteService from '../services/anecdote'

const reducer = (state = [], action) => {
  // console.table(state)
  // console.log(action)
  switch (action.type) {
    case 'VOTE':
      return state.map((o) => (
        o.id === action.data.id
        ? { ...action.data }
        : { ...o }
      ))
    case 'ADD_ANECDOTE':
      return [...state, action.data]
    case 'INIT_ANECDOTES':
      return action.anecdotes
    default: return state
  }
}

export const voteFor = (id) => {
  return async dispatch => {
    const currentAnecdote = await anecdoteService.getOne(id)
    const updatedAnecdote = await anecdoteService.update({...currentAnecdote, votes: currentAnecdote.votes + 1 })
    dispatch({
      type: 'VOTE',
      data: updatedAnecdote
    })
  }
}

export const createAnecdote = (content) => {
  return async dispatch => {
    const newAnecdote = await anecdoteService.createNew(content)
    dispatch({
      type: 'ADD_ANECDOTE',
      data: newAnecdote,
    })
  }
}

export const initializeAnecdotes = () => {
  return async dispatch => {
    const anecdotes = await anecdoteService.getAll()
    dispatch({
      type: 'INIT_ANECDOTES',
      anecdotes,
    })
  }
}

export default reducer