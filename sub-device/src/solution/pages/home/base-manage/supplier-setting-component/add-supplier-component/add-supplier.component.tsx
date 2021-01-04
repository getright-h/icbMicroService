import * as React from 'react';
import { useAddSupplierStore } from './add-supplier.component.store';
import { IAreaCascaderComponent } from '~framework/components/component.module';
import { Modal, Form, Input, Radio } from 'antd';
export default function AddSupplierComponent(props: any) {
  const { state, onChange } = useAddSupplierStore();
  const { setAreaInfo, areaDetail = [], visible, close } = props;
  const IAreaCascaderComponentForm: any = React.useCallback(
    () =>
      IAreaCascaderComponent({
        deep: 2,
        setAreaInfo,
        defaultValue: areaDetail
      }),
    [areaDetail]
  );
  const layout = {
    labelCol: { span: 6 },
    wrapperCol: { span: 14 }
  };
  return (
    <Modal visible={visible} title={'新增供应商'} onCancel={() => close()}>
      <Form {...layout}>
        <Form.Item label="供应商名称" name={'name'} rules={[{ required: true }]}>
          <Input
            placeholder={'请输入'}
            onChange={e => {
              onChange(e.target.value, 'name');
            }}
          ></Input>
        </Form.Item>
        <Form.Item label="供应商地址" name={'unitAddress'} rules={[{ required: true }]}>
          <Input.Group compact>
            <Form.Item noStyle name="areaDetail">
              <IAreaCascaderComponentForm />
            </Form.Item>
            <Form.Item name="addressDetail" noStyle rules={[{ required: true, message: '请输入详细地址' }]}>
              <Input style={{ width: '70%', marginTop: 10 }} placeholder="请输入详细地址" />
            </Form.Item>
          </Input.Group>
        </Form.Item>
        <Form.Item label="联系人" name={'unitMobile'} rules={[{ required: true }]}>
          <Input
            placeholder={'请输入'}
            onChange={e => {
              onChange(e.target.value, 'alias');
            }}
          ></Input>
        </Form.Item>
        <Form.Item label="联系电话" name={'unitMobile'} rules={[{ required: true }]}>
          <Input
            placeholder={'请输入'}
            onChange={e => {
              onChange(e.target.value, 'locationStyle');
            }}
          ></Input>
        </Form.Item>
      </Form>
    </Modal>
  );
}
