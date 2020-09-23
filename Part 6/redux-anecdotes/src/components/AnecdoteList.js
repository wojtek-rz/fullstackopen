import React from 'react'
import { connect } from 'react-redux'
import { voteFor } from '../reducers/anecdoteReducer'
import { setNotification } from '../reducers/notifiationReducer'

const AnecdoteList = (props) => {
  const pureAnecdotes = props.anecdotes
  const filter = props.filter
  const anecdotes = [...pureAnecdotes]
    .sort((a, b) => (a.votes <= b.votes ? 1 : -1))
    .filter((o) => o.content.toLowerCase().includes(filter.toLowerCase()))

  const vote = ({ id, content }) => {
    props.voteFor(id)
    props.setNotification(`You voted '${content}'`, 5)
  }
  
  return (
    <div>
      {anecdotes.map(anecdote =>
        <div key={anecdote.id}>
          <div>
            {anecdote.content}
          </div>
          <div>
            has {anecdote.votes}
            <button onClick={() => vote(anecdote)}>vote</button>
          </div>
        </div>
      )}
    </div>
  )
}

const mapStateToProps = (state) => {
  console.log(state)
  return {
    anecdotes: state.anecdotes,
    filter: state.filter,
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    voteFor: (value) => {
      dispatch(voteFor(value))
    },
    setNotification: (value, time) => {
      dispatch(setNotification(value, time))
    }
  }
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(AnecdoteList)