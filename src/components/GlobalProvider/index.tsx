import { FC, Fragment, ReactNode } from 'react'

interface GlobalProviderProps {
  children: ReactNode
}

const GlobalProvider: FC<GlobalProviderProps> = ({ children }) => {
  return <Fragment>{children}</Fragment>
}

GlobalProvider.displayName = 'GlobalProvider'

export default GlobalProvider
