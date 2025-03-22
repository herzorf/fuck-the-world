import { RouteObject } from 'react-router-dom'

import Home from '@/views/Home'

export const menuRouter: RouteObject[] = [
  {
    path: 'userManagement',
    element: <Home />,
  },
]
