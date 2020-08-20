const blogsRouter = require('express').Router()
const jwt = require('jsonwebtoken')
const Blog = require('../models/blog')
const User = require('../models/user')

blogsRouter.get('', async (request, response) => {
  const blogs = await Blog.find({}).populate('user', { name: 1, username: 1, })
  response.json(blogs)
})

blogsRouter.post('', async (request, response) => {
  const { body, token } = request

  const decodedToken = jwt.verify(token, process.env.SECRET)
  const user = await User.findById(decodedToken.id)

  const blog = new Blog({
    title: body.title,
    author: body.author,
    url: body.url,
    likes: body.likes || 0,
    user: user._id,
  })
  const savedBlog = await blog.save()
  user.blogs = user.blogs.concat(savedBlog._id)
  await user.save()

  response.status(201).json(savedBlog)
})

blogsRouter.delete('/:id', async (req, res) => {
  const { token, params } = req

  const decodedToken = jwt.verify(token, process.env.SECRET)
  const blog = await Blog.findById(params.id)
  if (!blog) {
    return res.status(400).json({ error: 'blog not found' })
  }

  if (blog.user.toString() !== decodedToken.id) {
    return res.status(401).json({ error: 'only the creator of blog can delete it' })
  }
  await blog.delete()
  return res.status(204).end()
})

blogsRouter.put('/:id', async (req, res) => {
  const { body } = req
  const blog = {
    ...body
  }
  const updatedBlog = await Blog.findByIdAndUpdate(
    req.params.id, blog, { new: true, runValidators: true }
  )
  res.json(updatedBlog)
})

module.exports = blogsRouter