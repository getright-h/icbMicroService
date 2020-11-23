import * as React from 'react';
import style from './bulk-import.component.less';
import { useBulkImportStore } from './bulk-import.component.store';
import { IBulkImportProps } from './bulk-import.interface';
import { Modal, Form, Input, Select, Upload, Button } from 'antd';
import { UploadOutlined } from '@ant-design/icons';

export default function BulkImportComponent(props: IBulkImportProps) {
  const { state, form, selfSubmit, selfClose } = useBulkImportStore(props);
  const { visible } = props;
  const { confirmLoading } = state;
  const layout = {
    labelCol: { span: 4 },
    wrapperCol: { span: 18 }
  };
  function renderForm() {
    return (
      <React.Fragment>
        <Form {...layout} form={form}>
          <Form.Item name="file" label="导入文件" rules={[{ required: true }]}>
            <Input.Group compact>
              <Form.Item name="file" noStyle rules={[{ required: true, message: 'Province is required' }]}>
                <Upload {...props}>
                  <Button>
                    <UploadOutlined /> Click to Upload
                  </Button>
                </Upload>
              </Form.Item>
              <span className={style.aLink}>
                <a>下载模板</a>
              </span>
            </Input.Group>
          </Form.Item>
          <Form.Item name="warehouse" label="入库仓库" rules={[{ required: true }]}>
            <Input.Group compact>
              <Form.Item name="warehouse" noStyle rules={[{ required: true, message: '选择仓库' }]}>
                <Select placeholder="选择仓库" style={{ width: 150 }}></Select>
              </Form.Item>
              <Form.Item name="location" noStyle rules={[{ required: true, message: '选择仓位' }]}>
                <Select placeholder="选择仓位" style={{ width: 150 }}></Select>
              </Form.Item>
              <span className={style.aLink}>
                <a>添加仓库/仓位</a>
              </span>
            </Input.Group>
          </Form.Item>
        </Form>
      </React.Fragment>
    );
  }
  return (
    <Modal
      title="标题"
      visible={visible}
      width={600}
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
