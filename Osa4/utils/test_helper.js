const Blog = require("../models/blog")

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

  module.exports = {
    initialBlogs,
    allBlogs
  }