import * as React from 'react';
import style from './approval-deal-with.component.less';
import { ISelectLoadingComponent, TablePageTelComponent } from '~/framework/components/component.module';
import { ITableComponent } from '~/framework/components/component.module';
import { approvalDealWithColumns } from './approval-deal-with.column';
import { useApprovalDealWithStore } from './approval-deal-with.component.store';
import { GlobalContext } from '../../../../../context/global/global.provider';
import { Button, Col, Form, Row, Select } from 'antd';

export default function ApprovalDealWithComponent() {
  const {
    state,
    searchForm,
    callbackAction,
    changeTablePageIndex,
    searchClick,
    initSearchForm,
    setGroupId
  } = useApprovalDealWithStore();
  const { gState } = React.useContext(GlobalContext);
  const { isLoading, pageIndex, pageSize, tableData, total } = state;

  function renderApplyForApprovalButtons() {
    return (
      <div className="other-search-button-item">
        <Button type="primary" onClick={() => searchClick()}>
          查询
        </Button>
        <Button onClick={() => initSearchForm()}>清空</Button>
      </div>
    );
  }

  function renderISelectLoadingComponent({ placeholder, searchForm, reqUrl, onChange, options }: any) {
    const props = {
      placeholder,
      searchForm,
      reqUrl,
      getCurrentSelectInfo: (value: string, option: any) => onChange && onChange(value, option),
      ...options
    };
    return ISelectLoadingComponent(props);
  }

  // component --- 渲染table
  function renderRenderApplyForApprovalTable() {
    return (
      <ITableComponent
        columns={approvalDealWithColumns(callbackAction)}
        isLoading={isLoading}
        pageIndex={pageIndex}
        pageSize={pageSize}
        data={tableData}
        total={total}
        isPagination={true}
        changeTablePageIndex={(pageIndex: number, pageSize: number) => changeTablePageIndex(pageIndex, pageSize)}
      ></ITableComponent>
    );
  }

  function renderApplyForApprovalSelectItems() {
    const layout = {
      labelCol: { span: 8 },
      wrapperCol: { span: 16 }
    };
    return (
      <Form {...layout} form={searchForm} style={{ width: '90%' }} initialValues={{ processStatus: null }}>
        <Row>
          <Col span={6}>
            <Form.Item name="groupId" label="模板类型">
              {renderISelectLoadingComponent({
                placeholder: '请输入模板类型',
                onChange: setGroupId,
                reqUrl: 'queryApprovalPagedList'
              })}
            </Form.Item>
          </Col>
          <Col span={6}>
            <Form.Item name="templateId" label="模板名称">
              {renderISelectLoadingComponent({
                placeholder: '请输入模板名称',
                searchForm: {
                  groupId: searchForm.getFieldValue('groupId')
                },
                options: {
                  disabled: !state.curGroupId
                },
                reqUrl: 'queryApprovalFormTemplatePagedList'
              })}
            </Form.Item>
          </Col>
          <Col span={6}>
            <Form.Item name="creatorId" label="申请人">
              {renderISelectLoadingComponent({
                placeholder: '请输入申请人',
                searchForm: {
                  systemId: gState.myInfo.systemId
                },
                options: {
                  dropdownMatchSelectWidth: false
                },
                reqUrl: 'queryUserPagedList'
              })}
            </Form.Item>
          </Col>
          <Col span={6}>
            <Form.Item name="organizationId" label="创建机构">
              {renderISelectLoadingComponent({
                placeholder: '请输入创建机构',
                searchForm: {
                  systemId: gState.myInfo.systemId
                },
                reqUrl: 'queryStoreOrganization'
              })}
            </Form.Item>
          </Col>
          <Col span={6}>
            <Form.Item name="processStatus" label="审批状态">
              <Select placeholder="请选择审批状态">
                <Select.Option value={-1}>全部</Select.Option>
                <Select.Option value={1}>已处理</Select.Option>
                <Select.Option value={0}>待处理</Select.Option>
              </Select>
            </Form.Item>
          </Col>
        </Row>
      </Form>
    );
  }

  return (
    <TablePageTelComponent
      // pageName={'审批处理'}
      searchButton={renderApplyForApprovalButtons()}
      selectItems={renderApplyForApprovalSelectItems()}
      table={renderRenderApplyForApprovalTable()}
    ></TablePageTelComponent>
  );
}
