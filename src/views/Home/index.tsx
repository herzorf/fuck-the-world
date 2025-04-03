import { Button, Form, Input, Modal, Switch, Table } from 'antd'

import { createOperator, queryOperatorList } from '@/views/Home/index.api.ts'
import { columns } from '@/views/Home/index.data.tsx'

function Home() {
  const [dataSource, setDataSource] = useState<Record<string, string>[]>([])
  const [isModalOpen, setIsModalOpen] = useState(false)
  const fetchOperatorList = async () => {
    const res = await queryOperatorList({})
    setDataSource(res as Record<string, string>[])
  }
  useEffect(() => {
    fetchOperatorList()
  }, [])
  const [form] = Form.useForm()

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
    fetchOperatorList()
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
