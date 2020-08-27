import React from 'react'
import { render, fireEvent } from '@testing-library/react'
import BlogForm from './BlogForm'

const newBlog = {
  title: 'Aga is the best',
  author: 'Everyone',
  url: 'is not needed'
}

test('Making new blog properly sends data to function', () => {
  const addNewBlog = jest.fn()
  const component = render(
    <BlogForm addNewBlog={addNewBlog} />
  )
  const form = component.container.querySelector('form')
  const authorInput = component.container.querySelector('#author')
  const titleInput = component.container.querySelector('#title')
  const urlInput = component.container.querySelector('#url')

  fireEvent.change(authorInput, {
    target: { value: newBlog.author }
  })
  fireEvent.change(titleInput, {
    target: { value: newBlog.title }
  })
  fireEvent.change(urlInput, {
    target: { value: newBlog.url }
  })
  fireEvent.submit(form)

  expect(addNewBlog.mock.calls[0][0]).toEqual(newBlog)
})