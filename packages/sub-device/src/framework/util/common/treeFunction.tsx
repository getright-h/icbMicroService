import * as React from 'react';
import { DatabaseOutlined, AppstoreOutlined } from '@ant-design/icons';
import { Popover } from 'antd';
import { EventDataNode } from 'antd/lib/tree';
import { generateGUID } from '@fch/fch-tool';

//  需要将当前content缓存下来,便于修改和增加操作
let __content__: React.ReactNode = null;

export function __initContent__(content: React.ReactNode) {
  if (!__content__) {
    __content__ = content;
  }
}

export function dealWithTreeData<T>(
  res: T[] = [],
  treeMap: Record<string, any>,
  isWarehouse?: boolean,
  content?: (element: any) => React.ReactNode,
  canSelectAll?: boolean,
  organizationChecked?: boolean,
  disableNodeObj?: {
    currentDisableId?: string; // 当前监控组ID
    currentCheckedId?: string; //已选择的ID
  }
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
      __initContent__(content);
      treeDataChild['isLeaf'] = isWarehouse ?? !element.isHasChildOrganization;
      treeDataChild.selectable = canSelectAll || isWarehouse;
      treeDataChild.checkable = isWarehouse || !!organizationChecked;
      // 子节点禁掉 checkbox， 为应对监控组转组，不可选择自身，并且单选
      // 首先将自身ID传递过来，对相对应的节点禁用选择（自身不可选） 初始化阶段可以进行设置
      // 如果选择了一个监控组，则禁用其他按钮，取消选择，其他（除自身）可以选择（需要更新整颗树，使用外部方法，）
      if (disableNodeObj) {
        if (treeDataChild.key === disableNodeObj.currentDisableId) {
          treeDataChild.disableCheckbox = true;
          treeDataChild.disabled = true;
        }
        _initSingleCheckNode(treeDataChild, disableNodeObj.currentCheckedId, disableNodeObj.currentDisableId);
      }

      return treeDataChild;
    });

  return treeData ? treeData : [];
}

// 初始化当前节点是否可选
function _initSingleCheckNode(node: any, key: string, disableId: string) {
  if (node.key == key) {
    node.disableCheckbox = false;
  } else if (node.children) {
    node.children.forEach((item: any) => {
      _initSingleCheckNode(item, key, disableId);
    });
  } else if (!key) {
    node.disableCheckbox = false;
  } else {
    node.disableCheckbox = true;
  }
}

//  如果选择了一个监控组，则禁用其他按钮，取消选择，其他（除自身）可以选择（需要更新整颗树，使用外部方法，）
//  控制单选
export function setSingleCheck(list: any[], key: string) {
  const result: any = [];
  list &&
    list.forEach(node => {
      if (node.key == key) {
        result.push({
          ...node,
          disableCheckbox: false
        });
      } else if (node.children) {
        result.push({
          ...node,
          children: setSingleCheck(node.children as any, key)
        });
      } else if (!key) {
        result.push({ ...node, disableCheckbox: false });
      } else {
        result.push({ ...node, disableCheckbox: true });
      }
    });
  return result;
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

/**
 * 更新树节点, 节点key匹配
 * @param list
 * @param key
 * @param children
 */
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

export function formatTreeDataByParentId(arr: Array<any>, compareKeys = ['id', 'parentId']) {
  const mainKey = compareKeys[0];
  const compareKey = compareKeys[1];
  const result: Array<any> = [];
  let node: any = {};
  let i = 0;
  const map: any = {};
  for (i = 0; i < arr.length; i++) {
    map[arr[i][mainKey]] = i;
    arr[i].children = [];
  }
  for (i = 0; i < arr.length; i++) {
    node = arr[i];
    if (node[compareKey]) {
      arr[map[node[compareKey]]].children.push(node);
    } else {
      result.push(node);
    }
  }
  return result;
}

export function addLoadMoreNode(curParams: any, parentNode: EventDataNode | any) {
  const node: any = { key: generateGUID(true), isLeaf: true, isLoadMoreBtn: true, parentNode };
  node.title = (
    <div style={{ display: 'flex', alignItems: 'center' }}>
      <a
        onClick={e => {
          e.preventDefault();
        }}
      >
        加载更多
      </a>
    </div>
  );
  node.nextParams = {
    ...curParams,
    index: curParams.index + 1
  };
  return node;
}
