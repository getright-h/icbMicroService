import * as React from 'react';
import style from './organization-controller.component.less';
import { useOrganizationControllerStore } from './organization-controller.component.store';
import { Tree, Button } from 'antd';
import { IOrganizationControllerProps } from './organization-controller.interface';
import { ISelectLoadingComponent } from '~/solution/components/component.module';

function OrganizationControllerComponent(props: IOrganizationControllerProps, ref: any) {
  const {
    state,
    onLoadData,
    getCurrentSelectInfo,
    onCheck,
    getCurrentGroup,
    getMoreOrganization,
    onLoad
  } = useOrganizationControllerStore(props, ref);
  const { onSelect, expandedKeys, treeSelectedKeys, onExpand, checkedKeys, checkable, isGroup = false } = props;
  const { treeData, loading, loadStoreOrganizationParams, loadedKeys } = state;

  return (
    <>
      <div className={style.searchWarehouse}>
        {isGroup ? (
          <ISelectLoadingComponent
            placeholder="请输入监控组名称"
            width={'100%'}
            showSearch
            reqUrl="queryGroupSearchList"
            getCurrentSelectInfo={(value: any, option: any) => getCurrentGroup<string>(option, 'name')}
          />
        ) : (
          <ISelectLoadingComponent
            placeholder="请输入机构名称"
            width={'100%'}
            showSearch
            searchForm={{
              systemId: '938880216d89c68eb6ea08d69b143c52'
            }}
            reqUrl="queryStoreOrganization"
            getCurrentSelectInfo={value => getCurrentSelectInfo<string>(value, 'id')}
          />
        )}
      </div>
      <div className={style.searchResultTree}>
        <Tree
          loadData={onLoadData}
          onSelect={onSelect}
          expandedKeys={expandedKeys}
          selectedKeys={treeSelectedKeys}
          onExpand={onExpand}
          checkedKeys={checkedKeys}
          onCheck={onCheck}
          blockNode
          onLoad={onLoad}
          loadedKeys={loadedKeys}
          checkable={checkable}
          treeData={treeData}
        />

        {!loadStoreOrganizationParams.id && (
          <Button type="link" loading={loading} onClick={getMoreOrganization}>
            {loading ? '加载中...' : '加载更多'}
          </Button>
        )}
      </div>
    </>
  );
}

export default React.memo(React.forwardRef(OrganizationControllerComponent));
