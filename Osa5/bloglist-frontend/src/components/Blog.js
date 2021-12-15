import React, { useState } from 'react'

const Blog = ( { blog, blogUpvote } ) => {
  const [ showAllInfos, changeShowAll ] = useState(false)

  const likeBlog = (event) => {
    event.preventDefault()
    blogUpvote(blog.id, {
      id: blog.id,
      user: (blog.user === null ?
        '' :
        blog.user),
      likes: blog.likes + 1,
      author: blog.author,
      title: blog.title,
      url: blog.url
    })
  }

  const blogInfo = () => (
    <div>
      <div>
        { blog.url }
      </div>
      <div>
        { blog.likes } <button onClick={ likeBlog }>Like</button>
      </div>
    </div>
  )

  return (
    <div>
      { blog.title } { blog.author } <button onClick={ () => changeShowAll(!showAllInfos) }>
        { showAllInfos ? 'Hide' : 'View' }
      </button>
      { showAllInfos ? blogInfo() : '' }
    </div>
  )
}

export default Blog