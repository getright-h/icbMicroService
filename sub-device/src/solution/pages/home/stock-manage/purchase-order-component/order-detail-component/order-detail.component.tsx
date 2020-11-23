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
  const { details } = state;
  const layout = {
    labelCol: { span: 6 },
    wrapperCol: { span: 14 }
  };
  function renderForm() {
    return (
      <React.Fragment>
        <Form {...layout}>
          <Form.Item label="采购单号">{details.code}</Form.Item>
          <Form.Item label="采购单名称">{details.name}</Form.Item>
          <Form.Item label="采购商品">
            <ProductTable />
          </Form.Item>
          <Form.Item label="采购时间">{details.purchaseTime}</Form.Item>
          <Form.Item label="供应商">{details.supplierName}</Form.Item>
          <Form.Item label="采购单图片">
            {details?.imageList.map(image => (
              <span key={image} style={{ marginRight: '10px' }}>
                <ImageDisplayComponent imageUrl={image} />
              </span>
            ))}
          </Form.Item>
          <Form.Item label="采购单创建时间">{details.createTime}</Form.Item>
          <Form.Item label="备注">{details.remark}</Form.Item>
        </Form>
      </React.Fragment>
    );
  }
  function ProductTable() {
    const columns: ColumnsType<any> = [
      {
        title: '采购商品',
        dataIndex: 'typeName',
        key: 'typeName'
      },
      {
        title: '采购数量',
        dataIndex: 'number',
        key: 'number'
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
        rowKey={row => row.typeId}
        dataSource={details?.deviceList}
        pagination={false}
        summary={() => (
          <Table.Summary.Row>
            <Table.Summary.Cell index={0} colSpan={3}>
              <div className={style.summary}>
                <span>商品总数量：{details.sumNumber}</span>
                <span>商品总金额：￥{details.sumAmount}</span>
              </div>
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
      {details && renderForm()}
    </Modal>
  );
}
