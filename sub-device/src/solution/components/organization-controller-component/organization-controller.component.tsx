import * as React from 'react';
import style from './organization-controller.component.less';
import { useOrganizationControllerStore } from './organization-controller.component.store';
import { ISelectLoadingComponent } from '~/framework/components/component.module';
import { GlobalContext } from '~/solution/context/global/global.provider';
import { Tree } from 'antd';
import { IOrganizationControllerProps } from './organization-controller.interface';

function OrganizationControllerComponent(props: IOrganizationControllerProps, ref: any) {
  const { state, onLoadData, getCurrentSelectInfo, onCheck } = useOrganizationControllerStore(props, ref);
  const { onSelect, expandedKeys, treeSelectedKeys, onExpand, checkedKeys, checkable } = props;
  const { gState } = React.useContext(GlobalContext);
  const { treeData } = state;
  return (
    <>
      <div className={style.searchWarehouse}>
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
        onSelect={onSelect}
        expandedKeys={expandedKeys}
        selectedKeys={treeSelectedKeys}
        onExpand={onExpand}
        checkedKeys={checkedKeys}
        onCheck={onCheck}
        blockNode
        checkable={checkable}
        treeData={treeData}
      />
    </>
  );
}

export default React.forwardRef(OrganizationControllerComponent);
