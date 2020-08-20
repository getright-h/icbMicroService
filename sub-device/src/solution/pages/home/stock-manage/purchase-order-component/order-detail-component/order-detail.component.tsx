import * as React from 'react';
import style from './order-detail.component.less';
import { useOrderDetailStore } from './order-detail.component.store';
import { IOrderDetailProps } from './order-detail.interface';
import { Modal, Form, Table, Button } from 'antd';
import { ImageDisplayComponent } from '~/framework/components/component.module';
import { ColumnsType } from 'antd/lib/table';

export default function OrderDetailComponent(props: IOrderDetailProps) {
  const { state, selfClose } = useOrderDetailStore(props);
  const { visible } = props;
  const { tableData } = state;
  const layout = {
    labelCol: { span: 6 },
    wrapperCol: { span: 14 }
  };
  function renderForm() {
    return (
      <React.Fragment>
        <Form {...layout}>
          <Form.Item label="采购单号">100216448964</Form.Item>
          <Form.Item label="采购单名称">xx无线设备采购</Form.Item>
          <Form.Item label="采购商品">
            <ProductTable />
          </Form.Item>
          <Form.Item label="采购时间">2020-08-27 00:00:00</Form.Item>
          <Form.Item label="供应商">NINTENDO</Form.Item>
          <Form.Item label="采购单图片">
            <ImageDisplayComponent imageUrl="a" />
          </Form.Item>
          <Form.Item label="采购单创建时间">2020-08-27 00:00:00</Form.Item>
          <Form.Item label="备注">remark</Form.Item>
        </Form>
      </React.Fragment>
    );
  }
  function ProductTable() {
    const columns: ColumnsType<any> = [
      {
        title: '采购商品',
        dataIndex: 'product',
        key: 'product'
      },
      {
        title: '采购数量',
        dataIndex: 'num',
        key: 'num'
      },
      {
        title: '采购金额',
        dataIndex: 'amount',
        key: 'amount',
        render: text => <span>￥{text}</span>
      }
    ];
    return (
      <Table
        size="small"
        columns={columns}
        dataSource={tableData}
        pagination={false}
        summary={() => (
          <Table.Summary.Row>
            <Table.Summary.Cell index={0} colSpan={3}>
              商品总数：商品总金额：
            </Table.Summary.Cell>
          </Table.Summary.Row>
        )}
      />
    );
  }
  return (
    <Modal
      title="采购单详情"
      visible={visible}
      width={600}
      onCancel={selfClose}
      maskClosable={false}
      destroyOnClose={true}
      footer={[
        <Button key="back" onClick={selfClose}>
          返回
        </Button>
      ]}
    >
      {renderForm()}
    </Modal>
  );
}
