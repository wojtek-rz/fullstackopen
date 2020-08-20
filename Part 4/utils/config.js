/* eslint-disable prefer-const */
require('dotenv').config()

let { MONGODB_URI, PORT, TEST_MONGODB_URI } = process.env

if (process.env.NODE_ENV === 'test') {
  MONGODB_URI = TEST_MONGODB_URI
}

module.exports = {
  PORT, MONGODB_URI
}