import { InfoCircleFilled } from '@ant-design/icons';
import { Form, Input, Modal } from 'antd';
import * as React from 'react';
import style from './input-export-filename.component.less';
import { useInputExportFilenameStore } from './input-export-filename.component.store';
import { IInputExportFilenameProps } from './input-export-filename.interface';

export default function InputExportFilenameComponent(props: IInputExportFilenameProps) {
  const { state, form } = useInputExportFilenameStore(props);
  return (
    <Modal
      title="导出"
      visible={props.visible}
      onOk={() => {
        form
          .validateFields()
          .then(values => {
            props?.getValues(values);
          })
          .catch(info => {
            console.log('Validate Failed:', info);
          });
      }}
      onCancel={() => {
        form.resetFields();
        props?.close();
      }}
    >
      <Form form={form}>
        <Form.Item name="name" label="导出任务名称">
          <Input placeholder="请输入导出任务名称（非必填）" />
        </Form.Item>
        <Form.Item>
          <div className={style.hint}>
            <InfoCircleFilled />
            <span>导出任务在离线任务中心查看</span>
          </div>
        </Form.Item>
      </Form>
    </Modal>
  );
}
