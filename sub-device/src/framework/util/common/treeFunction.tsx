import * as React from 'react';
export function dealWithTreeData<T>(res: T[], treeMap: Record<string, any>) {
  const treeData: any[] =
    !!res &&
    res.map((element: any) => {
      const treeDataChild: any = { ...element, title: '', key: '' };

      Object.keys(treeMap).forEach(key => {
        treeDataChild[key] = element[treeMap[key]];
      });
      treeDataChild['isLeaf'] = false;
      return treeDataChild;
    });
  console.log(treeData);

  return treeData;
}
// 节点key匹配
export function updateTreeData(list: any[], key: React.Key, children: any[] | any): any[] {
  return (
    list &&
    list.map(node => {
      if (node.key === key) {
        return {
          ...node,
          isLeaf: !children,
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
