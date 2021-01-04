import React from 'react';
import { useRollbackApplyStore } from './rollback-apply.component.store';
import { IRollbackApplyProps, STATE } from './rollback-apply.interface';
import { Modal, Form, Input, Radio } from 'antd';
export default function RollbackApplyComponent(props: IRollbackApplyProps) {
  const { state, form, selfSubmit, selfClose, opinionSelect } = useRollbackApplyStore(props);

  const { visible } = props;
  const { confirmLoading, opinion, rejectAuditRemark, status = 0 } = state;
  const layout = {
    labelCol: { span: 6 },
    wrapperCol: { span: 14 }
  };
  function renderForm() {
    return (
      <React.Fragment>
        <Form {...layout} form={form}>
          <Form.Item name="name" label="申请详情">
            对方申请将调拨状态回退到 (
            {STATE.findIndex((flow: any) => flow.value === status - 10) > 1 ? '待验货' : '待确认'})
          </Form.Item>
          <Form.Item name="name" label="申请理由">
            {rejectAuditRemark || '-'}
          </Form.Item>
          <Form.Item name="opinion" label="处理意见" rules={[{ required: true }]}>
            <Radio.Group onChange={e => opinionSelect(e.target.value)}>
              <Radio value={1}>通过</Radio>
              <Radio value={0}>驳回</Radio>
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
      onOk={selfSubmit}
      maskClosable={false}
      destroyOnClose={true}
      confirmLoading={confirmLoading}
    >
      {renderForm()}
    </Modal>
  );
}
