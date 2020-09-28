import * as React from 'react';
import style from './stock-manage-left.component.less';
import { useStockManageLeftStore } from './stock-manage-left.component.store';
import { Tree, Input } from 'antd';
import { IStockManageLeftProps } from './stock-manage-left.interface';
import { ISelectLoadingComponent } from '~/framework/components/component.module';
import { GlobalContext } from '~/solution/context/global/global.provider';

export default function StockManageLeftComponent(props: IStockManageLeftProps) {
  const { state, onLoadData, onSelect, getCurrentSelectInfo, onExpand } = useStockManageLeftStore(props);
  const { gState } = React.useContext(GlobalContext);
  const { treeData, expandedKeys, treeSelectedKeys } = state;
  return (
    <div className={style.stockListLeft}>
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
        blockNode
        treeData={treeData}
      />
    </div>
  );
}
