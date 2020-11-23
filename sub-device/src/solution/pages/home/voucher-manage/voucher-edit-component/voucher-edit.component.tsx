import * as React from 'react';
import style from './voucher-edit.component.less';
import { useVoucherEditStore } from './voucher-edit.component.store';
import { IVoucherEditProps } from './voucher-edit.interface';
import { Modal, Form, Input, Select, Tooltip, DatePicker } from 'antd';
import { InfoCircleOutlined } from '@ant-design/icons';
import { ISelectLoadingComponent, IUploadImgComponent } from '~/framework/components/component.module';

export default function VoucherEditComponent(props: IVoucherEditProps) {
  const { state, form, selfSubmit, selfClose, getDeviceCodeList } = useVoucherEditStore(props);
  const { visible } = props;
  const { confirmLoading, deviceCodeList } = state;
  const layout = {
    labelCol: { span: 6 },
    wrapperCol: { span: 14 }
  };

  function renderForm() {
    const queryVehicleList = ISelectLoadingComponent({
      width: '240px',
      reqUrl: 'queryVehicleList',
      placeholder: '请输入车架号',
      searchKeyName: 'strValue',
      getCurrentSelectInfo: (option: any) => {
        getDeviceCodeList(option);
      }
    });
    return (
      <React.Fragment>
        <Form {...layout} form={form}>
          <Form.Item name="vinNo" label="关联车辆" required={true}>
            <Input.Group compact>
              <Form.Item name="vinNo" noStyle rules={[{ required: true, message: '请输入车架号' }]}>
                {queryVehicleList}
              </Form.Item>
              <span className={style.aLink}>
                <Tooltip placement="right" arrowPointAtCenter title="仅已绑定设备车辆支持添加安装单">
                  <InfoCircleOutlined className={style.primaryIcon} />
                </Tooltip>
              </span>
            </Input.Group>
          </Form.Item>
          <Form.Item name="deviceCodeList" label="关联设备" style={{ alignItems: 'baseline' }}>
            {deviceCodeList.length ? deviceCodeList.map(item => <div key={item}>{item}</div>) : '-'}
          </Form.Item>
          <Form.Item label="安装时间" name="time" rules={[{ required: true }]}>
            <DatePicker
              style={{ width: '240px' }}
              showTime={{ format: 'YYYY-MM-DD HH:mm:ss' }}
              format="YYYY-MM-DD HH:mm:ss"
              placeholder="请选择时间"
            />
          </Form.Item>
          <Form.Item name="name" label="安装工" rules={[{ required: true }]}>
            <Input placeholder="请输入安装工姓名" style={{ width: '240px' }} />
          </Form.Item>
          <Form.Item name="mobile" label="联系方式">
            <Input placeholder="请输入手机号码" style={{ width: '240px' }} />
          </Form.Item>

          <Form.Item name="pictureList" label="安装图片">
            <IUploadImgComponent
              fileList={state.pictureList}
              getFileList={url => {
                form.setFieldsValue({ pictureList: url });
              }}
            />
          </Form.Item>
          <Form.Item name="address" label="安装地址">
            <Input placeholder="请输入安装地址" />
          </Form.Item>
          <Form.Item name="remark" label="备注">
            <Input.TextArea placeholder="请输入备注" />
          </Form.Item>
        </Form>
      </React.Fragment>
    );
  }
  return (
    <Modal
      title={state.isEdit ? '编辑安装单' : '新增安装单'}
      visible={visible}
      width={700}
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
      {renderForm()}
    </Modal>
  );
}
