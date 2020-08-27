import axios from 'axios'
const baseUrl = '/api/blogs'

let token = ''
const setToken = (authorization) => {
  token = `bearer ${authorization}`
}

const getAll = () => {
  const request = axios.get(baseUrl)
  return request.then(response => response.data)
}

const create = (blogObject) => {
  const config = {
    headers: {
      Authorization: token
    }
  }
  const request = axios.post(baseUrl, blogObject, config)
  return request.then(response => response.data)
}

const update = (id, blogObject) => {
  const request = axios.put(`${baseUrl}/${id}`, blogObject)
  return request.then(res => res.data)
}

const remove = (id) => {
  const config = {
    headers: {
      Authorization: token
    }
  }
  const request = axios.delete(`${baseUrl}/${id}`,config)
  return request
}

export default { getAll, create, update, remove, setToken }