import { request } from './index'

export const createOrg = (params: any) => {
  return request.post('/api/org', params)
}
