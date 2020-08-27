import axios from 'axios'
const baseUrl = '/api/login'

const login = async (credentials) => {
  const response = axios.post(baseUrl, credentials)
  return response.then(r => r.data)
}

export default { login }