import * as React from 'react';
import { DatabaseOutlined, AppstoreOutlined } from '@ant-design/icons';
import { Popover } from 'antd';
export function dealWithTreeData<T>(
  res: T[],
  treeMap: Record<string, any>,
  isWarehouse?: boolean,
  content?: (element: any) => React.ReactNode
) {
  const treeData: any[] =
    !!res &&
    res.map((element: any) => {
      const treeDataChild: any = { ...element, title: '', key: '' };
      Object.keys(treeMap).forEach(key => {
        treeDataChild[key] = element[treeMap[key]];
      });
      treeDataChild.title = (
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          <div style={{ overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>
            {isWarehouse && <DatabaseOutlined style={{ color: '#7958fa', paddingRight: '4px' }} />}
            <span style={{ width: '80px' }} title={element['name']}>
              {element['name']}
            </span>
          </div>
          <div
            style={{ width: '50px', background: 'white', marginRight: '-4px' }}
            onClick={e => {
              e.stopPropagation();
            }}
          >
            {isWarehouse && content && (
              <Popover content={content(element)} trigger="hover">
                <AppstoreOutlined />
              </Popover>
            )}
          </div>
        </div>
      );
      treeDataChild['isLeaf'] = isWarehouse;
      treeDataChild.selectable = isWarehouse;
      return treeDataChild;
    });

  return treeData ? treeData : [];
}
// 节点key匹配
export function updateTreeData(list: any[], key: React.Key, children: any[] | any): any[] {
  return (
    list &&
    list.map(node => {
      if (node.key === key) {
        return {
          ...node,
          isLeaf: children && !children.length,
          children
        };
      } else if (node.children) {
        return {
          ...node,
          children: updateTreeData(node.children as any, key, children)
        };
      }
      return node;
    })
  );
}

export function deleteTreeDataByKey(list: any[], key: string) {
  const result: any = [];
  list &&
    list.forEach(node => {
      if (node.key === key) {
      } else if (node.children) {
        result.push({
          ...node,
          children: deleteTreeDataByKey(node.children as any, key)
        });
      } else {
        result.push(node);
      }
    });
  return result;
}

export function getCheckedList(list: Array<any>, checkedKeys: string[], checkedObject: any[] = []) {
  list &&
    list.map(node => {
      if (checkedKeys.includes(node.id)) {
        checkedObject.push(node);
      } else if (node.children) {
        getCheckedList(node.children, checkedKeys, checkedObject);
      }
    });
  return checkedObject;
}

export function flatAtree(arr: Array<any>) {
  let result: Array<any> = [];
  for (let i = 0; i < arr.length; i++) {
    if (Array.isArray(arr[i].children)) {
      result.push(arr[i]);
      //判断是否是数组
      result = result.concat(flatAtree(arr[i].children)); //自身递归与以前result合并，重新对result赋值
    } else {
      result.push(arr[i]); //直接追加
    }
  }
  return result;
}
