import * as React from 'react';
import style from './organization-controller.component.less';
import { useOrganizationControllerStore } from './organization-controller.component.store';
import { Tree, Button, Pagination, Spin } from 'antd';
import { IOrganizationControllerProps } from './organization-controller.interface';
import { ISelectLoadingComponent } from '~/solution/components/component.module';
import { GlobalContext } from '~/solution/context/global/global.provider';

function OrganizationControllerComponent(props: IOrganizationControllerProps, ref: any) {
  const {
    state,
    formInfo,
    onLoadData,
    getCurrentSelectInfo,
    onCheck,
    getCurrentGroup,
    getMoreOrganization,
    onLoad,
    onPageSizeChange
  } = useOrganizationControllerStore(props, ref);
  const { onSelect, expandedKeys, treeSelectedKeys, onExpand, checkedKeys, checkable, isGroup = false } = props;
  const { treeData, loading, loadStoreOrganizationParams, loadedKeys, total } = state;
  const { gState } = React.useContext(GlobalContext);

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
              systemId: gState.myInfo.systemId,
              typeId: gState.myInfo.typeId
            }}
            reqUrl="queryStoreOrganization"
            getCurrentSelectInfo={value => getCurrentSelectInfo<string>(value, 'id')}
          />
        )}
      </div>
      <div className={style.searchResultTree}>
        {loading ? (
          <Spin />
        ) : (
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
        )}
        <Pagination
          showSizeChanger
          onChange={onPageSizeChange}
          current={formInfo.current.index}
          pageSize={formInfo.current.size}
          total={total}
          size="small"
        />

        {/* {!loadStoreOrganizationParams.id && (
          <Button type="link" loading={loading} onClick={getMoreOrganization}>
            {loading ? '加载中...' : '加载更多'}
          </Button>
        )} */}
      </div>
    </>
  );
}

export default React.memo(React.forwardRef(OrganizationControllerComponent));
