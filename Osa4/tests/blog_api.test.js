const supertest = require("supertest")
const mongoose = require("mongoose")
const helper = require("../utils/test_helper")
const app = require("../app")
const api = supertest(app)

const Blog = require('../models/blog')

beforeEach(async () => {
    await Blog.deleteMany({})
    await Blog.insertMany(helper.initialBlogs)
  })

describe('when there is some blogs saved', () => {
    test('blogs are returned as json', async () => {
      await api
        .get('/api/blogs')
        .expect(200)
        .expect('Content-Type', /application\/json/)
    })
  
    test('all blogs are returned', async () => {
      const response = await api.get('/api/blogs')
  
      expect(response.body).toHaveLength(helper.initialBlogs.length)
    })
  
    test('a specific note is within the returned blogs', async () => {
      const response = await api.get('/api/blogs')
  
      const contents = response.body.map(r => r.title)
  
      expect(contents).toContain(
        "Testing Blogs"
      )
    })
})

describe("Blogs identifier is id", () => {
    test("id identifies blogs", async () => {
        const response = await helper.allBlogs()

        const oneBlog = response[0]

        const blogsResponse = await api
            .get(`/api/blogs/${oneBlog.id}`)
            .expect(200)
            .expect('Content-Type', /application\/json/)

        expect(blogsResponse.body.id).toBeDefined()
    })
})

describe('adding a new blog', () => {
    test('succeeds and count rises by one and likes included', async () => {
      const newBlog = {
        title: "Adding a new blog tested",
        author: "Iines Ankka",
        url: "www.kuukkeli.com",
        likes: 123
      }
  
      await api
        .post('/api/blogs')
        .send(newBlog)
        .expect(200)
        .expect('Content-Type', /application\/json/)
  
  
      const blogsAtEnd = await helper.allBlogs()
      expect(blogsAtEnd).toHaveLength(helper.initialBlogs.length + 1)
  
      const titles = blogsAtEnd.map(n => n.title)
      expect(titles).toContain(
        "Adding a new blog tested"
      )
    })
    test('succeeds and count rises by one and without likes -> likes = 0', async () => {
        const newBlog = {
          title: "Adding a new blog tested",
          author: "Iines Ankka",
          url: "www.kuukkeli.com",
          likes: null
        }
    
        await api
          .post('/api/blogs')
          .send(newBlog)
          .expect(200)
          .expect('Content-Type', /application\/json/)
    
    
        const blogsAtEnd = await helper.allBlogs()
        expect(blogsAtEnd).toHaveLength(helper.initialBlogs.length + 1)
    
        const lastBlog = blogsAtEnd[blogsAtEnd.length - 1]
        expect(lastBlog.likes).toBe(0)
      }) 

    test('fails when title is not set', async () => {
        const newBlog = {
            author: "Iines Ankka",
            url: "www.kuukkeli.com",
            likes: null
          }
      
          await api
            .post('/api/blogs')
            .send(newBlog)
            .expect(400)      
      
          const blogsAtEnd = await helper.allBlogs()
          expect(blogsAtEnd).toHaveLength(helper.initialBlogs.length)
    })
})

describe("Deleting blog", () => {
    test('succeeds with status code 204 if deleting is succeeded', async () => {
        const blogsAtStart = await helper.allBlogs()
        const blogToDelete = blogsAtStart[0]
    
        await api
          .delete(`/api/blogs/${blogToDelete.id}`)
          .expect(204)
    
        const blogsAtEnd = await helper.allBlogs()
    
        expect(blogsAtEnd).toHaveLength(
          helper.initialBlogs.length - 1
        )
    
        const titles = blogsAtEnd.map(r => r.title)
    
        expect(titles).not.toContain(blogToDelete.title)
      })
})


afterAll(() => {
    mongoose.connection.close()
})