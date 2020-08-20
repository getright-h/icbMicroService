import * as React from 'react';
import style from './stock-manage-left.component.less';
import { useStockManageLeftStore } from './stock-manage-left.component.store';
import { Tree, Input } from 'antd';
const { Search } = Input;

export default function StockManageLeftComponent() {
  const { state } = useStockManageLeftStore();
  const treeData = [
    {
      title: 'parent 1',
      key: '0-0',
      children: [
        {
          title: 'parent 1-0',
          key: '0-0-0',
          disabled: true,
          children: [
            {
              title: 'leaf',
              key: '0-0-0-0',
              disableCheckbox: true
            },
            {
              title: 'leaf',
              key: '0-0-0-1'
            }
          ]
        },
        {
          title: 'parent 1-1',
          key: '0-0-1',
          children: [{ title: <span style={{ color: '#1890ff' }}>sss</span>, key: '0-0-1-0' }]
        }
      ]
    }
  ];
  return (
    <React.Fragment>
      <div>
        <Search placeholder="input search text" onSearch={value => console.log(value)} />
        <Tree onSelect={keys => console.log(keys)} treeData={treeData} />
      </div>
    </React.Fragment>
  );
}
