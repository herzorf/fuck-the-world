import { useQuery } from '@tanstack/react-query'
import { Button, Form, Input, Modal, Switch, Table } from 'antd'

import { createOperator, queryOperatorList } from '@/views/Home/index.api.ts'
import { getColumn } from '@/views/Home/index.data.tsx'

function Home() {
  const [isModalOpen, setIsModalOpen] = useState(false)

  const { data, refetch } = useQuery({
    queryKey: ['queryOperatorList'],
    queryFn: ({ meta }) => queryOperatorList(meta),
  })

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
    refetch()
  }

  return (
    <>
      <Table
        dataSource={data as Record<string, string>[]}
        title={() => (
          <Button type="primary" onClick={() => setIsModalOpen(true)}>
            添加操作员
          </Button>
        )}
        rowKey={(record) => record.id}
        columns={getColumn(refetch)}
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
