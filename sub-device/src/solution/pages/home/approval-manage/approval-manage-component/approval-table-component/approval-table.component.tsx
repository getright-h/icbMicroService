import * as React from 'react';
import style from './approval-table.component.less';
import { ISelectLoadingComponent, TablePageTelComponent } from '~/framework/components/component.module';
import { ITableComponent } from '~/framework/components/component.module';
import { useApprovalTableStore } from './approval-table.component.store';
import { Col, Form, Row, Select } from 'antd';
import { Button } from 'antd';
import { approvalTableColumns } from './approval-table.column';
import { GlobalContext } from '../../../../../context/global/global.provider';
import { APPROVAL_APPLY_STATUS } from '~/solution/shared/constant/common.const';
import ApprovalApplyComponent from '../approval-apply-component/approval-apply.component';
import ApprovalTemplateFormModalComponent from '../approval-template-form-modal-component/approval-template-form-modal.component';

export default function ApprovalTableComponent() {
  const {
    state,
    searchForm,
    callbackAction,
    changeTablePageIndex,
    searchClick,
    initSearchForm,
    setGroupId,
    getCurrentTemplateId,
    changeChooseModalVisible
  } = useApprovalTableStore();
  const { gState } = React.useContext(GlobalContext);
  const { isLoading, pageIndex, pageSize, tableData, total, chooseModalVisible } = state;

  function renderApplyForApprovalButtons() {
    return (
      <div className="other-search-button-item">
        <Button type="primary" onClick={() => searchClick()}>
          查询
        </Button>
        <Button onClick={initSearchForm}>清空</Button>
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
        columns={approvalTableColumns(callbackAction)}
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
      <Form {...layout} form={searchForm} style={{ width: '90%' }} initialValues={{ status: -1 }}>
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
            <Form.Item name="status" label="审批状态">
              <Select placeholder="请选择审批状态">
                {APPROVAL_APPLY_STATUS.map((status: any, index: number) => (
                  <Select.Option key={`apply-${index}`} value={status.value}>
                    {status.title}
                  </Select.Option>
                ))}
              </Select>
            </Form.Item>
          </Col>
        </Row>
      </Form>
    );
  }

  function renderOtherSearchRenderApplyForApprovalBtns() {
    return (
      <div className="other-search-button-item">
        <Button type="primary" onClick={() => changeChooseModalVisible(true)}>
          发起申请
        </Button>
      </div>
    );
  }

  return (
    <>
      <TablePageTelComponent
        // pageName={'审批申请'}
        otherSearchBtns={renderOtherSearchRenderApplyForApprovalBtns()}
        searchButton={renderApplyForApprovalButtons()}
        selectItems={renderApplyForApprovalSelectItems()}
        table={renderRenderApplyForApprovalTable()}
      ></TablePageTelComponent>
      {ApprovalApplyComponent({
        visible: chooseModalVisible,
        handlePropsOk: getCurrentTemplateId,
        changeVisible: changeChooseModalVisible
      })}
    </>
  );
}
