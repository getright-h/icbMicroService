import * as React from 'react';
import { Row, Col } from 'antd';
export function deviceLineColumns(getFlowNode: Function) {
  /**
   * @description 根据[  调拨状态 ] 渲染操作按钮
   */
  return [
    {
      key: 'code',
      title: '设备号',
      dataIndex: 'code'
    },
    {
      key: 'sim',
      title: 'SIM卡号',
      dataIndex: 'sim'
    },
    {
      key: 'typeName',
      title: '设备型号',
      dataIndex: 'typeName'
    },
    {
      key: 'routeName',
      title: '环节',
      dataIndex: 'routeName'
    },
    {
      key: 'action',
      title: '操作',
      fixed: 'right' as 'right',
      dataIndex: 'action',
      render: (render: any, data: any, index: number) => (
        <a
          onClick={() => {
            getFlowNode(data);
          }}
          key={0}
        >
          流程节点
        </a>
      )
    }
  ];
}

export function OwnerExpandedRow(record: any, index: number) {
  const data = {
    id: record.code,
    owner: '庄周',
    carBand: '鱼',
    phone: '1388888888'
  };

  return (
    // <Table size="small" columns={columns} dataSource={data} pagination={false} rowKey={row => row.id} />
    <Row gutter={[24, 40]} key={data.id} style={{ margin: 0 }}>
      <Col span={4} style={{ padding: 0 }}>
        绑定车主: {data.owner}
      </Col>
      <Col span={4} style={{ padding: 0 }}>
        绑定车主: {data.carBand}
      </Col>
      <Col span={4} style={{ padding: 0 }}>
        绑定车主: {data.phone}
      </Col>
    </Row>
  );
}
