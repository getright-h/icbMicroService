import * as React from 'react';
import {
  AppravalTemplateReducer,
  appravalTemplateInitialState
} from './appraval-template-redux/appraval-template-reducer';
import ApprovalTemplateLeftComponent from './approval-template-left-component/approval-template-left.component';
import { Button, Input, Form, Row, Col } from 'antd';
import { useApprovalTemplateStore } from './appraval-template.component.store';
import { TablePageTelComponent, ITableComponent } from '~/framework/components/component.module';
import { approvalTemplateColumns } from './appraval-template.columns';
import MoveTemplateComponent from './move-template-component/move-template.component';
export const AppravalTemplateManageContext = React.createContext({
  reduxState: appravalTemplateInitialState,
  dispatch: undefined
});
export default function AppravalTemplateComponent() {
  // appravalTemplateState 当前hooks state

  const [appravalTemplateState, dispatch] = React.useReducer(AppravalTemplateReducer, appravalTemplateInitialState);
  const {
    state,
    $auth,
    changeTablePageIndex,
    moveTemplate,
    callbackAction,
    addTemplate,
    handleFormDataChange,
    getTableData,
    closeMoveTemplateModal
  } = useApprovalTemplateStore(appravalTemplateState);
  const { isLoading, searchForm, tableData, total, addMoveTemplateVisible } = state;
  const { currentSelectNode } = appravalTemplateState;

  // component --- 渲染table
  function renderTable() {
    return (
      <ITableComponent
        columns={approvalTemplateColumns(callbackAction, $auth)}
        isLoading={isLoading}
        pageIndex={searchForm.index}
        pageSize={searchForm.size}
        data={tableData}
        total={total}
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
      </div>
    );
  }
  function renderSelectItems() {
    const layout = {
      labelCol: { span: 6 },
      wrapperCol: { span: 16 }
    };
    return (
      <Form {...layout} style={{ width: '90%' }}>
        <Row gutter={24}>
          <Col span={10}>
            <Form.Item label="模板名称">
              <Input
                disabled={!currentSelectNode}
                allowClear
                placeholder="请输入模板名称"
                value={searchForm.name}
                onChange={($event: any) => handleFormDataChange('name', $event.target.value)}
              />
            </Form.Item>
          </Col>
        </Row>
      </Form>
    );
  }

  function renderOtherSearchBtns() {
    return (
      <div className="other-search-button-item">
        {!currentSelectNode.isAll && (
          <Button type="primary" onClick={() => moveTemplate()} disabled={!$auth['moveApprovalTemplate']}>
            移动模板
          </Button>
        )}
        <Button
          type="primary"
          disabled={appravalTemplateState.currentSelectNode.isAll || !$auth['addApprovalTemplate']}
          onClick={() => addTemplate()}
          loading={isLoading}
        >
          创建模板
        </Button>
      </div>
    );
  }

  function RenderMovingTemplateModal() {
    const addMoveTemplateProps = {
      addMoveTemplateVisible,
      closeMoveTemplateModal,
      groupId: (currentSelectNode.node && currentSelectNode.node.key) || ''
    };
    return addMoveTemplateVisible && <MoveTemplateComponent {...addMoveTemplateProps}></MoveTemplateComponent>;
  }

  return (
    <AppravalTemplateManageContext.Provider value={{ reduxState: appravalTemplateState, dispatch }}>
      <TablePageTelComponent
        leftFlex={1}
        rightFlex={5}
        pageName={'审批模板管理'}
        PageLeftComponent={ApprovalTemplateLeftComponent}
        otherSearchBtns={renderOtherSearchBtns()}
        searchButton={renderSearchButtons()}
        selectItems={renderSelectItems()}
        table={renderTable()}
      ></TablePageTelComponent>
      {RenderMovingTemplateModal()}
    </AppravalTemplateManageContext.Provider>
  );
}
