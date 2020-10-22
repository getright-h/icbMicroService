import * as React from 'react';
import style from './edit-order.component.less';
import { useEditOrderStore } from './edit-order.component.store';
import { IEditOrderProps } from './edit-order.interface';
import { Modal, Form, Input, DatePicker } from 'antd';
import { ISelectLoadingComponent, IUploadImgComponent } from '~/framework/components/component.module';
import DeviceListSelectComponent from './device-list-select-component/device-list-select.component';
import moment from 'moment';

export default function EditOrderComponent(props: IEditOrderProps) {
  const {
    state,
    form,
    selfSubmit,
    selfClose,
    getCurrentSelectInfo,
    handleDeviceListChange,
    handleTimeChange,
    setTotalAmount
  } = useEditOrderStore(props);
  const { visible } = props;
  const { confirmLoading, editSupplierName, editPurchaseTime, imageList } = state;
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

  const querySupplierList = ISelectLoadingComponent({
    width: '200px',
    reqUrl: 'querySupplierList',
    placeholder: '请选择供应商',
    searchKey: editSupplierName || '',
    getCurrentSelectInfo: (value: string, option: any) => {
      getCurrentSelectInfo('supplier', option);
    },
    searchForm: { typeId: process.env.SUPPLIER_TYPE_ID }
  });

  function renderForm() {
    return (
      <Form {...formItemLayout} form={form} initialValues={{ deviceList: [{}] }}>
        <Form.Item label="采购单名称" name="name" rules={[{ required: true }]}>
          <Input placeholder="请输入采购单名称" style={{ width: '200px' }} />
        </Form.Item>
        <Form.List name="deviceList">
          {(fields, { add, remove }) => {
            return (
              <Form.Item label="采购商品" required={true} style={{ alignItems: 'start' }}>
                {fields.map((field, index) => (
                  <DeviceListSelectComponent
                    key={field.key}
                    field={field}
                    index={index}
                    add={add}
                    remove={index => {
                      remove(index);
                      setTotalAmount();
                    }}
                    defaultInfo={form.getFieldValue(['deviceList', index])}
                    handleDeviceChange={(typeName: string, option: any) =>
                      handleDeviceListChange(typeName, option, index)
                    }
                  />
                ))}
              </Form.Item>
            );
          }}
        </Form.List>
        <Form.Item label="采购单总金额" name="totalAmount" rules={[{ required: true }]}>
          <Input prefix="￥" placeholder="请输入金额" style={{ width: '200px' }} />
        </Form.Item>
        <Form.Item label="采购时间" name="purchaseTime" rules={[{ required: true }]}>
          <DatePicker
            style={{ width: '200px' }}
            showTime={{ format: 'YYYY-MM-DD HH:mm:ss' }}
            format="YYYY-MM-DD HH:mm:ss"
            defaultValue={editPurchaseTime && moment(editPurchaseTime)}
            placeholder="请选择时间"
            onChange={(date: moment.Moment, dateString: string) => {
              handleTimeChange(dateString);
            }}
          />
        </Form.Item>
        <Form.Item label="供应商" name="supplierId">
          {querySupplierList}
        </Form.Item>
        <Form.Item label="采购单图" name="image">
          <IUploadImgComponent
            maxImgNumber={3}
            fileList={imageList}
            getFileList={url => {
              form.setFieldsValue({ image: url });
            }}
          />
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
      onCancel={() => selfClose(false)}
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
