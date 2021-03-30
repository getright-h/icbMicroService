import * as React from 'react';
import style from './add-organization.component.less';
import { useAddOrganizationStore } from './add-organization.component.store';
import { Form, Input, Radio, Select, Modal } from 'antd';
import { ISelectLoadingComponent, IUploadImgComponent } from '~/solution/components/component.module';
import { IAddOrganizationProps } from './add-organization.interface';
import { IGlobalState } from '~/solution/context/global/global.interface';
import { GlobalContext } from '~/solution/context/global/global.provider';

export default function AddOrganizationComponent(props: IAddOrganizationProps) {
  const { gState }: IGlobalState = React.useContext(GlobalContext);
  const { isEdit, isDetail, visible } = props;
  const {
    state,
    organizationForm,
    onSubmit,
    handleFormDataChange,
    getProvinceList,
    getCityList,
    getAreaList,
    changeOrgType,
    handleAreaChange
  } = useAddOrganizationStore(props);
  const { typeList, provinceList, cityList, areaList, confirmLoading, formInfo } = state;
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
  function renderBaseInfo() {
    return (
      <div className={style.baseInfo}>
        <Form.Item label="机构类型" name="typeId" className="form-item" rules={[{ required: true }]}>
          <Select placeholder="请选择机构类型" onChange={value => changeOrgType(value)}>
            {typeList &&
              typeList.map(item => (
                <Select.Option value={item.id} key={item.id}>
                  {item.name}
                </Select.Option>
              ))}
          </Select>
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
              systemId: gState.myInfo.systemId,
              hierarchyType: 0,
              typeId: organizationForm.getFieldValue('typeId')
            }}
            searchKey={organizationForm.getFieldValue('parentName') || ''}
            selectedValue={organizationForm.getFieldValue('parentId') || undefined}
            disabled={!formInfo.typeId}
            getCurrentSelectInfo={(value, option) => handleFormDataChange(value, option)}
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
          <Select
            onClick={getProvinceList}
            placeholder="请选择省"
            onChange={(value: any, option: any) => handleAreaChange('province', option)}
            onClear={() => handleAreaChange('province')}
          >
            {provinceList &&
              provinceList.map(item => (
                <Select.Option value={item.cityCode} key={item.cityCode}>
                  {item.cityName}
                </Select.Option>
              ))}
          </Select>
        </Form.Item>
        <Form.Item label="市" name="city" className="form-item" rules={[{ required: true }]}>
          <Select
            onClick={getCityList}
            placeholder="请选择市"
            disabled={!organizationForm.getFieldValue('province')}
            onChange={(value: any, option: any) => handleAreaChange('city', option)}
            onClear={() => handleAreaChange('city')}
          >
            {cityList &&
              cityList.map(item => (
                <Select.Option value={item.cityCode} key={item.cityCode}>
                  {item.cityName}
                </Select.Option>
              ))}
          </Select>
        </Form.Item>
        <Form.Item label="区" name="area" className="form-item" rules={[{ required: true }]}>
          <Select
            onClick={getAreaList}
            placeholder="请选择区"
            disabled={!organizationForm.getFieldValue('city')}
            onChange={(value: any, option: any) => handleAreaChange('area', option)}
            onClear={() => handleAreaChange('area')}
          >
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
    <Modal
      width={'75vw'}
      title={isEdit && !isDetail ? '编辑机构' : isDetail ? '机构详情' : '添加机构'}
      visible={visible}
      okText={'保存'}
      onOk={() => {
        organizationForm
          .validateFields()
          .then(values => {
            onSubmit(values);
          })
          .catch(info => {
            console.log('Validate Failed:', info);
          });
      }}
      onCancel={() => {
        props.close();
        organizationForm.resetFields();
      }}
      okButtonProps={{ disabled: isDetail }}
      cancelButtonProps={{ disabled: isDetail }}
      maskClosable={false}
      destroyOnClose={true}
      confirmLoading={confirmLoading}
    >
      <div className={style.lineContainer}>
        <Form {...formItemLayout} form={organizationForm}>
          {renderBaseInfo()}
        </Form>
      </div>
    </Modal>
  );
}
