import * as React from 'react';
import style from './voucher-edit.component.less';
import { useVoucherEditStore } from './voucher-edit.component.store';
import { IVoucherEditProps } from './voucher-edit.interface';
import { Modal, Form, Input, Select, Tooltip, DatePicker } from 'antd';
import { InfoCircleOutlined } from '@ant-design/icons';
import { IUploadImgComponent } from '~/framework/components/component.module';

export default function VoucherEditComponent(props: IVoucherEditProps) {
  const { state, form, selfSubmit, selfClose } = useVoucherEditStore(props);
  const { visible } = props;
  const { confirmLoading } = state;
  const layout = {
    labelCol: { span: 6 },
    wrapperCol: { span: 14 }
  };

  function renderForm() {
    return (
      <React.Fragment>
        <Form {...layout} form={form}>
          <Form.Item name="storePositionId" label="关联车辆" required={true}>
            <Input.Group compact>
              <Form.Item name="storePositionId" noStyle rules={[{ required: true, message: '请选择关联车辆' }]}>
                {/* {queryStorePositionList} */}
                <Select style={{ width: '240px' }}></Select>
              </Form.Item>
              <span className={style.aLink}>
                <Tooltip placement="right" arrowPointAtCenter title="仅已绑定设备车辆支持添加安装单">
                  <InfoCircleOutlined className={style.primaryIcon} />
                </Tooltip>
              </span>
            </Input.Group>
          </Form.Item>
          <Form.Item name="deviceList" label="关联设备">
            <Select style={{ width: '240px' }}></Select>
          </Form.Item>
          <Form.Item label="采购时间" name="purchaseTime" rules={[{ required: true }]}>
            <DatePicker
              style={{ width: '240px' }}
              showTime={{ format: 'YYYY-MM-DD HH:mm:ss' }}
              format="YYYY-MM-DD HH:mm:ss"
              // defaultValue={editPurchaseTime && moment(editPurchaseTime)}
              placeholder="请选择时间"
              // onChange={(date: moment.Moment, dateString: string) => {
              //   handleTimeChange(dateString);
              // }}
            />
          </Form.Item>
          <Form.Item name="name" label="安装工" rules={[{ required: true }]}>
            <Input placeholder="请输入安装工姓名" style={{ width: '240px' }} />
          </Form.Item>
          <Form.Item name="name" label="联系方式">
            <Input placeholder="请输入手机号码" style={{ width: '240px' }} />
          </Form.Item>

          <Form.Item name="name" label="安装图片">
            <IUploadImgComponent
            // fileList={imageList}
            // getFileList={url => {
            //   form.setFieldsValue({ image: url });
            // }}
            />
          </Form.Item>
          <Form.Item name="name" label="安装地址">
            <Input placeholder="请输入安装地址" />
          </Form.Item>
          <Form.Item name="name" label="备注">
            <Input.TextArea placeholder="请输入备注" />
          </Form.Item>
        </Form>
      </React.Fragment>
    );
  }
  return (
    <Modal
      title="标题"
      visible={visible}
      width={700}
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
