import { request } from '@/network/axios'

enum Api {
  queryOperatorList = '/api/operator/queryOperatorList',
}

export const queryOperatorList = (params: Record<string, string>) => {
  return request.post(Api.queryOperatorList, params)
}
