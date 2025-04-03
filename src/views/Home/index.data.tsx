import { Button, Space, TableProps } from 'antd'

export const columns: TableProps['columns'] = [
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
    render: (_, record) => {
      console.log(record.isActive)
      return (
        <Space>
          <Button type="primary" danger>
            删除
          </Button>
          <Button type="primary" variant="solid" color={record.isActive ? 'default' : 'cyan'}>
            {record.isActive ? '禁用' : '启用'}
          </Button>
        </Space>
      )
    },
  },
]
