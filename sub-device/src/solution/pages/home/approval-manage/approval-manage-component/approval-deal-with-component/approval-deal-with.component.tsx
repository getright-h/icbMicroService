import * as React from 'react';
import style from './approval-deal-with.component.less';
import { ISelectLoadingComponent, TablePageTelComponent } from '~/framework/components/component.module';
import { ITableComponent } from '~/framework/components/component.module';
import { approvalDealWithColumns } from './approval-deal-with.column';
import { useApprovalDealWithStore } from './approval-deal-with.component.store';
import { GlobalContext } from '../../../../../context/global/global.provider';
import { Button, Form } from 'antd';

export default function ApprovalDealWithComponent() {
  const { state, callbackAction, changeTablePageIndex, searchClick } = useApprovalDealWithStore();
  const { isLoading, searchForm, tableData, total, visibleModal } = state;
  const { gState } = React.useContext(GlobalContext);
  function renderISelectLoadingComponent({ placeholder, searchForm, reqUrl }: any) {
    const props = {
      placeholder,
      showSearch: true,
      width: '150px',
      searchForm: {
        systemId: gState.myInfo.systemId
      },
      reqUrl: 'queryStoreOrganization'
    };
    return ISelectLoadingComponent(props);
  }

  function renderSelectItems() {
    return (
      <Form name="nest-messages" layout="inline">
        <Form.Item name={['user', 'name']} label="类型机构">
          {renderISelectLoadingComponent({
            placeholder: '请输入类型机构',
            searchForm: {
              systemId: gState.myInfo.systemId
            },
            reqUrl: 'queryStoreOrganization'
          })}
        </Form.Item>
        <Form.Item name={['user', 'email']} label="模板名称">
          {renderISelectLoadingComponent({
            placeholder: '请输入模板名称',
            searchForm: {
              systemId: gState.myInfo.systemId
            },
            reqUrl: 'queryStoreOrganization'
          })}
        </Form.Item>
        <Form.Item name={['user', 'age']} label="申请人">
          {renderISelectLoadingComponent({
            placeholder: '请输入申请人',
            searchForm: {
              systemId: gState.myInfo.systemId
            },
            reqUrl: 'queryStoreOrganization'
          })}
        </Form.Item>
        <Form.Item name={['user', 'website']} label="创建机构">
          {renderISelectLoadingComponent({
            placeholder: '请输入创建机构',
            searchForm: {
              systemId: gState.myInfo.systemId
            },
            reqUrl: 'queryStoreOrganization'
          })}
        </Form.Item>
        <Form.Item name={['user', 'introduction']} label="处理状态">
          {renderISelectLoadingComponent({
            placeholder: '请输入处理状态',
            searchForm: {
              systemId: gState.myInfo.systemId
            },
            reqUrl: 'queryStoreOrganization'
          })}
        </Form.Item>
      </Form>
    );
  }
  function renderSearchButtons() {
    return (
      <div className="other-search-button-item">
        <Button type="primary" onClick={searchClick}>
          查询
        </Button>
      </div>
    );
  }
  function RenderTable() {
    return (
      <ITableComponent
        columns={approvalDealWithColumns(callbackAction)}
        isLoading={isLoading}
        pageIndex={searchForm.page}
        pageSize={searchForm.size}
        data={tableData}
        total={total}
        isPagination={true}
        changeTablePageIndex={(index: number, pageSize: number) => changeTablePageIndex(index, pageSize)}
      ></ITableComponent>
    );
  }

  return (
    <div>
      <TablePageTelComponent
        selectItems={renderSelectItems()}
        searchButton={renderSearchButtons()}
        table={<RenderTable />}
      ></TablePageTelComponent>
    </div>
  );
}
