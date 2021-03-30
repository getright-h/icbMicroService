import * as React from 'react';
import style from './device-edit.component.less';
import { useDeviceEditStore } from './device-edit.component.store';
import { IDeviceEditProps } from './device-edit.interface';
import { Modal, Form, Input, Select, Tooltip, Descriptions } from 'antd';
import { InfoCircleOutlined } from '@ant-design/icons';
import { Link } from 'react-router-dom';
import { ISelectLoadingComponent } from '~/framework/components/component.module';

export default function DeviceEditComponent(props: IDeviceEditProps) {
  const { state, form, $auth, selfSubmit, selfClose, changeToEdit, getCurrentSelectInfo } = useDeviceEditStore(props);
  const { visible } = props;
  const { confirmLoading, isEdit, details, formData } = state;

  const queryDeviceTypeList: any = ISelectLoadingComponent({
    width: '240px',
    reqUrl: 'queryDeviceTypeList',
    placeholder: '选择设备型号',
    searchKey: formData.typeName || undefined,
    getCurrentSelectInfo: (value: string, option: any) => getCurrentSelectInfo('type', option)
  });
  const queryStorePositionList: any = ISelectLoadingComponent({
    width: '240px',
    reqUrl: 'queryStorePositionList',
    placeholder: '选择仓位',
    searchForm: { storeId: details ? details.storeId : '' },
    searchKey: formData.storePositionName || undefined,
    getCurrentSelectInfo: (value: string, option: any) => getCurrentSelectInfo('position', option)
  });
  const queryPurchaseSelectList: any = ISelectLoadingComponent({
    width: '240px',
    reqUrl: 'queryPurchaseSelectList',
    placeholder: '选择采购单',
    searchKey: formData.purchaseName || undefined,
    getCurrentSelectInfo: (value: string, option: any) => getCurrentSelectInfo('purchase', option)
  });

  function renderDetail() {
    return (
      <div className={style.detail}>
        {details && (
          <div className={style.detailLeft}>
            <Descriptions bordered size="small" column={1}>
              <Descriptions.Item label="设备型号">{details.typeName}</Descriptions.Item>
              <Descriptions.Item label="设备号">{details.code}</Descriptions.Item>
              <Descriptions.Item label="SIM卡号">{details.sim}</Descriptions.Item>
              <Descriptions.Item label="入库仓库">
                {details.storeName + ' - ' + details.storePositionName}
              </Descriptions.Item>
              <Descriptions.Item label="设备状态">{details.stateText}</Descriptions.Item>
              <Descriptions.Item label="在库时长">{details.duration}天</Descriptions.Item>
              <Descriptions.Item label="采购单">{details.purchaseName || '-'}</Descriptions.Item>
              <Descriptions.Item label="入库人">{details.creatorName}</Descriptions.Item>
            </Descriptions>
          </div>
        )}
        <div className={style.detailRight}>
          <a className={`${$auth['editMaterial'] ? '' : 'no-auth-link'}`} onClick={changeToEdit}>
            编辑
          </a>
        </div>
      </div>
    );
  }
  function renderForm() {
    const layout = {
      labelCol: { span: 6 },
      wrapperCol: { span: 14 }
    };

    return (
      <React.Fragment>
        <Form {...layout} form={form}>
          <Form.Item label="当前仓库" required={true}>
            {details && details.storeName}
          </Form.Item>
          <Form.Item name="storePositionId" label="入库仓位" required={true}>
            <Input.Group compact>
              <Form.Item name="storePositionId" noStyle rules={[{ required: true, message: '请选择入库仓位' }]}>
                {queryStorePositionList}
              </Form.Item>
              <span className={style.aLink}>
                <Link to="/home/baseManage/warehouse">添加仓位</Link>
              </span>
            </Input.Group>
          </Form.Item>
          <Form.Item name="typeId" label="设备型号" rules={[{ required: true }]}>
            {queryDeviceTypeList}
          </Form.Item>
          <Form.Item name="code" label="设备号" rules={[{ required: true }]}>
            <Input placeholder="请输入设备号" style={{ width: 200 }} />
          </Form.Item>
          <Form.Item name="sim" label="SIM卡号" rules={[{ required: true }]}>
            <Input placeholder="SIM卡号" style={{ width: 200 }} />
          </Form.Item>
          <Form.Item name="state" label="设备状态" rules={[{ required: true }]}>
            <Select placeholder="请选择设备状态" style={{ width: '240px' }}>
              <Select.Option value={1}>正常</Select.Option>
              <Select.Option value={2}>故障</Select.Option>
              <Select.Option value={3}>损坏</Select.Option>
            </Select>
          </Form.Item>
          <Form.Item name="purchaseId" label="采购单">
            <Input.Group compact>
              <Form.Item name="purchaseId" noStyle>
                {queryPurchaseSelectList}
              </Form.Item>
              <span className={style.aLink}>
                <Tooltip placement="right" arrowPointAtCenter title="关联采购单可帮您追溯采购时间、成本等">
                  <InfoCircleOutlined className={style.primaryIcon} />
                </Tooltip>
              </span>
            </Input.Group>
          </Form.Item>
        </Form>
      </React.Fragment>
    );
  }
  return (
    <Modal
      title="设备详情"
      visible={visible}
      centered={true}
      width={600}
      onCancel={() => selfClose(false)}
      onOk={() => {
        if (isEdit) {
          form
            .validateFields()
            .then(values => selfSubmit(values))
            .catch(info => {
              console.log('Validate Failed:', info);
            });
        } else {
          selfClose(false);
        }
      }}
      maskClosable={false}
      destroyOnClose={true}
      confirmLoading={confirmLoading}
    >
      {isEdit ? renderForm() : renderDetail()}
    </Modal>
  );
}
