import * as React from 'react';
import style from './allocation-detail.component.less';
import { useAllocationDetailStore } from './allocation-detail.component.store';
import { IHeaderTitleComponent } from '~/framework/components/component.module';
export default function AllocationDetailComponent() {
  const { state } = useAllocationDetailStore();
  return (
    <div className={style.test}>
      <IHeaderTitleComponent pageName={'申请设备调拨单'} />
    </div>
  );
}
