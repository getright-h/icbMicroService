import React from 'react';
import OrganizationControllerComponent from '~/solution/components/base/organization-controller-component/organization-controller.component';
import style from './position-monitor-left.component.less';
import { usePositionMonitorLeftStore } from './position-monitor-left.component.store';

export const PositionMonitorLeftComponent = () => {
  const { state, onSelect, onExpand } = usePositionMonitorLeftStore();
  const { expandedKeys, treeSelectedKeys } = state;
  const prganizationControllerComponentProps = React.useMemo(
    () => ({
      onSelect,
      expandedKeys,
      treeSelectedKeys,
      onExpand,
      allCanSelect: true
    }),
    [expandedKeys, treeSelectedKeys]
  );
  return (
    <div className={style.positionMonitorLeftArea}>
      <div className={style.organization}>
        <OrganizationControllerComponent {...prganizationControllerComponentProps} />
      </div>
    </div>
  );
};
