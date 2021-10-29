const express = require('express')
const app = express()
const cors = require('cors')
const config = require('./utils/config')
const logger = require('./utils/logger')
const blogsRouter = require('./controllers/blogs')
const mongoose = require('mongoose')

logger.info('Connecting: ', config.MONGODB_URI)

mongoose.connect(config.MONGODB_URI, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => {
    logger.info('connected to MongoDB')
  })
  .catch((error) => {
    logger.error('error connection to MongoDB:', error.message)
  })

  app.use(cors())
  app.use(express.static('build'))
  app.use(express.json())

  app.use('/api/blogs', blogsRouter)
  
  module.exports = app