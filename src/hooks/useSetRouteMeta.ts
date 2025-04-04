import { RouteTitle } from '@/enum/routeEnum.ts'
import { menuRouter } from '@/router/menu.tsx'

const useSetRouteMeta = () => {
  const location = useLocation()
  const pathname = location.pathname.split('/')[1]
  const currentRoute = menuRouter.find((item) => item.path === pathname)
  window.document.title = currentRoute?.meta?.title || RouteTitle.index
}

export default useSetRouteMeta
