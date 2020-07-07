import * as React from 'react';
import style from './add-organization.component.less';
import { useAddOrganizationStore } from './add-organization.component.store';
import { Button, Form, Input, Radio, Select } from 'antd';
import { ISelectLoadingComponent, IUploadImgComponent } from '~/solution/components/component.module';
import { IAddOrganizationProps } from './add-organization.interface';

export default function AddOrganizationComponent(props: IAddOrganizationProps) {
  const [organizationForm] = Form.useForm();
  const { state, onSubmit, handleFormDataChange, getProvinceList, getCityList, getAreaList } = useAddOrganizationStore(
    props,
    organizationForm
  );
  const { provinceList, cityList, areaList, isEdit } = state;
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
        <Form.Item label="机构类型" name="typeId" className="form-item" rules={[{ required: true }]}>
          <ISelectLoadingComponent
            reqUrl="queryOrganizationType"
            placeholder="请选择机构类型"
            searchForm={{ systemId: process.env.SYSTEM_ID }}
            selectedValue={organizationForm.getFieldValue('typeId')}
            getCurrentSelectInfo={(value, option) => handleFormDataChange(value, 'typeId')}
          ></ISelectLoadingComponent>
        </Form.Item>
        <Form.Item label="机构全称" name="unitName" className="form-item" rules={[{ required: true }]}>
          <Input placeholder="请输入机构全称" />
        </Form.Item>
        <Form.Item label="机构简称" name="shorterName" className="form-item">
          <Input placeholder="请输入机构简称" />
        </Form.Item>
        <Form.Item label="上级机构" name="parentId" className="form-item">
          <ISelectLoadingComponent
            reqUrl="queryOrganizationSelectList"
            placeholder="请选择上级机构"
            searchForm={{
              systemId: process.env.SYSTEM_ID,
              hierarchyType: 0,
              typeId: organizationForm.getFieldValue('typeId')
            }}
            selectedValue={organizationForm.getFieldValue('parentId') || undefined}
            disabled={!organizationForm.getFieldValue('typeId')}
            getCurrentSelectInfo={(value, option) => handleFormDataChange(value, 'parentId', option)}
          ></ISelectLoadingComponent>
        </Form.Item>
        <Form.Item
          label="统一社会代码"
          name="unitCode"
          className="form-item"
          rules={[
            {
              required: true,
              pattern: /^[0-9A-HJ-NPQRTUWXY]{2}\d{6}[0-9A-HJ-NPQRTUWXY]{10}$/,
              message: '请输入正确的统一社会信用代码'
            }
          ]}
        >
          <Input placeholder="请输入统一社会信用代码" />
        </Form.Item>
        <Form.Item label="联系人" name="contactName" className="form-item" rules={[{ required: true }]}>
          <Input placeholder="请输入联系人" />
        </Form.Item>
        <Form.Item label="联系人电话" name="contactMobile" className="form-item" rules={[{ required: true }]}>
          <Input placeholder="请输入联系人电话" />
        </Form.Item>
        <Form.Item label="机构电话" name="unitMobile" className="form-item" rules={[{ required: true }]}>
          <Input placeholder="请输入机构电话" />
        </Form.Item>

        <Form.Item label="省" name="province" className="form-item" rules={[{ required: true }]}>
          <Select onClick={getProvinceList} placeholder="请选择省">
            {provinceList &&
              provinceList.map(item => (
                <Select.Option value={item.cityCode} key={item.cityCode}>
                  {item.cityName}
                </Select.Option>
              ))}
          </Select>
        </Form.Item>
        <Form.Item label="市" name="city" className="form-item" rules={[{ required: true }]}>
          <Select onClick={getCityList} placeholder="请选择市">
            {cityList &&
              cityList.map(item => (
                <Select.Option value={item.cityCode} key={item.cityCode}>
                  {item.cityName}
                </Select.Option>
              ))}
          </Select>
        </Form.Item>
        <Form.Item label="区" name="area" className="form-item" rules={[{ required: true }]}>
          <Select onClick={getAreaList} placeholder="请选择区">
            {areaList &&
              areaList.map(item => (
                <Select.Option value={item.cityCode} key={item.cityCode}>
                  {item.cityName}
                </Select.Option>
              ))}
          </Select>
        </Form.Item>

        <Form.Item label="机构地址" name="unitAddress" className="form-item" rules={[{ required: true }]}>
          <Input placeholder="请输入机构地址" />
        </Form.Item>
        {isEdit && (
          <Form.Item label="机构状态" name="state" className="form-item" rules={[{ required: true }]}>
            <Radio.Group>
              <Radio value={true}>启用</Radio>
              <Radio value={false}>禁用</Radio>
            </Radio.Group>
          </Form.Item>
        )}
        <Form.Item label="logo" name="logoUrl" className="form-item upload-images">
          <IUploadImgComponent
            getFileList={value => organizationForm.setFieldsValue({ logoUrl: value[0] })}
            fileList={state.fileList}
          ></IUploadImgComponent>
        </Form.Item>
        <Form.Item label="备注描述" name="unitRemark" className="form-item">
          <Input.TextArea style={{ verticalAlign: 'top' }} />
        </Form.Item>
      </div>
    );
  }
  return (
    <div className={style.organizationMain}>
      {renderHeader(
        () => {
          return <h4>{isEdit ? '编辑机构' : '添加机构'}</h4>;
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
        <Form
          {...formItemLayout}
          form={organizationForm}
          onFinish={onSubmit}
          onFinishFailed={onSubmit}
          validateTrigger="onFinish"
        >
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
