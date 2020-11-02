import * as React from 'react';
import style from './approval-manage.component.less';
import { useApprovalManageStore } from './approval-manage.component.store';
import { Tabs, Button } from 'antd';
import {
  TablePageTelComponent,
  ISelectLoadingComponent,
  ITableComponent
} from '~/framework/components/component.module';
import { Form } from 'antd';
import { GlobalContext } from '~/solution/context/global/global.provider';
import { approvalManageColumns } from './appraval-manage.columns';
import ApprovalTableComponent from './approval-table-component/approval-table.component';
import ApprovalDealWithComponent from './approval-deal-with-component/approval-deal-with.component';
const { TabPane } = Tabs;
export default function ApprovalManageComponent() {
  return (
    <div>
      <Tabs defaultActiveKey="1" tabBarStyle={{ paddingLeft: '20px' }}>
        <TabPane tab="审核申请" key="1">
          {ApprovalTableComponent()}
        </TabPane>
        <TabPane tab="审核处理" key="2">
          {ApprovalDealWithComponent()}
        </TabPane>
      </Tabs>
    </div>
  );
}
