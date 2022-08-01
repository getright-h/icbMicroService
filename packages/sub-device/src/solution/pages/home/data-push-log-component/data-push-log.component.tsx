import * as React from 'react';
import { useDataPushLogStore } from './data-push-log.component.store';
import { Button, Col, Form, Input, Row } from 'antd';
import {
  ISelectLoadingComponent,
  ITableComponent,
  TablePageTelComponent
} from '~/framework/components/component.module';
import { dataPushColumns } from './data-push-log.column';
import DataPushLogModalComponent from './data-push-log-modal-component/data-push-log-modal.component';

export default function DataPushLogComponent() {
  const {
    state,
    searchForm,
    callbackAction,
    changeTablePageIndex,
    searchClick,
    initSearchForm,
    handleModalCancel
  } = useDataPushLogStore();
  const { isLoading, tableData, total, pageIndex, pageSize, currentData, detailVisible } = state;
  function renderSelectItems() {
    const layout = {
      labelCol: { span: 8 },
      wrapperCol: { span: 16 }
    };
    return (
      <Form {...layout} form={searchForm} style={{ width: '90%' }}>
        <Row gutter={24}>
          <Col span={8}>
            <Form.Item name="vinNo" label="车架号">
              <Input allowClear placeholder="请输入车架号"></Input>
            </Form.Item>
          </Col>
          <Col span={8}>
            <Form.Item name="mobile" label="用户电话">
              <Input allowClear placeholder="请输入用户电话"></Input>
            </Form.Item>
          </Col>
          <Col span={8}>
            <Form.Item name="organizationId" label="所属经销商">
              <ISelectLoadingComponent
                reqUrl="queryOrganizationList"
                placeholder="请选择所属经销商"
                getCurrentSelectInfo={(value: string, option: any) =>
                  searchForm.setFieldsValue({ organizationId: value })
                }
                searchForm={{ systemId: process.env.SYSTEM_ID, typeId: 'c59c75eec2d3cc075cca08d84386bcb9' }}
              />
            </Form.Item>
          </Col>
          <Col span={8}>
            <Form.Item name="financeId" label="所属金融机构">
              <ISelectLoadingComponent
                reqUrl="queryOrganizationList"
                placeholder="请选择所属金融机构"
                getCurrentSelectInfo={(value: string, option: any) => searchForm.setFieldsValue({ financeId: value })}
                searchForm={{ systemId: process.env.SYSTEM_ID, typeId: 'f247ca73916ac014b40908d86eb6ae8a' }}
              />
            </Form.Item>
          </Col>
        </Row>
      </Form>
    );
  }
  function renderSearchButtons() {
    return (
      <div className="other-search-button-item">
        <Button type="primary" onClick={searchClick} loading={isLoading}>
          查询
        </Button>
        <Button onClick={initSearchForm}>清空</Button>
      </div>
    );
  }
  function RenderTable() {
    return (
      <ITableComponent
        columns={dataPushColumns(callbackAction)}
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

  return (
    <React.Fragment>
      <TablePageTelComponent
        pageName={'数据推送日志'}
        selectItems={renderSelectItems()}
        searchButton={renderSearchButtons()}
        table={<RenderTable />}
      ></TablePageTelComponent>
      {detailVisible && (
        <DataPushLogModalComponent visible={detailVisible} currentData={currentData} close={handleModalCancel} />
      )}
    </React.Fragment>
  );
}
