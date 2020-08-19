const supertest = require('supertest')
const mongoose = require('mongoose')
const bcrypt = require('bcrypt')
const app = require('../app')
const Blog = require('../models/blog')
const User = require('../models/user')
const helper = require('./test_helper')

const api = supertest(app)

beforeEach(async () => {
  await Blog.deleteMany({})

  const blogObjects = helper.initialBlogs.map((blog) => new Blog(blog))
  const promiseArray = blogObjects.map((blog) => blog.save())
  await Promise.all(promiseArray)
})

describe('Notes operations: ', () => {
  test('blogs are returned as JSON', async () => {
    await api
      .get('/api/blogs')
      .expect(200)
      .expect('Content-Type', /application\/json/)
  })

  test('api returns correct amount of blogs', async () => {
    const response = await api.get('/api/blogs')
    const blogs = response.body

    expect(blogs).toHaveLength(helper.initialBlogs.length)
  })

  test("blog has id property under 'id'", async () => {
    const response = await api.get('/api/blogs')
    const blogs = response.body

    expect(blogs[0].id).toBeDefined()
  })

  test('api properly adds new blog', async () => {
    const blog = {
      title: 'About Whisper of the Heart',
      author: 'Hayao Miyazaki',
      url: 'https://en.wikipedia.org/wiki/Whisper_of_the_Heart',
    }

    await api
      .post('/api/blogs')
      .send(blog)
      .expect(201)
      .expect('Content-Type', /application\/json/)

    const currentBlogs = await helper.blogsInDb()
    expect(currentBlogs).toHaveLength(helper.initialBlogs.length + 1)
    expect(currentBlogs.map((b) => b.url)).toContain('https://en.wikipedia.org/wiki/Whisper_of_the_Heart')
  })

  test('when missing likes property, api sets it to zero', async () => {
    const blog = {
      title: 'About Kikis Delivery Service',
      author: 'Hayao Miyazaki',
      url: 'https://en.wikipedia.org/wiki/Kiki%27s_Delivery_Service',
    }

    const response = await api
      .post('/api/blogs')
      .send(blog)
      .expect(201)
      .expect('Content-Type', /application\/json/)

    expect(response.body.likes).toBe(0)
  })

  test('when missing title or url response status 400', async () => {
    let blog = {
      author: 'Hayao Miyazaki',
      url: 'https://en.wikipedia.org/wiki/Kiki%27s_Delivery_Service',
    }
    await api
      .post('/api/blogs')
      .send(blog)
      .expect(400)

    blog = {
      title: 'About Kikis Delivery Service',
      author: 'Hayao Miyazaki'
    }
    await api
      .post('/api/blogs')
      .send(blog)
      .expect(400)
  })

  test('api deletes blog', async () => {
    const blogs = await helper.blogsInDb()
    await api
      .delete(`/api/blogs/${blogs[0].id}`)
      .expect(204)

    expect(await helper.blogsInDb()).toHaveLength(blogs.length - 1)
  })

  test('api updates the blog', async () => {
    const blog = {
      ...helper.initialBlogs[0],
      likes: helper.initialBlogs[0].likes + 1
    }
    let dbBlogs = await helper.blogsInDb()
    const { id } = dbBlogs[0]

    await api
      .put(`/api/blogs/${id}`)
      .send(blog)
      .expect(200)
      .expect('Content-Type', /application\/json/)

    dbBlogs = await helper.blogsInDb()
    const returnedBlog = dbBlogs.filter((b) => b.id === id)[0]
    expect(returnedBlog.likes).toBe(helper.initialBlogs[0].likes + 1)
  })
})

// describe('Users operations: ', () => {
//   beforeEach(async () => {
//     await User.deleteMany({})

//     const passwordHash = bcrypt.hash('secret', 10)
//     const user = new User({ username: 'root', passwordHash })
//     await user.save()
//   })

//   test.only('creation succeeds with fresh username', async () => {
//     const usersAtStart = await helper.usersInDB()
//     const newUser = { username: 'Anna', password: '1234' }
//     await api
//       .post('/api/users')
//       .send(newUser)
//       .expect(200)

//     const usersAtEnd = await helper.usersInDB()
//     expect(usersAtEnd.length).toBe(usersAtStart.length + 1)

//     const usernames = usersAtEnd.map(u => u.username)
//     expect(usernames).toContain(newUser.username)
//   })
//   test('creation fails with taken username', async () => {
//     const usersAtStart = await helper.usersInDB()
//     const newUser = { username: 'root', password: '1234' }
//     const result = await api
//       .post('/api/users')
//       .send(newUser)
//       .expect(400)
//       .expect('Content-Type', /application\/json/)
//     expect(result.body.error).toContain('password length must be greater than 3')

//     const usersAtEnd = await helper.usersInDB()
//     expect(usersAtEnd.length).toBe(usersAtStart.length)
//   })
// })

afterAll(() => {
  mongoose.connection.close()
})