const Blog = require("../models/blog")
const User = require('../models/user')

const initialBlogs = [
    {
      title: "Testing Blogs",
      author: "Aku Ankka",
      url: "String",
      likes: 69
    },
    {
      title: "Blogs tested",
      author: "Minni Hiiri",
      url: "String",
      likes: 555
    }
  ]

const allBlogs = async () => {
    const blogs = await Blog.find({})
    return blogs.map(blog => blog.toJSON())
}

const usersInDb = async () => {
  const users = await User.find({})
  return users.map(u => u.toJSON())
}
  module.exports = {
    initialBlogs,
    allBlogs,
    usersInDb
  }