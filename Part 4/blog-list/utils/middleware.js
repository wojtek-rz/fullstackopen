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
  }

  next(error)
}

module.exports = {
  requestLogger,
  unknownEndpoint,
  errorHandler
}