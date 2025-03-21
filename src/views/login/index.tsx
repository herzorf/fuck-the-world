import type { FormProps } from 'antd'
import { Button, Checkbox, Form, Input } from 'antd'

import style from './index.module.scss'

const Login = () => {
  type FieldType = {
    username?: string
    password?: string
    remember?: string
  }

  const onFinish: FormProps<FieldType>['onFinish'] = (values) => {
    console.log('Success:', values)
  }

  const onFinishFailed: FormProps<FieldType>['onFinishFailed'] = (errorInfo) => {
    console.log('Failed:', errorInfo)
  }
  return (
    <div className={style.loginWrapper}>
      <div className="formWrapper">
        <h1>登录</h1>
        <Form
          name="login"
          labelCol={{ span: 6 }}
          wrapperCol={{ span: 16 }}
          className="form"
          style={{ minWidth: 600 }}
          initialValues={{ remember: true }}
          onFinish={onFinish}
          onFinishFailed={onFinishFailed}
          autoComplete="off"
        >
          <Form.Item<FieldType> label="账号" name="username" rules={[{ required: true, message: '请输入你的账号' }]}>
            <Input />
          </Form.Item>

          <Form.Item<FieldType>
            label="密码"
            name="password"
            rules={[{ required: true, message: 'Please input your password!' }]}
          >
            <Input.Password />
          </Form.Item>
          <Form.Item<FieldType> name="remember" valuePropName="checked" label={null}>
            <Checkbox>记住我</Checkbox>
          </Form.Item>
          <Form.Item label={null}>
            <Button type="primary" htmlType="submit">
              登录
            </Button>
          </Form.Item>
        </Form>
      </div>
    </div>
  )
}

export default Login
