import * as React from 'react';
import style from './edit-station.component.less';
import { useEditStationStore } from './edit-station.component.store';
import { Modal, Form, Select, Input, Radio } from 'antd';
import { ISelectLoadingComponent } from '~/solution/components/component.module';

export default function EditStationComponent(props: any) {
  const [stationForm] = Form.useForm();
  const { title, visible, close, isEdit, info } = props;
  const { state, selfClose, selfSubmit, getRoleList, selectOrganization } = useEditStationStore(
    {
      close,
      visible,
      isEdit,
      info
    },
    stationForm
  );
  const { confirmLoading, roleList } = state;
  const layout = {
    labelCol: { span: 6 },
    wrapperCol: { span: 14 }
  };

  return (
    <Modal
      width={500}
      title={title}
      visible={visible}
      // onOk={selfSubmit}
      onOk={() => {
        stationForm
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
        stationForm.resetFields();
      }}
      maskClosable={false}
      destroyOnClose={true}
      confirmLoading={confirmLoading}
    >
      <Form {...layout} form={stationForm} name="station-form">
        {!isEdit && (
          <React.Fragment>
            <Form.Item name="parentOrganizationId" label="所属机构" rules={[{ required: true }]}>
              <ISelectLoadingComponent
                reqUrl="queryOrganizationSelectList"
                placeholder="请选择所属机构"
                searchForm={{ systemId: process.env.SYSTEM_ID, hierarchyType: 0 }}
                // defaultValue={state.formInfo.distributorName}
                getCurrentSelectInfo={(value, option) => selectOrganization(value, option)}
              ></ISelectLoadingComponent>
            </Form.Item>
            <Form.Item name="parentDepartmentId" label="所属部门">
              <ISelectLoadingComponent
                reqUrl="queryOrganizationSelectList"
                placeholder="请选择所属部门"
                searchForm={{ systemId: process.env.SYSTEM_ID, hierarchyType: 1, parentCode: state.parentCode }}
                // defaultValue={state.formInfo.distributorName}
                getCurrentSelectInfo={(value, option) => stationForm.setFieldsValue({ parentDepartmentId: value })}
              ></ISelectLoadingComponent>
            </Form.Item>
          </React.Fragment>
        )}
        <Form.Item name="name" label="岗位名称" rules={[{ required: true }]}>
          <Input placeholder="请输入岗位名称" />
        </Form.Item>
        <Form.Item name="roles" label="关联角色">
          <Select mode="multiple" style={{ width: '100%' }} placeholder="请选择角色" onClick={getRoleList}>
            {roleList &&
              roleList.map(item => (
                <Select.Option value={item.id} key={item.id}>
                  {item.name}
                </Select.Option>
              ))}
          </Select>
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