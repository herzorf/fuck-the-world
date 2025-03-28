import type { FormProps } from 'antd'
import { Button, Checkbox, Form, Input } from 'antd'
import { useNavigate } from 'react-router-dom'

import { login } from '@/views/login/index.api.ts'

import style from './index.module.scss'

const Login = () => {
  type FieldType = {
    username?: string
    password?: string
    remember?: string
  }
  const navigate = useNavigate()

  interface LoginResponse {
    jwt: string
  }

  const onFinish: FormProps<FieldType>['onFinish'] = (values) => {
    login(values).then((res) => {
      const { jwt } = res as LoginResponse
      localStorage.setItem('token', jwt)
      navigate('/')
    })
  }
  return (
    <div className={style.loginWrapper}>
      <div className="formWrapper">
        <h1>登录</h1>
        <Form name="login" className="form" initialValues={{ remember: true }} onFinish={onFinish} autoComplete="off">
          <Form.Item<FieldType> label="账号" name="username" rules={[{ required: true, message: '请输入你的账号' }]}>
            <Input />
          </Form.Item>

          <Form.Item<FieldType> label="密码" name="password" rules={[{ required: true, message: '请输入密码' }]}>
            <Input.Password />
          </Form.Item>
          <Form.Item<FieldType> name="remember" valuePropName="checked" label={null}>
            <Checkbox>记住我</Checkbox>
          </Form.Item>
          <Form.Item label={null}>
            <Button type="primary" block htmlType="submit">
              登录
            </Button>
          </Form.Item>
        </Form>
      </div>
    </div>
  )
}

export default Login
