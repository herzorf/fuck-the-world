import { request } from '@/network/axios'

enum APIS {
  LOGIN = '/api/login',
}

export const login = (params: Record<string, string>) => request.post(APIS.LOGIN, params)
