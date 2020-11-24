import { Button, Modal } from 'antd';
import * as React from 'react';
import style from './template-list.component.less';
import { useTemplateListStore } from './template-list.component.store';
import { ITemplateListProps } from './template-list.interface';

export default function TemplateListComponent(props: ITemplateListProps) {
  const { state, form, selfClose, selfSubmit } = useTemplateListStore(props);
  const { confirmLoading } = state;
  const { visible } = props;

  function TemplateList() {}

  function EditField() {}

  return (
    <Modal
      title="模板列表"
      width={600}
      visible={visible}
      onCancel={() => selfClose()}
      // onOk={() => {
      //   form
      //     .validateFields()
      //     .then(values => selfSubmit(values))
      //     .catch(info => {
      //       console.log('Validate Failed:', info);
      //     });
      // }}
      footer={[
        <Button key="back" onClick={() => selfClose()}>
          返回
        </Button>
      ]}
      maskClosable={false}
      destroyOnClose={true}
      confirmLoading={confirmLoading}
    >
      <div>
        <div className={style.title}>报警类型：{'XXX'}</div>
        <div className={style.container}>
          <div className={style.left}></div>
        </div>
      </div>
    </Modal>
  );
}
