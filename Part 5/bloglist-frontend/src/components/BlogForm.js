import React, { useState } from 'react'
import PropTypes from 'prop-types'

const LoginForm = ({ addNewBlog }) => {
  const [title, setTitle] = useState('')
  const [author, setAuthor] = useState('')
  const [url, setUrl] = useState('')

  const handleSubmit = (event) => {
    event.preventDefault()
    addNewBlog({ title, author, url })
    setTitle('')
    setAuthor('')
    setUrl('')
  }

  return (
    <div>
      <h2>add a new blog</h2>
      <form onSubmit={handleSubmit} autoComplete="off">
        <div>
          <label htmlFor="title">title</label>
          <input
            name="title"
            type="text"
            value={title}
            onChange={({ target }) => setTitle(target.value)}
          />
        </div>
        <div>
          <label htmlFor="author">author</label>
          <input
            name="author"
            type="text"
            value={author}
            onChange={({ target }) => setAuthor(target.value)}
          />
        </div>
        <div>
          <label htmlFor="url">url</label>
          <input
            name="url"
            type="text"
            value={url}
            onChange={({ target }) => setUrl(target.value)}
          />
        </div>
        <button type="submit">Create</button>
      </form>
    </div>
  )
}

LoginForm.propTypes = {
  addNewBlog: PropTypes.func.isRequired
}

export default LoginForm