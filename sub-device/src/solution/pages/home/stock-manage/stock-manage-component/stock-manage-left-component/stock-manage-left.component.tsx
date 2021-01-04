import React from 'react';
import style from './stock-manage-left.component.less';
import { useStockManageLeftStore } from './stock-manage-left.component.store';
import OrganizationControllerComponent from '~/solution/components/organization-controller-component/organization-controller.component';

export default function StockManageLeftComponent() {
  const { state, onSelect, onExpand, queryChildInfo } = useStockManageLeftStore();
  const { expandedKeys, treeSelectedKeys } = state;
  const prganizationControllerComponentProps = {
    onSelect,
    expandedKeys,
    treeSelectedKeys,
    onExpand,
    queryChildInfo
  };
  return (
    <div className={style.stockListLeft}>
      <OrganizationControllerComponent {...prganizationControllerComponentProps} />
    </div>
  );
}
