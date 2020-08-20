import * as React from 'react';
import style from './warehouse-left.component.less';
import { Button, Input, Tree } from 'antd';
import { useWarehouseLeftStore } from './warehouse-left.component.store';
import EditWarehouseComponent from '../widget/edit-warehouse-component/edit-warehouse.component';
const { Search } = Input;

export default function WarehouseLeftComponent() {
  const { state, action, modalCancel } = useWarehouseLeftStore();
  const { visibleModal, currentId } = state;
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
        <Button type="primary" block className={style.addButton} onClick={() => action('add')}>
          新增仓库
        </Button>
        <Search placeholder="input search text" onSearch={value => console.log(value)} />
        <Tree onSelect={keys => console.log(keys)} treeData={treeData} />
      </div>
      <EditWarehouseComponent visible={visibleModal} close={modalCancel} id={currentId} />
    </React.Fragment>
  );
}
