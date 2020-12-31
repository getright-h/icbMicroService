import * as React from 'react';
import style from './device-stock-in.component.less';
import { useDeviceStockInStore } from './device-stock-in.component.store';
import { IDeviceStockInProps } from './device-stock-in.interface';
import { Modal, Form, Input, Select, Space, Tooltip, Table } from 'antd';
import { ISelectLoadingComponent } from '~/framework/components/component.module';
import { Link } from 'react-router-dom';
import { PlusOutlined, MinusOutlined, InfoCircleOutlined } from '@ant-design/icons';

export default function DeviceStockInComponent(props: IDeviceStockInProps) {
  const {
    state,
    form,
    reduxState,
    selfSubmit,
    selfClose,
    getCurrentSelectInfo,
    callbackAction
  } = useDeviceStockInStore(props);
  const { visible } = props;
  const { currentSelectNode } = reduxState;
  const { confirmLoading, errorList, isErrorListVisible } = state;
  const layout = {
    labelCol: { span: 6 },
    wrapperCol: { span: 16 }
  };
  const queryDeviceTypeList = ISelectLoadingComponent({
    width: '240px',
    reqUrl: 'queryDeviceTypeList',
    placeholder: '选择设备型号',
    searchKey: '',
    getCurrentSelectInfo: (value: string, option: any) => getCurrentSelectInfo('type', option)
  });
  const queryStorePositionList = ISelectLoadingComponent({
    width: '240px',
    reqUrl: 'queryStorePositionList',
    placeholder: '选择仓位',
    searchForm: { storeId: currentSelectNode ? currentSelectNode.key : '' },
    searchKey: '',
    getCurrentSelectInfo: (value: string, option: any) => getCurrentSelectInfo('position', option)
  });
  const queryPurchaseSelectList = ISelectLoadingComponent({
    width: '240px',
    reqUrl: 'queryPurchaseSelectList',
    placeholder: '选择采购单',
    searchKey: '',
    getCurrentSelectInfo: (value: string, option: any) => getCurrentSelectInfo('purchase', option)
  });
  function renderForm() {
    return (
      <React.Fragment>
        <Form {...layout} form={form} initialValues={{ deviceList: [{}] }}>
          <Form.Item label="当前仓库" required={true}>
            {currentSelectNode && currentSelectNode.name}
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
          <Form.List name="deviceList">
            {(fields, { add, remove }) => {
              return (
                <Form.Item label="设备号/SIM卡号" required={true} style={{ alignItems: 'start' }}>
                  {fields.map((field, index) => (
                    <Space key={field.key} className={style.space} align="start">
                      <Form.Item
                        {...field}
                        name={[field.name, 'code']}
                        style={{ maxWidth: '150px' }}
                        className={style.fieldItem}
                        rules={[{ required: true, message: '请填写设备号' }]}
                      >
                        <Input placeholder="请填写设备号" />
                      </Form.Item>
                      <Form.Item
                        {...field}
                        name={[field.name, 'sim']}
                        style={{ maxWidth: '150px' }}
                        className={style.fieldItem}
                        rules={[{ required: true, message: '请填写sim卡号' }]}
                      >
                        <Input placeholder="请填写sim卡号" />
                      </Form.Item>
                      <div className={style.fieldAddButton}>
                        <PlusOutlined
                          onClick={() => {
                            add();
                          }}
                        />
                        <MinusOutlined
                          onClick={() => {
                            remove(field.name);
                            index == 0 && add();
                          }}
                        />
                      </div>
                    </Space>
                  ))}
                </Form.Item>
              );
            }}
          </Form.List>
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

  function ErrorList() {
    const columns = [
      {
        title: '设备号',
        dataIndex: 'code'
      },
      {
        title: 'sim卡号',
        dataIndex: 'sim'
      },
      {
        title: '失败原因',
        dataIndex: 'message'
      },
      {
        title: '操作',
        dataIndex: 'action',
        render: (render: any, data: any) => {
          return (
            <React.Fragment>
              {data.isRenew ? (
                <a
                  onClick={() => {
                    callbackAction(data);
                  }}
                >
                  恢复
                </a>
              ) : data.isRenewed ? (
                '已恢复'
              ) : (
                '-'
              )}
            </React.Fragment>
          );
        }
      }
    ];
    return (
      <Modal
        width={600}
        title="失败设备一览表"
        visible={isErrorListVisible}
        footer={null}
        onCancel={() => selfClose(true)}
        maskClosable={false}
        destroyOnClose={true}
      >
        <Table dataSource={errorList} columns={columns} rowKey={row => row.code} pagination={false}></Table>
      </Modal>
    );
  }

  return (
    <React.Fragment>
      <Modal
        title="设备入库"
        visible={visible}
        width={640}
        centered={true}
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
      <ErrorList />
    </React.Fragment>
  );
}
