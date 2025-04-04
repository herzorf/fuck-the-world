import { UserOutlined } from '@ant-design/icons'
import { useQuery } from '@tanstack/react-query'
import { Layout, Menu, theme } from 'antd'
import { useEffect } from 'react'
import { Outlet, useNavigate } from 'react-router-dom'

import useSetRouteMeta from '@/hooks/useSetRouteMeta.ts'
import { getUserInfo, useUserStore } from '@/store/user.ts'

const { Header, Sider, Content } = Layout
export default function RootLayout() {
  useSetRouteMeta()
  const userStore = useUserStore()
  const { data } = useQuery({
    queryKey: ['getUserInfo'],
    queryFn: getUserInfo,
    staleTime: 1000 * 60 * 5,
  })
  useEffect(() => {
    userStore.setUserName(data?.username)
    userStore.setRole(data?.role)
  }, [data])
  const {
    token: { colorBgContainer, borderRadiusLG },
  } = theme.useToken()
  const navigate = useNavigate()
  useEffect(() => {
    navigate('operateManagement')
  }, [])
  return (
    <div id={'root-layout'}>
      <Layout style={{ minHeight: '100vh' }}>
        <Sider trigger={null} breakpoint="lg" collapsedWidth="50">
          {/*<div className="demo-logo-vertical">LOGO</div>*/}
          <Menu
            theme="dark"
            mode="inline"
            defaultSelectedKeys={['operateManagement']}
            onSelect={({ key }) => {
              navigate(key)
            }}
            items={[
              {
                key: 'operateManagement',
                icon: <UserOutlined />,
                label: '操作员管理',
              },
            ]}
          />
        </Sider>
        <Layout>
          <Header style={{ padding: 0, background: colorBgContainer }}></Header>
          <Content
            style={{
              margin: '24px 16px',
              padding: 24,
              minHeight: 280,
              background: colorBgContainer,
              borderRadius: borderRadiusLG,
            }}
          >
            <Outlet />
          </Content>
        </Layout>
      </Layout>
    </div>
  )
}
