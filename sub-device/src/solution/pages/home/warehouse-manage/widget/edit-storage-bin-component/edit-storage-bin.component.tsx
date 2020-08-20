import * as React from 'react';
import style from './edit-storage-bin.component.less';
import { useEditStorageBinStore } from './edit-storage-bin.component.store';
import { Modal, Form, Input, Tooltip, Switch } from 'antd';
import { IEditStorageBinProps } from './edit-storage-bin.interface';
import { QuestionCircleOutlined } from '@ant-design/icons';

export default function EditStorageBinComponent(props: IEditStorageBinProps) {
  const { state, form, selfSubmit, selfClose } = useEditStorageBinStore(props);
  const { visible } = props;
  const { confirmLoading } = state;
  const layout = {
    labelCol: { span: 6 },
    wrapperCol: { span: 12 }
  };
  function renderForm() {
    return (
      <React.Fragment>
        <Form {...layout} form={form}>
          <Form.Item name="name" label="仓位名" rules={[{ required: true }]}>
            <Input placeholder="请输入仓位名" />
          </Form.Item>
          <Form.Item name="name" label="货架位置">
            <Input placeholder="请输入货架位置" />
          </Form.Item>
          <Form.Item name="name" label="库存报警">
            <Input.Group compact>
              <Input style={{ width: 100, textAlign: 'center' }} placeholder="最小个数" />
              <Input
                className="site-input-split"
                style={{
                  width: 30,
                  borderLeft: 0,
                  borderRight: 0,
                  pointerEvents: 'none',
                  backgroundColor: '#fff'
                }}
                placeholder="~"
                disabled
              />
              <Input
                className="site-input-right"
                style={{
                  width: 100,
                  textAlign: 'center'
                }}
                placeholder="最大个数"
              />
              <Tooltip
                placement="right"
                className={style.tip}
                arrowPointAtCenter={true}
                title="库存超出报警范围，系统将发出提醒"
              >
                <QuestionCircleOutlined style={{ color: '#ff4d4f' }} />
              </Tooltip>
            </Input.Group>
          </Form.Item>
          <Form.Item name="name" label="长时报警">
            <Input.Group compact>
              <Input style={{ width: 200 }} placeholder="请输入存放天数上限" />
              <Tooltip
                placement="right"
                className={style.tip}
                arrowPointAtCenter={true}
                title="存入天数达上限设置，系统将发出提醒"
              >
                <QuestionCircleOutlined style={{ color: '#ff4d4f' }} />
              </Tooltip>
            </Input.Group>
          </Form.Item>
          <Form.Item name="default" label="默认仓位" valuePropName="checked" initialValue={true}>
            <Switch />
          </Form.Item>
        </Form>
      </React.Fragment>
    );
  }
  return (
    <Modal
      title={props.id ? '修改仓库' : '添加仓库'}
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
