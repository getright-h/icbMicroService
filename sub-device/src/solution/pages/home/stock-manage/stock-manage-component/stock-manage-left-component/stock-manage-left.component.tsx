import * as React from 'react';
import style from './stock-manage-left.component.less';
import { useStockManageLeftStore } from './stock-manage-left.component.store';
import { Tree, Input } from 'antd';
import { IStockManageLeftProps } from './stock-manage-left.interface';
const { Search } = Input;

function StockManageLeftComponent(props: IStockManageLeftProps) {
  const { state, onLoadData, onSelect } = useStockManageLeftStore(props);
  const { treeData } = state;
  return (
    <React.Fragment>
      <div>
        <Search
          placeholder="input search text"
          onSearch={value => console.log(value)}
          style={{ marginBottom: '20px' }}
        />
        <Tree loadData={onLoadData} showIcon onSelect={onSelect} treeData={treeData} />
      </div>
    </React.Fragment>
  );
}
export default React.memo(StockManageLeftComponent);
