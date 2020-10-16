import * as React from 'react';
import style from './reject-allocation.component.less';
import { useRejectAllocationStore } from './reject-allocation.component.store';
import { IRejectAllocationProp } from './reject-allocation.interface';
import { Modal, Form, Input } from 'antd';
import { WarningTwoTone } from '@ant-design/icons';
import { ModalType } from '~shared/constant/common.const';
export default function RejectAllocationComponent(props: IRejectAllocationProp) {
  const { state, submit, onchange } = useRejectAllocationStore(props);
  const { close, visible = false } = props;
  const { submitLoading, currentCondition = {} } = state;

  const layout = {
    labelCol: { span: 4 },
    wrapperCol: { span: 16 }
  };

  return (
    <Modal
      title={currentCondition.title}
      visible={visible}
      onCancel={close}
      onOk={submit}
      maskClosable={false}
      destroyOnClose={true}
      confirmLoading={submitLoading}
    >
      <Form {...layout}>
        {currentCondition.action === ModalType.APPLY_REVOKE && (
          <div className={style.waring}>
            <WarningTwoTone twoToneColor={'red'} /> <b>{`发起方通过后调拨状态将回到${1}`}</b>
            <span>(常用于操作失误)</span>
          </div>
        )}
        <Form.Item label={currentCondition.label} rules={[{ required: true }]}>
          <Input.TextArea onChange={e => onchange(e.target.value, currentCondition.key)} />
        </Form.Item>
      </Form>
    </Modal>
  );
}
