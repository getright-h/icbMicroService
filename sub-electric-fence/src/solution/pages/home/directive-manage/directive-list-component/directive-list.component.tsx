import { Button, Col, Form, Input, Row, Select } from 'antd';
import * as React from 'react';
import {
  ITableComponent,
  TablePageTelComponent,
  ISelectLoadingComponent,
  TimePickerComponent
} from '~/solution/components/component.module';
import { AlarmParameterColumn } from './directive-list.column';
import { useDirectiveListStore } from './directive-list.component.store';
import DirectivePatchModalComponent from '../wiget/directive-patch-model-component/directive-patch-moda.component';
import { ModalType } from './directive-list.interface';
import moment from 'moment';
import { StorageUtil } from '~/framework/util/storage';
export default function DirectiveListComponent() {
  const {
    state,
    $auth,
    searchForm,
    callbackAction,
    changeTablePageIndex,
    searchClick,
    initSearchForm,
    handleModalCancel,
    getCurrentSelectInfo
  } = useDirectiveListStore();
  const { isLoading, tableData, total, pageIndex, pageSize, patchModalVisible, searchTime } = state;

  function renderSelectItems() {
    const layout = {
      labelCol: { span: 8 },
      wrapperCol: { span: 16 }
    };
    return (
      <Form {...layout} form={searchForm} style={{ width: '90%' }}>
        <Row gutter={24}>
          <Col span={9}>
            <Form.Item name="type" label="查询车辆/设备">
              <ISelectLoadingComponent
                reqUrl="queryVehicleInfoPagedList"
                placeholder="电话/车牌号/车架号/设备"
                showSearch={true}
                searchKeyName="strValue"
                allowClear={false}
                getCurrentSelectInfo={(value: any, option: any) => getCurrentSelectInfo(value, option, 'strValue')}
              />
            </Form.Item>
          </Col>
          {/* <Col span={6}>
            <Form.Item name="method" label="查询设备">
              <ISelectLoadingComponent
                reqUrl="queryDeviceList"
                placeholder="请输入设备号"
                showSearch={true}
                getCurrentSelectInfo={(value: any, option: any) => console.log(value, option)}
              />
            </Form.Item>
          </Col>
          <Col span={6}>
            <Form.Item name="method" label="监控组">
              <ISelectLoadingComponent
                reqUrl="queryGroupSearchList"
                placeholder="请输入监控组名称"
                searchForm={{
                  organizationId: StorageUtil.getLocalStorage('organizationId')
                }}
                showSearch={true}
                getCurrentSelectInfo={(value: any, option: any) => console.log(value, option)}
              />
            </Form.Item>
          </Col>
          <Col span={6}>
            <Form.Item name="method" label="监控类型">
              <Select placeholder="请选择下发方式"></Select>
            </Form.Item>
          </Col> */}
          <Col span={5}>
            <Form.Item name="cmdCode" label="指令类型">
              <ISelectLoadingComponent
                allowClear={false}
                reqUrl="getTypesList"
                placeholder="请选择指令类型"
                getCurrentSelectInfo={(value: any, option: any) => getCurrentSelectInfo(value, option, 'directiveType')}
              />
            </Form.Item>
          </Col>
          <Col span={10}>
            <Form.Item name="time" label="发送时间" wrapperCol={{ span: 24 }}>
              <TimePickerComponent
                style={{ with: 200 }}
                getDateTimeInfo={(value: any, option: any) => getCurrentSelectInfo(value, option, 'dateRange')}
                timeInfo={[
                  moment(searchTime.beginTime).format('YYYY MM DD'),
                  moment(searchTime.endTime).format('YYYY MM DD')
                ]}
                pickerType="dateRange"
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
        <Button onClick={initSearchForm} loading={isLoading}>
          清空
        </Button>
        <Button type="primary" onClick={() => callbackAction(ModalType.PATCH)} disabled={!$auth['addInstruct']}>
          下发指令
        </Button>
      </div>
    );
  }
  function RenderTable() {
    return (
      <ITableComponent
        columns={AlarmParameterColumn(callbackAction, $auth)}
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
        pageName={'指令列表'}
        selectItems={renderSelectItems()}
        searchButton={renderSearchButtons()}
        table={<RenderTable />}
      ></TablePageTelComponent>
      {/* {<DirectivePatchModalComponent visible={patchModalVisible} close={handleModalCancel} />} */}
      {patchModalVisible && <DirectivePatchModalComponent visible={patchModalVisible} close={handleModalCancel} />}
    </React.Fragment>
  );
}
