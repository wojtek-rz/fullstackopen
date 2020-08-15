const logger = require('./logger')

const requestLogger = (req, res, next) => {
  logger.info('METHOD:', req.method)
  logger.info('PATH:', req.path)
  logger.info('BODY:', req.body)
  logger.info('---')

  next()
}

const unknownEndpoint = (req, res) => {
  res.json({ error: 'unknown endpoint' })
}

module.exports = { requestLogger, unknownEndpoint }