import { useMutation, useQueryClient } from '@tanstack/react-query'
import { Button, Popconfirm, Space, TableProps } from 'antd'

import { deleteOperator, updateOperator } from '@/views/Home/index.api.ts'

export const GetColumn: () => TableProps['columns'] = () => {
  const queryClient = useQueryClient()
  const deleteOperatorMutation = useMutation({
    mutationFn: deleteOperator,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['queryOperatorList'] })
    },
  })
  const updateOperatorMutation = useMutation({
    mutationFn: updateOperator,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['queryOperatorList'] })
    },
  })

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
              onConfirm={() => {
                deleteOperatorMutation.mutate({
                  id: record.id,
                })
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
              onConfirm={() => {
                updateOperatorMutation.mutate({
                  id: record.id,
                  isActive: !record.isActive,
                })
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
