import { DownOutlined, UserOutlined } from '@ant-design/icons'
import { useQuery } from '@tanstack/react-query'
import { Button, Dropdown, Layout, Menu, MenuProps, Modal, theme } from 'antd'
import { useEffect } from 'react'
import { Outlet, useNavigate } from 'react-router-dom'

import { RouteEnum } from '@/enum/routeEnum.ts'
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
    navigate(RouteEnum.operateManagement)
  }, [])
  const handleLogout = () => {
    Modal.warning({
      title: '确认退出登录吗？',
      centered: true,
      okText: '确认',
      cancelText: '取消',
      onOk: () => {
        localStorage.removeItem('token')
        navigate(RouteEnum.login)
      },
    })
  }
  const items: MenuProps['items'] = [
    {
      key: '1',
      label: (
        <Button type="link" onClick={handleLogout}>
          退出登录
        </Button>
      ),
    },
  ]
  return (
    <div id={'root-layout'}>
      <Layout style={{ minHeight: '100vh' }}>
        <Sider trigger={null} breakpoint="lg" collapsedWidth="50">
          {/*<div className="demo-logo-vertical">LOGO</div>*/}
          <Menu
            theme="dark"
            mode="inline"
            defaultSelectedKeys={[RouteEnum.operateManagement]}
            onSelect={({ key }) => {
              navigate(key)
            }}
            items={[
              {
                key: RouteEnum.operateManagement,
                icon: <UserOutlined />,
                label: '操作员管理',
              },
            ]}
          />
        </Sider>
        <Layout>
          <Header style={{ padding: 0, background: colorBgContainer }}>
            <header className={'flex justify-end items-center pr-6'}>
              <div className="userOptions">
                当前登录用户：
                <Dropdown menu={{ items }} placement="bottomLeft">
                  <Button color="default" variant="text">
                    {userStore.username}
                    <DownOutlined />
                  </Button>
                </Dropdown>
              </div>
            </header>
          </Header>
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
