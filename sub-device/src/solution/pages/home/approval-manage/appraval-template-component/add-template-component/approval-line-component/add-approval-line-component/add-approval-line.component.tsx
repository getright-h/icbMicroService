import * as React from 'react';
import style from './add-approval-line.component.less';
import { useAddApprovalLineStore } from './add-approval-line.component.store';
import { Form, Modal, Radio } from 'antd';
import { ISelectLoadingComponent } from '~/framework/components/component.module';
import { GlobalContext } from '~/solution/context/global/global.provider';
import { AddApprovalLineComponentProps } from './add-approval-line.interface';

export default function AddApprovalLineComponent(props: AddApprovalLineComponentProps) {
  const { state, handleOk, handleCancel, form, onValuesChange, getCurrentSelectInfo } = useAddApprovalLineStore(props);
  const { gState } = React.useContext(GlobalContext);
  const { addAddApprovalLineVisible } = props;
  const { confirmLoading, currentMode } = state;

  const ISelectLoadingComponentX = ISelectLoadingComponent({
    placeholder: '请输入姓名/电话',
    showSearch: true,
    mode: 'multiple',
    allowClear: false,
    searchForm: {
      systemId: gState.myInfo.systemId,
      beginTime: 0,
      endTime: 0
    },
    reqUrl: 'queryUserPagedList',
    getCurrentSelectInfo: (value, info) => getCurrentSelectInfo(value, info, 'userList')
  });
  const ISelectLoadingComponentY = ISelectLoadingComponent({
    placeholder: '请输入角色',
    showSearch: true,
    mode: 'multiple',
    isData: true,
    allowClear: false,
    searchForm: {
      systemId: gState.myInfo.systemId
    },
    reqUrl: 'queryRoleList',
    getCurrentSelectInfo: (value, info) => getCurrentSelectInfo(value, info, 'roleList')
  });
  function RenderApprovalLineSetting() {
    return (
      <Form form={form} initialValues={{ mode: 1 }} onValuesChange={onValuesChange}>
        <Form.Item name="mode" label="选择方式" rules={[{ required: true }]}>
          <Radio.Group>
            <Radio value={1}>指定人员</Radio>
            <Radio value={2}>角色</Radio>
          </Radio.Group>
        </Form.Item>

        {currentMode == 1 ? (
          <Form.Item name="userIds" label={'选择成员'} dependencies={['mode']} rules={[{ required: true }]}>
            {ISelectLoadingComponentX}
          </Form.Item>
        ) : (
          <Form.Item name="roleList" label={'选择角色'} dependencies={['mode']} rules={[{ required: true }]}>
            {ISelectLoadingComponentY}
          </Form.Item>
        )}
      </Form>
    );
  }
  return (
    <Modal
      title={'审批人设置'}
      visible={addAddApprovalLineVisible}
      onOk={handleOk}
      destroyOnClose
      confirmLoading={confirmLoading}
      onCancel={handleCancel}
    >
      {RenderApprovalLineSetting()}
    </Modal>
  );
}
