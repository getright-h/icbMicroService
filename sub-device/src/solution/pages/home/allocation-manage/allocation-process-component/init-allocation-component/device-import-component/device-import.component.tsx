import * as React from 'react';
import style from './device-import.component.less';
import { useDeviceImportStore } from './device-import.component.store';
import { IDeviceImportProps } from './device-import.interface';
import { Modal, Form, Input, Radio, Button, Upload, Space, Select, Label } from 'antd';
import { UploadOutlined, PlusOutlined, MinusOutlined } from '@ant-design/icons';

export default function DeviceImportComponent(props: IDeviceImportProps) {
  console.log(props, 3333);
  const { state, form, selfSubmit, selfClose, changeImportType } = useDeviceImportStore(props);
  const { visible, data = {} } = props;
  const { deviceTypeList = [] } = data;
  const { confirmLoading, importType } = state;
  const layout = {
    labelCol: { span: 4 },
    wrapperCol: { span: 16 }
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
            B大区仓库
          </Form.Item>
          <Form.Item name="type" label="添加方式" rules={[{ required: true }]}>
            <Radio.Group onChange={e => changeImportType(e.target.value)}>
              <Radio value={1}>导入excel</Radio>
              <Radio value={2}>手动添加</Radio>
            </Radio.Group>
          </Form.Item>
          {importType == 1 && <RenderTypeOne />}
          {importType == 2 && <RenderTypeTwo />}
        </Form>
      </React.Fragment>
    );
  }
  function RenderTypeOne() {
    return (
      <Form.Item label="选择文件" style={{ marginBottom: 0 }}>
        <Form.Item name="file" rules={[{ required: true }]} style={{ display: 'inline-block' }}>
          <Upload>
            <Button>
              <UploadOutlined /> Click to Upload
            </Button>
          </Upload>
        </Form.Item>
        <Form.Item style={{ display: 'inline-block', margin: '0 8px' }}>
          <Button>验证设备</Button>
        </Form.Item>
        <Form.Item style={{ display: 'inline-block', margin: '0 8px' }}>
          <a>下载模板</a>
        </Form.Item>
      </Form.Item>
    );
  }
  function RenderTypeTwo() {
    return (
      <>
        {deviceTypeList.map((device: any) => (
          <Form.List name={`device_${device.typeId}`} key={device.typeId}>
            {(fields, { add, remove }) => {
              return (
                <Form.Item wrapperCol={{ offset: 4, span: 16 }} label={device.typeName}>
                  {fields.map((field, index) => (
                    <Space key={field.key} className={style.space} align="start">
                      <Form.Item {...field} name={[field.name, 'number']} className={style.fieldItem}>
                        <Input placeholder="请输入设备号" />
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
        ))}
      </>
    );
  }
  return (
    <Modal
      title="导入设备"
      visible={visible}
      width={800}
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
