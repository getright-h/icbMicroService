import * as React from 'react';
import style from './organization-controller.component.less';
import { useOrganizationControllerStore } from './organization-controller.component.store';
import { Tree, Button, Pagination, Spin } from 'antd';
import { IOrganizationControllerProps } from './organization-controller.interface';
import { ISelectLoadingComponent } from '~/solution/components/component.module';
import { GlobalContext } from '~/solution/context/global/global.provider';
import { EventDataNode } from 'antd/lib/tree';

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
    onPageSizeChange,
    onLoadMoreSub
  } = useOrganizationControllerStore(props, ref);
  const { onSelect, expandedKeys, treeSelectedKeys, onExpand, checkedKeys, checkable, isGroup = false } = props;
  const { treeData, loading, loadStoreOrganizationParams, loadedKeys, total } = state;
  const { gState } = React.useContext(GlobalContext);

  return (
    <div className={style.orgController}>
      <div className={style.searchWarehouse}>
        {isGroup ? (
          <ISelectLoadingComponent
            placeholder="请输入监控组名称"
            width={'100%'}
            showSearch
            reqUrl="queryGroupSearchList"
            getCurrentSelectInfo={(value: any, option: any) => getCurrentGroup<any>(option, 'name')}
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
            onSelect={(
              selectedKeys?: React.Key[],
              e?: {
                node: EventDataNode;
              }
            ) => {
              e.node['isLoadMoreBtn'] ? onLoadMoreSub(e.node) : onSelect(selectedKeys, e);
            }}
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
      </div>
      <div className={style.searchPagination}>
        {!loadStoreOrganizationParams.id && (
          <Pagination
            simple
            showSizeChanger
            onChange={onPageSizeChange}
            current={loadStoreOrganizationParams.index}
            pageSize={loadStoreOrganizationParams.size}
            total={total}
            size="small"
          />
        )}

        {/* {!loadStoreOrganizationParams.id && (
          <Button type="link" loading={loading} onClick={getMoreOrganization}>
            {loading ? '加载中...' : '加载更多'}
          </Button>
        )} */}
      </div>
    </div>
  );
}

export default React.memo(React.forwardRef(OrganizationControllerComponent));
