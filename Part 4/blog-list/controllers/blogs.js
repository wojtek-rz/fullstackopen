const blogsRouter = require('express').Router()
const Blog = require('../models/blog')

blogsRouter.get('', async (request, response) => {
  const blogs = await Blog.find({})
  response.json(blogs)
})

blogsRouter.post('', async (request, response) => {
  const { body } = request

  const blog = new Blog({
    ...body,
    likes: body.likes || 0
  })

  const savedBlog = await blog.save()
  response.status(201).json(savedBlog)
})

blogsRouter.delete('/:id', async (req, res) => {
  const message = await Blog.findByIdAndRemove(req.params.id)
  console.log(JSON.stringify(message))
  if (message) {
    res.status(204).end()
  } else { res.status(404).end() }
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