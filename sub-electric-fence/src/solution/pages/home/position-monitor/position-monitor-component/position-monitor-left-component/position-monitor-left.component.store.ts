import { IPositionMonitorLeftState } from './position-monitor-left.interface';
import { useStateStore } from '~/framework/aop/hooks/use-base-store';
import React, { useContext, useEffect } from 'react';
import { EventDataNode } from 'rc-tree/lib/interface';
import { setDataAction, setTreeSelectNode } from '../position-monitor-redux/position-monitor-action';
import { PositionMonitorContext } from '../position-monitor.component';
export function usePositionMonitorLeftStore() {
  const { state, setStateWrap } = useStateStore(new IPositionMonitorLeftState());
  const { dispatch } = useContext(PositionMonitorContext);

  function onExpand(expandedKeys: []) {
    setStateWrap({
      expandedKeys
    });
  }

  function onSelect(selectedKeys: React.Key[], info: { node: EventDataNode }) {
    // 显示左边的Drawer 选择相应的数据
    setDataAction({ leftDrawerVisible: true }, dispatch);
    setStateWrap({
      treeSelectedKeys: [info.node.key as string]
    });
    setTreeSelectNode(info.node, dispatch);
  }
  return { state, onExpand, onSelect };
}
