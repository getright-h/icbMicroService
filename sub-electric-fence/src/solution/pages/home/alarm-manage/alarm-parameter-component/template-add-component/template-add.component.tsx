import { Form, Modal } from 'antd';
import * as React from 'react';
import { AlarmFormItemComponent } from '~/solution/components/component.module';
import style from './template-add.component.less';
import { useTemplateAddStore } from './template-add.component.store';
import { ITemplateAddProps } from './template-add.interface';

export default function TemplateAddComponent(props: ITemplateAddProps) {
  const { state, selfClose, selfSubmit, getFormInfo } = useTemplateAddStore(props);
  const { confirmLoading } = state;
  const { visible, info } = props;

  function RenderForm() {
    const layout = {
      labelCol: { span: 4 },
      wrapperCol: { span: 20 }
    };
    return (
      <Form {...layout}>
        <Form.Item label="模板类型">{info.name}</Form.Item>
        <AlarmFormItemComponent initialInfo={info} hasTempName getFormInfo={info => getFormInfo(info)} />
      </Form>
    );
  }

  const RenderFormMemo = React.useCallback(() => RenderForm(), [info]);

  return (
    <Modal
      title="新增参数模板"
      width={600}
      visible={visible}
      onCancel={() => selfClose()}
      onOk={selfSubmit}
      maskClosable={false}
      destroyOnClose={true}
      confirmLoading={confirmLoading}
    >
      <RenderFormMemo />
    </Modal>
  );
}
