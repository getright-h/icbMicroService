import * as React from 'react';
import style from './purchase-order.component.less';
import {
  ISelectLoadingComponent,
  TablePageTelComponent,
  TimePickerComponent
} from '~/framework/components/component.module';
import { ITableComponent } from '~/framework/components/component.module';
import { purchaseOrderColumns } from './purchase-order.column';
import { usePurchaseOrderStore } from './purchase-order.component.store';

import { Button, Col, Form, Input, Row, Table } from 'antd';
import { ModalType } from './purchase-order.interface';
import EditOrderComponent from './edit-order-component/edit-order.component';
import OrderDetailComponent from './order-detail-component/order-detail.component';

export default function PurchaseOrderComponent() {
  const {
    state,
    searchForm,
    callbackAction,
    changeTablePageIndex,
    searchClick,
    handleModalCancel,
    getDateTimeInfo,
    initSearchform
  } = usePurchaseOrderStore();
  const { isLoading, tableData, total, detailVisible, editVisible, currentId, pageIndex, pageSize } = state;
  function renderSelectItems() {
    const layout = {
      labelCol: { span: 8 },
      wrapperCol: { span: 16 }
    };
    return (
      <Form {...layout} form={searchForm} style={{ width: '90%' }}>
        <Row gutter={24}>
          <Col span={8}>
            <Form.Item name="organizationName" label="机构">
              <ISelectLoadingComponent
                reqUrl="queryOrganizationList"
                placeholder="请选择机构"
                getCurrentSelectInfo={(value: string, option: any) =>
                  searchForm.setFieldsValue({ organizationName: option?.info?.name })
                }
                searchForm={{ systemId: process.env.SYSTEM_ID }}
              />
            </Form.Item>
          </Col>
          <Col span={8}>
            <Form.Item name="name" label="采购单名称">
              <Input allowClear placeholder="请输入采购单名称" />
            </Form.Item>
          </Col>
          <Col span={8}>
            <Form.Item name="timeInfo" label="采购时间">
              <TimePickerComponent pickerType="dateRange" getDateTimeInfo={getDateTimeInfo} />
            </Form.Item>
          </Col>
        </Row>
      </Form>
    );
  }
  function renderSearchButtons() {
    return (
      <div className="other-search-button-item">
        <Button type="primary" onClick={searchClick}>
          查询
        </Button>
        <Button onClick={initSearchform}>清空</Button>
      </div>
    );
  }
  function renderOtherButtons() {
    return (
      <div className="other-search-button-item">
        <Button type="primary" onClick={() => callbackAction(ModalType.CREATE)}>
          新增采购单
        </Button>
        {/* <Button onClick={() => callbackAction(ModalType.EXPORT)} disabled>
          导出采购单
        </Button> */}
      </div>
    );
  }
  function renderTable() {
    return (
      <ITableComponent
        columns={purchaseOrderColumns(callbackAction)}
        isLoading={isLoading}
        pageIndex={pageIndex}
        pageSize={pageSize}
        data={tableData}
        total={total}
        isPagination={true}
        changeTablePageIndex={(pageIndex: number, pageSize: number) => changeTablePageIndex(pageIndex, pageSize)}
        summary={() => (
          <Table.Summary.Row>
            <Table.Summary.Cell index={0} colSpan={9}>
              <div className={style.summary}>
                <span>采购总数量：{state.sumNumber}</span>
                <span>采购总金额：￥{state.sumAmount}</span>
              </div>
            </Table.Summary.Cell>
          </Table.Summary.Row>
        )}
      ></ITableComponent>
    );
  }

  return (
    <React.Fragment>
      <TablePageTelComponent
        pageName={'采购单管理'}
        selectItems={renderSelectItems()}
        searchButton={renderSearchButtons()}
        otherSearchBtns={renderOtherButtons()}
        table={renderTable()}
      ></TablePageTelComponent>
      <EditOrderComponent id={currentId} visible={editVisible} close={handleModalCancel} />
      <OrderDetailComponent id={currentId} visible={detailVisible} close={handleModalCancel} />
    </React.Fragment>
  );
}
