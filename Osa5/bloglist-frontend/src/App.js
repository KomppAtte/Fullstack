import React, { useState, useEffect, useRef } from 'react'
import Blog from './components/Blog'
import blogService from './services/blogs'
import loginService from './services/login' 
import Notification from './components/Notification'
import LoginForm from './components/LoginForm'
import BlogForm from './components/BlogForm'
import Togglable from './components/Togglable'

const App = () => {
  const [blogs, setBlogs] = useState([])
  const [newBlog, setNewBlog] = useState('')
  const [username, setUsername] = useState('uusi') 
  const [password, setPassword] = useState('testis')
  const [errorMessage, setErrorMessage] = useState(null)
  const [style, setStyle] = useState(null)
  const [user, setUser] = useState(null)

  useEffect(() => {
    blogService.getAll().then(blogs =>
      setBlogs( blogs )
    )  
  }, [])

  useEffect(() => {
    const loggedUserJSON = window.localStorage.getItem('loggedBlogappUser')
    if (loggedUserJSON) {
      const user = JSON.parse(loggedUserJSON)
      setUser(user)
      blogService.setToken(user.token)
    }
  }, [])

  const blogFormRef = useRef()

  const loginForm = () => (
    <Togglable buttonLabel='log in'>
      <LoginForm
        username={username}
        password={password}
        handleUsernameChange={({ target }) => setUsername(target.value)}
        handlePasswordChange={({ target }) => setPassword(target.value)}
        handleSubmit={handleLogin}
      />
    </Togglable>   
  )

  const handleLogin = async (event) => {
    event.preventDefault()
    try {
      const user = await loginService.login({
        username, password,
      })

      window.localStorage.setItem(
        'loggedBlogappUser', JSON.stringify(user)
      )
      blogService.setToken(user.token)
      setUser(user)
      setUsername('')
      setPassword('')
    } catch ( exception ) {
      setErrorMessage('Wrong username or password')
      setStyle('error')
      setTimeout(() => {
        setErrorMessage(null)
        setStyle(null)
      }, 6000 )
    }
  }

  const addBlog = (blogObject) => {
    blogFormRef.current.toggleVisibility()

    blogService
      .create(blogObject)
      .then(response => {
        setBlogs(blogs.concat(response))
        setErrorMessage(`New blog ${blogObject.title} added by author ${blogObject.author}`)
        setStyle('success')
        setTimeout(() => {
          setErrorMessage(null)
          setStyle(null)
        }, 6000 )
      })
      .catch(error => {
        setErrorMessage(`Validation failed: ${error.response.data.error}`)
        setStyle('error')
        setTimeout(() => {
          setErrorMessage(null)
          setStyle(null)
        }, 6000 )
        console.log(error.response.data)
      })
  }

  const handleLogout = () => {
    window.localStorage.removeItem('loggedBlogappUser')
    window.location.reload()
  }

  const blogForm = () => (
    <Togglable buttonLabel='Add new blog' ref={blogFormRef}>
      <BlogForm createBlog={addBlog}/>
    </Togglable>
  )

  return (
    <div>
      <h2>Blogs</h2>
      <Notification message={errorMessage} style={style} />

      {user === null ?
        loginForm() :
        <div>
          <p>{user.name} logged in
          <button onClick={handleLogout}> logout 
          </button>
          </p>
          <div>
            <h2> Create New </h2>
            {blogForm()}
          </div>
          {blogs.map(blog =>
              <Blog key={blog.id} blog={blog} />
            )}
        </div>
      }
    </div>
  )
}

export default App