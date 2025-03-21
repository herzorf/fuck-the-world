import { createBrowserRouter, Navigate } from 'react-router-dom'

import RootLayout from '@/layout/default.tsx'
import About from '@/views/About'
import Home from '@/views/Home'
import Login from '@/views/login'

const router = createBrowserRouter(
  [
    {
      path: '',
      element: <RootLayout />,
      children: [
        {
          path: '',
          element: <Home />,
        },
        {
          path: '/about',
          element: <About />,
        },
        {
          path: '*', // 匹配所有未定义的路由
          element: <Navigate to="/" replace />, // 重定向到 Home
        },
      ],
    },
    {
      path: '/login',
      element: <Login />,
    },
  ],
  { basename: import.meta.env.VITE_PUBLIC_PATH as string },
)

export default router
