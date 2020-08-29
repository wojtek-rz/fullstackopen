import React, { useState } from 'react'
import PropTypes from 'prop-types'

const Blog = ({ blog, currentUser, removeBlogFunc, handleNewLike }) => {
  const [showDetails, setShowDetails] = useState('')

  const handleRemove = () => {
    if (window.confirm(`Remove '${blog.title}' by ${blog.author}`)) {
      removeBlogFunc(blog.id)
    }
  }

  return (
    <div className="blogDiv">
      <div style={{ fontSize: '1.05rem' }}>
        {blog.title} {blog.author}
        <button onClick={() => setShowDetails(!showDetails)} style={{ marginLeft: '.3em' }}>
          {showDetails ? 'hide' : 'show'}</button>
      </div>
      {showDetails && (
        <div style={{ marginTop: '.5em' }}>
          <div>{blog.url}</div>
          <div>
            likes {blog.likes}
            <button onClick={() => handleNewLike(blog)}>like</button>
          </div>
          <div>
            {blog.user.name}
          </div>
          {blog.user.username === currentUser.username && (
            <div><button onClick={handleRemove}>remove</button></div>
          )}
        </div>
      )}
    </div>
  )
}

Blog.propTypes = {
  blog: PropTypes.object.isRequired,
  currentUser: PropTypes.object.isRequired,
  removeBlogFunc: PropTypes.func.isRequired,
  handleNewLike: PropTypes.func.isRequired,
}

export default Blog