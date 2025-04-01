import { request } from '@/network/axios'

enum Api {
  queryOperatorList = '/api/operator/queryOperatorList',
  createOperator = '/api/operator/createOperator',
}

export const queryOperatorList = (params: Record<string, string>) => {
  return request.post(Api.queryOperatorList, params)
}
export const createOperator = (params: Record<string, string>) => {
  return request.post(Api.createOperator, params)
}
