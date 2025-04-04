import { create } from 'zustand'

import { request } from '@/network/axios'

interface UserStore {
  username: string
  role: string
  setUserName: (name?: string) => void
  setRole: (role?: string) => void
}

enum Api {
  getUserIngo = '/api/user/getUserInfo',
}

export const getUserInfo = async (): Promise<{ username: string; role: string }> => {
  return request.post(Api.getUserIngo)
}

export const useUserStore = create<UserStore>((set) => ({
  username: '',
  role: '',
  setUserName: (username) =>
    set(() => {
      return { username }
    }),
  setRole: (role) => set({ role }),
}))
