import { Card } from 'antd';
import * as React from 'react';
import OrganizationControllerComponent from '~/solution/components/base/organization-controller-component/organization-controller.component';
import { PositionMonitorContext } from '../position-monitor.component';
import style from './position-monitor-left.component.less';
import { usePositionMonitorLeftStore } from './position-monitor-left.component.store';

export default function PositionMonitorLeftComponent() {
  const { state, onSelect, onExpand } = usePositionMonitorLeftStore();
  const { expandedKeys, treeSelectedKeys } = state;
  const { reduxState, dispatch } = React.useContext(PositionMonitorContext);
  const { currentSelectNode }: any = reduxState;
  const prganizationControllerComponentProps = {
    onSelect,
    expandedKeys,
    treeSelectedKeys,
    onExpand,
    allCanSelect: true
  };

  return (
    <div className={style.positionMonitorLeftArea}>
      <div className={style.organization}>
        <OrganizationControllerComponent {...prganizationControllerComponentProps} />
      </div>

      <div className={style.monitor}>
        <div className={style.monitorHeader}>监控组 - {currentSelectNode ? currentSelectNode.name : '**'}</div>
        <div className={style.monitorContent}>监控组</div>
      </div>
    </div>
  );
}
