import { Form, Input, Modal } from 'antd';
import * as React from 'react';
import style from './template-add.component.less';
import { useTemplateAddStore } from './template-add.component.store';
import { ITemplateAddProps } from './template-add.interface';

export default function TemplateAddComponent(props: ITemplateAddProps) {
  const { state, form, selfClose, selfSubmit } = useTemplateAddStore(props);
  const { confirmLoading } = state;
  const { visible } = props;

  function RenderForm() {
    const layout = {
      labelCol: { span: 6 },
      wrapperCol: { span: 14 }
    };
    return (
      <React.Fragment>
        <Form form={form}>
          <Form.Item label="模板类型">{'XXX'}</Form.Item>
          <Form.Item name="name" label="模板名称">
            <Input placeholder="请输入模板名称" style={{ width: '200px' }} />
          </Form.Item>
          {/* FormControl */}
        </Form>
      </React.Fragment>
    );
  }

  return (
    <Modal
      title="新增参数模板"
      width={600}
      visible={visible}
      onCancel={() => selfClose()}
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
      <RenderForm />
    </Modal>
  );
}
