import * as React from 'react';
import style from './approval-table.component.less';
import { ISelectLoadingComponent, TablePageTelComponent } from '~/framework/components/component.module';
import { ITableComponent } from '~/framework/components/component.module';
import { useApprovalTableStore } from './approval-table.component.store';
import { Form } from 'antd';
import { Button } from 'antd';
import { approvalTableColumns } from './approval-table.column';
import { GlobalContext } from '../../../../../context/global/global.provider';

export default function ApprovalTableComponent() {
  const { state, callbackAction, changeTablePageIndex, searchClick } = useApprovalTableStore();
  const { gState } = React.useContext(GlobalContext);
  const { isLoading, searchForm, tableData, total } = state;

  function renderApplyForApprovalButtons() {
    return (
      <div className="other-search-button-item">
        <Button type="primary" onClick={() => searchClick()}>
          查询
        </Button>
      </div>
    );
  }

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

  // component --- 渲染table
  function renderRenderApplyForApprovalTable() {
    return (
      <ITableComponent
        columns={approvalTableColumns(callbackAction)}
        isLoading={isLoading}
        pageIndex={searchForm.index}
        pageSize={searchForm.size}
        data={tableData}
        total={total}
        isPagination={true}
        changeTablePageIndex={(index: number, pageSize: number) => changeTablePageIndex(index, pageSize)}
      ></ITableComponent>
    );
  }

  function renderApplyForApprovalSelectItems() {
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
        <Form.Item name={['user', 'introduction']} label="审批状态">
          {renderISelectLoadingComponent({
            placeholder: '请输入审批状态',
            searchForm: {
              systemId: gState.myInfo.systemId
            },
            reqUrl: 'queryStoreOrganization'
          })}
        </Form.Item>
      </Form>
    );
  }

  function renderOtherSearchRenderApplyForApprovalBtns() {
    return (
      <div className="other-search-button-item">
        <Button type="primary">发起申请</Button>
      </div>
    );
  }

  return (
    <TablePageTelComponent
      // pageName={'审批申请'}
      otherSearchBtns={renderOtherSearchRenderApplyForApprovalBtns()}
      searchButton={renderApplyForApprovalButtons()}
      selectItems={renderApplyForApprovalSelectItems()}
      table={renderRenderApplyForApprovalTable()}
    ></TablePageTelComponent>
  );
}
