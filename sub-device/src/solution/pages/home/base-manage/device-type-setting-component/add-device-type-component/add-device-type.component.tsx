import * as React from 'react';
import style from './add-device-type.component.less';
import { useAddDeviceTypeStore } from './add-device-type.component.store';
import { Modal, Form, Input, Radio, Select, Divider, Checkbox } from 'antd';
import { ISelectLoadingComponent, IUploadImgComponent } from '~framework/components/component.module';
import { IAddDeviceType } from './add-device-type.interface';

export default function AddDeviceTypeModalComponent(props: IAddDeviceType) {
  const { state, form, onSubmit, checkAllTypes } = useAddDeviceTypeStore(props);
  const { imageList = [], submitLoading, typeList } = state;
  const { visible, close, data } = props;

  const querySupplierList = ISelectLoadingComponent({
    width: '200px',
    reqUrl: 'querySupplierList',
    placeholder: '请选择供应商',
    searchKey: data.supplierName || '',
    getCurrentSelectInfo: (value: string, option: any) => {
      form.setFieldsValue({ supplierId: value });
    },
    searchForm: { typeId: process.env.SUPPLIER_TYPE_ID }
  });
  return (
    <Modal
      title={data.id ? '修改设备型号' : '新增设备型号'}
      centered={true}
      visible={visible}
      width={700}
      onOk={onSubmit}
      onCancel={() => close()}
      confirmLoading={submitLoading}
    >
      <Form form={form}>
        <div className={style.rowList}>
          <Form.Item label="设备型号" name={'name'} rules={[{ required: true }]}>
            <Input placeholder={'请输入设备型号'}></Input>
          </Form.Item>
          <Form.Item label="别名" name={'alias'}>
            <Input placeholder={'请输入'}></Input>
          </Form.Item>
        </div>
        <div className={style.rowList}>
          <Form.Item name="cmdIds" label="指令类型" rules={[{ required: true }]}>
            <Select
              style={{ width: '200px' }}
              mode="multiple"
              maxTagCount={5}
              allowClear
              placeholder="请选择指令类型"
              dropdownRender={menu => (
                <div>
                  {menu}
                  <Divider style={{ margin: '2px 0' }} />
                  <div style={{ padding: '4px 8px 8px 8px' }}>
                    <Checkbox onChange={checkAllTypes}>全选</Checkbox>
                  </div>
                </div>
              )}
            >
              {typeList &&
                typeList.map(type => (
                  <Select.Option key={type.cmdCode} value={type.cmdCode}>
                    {type.cmdName}
                  </Select.Option>
                ))}
            </Select>
          </Form.Item>
          <Form.Item label="定位方式" name={'locationStyle'}>
            <Input placeholder={'请输入'}></Input>
          </Form.Item>
        </div>
        <div className={style.rowList}>
          <Form.Item label="供应商" name={'supplierId'}>
            {querySupplierList}
          </Form.Item>

          <Form.Item label="工作电压/电流" name={'workVoltage'}>
            <Input placeholder={'请输入'}></Input>
          </Form.Item>
        </div>
        <div className={style.rowList}>
          <Form.Item label="是否宽带电压" name={'isWideVoltage'}>
            <Radio.Group>
              <Radio value={true}>是</Radio>
              <Radio value={false}>否</Radio>
            </Radio.Group>
          </Form.Item>

          <Form.Item label="待机电流" name={'standbyCurrent'}>
            <Input placeholder={'请输入'}></Input>
          </Form.Item>
        </div>
        <div className={style.rowList}>
          <Form.Item label="LED" name={'led'}>
            <Input placeholder={'请输入'}></Input>
          </Form.Item>

          <Form.Item label="内置电池描述" name={'batteryDesc'}>
            <Input placeholder={'请输入'}></Input>
          </Form.Item>
        </div>
        <div className={style.rowList}>
          <Form.Item label="颜色" name={'color'}>
            <Input placeholder={'请输入'}></Input>
          </Form.Item>
        </div>
        <div className={style.rowList}>
          <Form.Item label="图片" name={'image'}>
            <IUploadImgComponent
              maxImgNumber={1}
              fileList={imageList}
              getFileList={url => {
                form.setFieldsValue({ image: url });
              }}
            />
          </Form.Item>
        </div>
        <div className={style.rowList}>
          <Form.Item label="备注" name={'remark'}>
            <Input.TextArea style={{ width: 500 }} placeholder={'请输入'}></Input.TextArea>
          </Form.Item>
        </div>
      </Form>
    </Modal>
  );
}
