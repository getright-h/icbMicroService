import * as React from 'react';
import style from './appraval-template.component.less';
import {
  AppravalTemplateReducer,
  appravalTemplateInitialState
} from './appraval-template-redux/appraval-template-reducer';
import ApprovalTemplateLeftComponent from './approval-template-left-component/approval-template-left.component';
import { Button, Input } from 'antd';
import { useApprovalTemplateStore } from './appraval-template.component.store';
import { TablePageTelComponent, ITableComponent } from '~/framework/components/component.module';
import { approvalTemplateColumns } from './appraval-template.columns';
export const AppravalTemplateManageContext = React.createContext({
  reduxState: appravalTemplateInitialState,
  dispatch: undefined
});
export default function AppravalTemplateComponent() {
  // appravalTemplateState 当前hooks state

  const [appravalTemplateState, dispatch] = React.useReducer(AppravalTemplateReducer, appravalTemplateInitialState);
  const {
    state,
    changeTablePageIndex,
    callbackAction,
    addTemplate,
    handleFormDataChange,
    getTableData
  } = useApprovalTemplateStore(appravalTemplateState);
  const { isLoading, searchForm, tableData, total } = state;
  const { currentSelectNode } = appravalTemplateState;

  // component --- 渲染table
  function renderTable() {
    return (
      <ITableComponent
        columns={approvalTemplateColumns(callbackAction)}
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

  function renderSearchButtons() {
    return (
      <div className="other-search-button-item">
        <Button type="primary" onClick={() => getTableData()} loading={isLoading}>
          查询
        </Button>
        <Button type="primary" disabled={!currentSelectNode} onClick={() => addTemplate()} loading={isLoading}>
          创建模板
        </Button>
      </div>
    );
  }

  function renderSelectItems() {
    return (
      <div className="push-search-item">
        <span className="label">仓位名：</span>
        <Input
          disabled={!currentSelectNode}
          allowClear
          placeholder="请输入仓位名"
          value={searchForm.name}
          onChange={($event: any) => handleFormDataChange($event, 'name')}
        />
      </div>
    );
  }

  return (
    <AppravalTemplateManageContext.Provider value={{ reduxState: appravalTemplateState, dispatch }}>
      <TablePageTelComponent
        leftFlex={1}
        rightFlex={5}
        pageName={'仓库管理'}
        PageLeftComponent={ApprovalTemplateLeftComponent}
        searchButton={renderSearchButtons()}
        selectItems={renderSelectItems()}
        table={renderTable()}
      ></TablePageTelComponent>
    </AppravalTemplateManageContext.Provider>
  );
}
