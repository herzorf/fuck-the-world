import { RouteObject } from 'react-router-dom'

import Home from '@/views/Home'

// auth.ts
export function checkAuth(requiredRoles: string[] = []) {
  const user = JSON.parse(localStorage.getItem('user') || '{}')
  console.log(user)
  if (!user?.token) throw new Response('Unauthorized', { status: 302, headers: { Location: '/login' } })
  if (requiredRoles.length && !requiredRoles.includes(user.role)) {
    throw new Response('Forbidden', { status: 302, headers: { Location: '/unauthorized' } })
  }
}

type MenuRoute = {
  meta?: {
    title: string
  }
} & RouteObject
export const menuRouter: MenuRoute[] = [
  {
    path: 'operateManagement',
    element: <Home />,
    loader: () => checkAuth(['admin']),
    meta: {
      title: '操作员管理',
    },
  },
]
