import React, { useState, useEffect, useRef } from 'react'
import './App.css'
import Blog from './components/Blog'
import Notification from './components/Notification'
import blogService from './services/blogs'
import loginService from './services/login'
import LoginForm from './components/LoginForm'
import BlogForm from './components/BlogForm'
import Togglable from './components/Togglable'

const App = () => {
  const [blogs, setBlogs] = useState([])
  const [user, setUser] = useState(null)
  const notificationRef = useRef()

  useEffect(() => {
    blogService.getAll().then(blogs => {
      const sortedBlogs = blogs.sort((a, b) => (a.likes < b.likes ? 1 : -1))
      setBlogs( sortedBlogs )
    })
  }, [])

  useEffect(() => {
    const loggedUserJSON = window.localStorage.getItem('loggedBlogAppUser')
    if (loggedUserJSON) {
      const userObject = JSON.parse(loggedUserJSON)
      setUser(userObject)
      blogService.setToken(userObject.token)
    }
  }, [])

  const handleLogin = async (credentials) => {
    // credentials are { username, password }
    try {
      const currentUser = await loginService.login(credentials)
      setUser(currentUser)
      blogService.setToken(currentUser.token)
      window.localStorage.setItem('loggedBlogAppUser', JSON.stringify(currentUser))
      notificationRef.current.setSuccesNotification('Logged in!')
    } catch (error) {
      notificationRef.current.setErrorNotification('Wrong username or password')
    }
  }
  const addNewBlog = async (blogObject) => {
    // blogObject has { title, author, url}
    try {
      const returnedBlog = await blogService.create(blogObject)
      console.log('created new blog', returnedBlog)
      notificationRef.current.setSuccesNotification(`A new blog: "${returnedBlog.title}" by ${returnedBlog.author} has been created`)
      setBlogs(blogs.concat(returnedBlog))
    } catch (error) {
      notificationRef.current.setErrorNotification(error.response.data.error)
    }
  }
  const removeBlogFunc = (blogId) => {
    console.log(`deleting ${blogId}`)
    blogService.remove(blogId).then(() => {
      setBlogs(blogs.filter(b => b.id !== blogId))
    })
  }
  const handleNewLike = (blog) => {
    console.log('handle new like', blog.user.id)
    const newBlog = { ...blog, likes: blog.likes + 1, user: blog.user.id}
    blogService
      .update(blog.id, newBlog)
      .then(updatedBlog => {
        setBlogs(blogs.map(b => b.id === updatedBlog.id ? updatedBlog : b))
      })
  }
  const loggedIn = () => {
    const handleLogout = () => {
      setUser(null)
      window.localStorage.removeItem('loggedBlogAppUser')
    }
    return (
      <div style={{ marginBottom: '1em' }}>
        <label>{user.name} logged in</label>
        <button onClick={handleLogout}>logout</button>
      </div>
    )
  }

  if (user === null) {
    return (
      <div>
        <Notification ref={notificationRef} />
        <LoginForm
          handleLogin={handleLogin}
        />
      </div>
    )
  } else
    return (
      <div style={{ margin: '1em' }}>
        <h1>Blogs</h1>
        <Notification ref={notificationRef} />
        { loggedIn() }
        <Togglable buttonLabel={'new blog'}>
          <BlogForm addNewBlog={addNewBlog} />
        </Togglable>
        <div style={{ marginTop: '1em' }}>
          {blogs.map(blog =>
            <Blog key={blog.id}
              blog={blog}
              currentUser={user}
              removeBlogFunc={removeBlogFunc}
              handleNewLike={handleNewLike} />
          )}
        </div>
      </div>
    )
}

export default App