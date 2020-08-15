/* eslint-disable no-param-reassign */
const _ = require('lodash')

const totalLikes = (blogs) => _.sumBy(blogs, 'likes')

const favouriteBlog = (blogs) => {
  if (!blogs.length) { return { title: 'Currently there are no blogs', author: '', likes: 0 } }

  return _.chain(blogs)
    .maxBy('likes')
    .pick('author', 'title', 'likes')
    .value()
}

const mostBlogs = (blogs) => {
  if (!blogs.length) { return 0 }

  const ans = _.chain(blogs)
    .countBy('author')
    .map((value, key) => ({ author: key, blogs: value }))
    .maxBy('blogs')
    .value()

  return ans
}

const mostLikes = (blogs) => {
  if (!blogs.length) { return 0 }

  const ans = _.chain(blogs)
    .groupBy('author')
    .map((value, key) => ({ author: key, blogs: value, likes: 0 }))
    .forEach((o) => {
      o.likes = _.sumBy(o.blogs, 'likes')
    })
    .maxBy('likes')
    .pick('author', 'likes')
    .value()

  return ans
}

module.exports = {
  totalLikes,
  favouriteBlog,
  mostBlogs,
  mostLikes
}