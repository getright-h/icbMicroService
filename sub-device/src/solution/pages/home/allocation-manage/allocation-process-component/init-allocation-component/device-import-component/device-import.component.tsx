import * as React from 'react';
import style from './device-import.component.less';
import { useDeviceImportStore } from './device-import.component.store';
import { IDeviceImportProps } from './device-import.interface';
import { RenderGridDesComponent } from '~framework/components/component.module';
import { Modal, Form, Input, Radio, Button, Upload, Space, Table } from 'antd';
import { UploadOutlined, PlusOutlined, MinusOutlined } from '@ant-design/icons';
export default function DeviceImportComponent(props: IDeviceImportProps) {
  const {
    state,
    form,
    selfSubmit,
    selfClose,
    changeImportType,
    onChange,
    removeDevice,
    checkAllotDeviceInfo,
    customRequest
  } = useDeviceImportStore(props);
  const { visible, data = {} } = props;
  const { deviceTypeList = [] } = data;
  const { importType, submitLoading, checkResult = {} } = state;
  const { errorTotal = 0, list = [], successTotal = 0, message = '' } = checkResult;
  const tableData = list.map((item: any) => item.model);
  const columns = [
    {
      title: '设备号',
      dataIndex: 'code'
    },
    {
      title: '表内行数',
      dataIndex: 'rowNumber'
    },
    {
      title: '失败原因',
      dataIndex: 'remark'
    }
  ];
  const layout = {
    labelCol: { span: 5 },
    wrapperCol: { span: 20 }
  };
  const initialValues = {};
  if (deviceTypeList.length && Array.isArray(deviceTypeList)) {
    deviceTypeList.forEach((device: any) => {
      initialValues[`device_${device.typeId}`] = [{}];
    });
  }
  function renderForm() {
    return (
      <React.Fragment>
        <Form {...layout} form={form} initialValues={initialValues}>
          <Form.Item name="name" label="目标仓库">
            {data.storeName}
          </Form.Item>
          <Form.Item name="type" label="添加方式" rules={[{ required: true }]}>
            <Radio.Group defaultValue={importType} onChange={e => changeImportType(e.target.value)}>
              <Radio value={1}>导入excel</Radio>
              <Radio value={2}>手动添加</Radio>
            </Radio.Group>
          </Form.Item>
          {importType == 1 && <RenderTypeOne />}
          {importType == 2 && <RenderTypeTwo />}
          {Object.keys(checkResult).length > 0 && (
            <>
              <Form.Item label="验证设备详情">
                <Space size={'middle'}>
                  <span>验证设备: {list.length}</span>
                  <span>验证成功: {successTotal}</span>
                  <span style={{ color: 'red' }}>验证失败: {errorTotal}</span>
                </Space>
              </Form.Item>
              {message && (
                <Form.Item>
                  <p style={{ color: 'red', marginLeft: '10%', fontSize: '15px' }}>{message}</p>
                </Form.Item>
              )}
              {errorTotal !== 0 && (
                <Form.Item>
                  <Table
                    showHeader
                    pagination={false}
                    title={() => <p style={{ textAlign: 'center' }}>失败设备一览表</p>}
                    bordered
                    columns={columns}
                    rowKey={record => record.dataIndex}
                    dataSource={tableData}
                  />
                </Form.Item>
              )}
            </>
          )}
        </Form>
      </React.Fragment>
    );
  }
  function RenderTypeOne() {
    return (
      <Form.Item label="选择文件" style={{ position: 'relative' }}>
        <Upload
          showUploadList={true}
          action="http://192.168.0.252:5301/api/allot/manage/uploadAllotDeviceExcel"
          customRequest={customRequest}
        >
          <Button>
            <UploadOutlined /> 点击上传文件
          </Button>
        </Upload>
        <Button onClick={checkAllotDeviceInfo} className={style.checkBtn}>
          验证设备
        </Button>

        {/* <Form.Item style={{ display: 'inline-block', margin: '0 8px' }}>
          <a>下载模板</a>
        </Form.Item> */}
      </Form.Item>
    );
  }

  function RenderTypeTwo() {
    return (
      <>
        {deviceTypeList.map((device: any, index: number) => (
          <Form.List name={`device_${device.typeId}`} key={device.typeId}>
            {(fields, { add, remove }) => {
              return (
                <Form.Item
                  wrapperCol={{ offset: 4, span: 16 }}
                  label={device.typeName}
                  style={{
                    position: 'relative'
                  }}
                >
                  {fields.map((field, index) => (
                    <Space key={field.key} className={style.space} align="start">
                      <Form.Item {...field} name={[field.name, 'number']} className={style.fieldItem}>
                        <Input placeholder="请输入设备号" onChange={e => onChange(e.target.value, device, field.key)} />
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
                              removeDevice(field.key);
                              remove(field.name);
                            }}
                          />
                        )}
                      </div>
                    </Space>
                  ))}
                  {index == 0 && (
                    <Button
                      onClick={checkAllotDeviceInfo}
                      className={style.checkBtn}
                      style={{
                        right: '20%'
                      }}
                    >
                      验证设备
                    </Button>
                  )}
                </Form.Item>
              );
            }}
          </Form.List>
        ))}
      </>
    );
  }
  return (
    <Modal
      title="导入设备"
      centered={true}
      visible={visible}
      width={'800px'}
      onCancel={selfClose}
      onOk={() => {
        selfSubmit();
      }}
      maskClosable={false}
      destroyOnClose={true}
      confirmLoading={submitLoading}
    >
      {renderForm()}
    </Modal>
  );
}
