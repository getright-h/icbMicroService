import * as React from 'react';
import style from './rollback-apply.component.less';
import { useRollbackApplyStore } from './rollback-apply.component.store';
import { IRollbackApplyProps } from './rollback-apply.interface';
import { Modal, Form, Input, Radio } from 'antd';

export default function RollbackApplyComponent(props: IRollbackApplyProps) {
  const { state, form, selfSubmit, selfClose, opinionSelect } = useRollbackApplyStore(props);
  const { visible } = props;
  const { confirmLoading, opinion } = state;
  const layout = {
    labelCol: { span: 6 },
    wrapperCol: { span: 14 }
  };
  function renderForm() {
    return (
      <React.Fragment>
        <Form {...layout} form={form}>
          <Form.Item name="name" label="申请详情">
            对方申请将调拨状态回退到（待确认/待验货）
          </Form.Item>
          <Form.Item name="name" label="申请理由">
            操作失误
          </Form.Item>
          <Form.Item name="opinion" label="处理意见" rules={[{ required: true }]}>
            <Radio.Group onChange={e => opinionSelect(e.target.value)}>
              <Radio value={1}>通过</Radio>
              <Radio value={2}>驳回</Radio>
            </Radio.Group>
          </Form.Item>
          {opinion == 2 && (
            <Form.Item name="name" label="驳回理由" rules={[{ required: true }]}>
              <Input placeholder="请输入驳回理由" />
            </Form.Item>
          )}
        </Form>
      </React.Fragment>
    );
  }
  return (
    <Modal
      title="接收方撤回"
      visible={visible}
      width={600}
      onCancel={selfClose}
      onOk={() => {
        form
          .validateFields()
          .then(values => selfSubmit(values))
          .catch(info => {
            console.log('Validate Failed:', info);
          });
      }}
      maskClosable={false}
      destroyOnClose={true}
      confirmLoading={confirmLoading}
    >
      {renderForm()}
    </Modal>
  );
}
