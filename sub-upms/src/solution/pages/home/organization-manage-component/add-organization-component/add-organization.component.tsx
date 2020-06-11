import * as React from 'react';
import style from './add-organization.component.less';
import { useAddOrganizationStore } from './add-organization.component.store';
import { RouteComponentProps } from 'react-router-dom';
import { Button, Form, Input, Radio } from 'antd';

export default function AddOrganizationComponent(props: RouteComponentProps) {
  const { state } = useAddOrganizationStore(props);
  const {} = state;
  const formItemLayout = {
    labelCol: {
      xs: { span: 24 },
      sm: { span: 8 }
    },
    wrapperCol: {
      xs: { span: 24 },
      sm: { span: 14 }
    }
  };
  function renderHeader(leftChild: any, rightChild?: any) {
    return (
      <div className={[style.header].join(' ')}>
        {leftChild()}
        {rightChild && rightChild()}
      </div>
    );
  }
  function renderBaseInfo() {
    return (
      <div className={style.baseInfo}>
        <Form.Item label="机构类型" className={`${style.require} push-search-item`}>
          {/* <DrapChooseLoadingComponent
            reqUrl="getOrganizationPagedList"
            placeholder="请选择机构类型"
            type={1}
            defaultValue={state.formInfo.distributorName}
            getCurrentSelectInfo={value =>
            }
          ></DrapChooseLoadingComponent> */}
          <Input />
        </Form.Item>
        <Form.Item label="机构全称" className={`${style.require} push-search-item`}>
          {/* {getFieldDecorator('contractNum', {
            initialValue: state.formInfo.contractNum
          })(<Input placeholder="请输入机构全称" />)} */}
          <Input />
        </Form.Item>
        <Form.Item label="机构简称" className={'push-search-item'}>
          {/* {getFieldDecorator('contractNum', {
            initialValue: state.formInfo.contractNum
          })(<Input placeholder="请输入机构简称" />)} */}
          <Input />
        </Form.Item>
        <Form.Item label="上级机构" className={`${style.require} push-search-item`}>
          {/* <DrapChooseLoadingComponent
            reqUrl="getOrganizationPagedList"
            placeholder="请选择上级机构"
            type={1}
            defaultValue={state.formInfo.distributorName}
            getCurrentSelectInfo={value =>
            }
          ></DrapChooseLoadingComponent> */}
          <Input />
        </Form.Item>
        <Form.Item label="统一社会代码" className={`${style.require} push-search-item`}>
          {/* {getFieldDecorator('contractNum', {
            initialValue: state.formInfo.contractNum
          })(<Input placeholder="请输入统一社会代码" />)} */}
          <Input />
        </Form.Item>
        <Form.Item label="联系人" className={`${style.require} push-search-item`}>
          {/* {getFieldDecorator('contractNum', {
            initialValue: state.formInfo.contractNum
          })(<Input placeholder="请输入联系人" />)} */}
          <Input />
        </Form.Item>
        <Form.Item label="联系人电话" className={`${style.require} push-search-item`}>
          {/* {getFieldDecorator('contractNum', {
            initialValue: state.formInfo.contractNum
          })(<Input placeholder="请输入联系人电话" />)} */}
          <Input />
        </Form.Item>
        <Form.Item label="机构电话" className={`${style.require} push-search-item`}>
          {/* {getFieldDecorator('contractNum', {
            initialValue: state.formInfo.contractNum
          })(<Input placeholder="请输入机构电话" />)} */}
          <Input />
        </Form.Item>
        <Form.Item label="机构地址" className={`${style.require} push-search-item`} wrapperCol={{ span: 12 }}>
          {/* {getFieldDecorator('contractNum', {
            initialValue: state.formInfo.contractNum
          })(<Input placeholder="请输入机构地址" />)} */}
          <Input />
        </Form.Item>
        <Form.Item label="机构状态" className={`${style.require} push-search-item`}>
          {/* {getFieldDecorator('isNumberPlate', {
            initialValue: state.formInfo.isNumberPlate
          })( */}
          <Radio.Group>
            <Radio value={true}>启用</Radio>
            <Radio value={false}>禁用</Radio>
          </Radio.Group>
          {/* )} */}
        </Form.Item>
        <Form.Item label="备注描述：" className="push-search-item">
          {/* {getFieldDecorator('remark', { initialValue: state.formInfo.remark })(<Input placeholder="备注描述" />)} */}
          <Input.TextArea />
        </Form.Item>
      </div>
    );
  }
  return (
    <div className={style.organizationMain}>
      {renderHeader(
        () => {
          return <h4>添加机构</h4>;
        },
        () => {
          return (
            <Button type="primary" onClick={() => window.history.back()}>
              返回上一页
            </Button>
          );
        }
      )}
      <div className={style.lineContainer}>
        <Form layout="inline" {...formItemLayout}>
          {renderBaseInfo()}
          <Form.Item wrapperCol={{ span: 12, offset: 6 }} className={style.submitButton}>
            <Button type="primary" htmlType="submit">
              保存
            </Button>
          </Form.Item>
        </Form>
      </div>
    </div>
  );
}
