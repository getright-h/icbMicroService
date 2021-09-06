import * as React from 'react';
import style from './organization-controller.component.less';
import { useOrganizationControllerStore } from './organization-controller.component.store';
import { ISelectLoadingComponent } from '~/framework/components/component.module';
import { GlobalContext } from '~/solution/context/global/global.provider';
import { Tree, Button, Pagination, Spin } from 'antd';
import { IOrganizationControllerProps } from './organization-controller.interface';

function OrganizationControllerComponent(props: IOrganizationControllerProps, ref: any) {
  const {
    state,
    formInfo,
    onLoadData,
    getCurrentSelectInfo,
    onCheck,
    getCurrentGroup,
    onLoad,
    getMoreOrganization,
    onPageSizeChange
  } = useOrganizationControllerStore(props, ref);
  const { onSelect, expandedKeys, treeSelectedKeys, onExpand, checkedKeys, checkable, isGroup = false } = props;
  const { gState } = React.useContext(GlobalContext);
  const { treeData, loading, loadStoreOrganizationParams, loadedKeys, total } = state;
  treeData.length && console.log(treeData);
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
            // loadedKeys={expandedKeys}
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
        {/* 如果是搜索隐藏加载中 */}
        {/* {!loadStoreOrganizationParams.id && (
          <Button type="link" loading={loading} onClick={getMoreOrganization}>
            {loading ? '加载中...' : '加载更多'}
          </Button>
        )} */}
      </div>
    </>
  );
}

export default React.forwardRef(OrganizationControllerComponent);
