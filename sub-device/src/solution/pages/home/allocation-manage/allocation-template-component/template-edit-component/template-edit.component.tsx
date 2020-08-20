import * as React from 'react';
import style from './template-edit.component.less';
import { useTemplateEditStore } from './template-edit.component.store';
import { Form, Input, Checkbox, Tooltip, Select, Cascader } from 'antd';
import { QuestionCircleOutlined } from '@ant-design/icons';

export default function TemplateEditComponent() {
  const { state, form } = useTemplateEditStore();
  const layout = {
    labelCol: { span: 4 },
    wrapperCol: { span: 12 }
  };
  const options = [
    {
      value: 'zhejiang',
      label: 'Zhejiang',
      children: [
        {
          value: 'hangzhou',
          label: 'Hangzhou'
        }
      ]
    },
    {
      value: 'jiangsu',
      label: 'Jiangsu',
      children: [
        {
          value: 'nanjing',
          label: 'Nanjing'
        }
      ]
    }
  ];
  return (
    <div className={style.mainForm}>
      <div className={style.title}>
        <h1>仓库调拨模板编辑</h1>
      </div>
      <Form {...layout} form={form}>
        <div className={style.formPart}>
          <div className={style.subTitle}>
            <h3>1. 基本资料填写</h3>
          </div>
          <div className={style.formItems}>
            <div className={style.formLeft}>
              <Form.Item name="name" label="流程名称" wrapperCol={{ span: 8 }} rules={[{ required: true }]}>
                <Input placeholder="请输入流程名称" />
              </Form.Item>
              <Form.Item name="name" label="流程类型" wrapperCol={{ span: 8 }} rules={[{ required: true }]}>
                <Checkbox defaultChecked disabled>
                  仓库间流程
                </Checkbox>
                <Tooltip
                  placement="right"
                  arrowPointAtCenter={true}
                  title="仓库间流程用于各个组织下仓库与仓库之间的设备调拨"
                >
                  <QuestionCircleOutlined style={{ color: '#ff4d4f' }} />
                </Tooltip>
              </Form.Item>
            </div>
          </div>
        </div>
        <div className={style.formPart}>
          <div className={style.subTitle}>
            <h3>2. 流程节点设置</h3>
          </div>
          <div className={style.formItems}>
            <div className={style.formLeft}>
              <Form.Item name="name" label="选择节点" rules={[{ required: true }]} style={{ marginBottom: 0 }}>
                <Form.Item
                  name="year"
                  rules={[{ required: true }]}
                  style={{ display: 'inline-block', width: 'calc(50% - 8px)' }}
                >
                  <Select placeholder="请选择" />
                </Form.Item>
                <Form.Item
                  name="month"
                  rules={[{ required: true }]}
                  style={{ display: 'inline-block', width: 'calc(50% - 8px)', margin: '0 8px' }}
                >
                  <Cascader placeholder="请选择" options={options} />
                </Form.Item>
              </Form.Item>
            </div>
          </div>
        </div>
      </Form>
    </div>
  );
}
