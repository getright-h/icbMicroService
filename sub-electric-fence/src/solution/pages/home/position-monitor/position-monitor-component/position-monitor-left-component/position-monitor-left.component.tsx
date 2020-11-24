import * as React from 'react';
import OrganizationControllerComponent from '~/solution/components/base/organization-controller-component/organization-controller.component';
import style from './position-monitor-left.component.less';
import { usePositionMonitorLeftStore } from './position-monitor-left.component.store';

export default function PositionMonitorLeftComponent() {
  const { state, onSelect, onExpand } = usePositionMonitorLeftStore();
  const { expandedKeys, treeSelectedKeys } = state;
  const prganizationControllerComponentProps = {
    onSelect,
    expandedKeys,
    treeSelectedKeys,
    onExpand
  };
  return (
    <div>
      <OrganizationControllerComponent {...prganizationControllerComponentProps} />
    </div>
  );
}
