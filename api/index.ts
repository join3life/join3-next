import axios from 'axios'

export const request = axios.create({
  baseURL: 'http://47.99.143.186',
  headers: {
    'Content-Type': 'multipart/form-data'
  }
})
