import * as React from 'react';
import { useAllocationProcessStore } from './allocation-process.component.store';
import { Tabs } from 'antd';
import { IHeaderTitleComponent } from 'fch-shop-component-micweb';
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
        <Tabs activeKey={activeKey == 'two' ? 'two' : 'one'} onChange={changeTabKey} size="large" type="card">
          <TabPane tab="发起调拨" key={'one'}>
            <InitAllocationComponent />
          </TabPane>
          <TabPane tab="接收调拨" key={'two'}>
            <ReceiveAllocationComponent />
          </TabPane>
        </Tabs>
      </>
    );
  }
  return <RenderTabs />;
}
