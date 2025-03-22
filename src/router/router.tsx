import { Navigate, RouteObject } from 'react-router-dom'

import RootLayout from '@/layout/default.tsx'
import { menuRouter } from '@/router/menu.tsx'
import Login from '@/views/login'

export const routes: RouteObject[] = [
  {
    path: '',
    element: <RootLayout />,
    children: [
      ...menuRouter,
      {
        path: '*', // 匹配所有未定义的路由
        element: <Navigate to="/" replace />,
      },
    ],
  },
  {
    path: '/login',
    element: <Login />,
  },
]
