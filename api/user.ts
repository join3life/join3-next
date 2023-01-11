import { request } from './index'

interface UserProfile {
  name: string
  wallet_address: string
  bio?: string
  avatar?: any
}

export const editUserProfile = (params: Partial<UserProfile>) => {
  return request.put('/api/user/edit', params, {
    headers: {
      'Content-Type': 'application/json'
    }
  })
}

export const createUser = (params: UserProfile) => {
  return request.post('/api/user/edit', params)
}
