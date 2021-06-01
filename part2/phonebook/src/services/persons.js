import axios from 'axios'
const baseUrl = 'http://localhost:3001/persons'

const create = newObject => {
  const request = axios.post(baseUrl, newObject)
  return request.then(response => response.data)
}

const getAll = () => {
  return axios.get(baseUrl).then(response => response.data)
}

const deletePerson = id => {
  console.log(id);
  return axios.delete(`${baseUrl}/${id}`).then(response => response.data)
}

export default { create, getAll, deletePerson }