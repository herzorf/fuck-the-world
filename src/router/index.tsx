import { createBrowserRouter } from 'react-router-dom'

import { routes } from '@/router/router.tsx'

const router = createBrowserRouter(routes, { basename: import.meta.env.VITE_PUBLIC_PATH as string })

export default router
