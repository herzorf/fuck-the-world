import { keepPreviousData, useMutation, useQuery } from '@tanstack/react-query'
import { Button, Empty, Form, Input, Modal, Space, Switch, Table } from 'antd'

import { createOperator, queryOperatorList } from '@/views/Home/index.api.ts'
import { GetColumn } from '@/views/Home/index.data.tsx'

type FieldType = {
  username?: string
  password?: string
  isActive?: string
}

function Home() {
  const [isModalOpen, setIsModalOpen] = useState(false)
  const [params, setParams] = useState({
    username: '',
    pageNo: 1,
    pageSize: 10,
  })
  const [searchForm] = Form.useForm()
  const [addForm] = Form.useForm()

  const { data, refetch } = useQuery({
    queryKey: ['queryOperatorList', params],
    queryFn: () => queryOperatorList(params),
    placeholderData: keepPreviousData,
  })
  const createOperatorMutation = useMutation({
    mutationFn: createOperator,
    onSuccess: () => {
      addForm.resetFields()
      setIsModalOpen(false)
      refetch()
    },
  })

  const onFinish = async () => {
    const values = await addForm.validateFields()
    createOperatorMutation.mutate(values)
  }

  return (
    <>
      <Form
        layout="inline"
        onFinish={(values) => {
          setParams((params) => {
            return {
              ...params,
              username: values.username,
            }
          })
        }}
        form={searchForm}
      >
        <Form.Item label="操作员用户名" name="username">
          <Input placeholder="请输入操作员用户名 " />
        </Form.Item>
        <Form.Item>
          <Space>
            <Button type="primary" htmlType="submit">
              查询
            </Button>
            <Button
              htmlType="reset"
              onClick={() => {
                searchForm.resetFields()
                setParams({
                  ...params,
                  ...searchForm.getFieldsValue(),
                })
              }}
            >
              重置
            </Button>
          </Space>
        </Form.Item>
      </Form>
      <Table
        dataSource={data?.list}
        pagination={{
          total: data?.total,
          pageSize: params.pageSize,
          current: params.pageNo,
          onChange(page, pageSize) {
            setParams({
              ...params,
              pageNo: page,
              pageSize: pageSize,
            })
          },
        }}
        locale={{ emptyText: <Empty description="无数据" /> }}
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
        <Form form={addForm} initialValues={{ isActive: true }} autoComplete="off">
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
