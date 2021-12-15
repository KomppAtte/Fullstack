import React, { useState } from 'react'
const Blog = ( { blog } ) => {
  const [ showAllInfos, changeShowAll ] = useState(false)

  const blogInfo = () => (
    <div>
      <div>
        { blog.url }
      </div>
      <div>
        { blog.likes } <button onClick={ '' }>Like</button>
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