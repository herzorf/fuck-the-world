import { UserOutlined } from '@ant-design/icons'
import { Layout, Menu, theme } from 'antd'
import { Outlet } from 'react-router-dom'

const { Header, Sider, Content } = Layout
export default function RootLayout() {
  const {
    token: { colorBgContainer, borderRadiusLG },
  } = theme.useToken()
  //监听屏幕宽度，当屏幕宽度小于lg时，触发断点，侧边栏收起

  return (
    <div id={'root-layout'}>
      <Layout style={{ minHeight: '100vh' }}>
        <Sider trigger={null} breakpoint="lg" collapsedWidth="50">
          <div className="demo-logo-vertical">LOGO</div>
          <Menu
            theme="dark"
            mode="inline"
            defaultSelectedKeys={['1']}
            items={[
              {
                key: '1',
                icon: <UserOutlined />,
                label: '表格',
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
