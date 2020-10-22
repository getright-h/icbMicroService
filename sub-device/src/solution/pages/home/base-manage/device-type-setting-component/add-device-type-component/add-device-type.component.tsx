import * as React from 'react';
import style from './add-device-type.component.less';
import { useAddDeviceTypeStore } from './add-device-type.component.store';
import { Modal, Form, Input, Radio } from 'antd';
import { ISelectLoadingComponent, IUploadImgComponent } from '~framework/components/component.module';
import { IAddDeviceType } from './add-device-type.interface';
export default function AddDeviceTypeModalComponent(props: IAddDeviceType) {
  const { state, form, onChange, onSubmit } = useAddDeviceTypeStore(props);
  const { searchForm = {}, imageList = [] } = state;
  const { visible, close, data = {} } = props;

  return (
    <Modal title={'新增设备型号'} visible={visible} width={700} onOk={onSubmit} onCancel={() => close()}>
      {' '}
      <Form
        initialValues={{
          ...data
        }}
        form={form}
      >
        <div className={style.rowList}>
          <Form.Item label="设备型号" name={'name'} rules={[{ required: true }]}>
            <Input
              placeholder={'请输入设备型号'}
              onChange={e => {
                onChange(e.target.value, 'name');
              }}
            ></Input>
          </Form.Item>
          <Form.Item label="别名" name={'alias'} rules={[{ required: true }]}>
            <Input
              placeholder={'请输入'}
              onChange={e => {
                onChange(e.target.value, 'alias');
              }}
            ></Input>
          </Form.Item>
        </div>
        <div className={style.rowList}>
          <Form.Item label="供应商" name={'supplierId'} rules={[{ required: true }]}>
            <ISelectLoadingComponent
              reqUrl="querySupplierList"
              placeholder={'请选择供应商'}
              getCurrentSelectInfo={(value: string, option: any) => onChange(value, 'supplierId')}
            />
          </Form.Item>
          <Form.Item label="定位方式" name={'locationStyle'} rules={[{ required: true }]}>
            <Input
              placeholder={'请输入'}
              onChange={e => {
                onChange(e.target.value, 'locationStyle');
              }}
            ></Input>
          </Form.Item>
        </div>
        <div className={style.rowList}>
          <Form.Item label="是否宽带电压" name={'isWideVoltage'} rules={[{ required: true }]}>
            <Radio.Group
              onChange={e => {
                onChange(e.target.value, 'isWideVoltage');
              }}
            >
              <Radio value={true}>是</Radio>
              <Radio value={false}>否</Radio>
            </Radio.Group>
          </Form.Item>
          <Form.Item label="工作电压/电流" name={'workVoltage'} rules={[{ required: true }]}>
            <Input
              placeholder={'请输入'}
              onChange={e => {
                onChange(e.target.value, 'workVoltage');
              }}
            ></Input>
          </Form.Item>
        </div>
        <div className={style.rowList}>
          <Form.Item label="LED" name={'led'} rules={[{ required: true }]}>
            <Input
              placeholder={'请输入'}
              onChange={e => {
                onChange(e.target.value, 'led');
              }}
            ></Input>
          </Form.Item>
          <Form.Item label="待机电流" name={'standbyCurrent'} rules={[{ required: true }]}>
            <Input
              placeholder={'请输入'}
              onChange={e => {
                onChange(e.target.value, 'standbyCurrent');
              }}
            ></Input>
          </Form.Item>
        </div>
        <div className={style.rowList}>
          <Form.Item label="颜色" name={'color'} rules={[{ required: true }]}>
            <Input
              placeholder={'请输入'}
              onChange={e => {
                onChange(e.target.value, 'color');
              }}
            ></Input>
          </Form.Item>
          <Form.Item label="内置电池描述" name={'batteryDesc'} rules={[{ required: true }]}>
            <Input
              placeholder={'请输入'}
              onChange={e => {
                onChange(e.target.value, 'batteryDesc');
              }}
            ></Input>
          </Form.Item>
        </div>
        <div className={style.rowList}>
          <Form.Item label="图片" name={'image'} rules={[{ required: true }]}>
            <IUploadImgComponent
              maxImgNumber={1}
              fileList={imageList}
              getFileList={url => {
                onChange(url, 'image');
              }}
            />
          </Form.Item>
        </div>
        <div className={style.rowList}>
          <Form.Item label="备注" name={'remark'} rules={[{ required: true }]}>
            <Input.TextArea
              style={{ width: 500 }}
              placeholder={'请输入'}
              onChange={e => {
                onChange(e.target.value, 'remark');
              }}
            ></Input.TextArea>
          </Form.Item>
        </div>
      </Form>
    </Modal>
  );
}
