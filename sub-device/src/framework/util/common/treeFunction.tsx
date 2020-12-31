import * as React from 'react';
import { DatabaseOutlined, AppstoreOutlined } from '@ant-design/icons';
import { Popover } from 'antd';

//  需要将当前content缓存下来,便于修改和增加操作
let __content__: React.ReactNode = null;

export function __initContent__(content: React.ReactNode) {
  if (!__content__) {
    __content__ = content;
  }
}

export function dealWithTreeData<T>(
  res: T[],
  treeMap: Record<string, any>,
  isWarehouse?: boolean,
  content?: (element: any) => React.ReactNode,
  canSelectAll?: boolean,
  organizationChecked?: boolean
) {
  const treeData: any[] =
    !!res &&
    res.map((element: any) => {
      const treeDataChild: any = { ...element, title: '', key: '' };
      Object.keys(treeMap).forEach(key => {
        treeDataChild[key] = element[treeMap[key]];
      });
      treeDataChild.title = renderTitle(isWarehouse, element, content);
      // 缓存当前列表Content
      __content__ = content;
      treeDataChild['isLeaf'] = isWarehouse;
      treeDataChild.selectable = canSelectAll || isWarehouse;
      treeDataChild.checkable = isWarehouse || !!organizationChecked;
      return treeDataChild;
    });
  return treeData ? treeData : [];
}

function renderTitle(isWarehouse: boolean, element: any, content: any, alterTitle?: any) {
  return (
    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
      <div style={{ overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>
        {isWarehouse && <DatabaseOutlined style={{ color: '#7958fa', paddingRight: '4px' }} />}
        <span style={{ width: '80px' }} title={alterTitle ? alterTitle : element['name']}>
          {alterTitle ? alterTitle : element['name']}
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

/**
 * 删除节点操作
 * @param list
 * @param key
 */

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

/**
 * 修改节点操作
 * @param list
 * @param key
 * @param newTitle
 */

export function alterTreeDataByKey(list: any[], key: string, newTitle?: string) {
  const result: any = [];
  list &&
    list.forEach(node => {
      if (node.key === key) {
        result.push({
          ...node,
          title: renderTitle(true, node, __content__, newTitle ? newTitle : '')
        });
      } else if (node.children) {
        result.push({
          ...node,
          children: alterTreeDataByKey(node.children as any, key, newTitle)
        });
      } else {
        result.push(node);
      }
    });
  return result;
}

/**
 * 增加节点操作
 * @param list
 * @param key
 * @description 增加节点实现思路
 *
 * 根据所加入的监控组的所属机构ID
 * 将获取到的数据加入到其中
 *
 */

export function addTreeDataByOrgId(list: any[], data: any) {
  const { organizationId = '' } = data || {};
  const _addMonitorGrop = {
    ...data,
    id: data.id || '',
    key: data.id || '',
    title: renderTitle(true, data, __content__),
    isLeaf: true,
    checkable: true,
    selectable: true
  };
  const result: any = [];
  list &&
    list.forEach(node => {
      if (node.organizationId === organizationId && Array.isArray(node.children)) {
        node.children.unshift({
          ..._addMonitorGrop
        });
        result.push(node);
      } else if (node.children) {
        result.push({
          ...node,
          children: addTreeDataByOrgId(node.children as any, data)
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
