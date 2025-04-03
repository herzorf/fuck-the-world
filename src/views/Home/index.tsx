import { keepPreviousData, useMutation, useQuery } from '@tanstack/react-query'
import { Button, Form, Input, Modal, Switch, Table } from 'antd'

import { createOperator, queryOperatorList } from '@/views/Home/index.api.ts'
import { GetColumn } from '@/views/Home/index.data.tsx'

type FieldType = {
  username?: string
  password?: string
  isActive?: string
}

function Home() {
  const [isModalOpen, setIsModalOpen] = useState(false)
  const [pageInfo, setPageInfo] = useState({
    pageNo: 1,
    pageSize: 10,
  })

  const { data, refetch } = useQuery({
    queryKey: ['queryOperatorList', pageInfo],
    queryFn: () => queryOperatorList(pageInfo),
    placeholderData: keepPreviousData,
  })
  const createOperatorMutation = useMutation({
    mutationFn: createOperator,
    onSuccess: () => {
      form.resetFields()
      setIsModalOpen(false)
      refetch()
    },
  })
  const [form] = Form.useForm()

  const onFinish = async () => {
    const values = await form.validateFields()
    createOperatorMutation.mutate(values)
  }

  return (
    <>
      <Table
        dataSource={data?.list}
        pagination={{
          total: data?.total,
          pageSize: pageInfo.pageSize,
          current: pageInfo.pageNo,
          onChange(page, pageSize) {
            setPageInfo({
              pageNo: page,
              pageSize: pageSize,
            })
          },
        }}
        title={() => (
          <Button type="primary" onClick={() => setIsModalOpen(true)}>
            添加操作员
          </Button>
        )}
        rowKey={(record) => record.id}
        columns={GetColumn()}
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
