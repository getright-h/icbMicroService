import * as React from 'react';
import style from './edit-department.component.less';
import { Form, Modal, Input, Radio, Select } from 'antd';
import { ISelectLoadingComponent } from '~/solution/components/component.module';
import { useEditDepartmentStore } from './edit-department.component.store';
import { StorageUtil } from '~/framework/util/storage';

const SYSTEMID = StorageUtil.getLocalStorage('systemId');

export default function EditDepartmentComponent(props: any) {
  const [departmentForm] = Form.useForm();
  const { title, visible, close, isEdit, info } = props;
  const { state, selfClose, selfSubmit, selectOrganization } = useEditDepartmentStore(
    {
      close,
      visible,
      isEdit,
      info
    },
    departmentForm
  );
  const { confirmLoading } = state;
  const layout = {
    labelCol: { span: 6 },
    wrapperCol: { span: 14 }
  };

  return (
    <Modal
      width={500}
      title={title}
      visible={visible}
      onOk={() => {
        departmentForm
          .validateFields()
          .then(values => {
            selfSubmit(values);
          })
          .catch(info => {
            console.log('Validate Failed:', info);
          });
      }}
      onCancel={() => {
        selfClose();
        departmentForm.resetFields();
      }}
      maskClosable={false}
      destroyOnClose={true}
      confirmLoading={confirmLoading}
    >
      <Form {...layout} form={departmentForm} name="station-form">
        {!isEdit && (
          <React.Fragment>
            <Form.Item name="parentOrganizationId" label="所属机构" rules={[{ required: true }]}>
              <ISelectLoadingComponent
                reqUrl="queryOrganizationSelectList"
                placeholder="请选择所属机构"
                searchForm={{ systemId: SYSTEMID, hierarchyType: 0 }}
                getCurrentSelectInfo={(value, option) => selectOrganization(value, option)}
              ></ISelectLoadingComponent>
            </Form.Item>
            <Form.Item name="parentDepartmentId" label="上级部门">
              <ISelectLoadingComponent
                reqUrl="queryOrganizationSelectList"
                placeholder="请选择上级部门"
                searchForm={{ systemId: SYSTEMID, hierarchyType: 1, parentCode: state.parentCode }}
                getCurrentSelectInfo={value => departmentForm.setFieldsValue({ parentDepartmentId: value })}
              ></ISelectLoadingComponent>
            </Form.Item>
          </React.Fragment>
        )}
        <Form.Item name="name" label="岗位名称" rules={[{ required: true }]}>
          <Input placeholder="请输入岗位名称" />
        </Form.Item>
        <Form.Item name="state" label="岗位状态">
          <Radio.Group buttonStyle="solid">
            <Radio.Button value={true}>启用</Radio.Button>
            <Radio.Button value={false}>禁用</Radio.Button>
            {/* <Radio value={true}>启用</Radio>
            <Radio value={false}>禁用</Radio> */}
          </Radio.Group>
        </Form.Item>
        <Form.Item name="instruction" label="说明">
          <Input.TextArea rows={4} />
        </Form.Item>
      </Form>
    </Modal>
  );
}
