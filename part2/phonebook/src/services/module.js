import axios from 'axios'
const URL = "http://localhost:3000/api/persons"

const create = (obj) => {
    const request = axios.post(URL, obj)
    return request.then(res => res.data)
}

const getAll = () => {
    const request = axios.get(URL)
    return request.then(res => res.data)
}

const update = (id, obj) => {
    const request = axios.put(`${URL}/${id}`, obj)
    return request.then(res => res.data)
}

const deleteUser = (id) => {
    const request = axios.delete(`${URL}/${id}`)
    return request.then(res => res.data)
}

export default { create, getAll, update, deleteUser }