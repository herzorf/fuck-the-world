import { RouteObject } from 'react-router-dom'

import { RouteEnum, RouteTitle } from '@/enum/routeEnum.ts'
import Home from '@/views/Home'

export type MenuRoute = {
  meta?: {
    title: string
  }
} & RouteObject
export const menuRouter: MenuRoute[] = [
  {
    path: RouteEnum.operateManagement,
    element: <Home />,
    meta: {
      title: RouteTitle.operateManagement,
    },
  },
]
