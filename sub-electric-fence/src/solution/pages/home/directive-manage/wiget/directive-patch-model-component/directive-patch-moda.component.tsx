import { Form, Modal, Radio, Input, Select, Button } from 'antd';
import * as React from 'react';
import style from '../../directive-list-component/directive-list.component.less';
import { useDirectiveModalStore } from './directive-patch-moda.component.store';
import { IDirectiveModalProps, ModalType } from './directive-list.interface';
export default function DirectivePatchModalComponent(props: IDirectiveModalProps) {
  const { visible, close } = props;
  const { state, form, submitForm, callbackAction, selfClose } = useDirectiveModalStore(props);
  const { custom, isDevice } = state;
  const formItemLayout = {
    labelCol: {
      xs: { span: 24 },
      sm: { span: 8 }
    },
    wrapperCol: {
      xs: { span: 24 },
      sm: { span: 16 }
    }
  };
  console.log(form.getFieldValue('deivce'), 333);
  return (
    <Modal title={'下发指令'} visible={visible} onOk={submitForm} onCancel={selfClose}>
      <Form {...formItemLayout} form={form}>
        <Form.Item label="关联设备" name="deivce">
          <Radio.Group onChange={() => callbackAction(ModalType.FORM)}>
            <Radio value={0}>设备号</Radio>
            <Radio value={1}>监控组</Radio>
          </Radio.Group>
        </Form.Item>
        {isDevice && (
          <Form.Item label={'  '} prefixCls={' '} name={'deviceList'}>
            <Input.TextArea />
          </Form.Item>
        )}

        <Form.Item label="指令类型" name={'directiveType'}>
          <Select onChange={() => callbackAction(ModalType.FORM)}>
            <Select.Option value={1}>断油电指令</Select.Option>
            <Select.Option value={1}>自定义指令</Select.Option>
            <Select.Option value={1}>修改链接</Select.Option>
          </Select>
        </Form.Item>
        <Form.Item label="参数选择" name={'params'}>
          <Radio.Group>
            <Radio value={0}>打开</Radio>
            <Radio value={1}>关闭</Radio>
          </Radio.Group>
          <div className={style.template}>
            {Array(6)
              .fill({ name: '模板', value: '2' })
              .map((tem: any, index) => (
                <p key={index} className={index == 1 && style.checked}>
                  {tem.name}
                </p>
              ))}
          </div>
          {!custom && <Button onClick={() => callbackAction(ModalType.CUSTOM)}>自定义</Button>}
        </Form.Item>
        {custom && (
          <Form.Item label="指令参数" name={'directivePramse'}>
            <Input />
          </Form.Item>
        )}

        <Form.Item label="指令值" name={'directiveValue'}>
          <Input />
        </Form.Item>
        <Form.Item label="指令密码" name={'directivePasswd'}>
          <Input />
        </Form.Item>
      </Form>
    </Modal>
  );
}
