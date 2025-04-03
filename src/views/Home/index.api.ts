import { request } from '@/network/axios'
import { ResponseList } from '@/types/response.ts'

enum Api {
  queryOperatorList = '/api/operator/queryOperatorList',
  createOperator = '/api/operator/createOperator',
  updateOperator = '/api/operator/updateOperator',
  deleteOperator = '/api/operator/deleteOperator',
}

export const queryOperatorList = (params: Record<string, unknown> | undefined): Promise<ResponseList> => {
  return request.post(Api.queryOperatorList, params)
}
export const createOperator = (params: Record<string, string>) => {
  return request.post(Api.createOperator, params)
}
export const updateOperator = (params: Record<string, string | boolean>) => {
  return request.post(Api.updateOperator, params)
}

export const deleteOperator = (params: Record<string, string | boolean>) => {
  return request.post(Api.deleteOperator, params)
}
