/* eslint-disable consistent-return */
const logger = require('./logger')

const requestLogger = (req, res, next) => {
  logger.info('METHOD:', req.method)
  logger.info('PATH:', req.path)
  logger.info('BODY:', req.body)
  logger.info('---')

  next()
}

const unknownEndpoint = (req, res) => {
  res.status(404).json({ error: 'unknown endpoint' })
}

const errorHandler = (error, req, res, next) => {
  logger.error(error.name, ' : ', error.message)

  if (error.name === 'ValidationError') {
    return res.status(400).send({ error: error.message })
  } if (error.name === 'JsonWebTokenError') {
    return res.status(401).send({ error: error.message })
  } if (error.name === 'CastError') {
    return res.status(400).send({ error: 'malformatted id' })
  }

  next(error)
}

const tokenExtractor = (req, res, next) => {
  const authorization = req.get('authorization')
  if (authorization && authorization.toLowerCase().startsWith('bearer ')) {
    req.token = authorization.substring(7)
  } else {
    req.token = null
  }

  next()
}

module.exports = {
  requestLogger,
  unknownEndpoint,
  errorHandler,
  tokenExtractor
}