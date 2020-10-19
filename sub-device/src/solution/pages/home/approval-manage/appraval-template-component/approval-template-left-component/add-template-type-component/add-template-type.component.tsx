import * as React from 'react';
import style from './add-template-type.component.less';
import { useAddTemplateTypeStore } from './add-template-type.component.store';
import { IAddTemplateTypeProps } from './add-template-type.interface';
import { Button, Form, Input, Modal, Tree } from 'antd';
import { ISelectLoadingComponent } from '~/framework/components/component.module';
import { GlobalContext } from '~/solution/context/global/global.provider';

export default function AddTemplateTypeComponent(props: IAddTemplateTypeProps) {
  const {
    state,
    handleOk,
    handleCancel,
    onExpand,
    onCheck,
    getCurrentSelectInfo,
    onLoadData
  } = useAddTemplateTypeStore(props);
  const { isEdit, addApprovalTypeVisible } = props;
  const { confirmLoading, expandedKeys, treeData, checkedKeys } = state;
  const { gState } = React.useContext(GlobalContext);

  function RenderLinkOrganization() {
    return (
      <div className={style.linkOrganization}>
        <div>
          <span>选择</span>
          <div className={style.chooseOrganization}>
            <RenderTree />
          </div>
        </div>
        <div>
          <span>已选</span>
          <div className={style.haveChooseOrganization}>
            <RenderTree />
          </div>
        </div>
      </div>
    );
  }

  function RenderTree() {
    return (
      <div className={style.approvalListLeft}>
        <div className={style.searchApproval}>
          <ISelectLoadingComponent
            placeholder="请输入机构名称"
            width={'100%'}
            showSearch
            searchForm={{
              systemId: gState.myInfo.systemId
            }}
            reqUrl="queryStoreOrganization"
            getCurrentSelectInfo={value => getCurrentSelectInfo<string>(value, 'id')}
          />
        </div>
        <Tree
          loadData={onLoadData}
          expandedKeys={expandedKeys}
          onExpand={onExpand}
          checkedKeys={checkedKeys}
          onCheck={onCheck}
          blockNode
          treeData={treeData}
          checkable
        />
      </div>
    );
  }

  return (
    <Modal
      title={`${isEdit ? '编辑' : '创建'}模板类型`}
      visible={addApprovalTypeVisible}
      onOk={handleOk}
      width={1000}
      destroyOnClose
      confirmLoading={confirmLoading}
      onCancel={handleCancel}
    >
      <Form.Item name="name" label="模板类型" rules={[{ required: true }]}>
        <Input placeholder="请输入模板类型" />
      </Form.Item>
      <Form.Item name="organization" label="关联机构" rules={[{ required: true }]}>
        <RenderLinkOrganization />
      </Form.Item>
    </Modal>
  );
}
