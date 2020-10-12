import * as React from 'react';
import style from './allocation-process.component.less';
import { useAllocationProcessStore } from './allocation-process.component.store';
import { Tabs } from 'antd';
import { IHeaderTitleComponent } from '~framework/components/component.module';
import InitAllocationComponent from './init-allocation-component/init-allocation.component';
import ReceiveAllocationComponent from './receive-allocation-component/receive-allocation.component';
const { TabPane } = Tabs;

export default function AllocationProcessComponent() {
  const { state, changeTabKey } = useAllocationProcessStore();
  const { activeKey } = state;
  function RenderTabs() {
    return (
      <>
        <IHeaderTitleComponent pageName={'调拨流程'} />
        <Tabs activeKey={activeKey} onChange={changeTabKey} size="large" type="card">
          <TabPane tab="发起调拨" key="1">
            <InitAllocationComponent />
          </TabPane>
          <TabPane tab="接收调拨" key="2">
            <ReceiveAllocationComponent />
          </TabPane>
        </Tabs>
      </>
    );
  }
  return <RenderTabs />;
}
