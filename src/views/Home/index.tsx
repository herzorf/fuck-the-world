import { Button, Table } from 'antd'

import { queryOperatorList } from '@/views/Home/index.api.ts'

function Home() {
  const [dataSource, setDataSource] = useState<Record<string, string>[]>([])
  useEffect(() => {
    queryOperatorList({}).then((res) => {
      setDataSource(res as Record<string, string>[])
    })
  }, [])
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
  return <Table dataSource={dataSource} rowKey={(record) => record.id} columns={columns} />
}

export default Home
