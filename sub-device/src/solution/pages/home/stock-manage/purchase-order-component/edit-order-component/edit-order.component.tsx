import * as React from 'react';
import style from './edit-order.component.less';
import { useEditOrderStore } from './edit-order.component.store';
import { IEditOrderProps } from './edit-order.interface';
import { Modal, Form, Input, Space } from 'antd';
import {
  ISelectLoadingComponent,
  IUploadImgComponent,
  TimePickerComponent
} from '~/framework/components/component.module';
import { PlusOutlined, MinusOutlined } from '@ant-design/icons';

export default function EditOrderComponent(props: IEditOrderProps) {
  const { state, form, selfSubmit, selfClose } = useEditOrderStore(props);
  const { visible } = props;
  const { confirmLoading } = state;
  const formItemLayout = {
    labelCol: {
      xs: { span: 24 },
      sm: { span: 4 }
    },
    wrapperCol: {
      xs: { span: 24 },
      sm: { span: 20 }
    }
  };
  const queryDeviceTypeList = ISelectLoadingComponent({
    reqUrl: 'queryDeviceTypeList',
    placeholder: '选择设备型号',
    searchKey: '',
    getCurrentSelectInfo: (value: string, option: any) => {
      console.log(option);
    }
  });

  const querySupplierList = ISelectLoadingComponent({
    style: { width: '200px' },
    reqUrl: 'querySupplierList',
    placeholder: '请选择供应商',
    searchKey: '',
    getCurrentSelectInfo: (value: string, option: any) => {
      form.setFieldsValue({ supplierId: value });
    },
    searchForm: { typeId: process.env.SUPPLIER_TYPE_ID }
  });

  function renderForm() {
    return (
      <Form {...formItemLayout} form={form} initialValues={{ deviceList: [{ typeId: 1, number: 2 }] }}>
        <Form.Item label="采购单名称" name="name" rules={[{ required: true }]}>
          <Input placeholder="请输入采购单名称" style={{ width: '200px' }} />
        </Form.Item>
        <Form.List name="deviceList">
          {(fields, { add, remove }) => {
            return (
              <Form.Item label="采购商品" required={true} style={{ alignItems: 'start' }}>
                {fields.map((field, index) => (
                  <Space key={field.key} className={style.space} align="start">
                    <Form.Item
                      {...field}
                      name={[field.name, 'typeId']}
                      style={{ width: '200px' }}
                      className={style.fieldItem}
                      rules={[{ required: true, message: '请选择设备型号' }]}
                    >
                      {queryDeviceTypeList}
                    </Form.Item>
                    <Form.Item
                      {...field}
                      name={[field.name, 'number']}
                      style={{ maxWidth: '150px' }}
                      className={style.fieldItem}
                      rules={[{ required: true, message: '请填写数量' }]}
                    >
                      <Input placeholder="请填写数量" />
                    </Form.Item>
                    <Form.Item
                      {...field}
                      name={[field.name, 'amount']}
                      style={{ maxWidth: '150px' }}
                      className={style.fieldItem}
                      rules={[{ required: true, message: '请填写金额' }]}
                    >
                      <Input placeholder="请填写金额" prefix="￥" />
                    </Form.Item>
                    <div className={style.fieldAddButton}>
                      <PlusOutlined
                        onClick={() => {
                          add();
                        }}
                      />
                      {index != 0 && (
                        <MinusOutlined
                          onClick={() => {
                            remove(field.name);
                          }}
                        />
                      )}
                    </div>
                  </Space>
                ))}
              </Form.Item>
            );
          }}
        </Form.List>
        <Form.Item label="采购单总金额" name="totalAmount" rules={[{ required: true }]}>
          <Input prefix="￥" placeholder="请输入金额" style={{ width: '200px' }} />
        </Form.Item>
        <Form.Item label="采购时间" name="purchaseTime" rules={[{ required: true }]}>
          <TimePickerComponent
            pickerType="dateTimePicker"
            timeInfo={form.getFieldValue('purchaseTime') || undefined}
            getDateTimeInfo={(timeInfo: string) => form.setFieldsValue({ purchaseTime: timeInfo })}
          />
        </Form.Item>
        <Form.Item label="供应商" name="supplierId">
          {querySupplierList}
        </Form.Item>
        <Form.Item label="采购单图" name="image">
          <IUploadImgComponent maxImgNumber={3} />
        </Form.Item>
        <Form.Item label="备注" name="remark">
          <Input.TextArea placeholder="请输入备注" rows={2} style={{ width: '300px' }} />
        </Form.Item>
      </Form>
    );
  }
  return (
    <Modal
      title={props.id ? '编辑采购单' : '新增采购单'}
      visible={visible}
      width={750}
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
