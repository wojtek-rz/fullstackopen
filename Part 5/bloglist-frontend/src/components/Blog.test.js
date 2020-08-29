import React from 'react'
import { render, fireEvent, cleanup } from '@testing-library/react'
import '@testing-library/jest-dom/extend-expect'
import Blog from './Blog'

const blog = {
  title: 'Precz z moich oczu',
  author: 'Adam Mickiewicz',
  url: 'www.wikipedia.org',
  likes: 1025,
  user: { name: 'Josef' }
}

afterEach(() => {
  cleanup()
})

test('by default blog displays title and author, but not url and likes', () => {
  const component = render(
    <Blog blog={blog} currentUser={{}} removeBlogFunc={() => (0)} handleNewLike={() => (0)}/> )
  const div = component.container.querySelector('.blogDiv')
  expect(div).toHaveTextContent(blog.title)
  expect(div).toHaveTextContent(blog.author)
  expect(div).not.toHaveTextContent(blog.url)
  expect(div).not.toHaveTextContent(blog.likes.toString())

})

test('when button clicked Blog displays url and likes', () => {
  const component = render(
    <Blog blog={blog} currentUser={{}} removeBlogFunc={() => (0)} handleNewLike={() => (0)}/> )
  const div = component.container.querySelector('.blogDiv')
  fireEvent.click(component.getByText('show'))

  expect(div).toHaveTextContent(blog.url)
  expect(div).toHaveTextContent(blog.likes.toString())
})

test('when like button is clicked, mock function is called', () => {
  const likeBlog = jest.fn()
  let componen = render(
    <Blog blog={blog} currentUser={{}} removeBlogFunc={() => (0)} handleNewLike={likeBlog} />
  )
  fireEvent.click(componen.getByText('show'))
  fireEvent.click(componen.getByText('like'))
  fireEvent.click(componen.getByText('like'))

  expect(likeBlog.mock.calls).toHaveLength(2)
})