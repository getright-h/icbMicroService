import * as React from 'react';
import style from './edit-warehouse.component.less';
import { IEditWarehouseProps } from './edit-warehouse.interface';
import { useEditWarehouseStore } from './edit-warehouse.component.store';
import { Modal, Form, Input, Select, Checkbox, Tooltip } from 'antd';
import { IAreaCascaderComponent } from '~/framework/components/component.module';
import { QuestionCircleOutlined } from '@ant-design/icons';

export default function EditWarehouseComponent(props: IEditWarehouseProps) {
  const { state, form, selfSubmit, selfClose, setAreaInfo } = useEditWarehouseStore(props);
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
          <Form.Item name="name" label="仓库名" rules={[{ required: true }]}>
            <Input placeholder="请输入仓库名" />
          </Form.Item>
          <Form.Item name="name" label="所属组织" rules={[{ required: true }]}>
            <Select></Select>
          </Form.Item>
          <Form.Item name="name" label="仓库地址" rules={[{ required: true }]}>
            <IAreaCascaderComponent deep={2} setAreaInfo={value => setAreaInfo(value)} />
          </Form.Item>
          <Form.Item name="name" wrapperCol={{ offset: 6, span: 12 }} rules={[{ required: true }]}>
            <Input placeholder="请输入详细地址" />
          </Form.Item>
          <Form.Item name="name" label="管理员">
            <Input placeholder="请输入管理员姓名" />
          </Form.Item>
          <Form.Item name="name" label="管理员手机号">
            <Input placeholder="请输入管理员手机号" />
          </Form.Item>
          <Form.Item name="name" label="总库存报警">
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
          {!props.id && (
            <Form.Item name="default" label="添加默认仓位" valuePropName="checked" initialValue="true">
              <Checkbox>默认仓位：1个</Checkbox>
              <Tooltip placement="right" arrowPointAtCenter={true} title="适用于没有区分仓位的机构">
                <QuestionCircleOutlined style={{ color: '#ff4d4f' }} />
              </Tooltip>
            </Form.Item>
          )}
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
