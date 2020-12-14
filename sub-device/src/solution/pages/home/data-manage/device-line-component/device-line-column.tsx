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

export function OwnerExpandedRow(record: any = {}, index: number) {
  const { userName = '', plateNo = '', userMobile = '' } = record;
  return (
    <Row gutter={[24, 40]} key={record.id} style={{ margin: 0 }}>
      <Col span={6} style={{ padding: 0 }}>
        绑定车主: {userName || '-'}
      </Col>
      <Col span={6} style={{ padding: 0 }}>
        绑定车牌: {plateNo || '-'}
      </Col>
      <Col span={6} style={{ padding: 0 }}>
        车主电话: {userMobile || '-'}
      </Col>
    </Row>
  );
}
