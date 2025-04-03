import { message } from 'antd'
import type { AxiosError, AxiosInstance, AxiosRequestConfig } from 'axios'
import axios from 'axios'

import { axiosBaseOptions } from '@/network/axios/axios-setup'
import type { AxiosDownload, Upload, UrlDownload } from '@/network/axios/type'
import { UploadStream } from '@/network/axios/type'

function analysisFilename(contentDisposition: string): string {
  let regex = /filename\*=\S+?''(.+?)(;|$)/
  if (regex.test(contentDisposition)) {
    return RegExp.$1
  }
  regex = /filename="{0,1}([\S\s]+?)"{0,1}(;|$)/
  if (regex.test(contentDisposition)) {
    return RegExp.$1
  }
  return '文件名获取异常'
}

class MyAxios {
  private readonly axiosInstance: AxiosInstance

  constructor(options: AxiosRequestConfig) {
    this.axiosInstance = axios.create(options)
    this.initInterceptors()
  }

  private initInterceptors() {
    // 请求拦截  上传数据的加密处理在这里配置
    this.axiosInstance.interceptors.request.use(
      (config) => {
        const token: string | null = localStorage.getItem('token')
        if (token) {
          config.headers['authorization'] = token
        }
        // console.log(`本次请求的config信息：`, config)
        return config
      },
      (error) => {
        console.log(`axios请求拦截部分报错，错误信息error`, error)
        return Promise.reject(error)
      },
    )

    this.axiosInstance.interceptors.response.use(
      async (response) => {
        const {
          data: { code, message: msg, result },
        } = response
        if (code !== 200) {
          message.error(msg)
          return Promise.reject(result)
        }
        if (result instanceof Blob) {
          return response
        } else {
          if (msg) {
            message.success(msg)
          }
          return result
        }
      },
      async (error: AxiosError) => {
        const { message: msg, code } = (error.response?.data as Record<string, string | number>) || {
          message: '未找到资源',
          code: 404,
        }
        message.error(msg)
        switch (code) {
          case 200:
            break
          case 401:
            setTimeout(() => {
              localStorage.removeItem('token')
              window.location.href = '/login'
            }, 1000)
            break
          default:
            break
        }
        return Promise.reject(error)
      },
    )
  }

  post<T>(url: string, data?: object, params?: object): Promise<T> {
    return this.axiosInstance.post(url, data, { params })
  }

  upload<T>(data: Upload): Promise<T> {
    const { url, formData, controller, onUploadProgress } = data
    return this.axiosInstance.post(url, formData, {
      headers: { 'Content-Type': 'multipart/form-data' },
      onUploadProgress,
      signal: controller ? controller.signal : undefined, //用于文件上传可以取消  只需在外部调用controller.abort()即可。 参考//https://juejin.cn/post/6954919023205154824
    })
  }

  async uploadStream<T>(data: UploadStream): Promise<T> {
    const { url, file, controller, onUploadProgress } = data
    /** generateSHA 生成文件SHA256 hash  用于标识文件唯一性 往往会用上 这里会用到crypto-js库 **/
    // async function generateSHA(file: File): Promise<string> {
    //   const wordArray = CryptoJs.lib.WordArray.create(await file.arrayBuffer())
    //   const sha256 = CryptoJs.SHA256(wordArray)
    //   //转16进制
    //   return sha256.toString()
    // }
    // const Hash = await generateSHA(File)
    const fileArrayBuffer = await file.arrayBuffer()
    return this.axiosInstance.post(url, fileArrayBuffer, {
      headers: { 'Content-Type': 'application/octet-stream' },
      onUploadProgress,
      signal: controller ? controller.signal : undefined, //用于文件上传可以取消  只需在外部调用controller.abort()即可。 参考//https://juejin.cn/post/6954919023205154824
    })
  }

  axiosDownload(params: AxiosDownload): Promise<{ fileName: string }> {
    const { url, data, controller, fileName, onDownloadProgress } = params
    return new Promise((resolve, reject) => {
      this.axiosInstance
        .get<Blob>(url, {
          params: data,
          responseType: 'blob',
          onDownloadProgress,
          signal: controller ? controller.signal : undefined, //用于文件下载可以取消  只需在外部调用controller.abort()即可。 参考//https://juejin.cn/post/6954919023205154824以及https://axios-http.com/zh/docs/cancellation
        })
        .then((res) => {
          const blob = new Blob([res.data])
          const a = document.createElement('a')
          a.style.display = 'none'
          if (fileName) {
            a.download = fileName
          } else {
            a.download = decodeURIComponent(analysisFilename(res.headers['content-disposition']))
          }
          a.href = URL.createObjectURL(blob)
          document.body.appendChild(a)
          const downloadFileName = a.download
          a.click()
          URL.revokeObjectURL(a.href)
          document.body.removeChild(a)
          resolve({ fileName: downloadFileName })
        })
        .catch((err) => {
          reject(err)
        })
    })
  }

  urlDownload(params: UrlDownload) {
    const { fileName, serveBaseUrl = import.meta.env.VITE_API_SERVER_URL, fileUrl } = params
    const a = document.createElement('a')
    a.style.display = 'none'
    a.download = fileName
    a.href = fileUrl.startsWith('http') ? fileUrl : `${serveBaseUrl}${fileUrl}`
    document.body.appendChild(a)
    a.click()
    URL.revokeObjectURL(a.href) // 释放URL 对象
    document.body.removeChild(a)
  }
}

export const request = new MyAxios(axiosBaseOptions)
