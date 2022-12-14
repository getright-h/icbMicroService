import * as React from 'react';
import style from './unbind-device.component.less';
import { useUnbindDeviceStore } from './unbind-device.component.store';
import { IUnbindDeviceProps } from './unbind-device.interface';
import { Modal, Form, Input, Button, Select } from 'antd';
import { ExclamationCircleOutlined } from '@ant-design/icons';
import { ISelectLoadingComponent } from '~/framework/components/component.module';

export default function UnbindDeviceComponent(props: IUnbindDeviceProps) {
  const { state, form, selfSubmit, selfClose, changeModal, deviceUnbind, getSelectStore } = useUnbindDeviceStore(props);
  const { visible } = props;
  const { confirmLoading, unbindType, selectStoreId } = state;
  const layout = {
    labelCol: { span: 6 },
    wrapperCol: { span: 18 }
  };
  function renderForm() {
    return (
      <React.Fragment>
        <Form {...layout} form={form}>
          <Form.Item label="选择入库位置" required={true}>
            <Input.Group compact>
              <Form.Item name={'storeId'} noStyle rules={[{ required: true, message: '请选择仓库' }]}>
                <ISelectLoadingComponent
                  width="50%"
                  reqUrl="queryStoreList"
                  dropdownMatchSelectWidth={false}
                  placeholder="请选择仓库"
                  searchKey=""
                  getCurrentSelectInfo={(value: string, option: any) => getSelectStore(value)}
                />
              </Form.Item>
              <Form.Item name={'storePositionId'} noStyle rules={[{ required: true, message: '请选择仓位' }]}>
                <ISelectLoadingComponent
                  width="50%"
                  reqUrl="queryStorePositionList"
                  dropdownMatchSelectWidth={false}
                  placeholder="请选择仓位"
                  searchKey=""
                  disabled={!selectStoreId}
                  searchForm={{ storeId: selectStoreId }}
                  getCurrentSelectInfo={(value: string, option: any) => form.setFieldsValue({ storePositionId: value })}
                />
              </Form.Item>
            </Input.Group>
          </Form.Item>
        </Form>
      </React.Fragment>
    );
  }
  return unbindType === 1 ? (
    <Modal
      title="解绑入库"
      visible={visible}
      width={600}
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
  ) : (
    <Modal
      title="设备解绑"
      visible={visible}
      width={600}
      onCancel={() => selfClose()}
      footer={[
        <Button key="stock" type="primary" onClick={changeModal}>
          解绑入库
        </Button>,
        <Button key="unbind" type="primary" onClick={deviceUnbind} loading={confirmLoading}>
          直接解绑
        </Button>,
        <Button key="cancel" onClick={() => selfClose()}>
          取消
        </Button>
      ]}
      maskClosable={false}
      destroyOnClose={true}
      confirmLoading={confirmLoading}
    >
      <div className={style.info}>
        <ExclamationCircleOutlined className={style.primaryIcon} />
        <span>设备解绑将无法查询车辆GPS信息，是否确认？</span>
      </div>
    </Modal>
  );
}
