import * as React from 'react';
import style from './move-template.component.less';
import { useMoveTemplateStore } from './move-template.component.store';
import { Modal, Tree } from 'antd';
import { ISelectLoadingComponent } from '~/framework/components/component.module';
import { GlobalContext } from '~/solution/context/global/global.provider';

export default function MoveTemplateComponent() {
  const { state } = useMoveTemplateStore();
  const { gState } = React.useContext(GlobalContext);
  function RenderChooseTemplate() {
    return <div className={style.linkOrganization}>
    <div>
      <span>选择模板: </span>
      <div className={style.haveChooseOrganization}>
        <RenderLeft />
      </div>
    </div>
    <div>
      <span>移动至: </span>
      <div className={style.haveChooseOrganization}>
        <RenderRight/>
      </div>
    </div>
  </div>
  }

  function RenderLeft() {
    // 选择模板
    return <div>
        <div className={style.searchApproval}>
         
        </div>
        <div className={style.searchItem}>

        </div>
      </div>
  }

  function RenderRight() {
    // 移动至
    return <>
        <div>
        <div className={style.searchApproval}>
          {/* <ISelectLoadingComponent
            placeholder="请输入机构名称"
            width={'100%'}
            showSearch
            searchForm={{
              systemId: gState.myInfo.systemId
            }}
            reqUrl="queryStoreOrganization"
            getCurrentSelectInfo={value => getCurrentSelectInfo<string>(value, 'id')}
          /> */}
        </div>
        <div className={style.searchItem}>
          {/* <Tree
            loadData={onLoadData}
            expandedKeys={expandedKeys}
            onExpand={onExpand}
            checkedKeys={checkedKeys}
            onCheck={onCheck}
            blockNode
            treeData={treeData}
            checkable
          /> */}
        </div>
      </div></>
  }

  return <Modal
      title={`${isEdit ? '编辑' : '创建'}模板类型`}
      visible={addApprovalTypeVisible}
      onOk={handleOk}
      width={1000}
      destroyOnClose
      confirmLoading={confirmLoading}
      onCancel={handleCancel}
    >
      <RenderChooseTemplate/>
    </Modal>;
}
