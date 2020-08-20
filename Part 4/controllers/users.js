const usersRouter = require('express').Router()
const bcrypt = require('bcrypt')
const User = require('../models/user')

usersRouter.post('/', async (req, res) => {
  const { body } = req
  const saltRounds = 10
  if (!body.password || body.password.length < 3) {
    return res.status(400).json({ error: 'password wasnt provided or length was too short (min 3 char)' })
  }
  const passwordHash = await bcrypt.hash(body.password, saltRounds)

  const user = new User({
    name: body.name,
    username: body.username,
    passwordHash
  })

  const returnedUser = await user.save()
  return res.json(returnedUser)
})

usersRouter.get('/', async (req, res) => {
  const users = await User.find({}).populate('blogs', { url: 1, title: 1, author: 1 })
  res.json(users)
})

module.exports = usersRouter