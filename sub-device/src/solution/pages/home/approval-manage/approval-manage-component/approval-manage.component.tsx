import * as React from 'react';
import style from './approval-manage.component.less';
import { Tabs } from 'antd';
import ApprovalTableComponent from './approval-table-component/approval-table.component';
import ApprovalDealWithComponent from './approval-deal-with-component/approval-deal-with.component';
import { useApprovalManageStore } from './approval-manage.component.store';
const { TabPane } = Tabs;
export default function ApprovalManageComponent() {
  const { state, changeTab } = useApprovalManageStore();
  return (
    <div>
      <Tabs defaultActiveKey="1" tabBarStyle={{ paddingLeft: '20px' }} onChange={(key: string) => changeTab(key)}>
        <TabPane tab="审核申请" key="1">
          {state.currentTab === '1' && <ApprovalTableComponent />}
        </TabPane>
        <TabPane tab="审核处理" key="2">
          {state.currentTab === '2' && <ApprovalDealWithComponent />}
        </TabPane>
      </Tabs>
    </div>
  );
}
