import { Button, Popconfirm, Space, TableProps } from 'antd'

import { deleteOperator, updateOperator } from '@/views/Home/index.api.ts'

export const getColumn: (refetch: (params?: Record<string, unknown>) => Promise<unknown>) => TableProps['columns'] = (
  refetch,
) => {
  return [
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
      title: '是否启用',
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
        return (
          <Space>
            <Popconfirm
              title="是否删除该操作员"
              onConfirm={async () => {
                await deleteOperator({
                  id: record.id,
                })
                await refetch()
              }}
              okText="确定"
              cancelText="取消"
            >
              <Button type="primary" variant="solid" color="red">
                删除
              </Button>
            </Popconfirm>
            <Popconfirm
              title={record.isActive ? '是否禁用该操作员' : '是否启用该操作员'}
              onConfirm={async () => {
                await updateOperator({
                  id: record.id,
                  isActive: !record.isActive,
                })
                await refetch({ xxx: 1 })
              }}
              okText="确定"
              cancelText="取消"
            >
              <Button type="primary" variant="solid" color={record.isActive ? 'default' : 'cyan'}>
                {record.isActive ? '禁用' : '启用'}
              </Button>
            </Popconfirm>
          </Space>
        )
      },
    },
  ]
}
