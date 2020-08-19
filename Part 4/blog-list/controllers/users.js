const usersRouter = require('express').Router()
const bcrypt = require('bcrypt')
const User = require('../models/user')

usersRouter.post('/', async (req, res) => {
  const { body } = req
  const saltRounds = 10
  if (!body.password || body.password.length < 4) {
    return res.status(400).json({ error: 'password length must be greater than 3' })
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
  const users = await User.find({})
  res.json(users)
})

module.exports = usersRouter