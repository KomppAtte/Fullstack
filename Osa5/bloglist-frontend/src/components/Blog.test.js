import React from 'react'
import '@testing-library/jest-dom/extend-expect'
import { render, fireEvent } from '@testing-library/react'
import Blog from './Blog'

let blog = {
  title: 'Test blog creation',
  author: 'Test Author',
  url: 'www.kuukkeli.com',
  likes: 0,
  user: null
}

let mockHandler = jest.fn()

test('Renders content', () => {
  const component = render(
    <Blog blog={blog} blogUpvote={mockHandler}/>
  )

  expect(component.container).toHaveTextContent(
    'Test blog creation'
  )
})

test('clicking the button calls event handler once', async () => {
  const component = render(
    <Blog blog={blog} blogUpvote={mockHandler}/>
  )

  const button = component.getByText('View')
  fireEvent.click(button)

  const url = component.container.querySelector('url')
  const likes = component.container.querySelector('likes')

  expect(url).toBeDefined()
  expect(likes).toBeDefined()
})

test('Clicking the like button twice calls it twice', async () => {
  const component = render(
    <Blog blog={blog} blogUpvote={mockHandler}/>
  )
  const button = component.getByText('View')
  fireEvent.click(button)
  const likeButton = component.getByText('Like')
  fireEvent.click(likeButton)
  fireEvent.click(likeButton)
  expect(mockHandler.mock.calls).toHaveLength(2)
})