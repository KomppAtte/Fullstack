const blogsRouter = require('express').Router()
const { response } = require('express')
const { request } = require('../app')
const Blog = require('../models/blog')
const User = require('../models/user')
const jwt = require('jsonwebtoken')

blogsRouter.get('/', async (request, response) => {
  const blogs = await Blog.find({}).populate('user', { username: 1, name: 1 })
  response.json(blogs.map(blog => blog.toJSON()))
})

blogsRouter.post( '/', async (request, response ) => {
  const body = request.body
  const decodedToken = jwt.verify(request.token, process.env.SECRET)
  if ( !decodedToken.id ) {
    return response.status(401).json({ error: 'invalid token' })
  }
  const user = await User.findById( decodedToken.id )

  const blog = new Blog({
    title: body.title,
    author: body.author,
    url: body.url,
    likes: body.likes === null || undefined ? 0 : body.likes,
    user: user.id
  })

  if( !body.title || !body.url) {
    response.status(400).end()
  } else {
    const savedBlog = await blog.save()
    response.json(savedBlog.toJSON())
  }
})

blogsRouter.get( "/:id", async ( request, response ) => {
  const blog = await Blog.findById(request.params.id)
  if ( blog ) {
    response.json(blog.toJSON())
  } else {
    response.status(404).end()
  }
})

blogsRouter.delete("/:id", async (request, response) => {
  const decodedToken = jwt.verify(request.token, process.env.SECRET)

  if( !decodedToken.id ) {
    return response.status(401).json({ error: 'invalid token' } )
  }

  const userId = decodedToken.id
  const blog = await Blog.findById(request.params.id)
  console.log(blog)

  if ( blog.user.toString() === userId.toString() ) {
    await Blog.findByIdAndDelete(request.params.id)
    response.status(204).end()
  } else {
    return response.status(401).json({ error: 'invalid token, can`t delete others blogs'})
  }
})

blogsRouter.put( '/:id', (request, response, next ) => {
  const body = request.body

  const blog = {
    url: body.url,
    likes: body.likes
  }

  Blog.findByIdAndUpdate(request.params.id, blog, { new: true })
    .then(updatedBlog => {
      response.json(updatedBlog.toJSON())
    })
    .catch(error => next(error))
})

module.exports = blogsRouter