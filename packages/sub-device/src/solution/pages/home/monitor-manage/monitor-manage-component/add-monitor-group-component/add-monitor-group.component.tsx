import * as React from 'react';
import { useAddMonitorGroupStore } from './add-monitor-group.component.store';
import { ISelectLoadingComponent } from '~framework/components/component.module';
import { AddMonitorGroupProp } from './add-monitor-group.interface';
import { GlobalContext } from '~/solution/context/global/global.provider';

import { Form, Modal, Input } from 'antd';
export default function AddMonitorGroupComponent(props: AddMonitorGroupProp) {
  const { state, form, onchange, addMonitorGroup, close } = useAddMonitorGroupStore(props);

  const { gState } = React.useContext(GlobalContext);
  const { submitLoading, organization = {}, searchRoleName } = state;
  const { visible, data = {} } = props;
  const layout = {
    labelCol: { span: 6 },
    wrapperCol: { span: 14 }
  };
  const queryRoleList = ISelectLoadingComponent({
    width: '200px',
    reqUrl: 'queryRoleList',
    placeholder: '请选择监管角色',
    searchKey: searchRoleName || '',
    getCurrentSelectInfo: (value: string, option: any) => {
      onchange(value, 'roleId');
    },
    searchForm: {
      systemId: gState.myInfo.systemId
    }
  });
  const queryOrgList = ISelectLoadingComponent({
    width: '200px',
    reqUrl: 'queryStoreOrganization',
    placeholder: '请选择机构',
    searchKey: organization.organizationName || '',
    getCurrentSelectInfo: (value: string, option: any) => {
      onchange(option?.info || {}, 'organizationId');
    },
    searchForm: {
      systemId: gState.myInfo.systemId
    }
  });
  return (
    <Modal
      visible={visible}
      centered={true}
      title={data.id ? '修改监控组' : '添加监控组'}
      onOk={() => {
        form.validateFields().then(values => addMonitorGroup(values));
      }}
      confirmLoading={submitLoading}
      onCancel={() => close()}
    >
      <Form {...layout} form={form}>
        <Form.Item label="所在机构" name={'organizationId'} rules={[{ required: true }]}>
          {queryOrgList}
        </Form.Item>
        <Form.Item label="监控组名称" name={'name'} rules={[{ required: true }]}>
          <Input placeholder="请输入监控组名称" onChange={(e: any) => onchange(e.target.value, 'name')} />
        </Form.Item>
        <Form.Item label="监管角色" name={'roleId'} rules={[{ required: true }]}>
          {queryRoleList}
        </Form.Item>
        <Form.Item label="备注" name={'remark'}>
          <Input placeholder="请输入备注信息" onChange={(e: any) => onchange(e.target.value, 'remark')} />
        </Form.Item>
      </Form>
    </Modal>
  );
}
