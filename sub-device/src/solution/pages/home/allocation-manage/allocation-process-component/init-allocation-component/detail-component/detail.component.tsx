import * as React from 'react';
import style from './detail.component.less';
import { useDetailStore } from './detail.component.store';
import { Form, Button, Table } from 'antd';
import { ColumnsType } from 'antd/lib/table';

export default function DetailComponent() {
  const { state } = useDetailStore();
  const { deviceData } = state;
  const layout = {
    labelCol: { span: 8 },
    wrapperCol: { span: 12 }
  };

  function RenderTable() {
    const columns: ColumnsType<any> = [
      {
        title: '设备型号',
        dataIndex: 'name',
        key: 'name'
      },
      {
        title: '设备个数',
        dataIndex: 'number',
        key: 'number',
        render: text => <span>{text}个</span>
      }
    ];
    return <Table size="small" columns={columns} dataSource={deviceData} pagination={false} />;
  }

  return (
    <div className={style.mainForm}>
      <div className={style.title}>
        <h1>调拨单详情</h1>
      </div>
      <Form {...layout}>
        <div className={style.formPart}>
          <div className={style.formItems}>
            <div className={style.formLeft}>
              <Form.Item name="name" label="调拨单号">
                100032154165
              </Form.Item>
              <Form.Item name="name" label="调拨设备">
                <RenderTable />
              </Form.Item>
              <Form.Item name="name" label="调拨总数">
                100个
              </Form.Item>
              <Form.Item name="name" label="操作时间">
                2020-08-26 00:00:00
              </Form.Item>
              <Form.Item name="name" label="节点流程"></Form.Item>
              <Form.Item name="name" label="操作人">
                戴门
              </Form.Item>
              <Form.Item name="name" label="状态">
                待确认
              </Form.Item>

              <Form.Item name="remark" label="驳回理由">
                xxx
              </Form.Item>
              <Form.Item wrapperCol={{ span: 12, offset: 8 }}>
                <Button type="primary">撤回</Button>
                <Button type="primary" style={{ marginLeft: '30px' }}>
                  重新申请
                </Button>
                <Button type="primary" style={{ marginLeft: '30px' }}>
                  收到退货
                </Button>
                <Button style={{ marginLeft: '30px' }}>返回</Button>
              </Form.Item>
            </div>
          </div>
        </div>
      </Form>
    </div>
  );
}
