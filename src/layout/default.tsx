import { UserOutlined } from '@ant-design/icons'
import { Layout, Menu, theme } from 'antd'
import { Outlet, useNavigate } from 'react-router-dom'

const { Header, Sider, Content } = Layout
export default function RootLayout() {
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
