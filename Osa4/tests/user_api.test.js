const supertest = require("supertest")
const mongoose = require("mongoose")
const helper = require("../utils/test_helper")
const app = require("../app")
const api = supertest(app)
const bcrypt = require("bcrypt")
const User = require('../models/user')


describe('when there is one user at database', () => {
    beforeEach(async () => {
      await User.deleteMany({})
  
      const passwordHash = await bcrypt.hash('sekret', 10)
      const user = new User({ username: 'root', passwordHash })
  
      await user.save()
    })
  
describe('adding new users', () => {
    test('creation succeeds with a username that does not exist', async () => {
        const usersAtStart = await helper.usersInDb()
    
        const newUser = {
          username: 'juuseri',
          name: 'Juuso Esteri',
          password: 'salasana',
        }
    
        await api
          .post('/api/users')
          .send(newUser)
          .expect(200)
          .expect('Content-Type', /application\/json/)
    
        const usersAtEnd = await helper.usersInDb()
        expect(usersAtEnd).toHaveLength(usersAtStart.length + 1)
    
        const usernames = usersAtEnd.map(u => u.username)
        expect(usernames).toContain(newUser.username)
    })

    test('creating a new user with too short username fails', async () => {
        const usersAtStart = await helper.usersInDb()
    
        const newUser = {
          username: 'ro',
          name: 'Roope',
          password: 'siikret',
        }
    
        const result = await api
          .post('/api/users')
          .send(newUser)
          .expect(400)
          .expect('Content-Type', /application\/json/)
    
        expect(result.body.error).toContain('Username must be longer than 3 characters')
    
        const usersAtEnd = await helper.usersInDb()
        expect(usersAtEnd).toHaveLength(usersAtStart.length)
    })

    test('creating a new user with too short password fails', async () => {
        const usersAtStart = await helper.usersInDb()
    
        const newUser = {
          username: 'roopert',
          name: 'Roope',
          password: 'si',
        }
    
        const result = await api
          .post('/api/users')
          .send(newUser)
          .expect(400)
          .expect('Content-Type', /application\/json/)
    
        expect(result.body.error).toContain('Password must be longer than 3 characters')
    
        const usersAtEnd = await helper.usersInDb()
        expect(usersAtEnd).toHaveLength(usersAtStart.length)
    })
})
})
  
  afterAll(() => {
    mongoose.connection.close()
  })