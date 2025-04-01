import { Button, Form, Input, Modal, Switch, Table } from 'antd'

import { createOperator, queryOperatorList } from '@/views/Home/index.api.ts'

function Home() {
  const [dataSource, setDataSource] = useState<Record<string, string>[]>([])
  const [isModalOpen, setIsModalOpen] = useState(false)

  useEffect(() => {
    queryOperatorList({}).then((res) => {
      setDataSource(res as Record<string, string>[])
    })
  }, [])
  const [form] = Form.useForm()

  const columns = [
    {
      title: '用户id',
      dataIndex: 'id',
      key: 'id',
    },
    {
      title: '用户名',
      dataIndex: 'username',
      key: 'username',
    },
    {
      title: '角色',
      dataIndex: 'role',
      key: 'role',
    },
    {
      title: '是否激活',
      dataIndex: 'isActive',
      key: 'isActive',
      render: (isActive: boolean) => <span>{isActive ? '是' : '否'}</span>,
    },
    {
      title: '更新时间',
      dataIndex: 'updatedAt',
      key: 'updatedAt',
    },
    {
      title: 'Action',
      dataIndex: 'Action',
      key: 'Action',
      render: () => <Button type="primary">操作</Button>,
    },
  ]
  type FieldType = {
    username?: string
    password?: string
    isActive?: string
  }

  const onFinish = async () => {
    const values = await form.validateFields()
    await createOperator(values)
    form.resetFields()
    setIsModalOpen(false)
  }

  return (
    <>
      <Table
        dataSource={dataSource}
        title={() => (
          <Button type="primary" onClick={() => setIsModalOpen(true)}>
            添加操作员
          </Button>
        )}
        rowKey={(record) => record.id}
        columns={columns}
      />
      <Modal
        centered
        title="添加操作员"
        open={isModalOpen}
        okText="添加"
        cancelText="取消"
        onOk={onFinish}
        onCancel={() => setIsModalOpen(false)}
      >
        <Form form={form} initialValues={{ isActive: true }} autoComplete="off">
          <Form.Item<FieldType> label="账号" name="username" rules={[{ required: true, message: '请输入账号' }]}>
            <Input />
          </Form.Item>
          <Form.Item<FieldType> label="密码" name="password" rules={[{ required: true, message: '请输入密码' }]}>
            <Input.Password />
          </Form.Item>
          <Form.Item<FieldType> name="isActive" rules={[{ required: true }]} valuePropName="checked" label="是否激活">
            <Switch />
          </Form.Item>
        </Form>
      </Modal>
    </>
  )
}

export default Home
