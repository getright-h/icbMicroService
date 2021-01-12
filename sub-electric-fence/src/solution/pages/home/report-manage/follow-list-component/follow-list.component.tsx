import { Button, Col, Form, Input, Row, Select, Modal, Timeline } from 'antd';
import * as React from 'react';
import {
  ITableComponent,
  TablePageTelComponent,
  TimePickerComponent,
  ISelectLoadingComponent
} from '~/solution/components/component.module';
import { AlarmParameterColumn } from './follow-list.column';
import { useDirectiveListStore } from './follow-list.component.store';
import { AlarmType_FOR_REPORT } from '~shared/constant/alarm.const';
import { GlobalContext } from '~/solution/context/global/global.provider';
import SloveModalComponent from './slove-modal-component/slove-modal.component';

export default function DirectiveListComponent() {
  const {
    state,
    searchForm: aliaNameSearchForm,
    callbackAction,
    changeTablePageIndex,
    searchClick,
    initSearchForm,
    handleModalCancel,
    getCurrentSelectInfo
  } = useDirectiveListStore();
  const {
    isLoading,
    tableData,
    currentRoleId,
    total,
    pageIndex,
    pageSize,
    recordModalVisible,
    sloveModalVisible
  } = state;
  const { gState } = React.useContext(GlobalContext);

  function showRecordModal() {
    Modal.success({
      title: '跟进记录',
      content: (
        <Timeline style={{ marginTop: '30px' }}>
          <p>跟进详情: </p>
          <Timeline.Item>Create a services site 2015-09-01</Timeline.Item>
          <Timeline.Item>Solve initial network problems 2015-09-01</Timeline.Item>
          <Timeline.Item>Technical testing 2015-09-01</Timeline.Item>
          <Timeline.Item>Network problems being solved 2015-09-01</Timeline.Item>
        </Timeline>
      ),
      onOk: () => handleModalCancel()
    });
  }
  function renderSelectItems() {
    const queryOrgList = ISelectLoadingComponent({
      width: '240px',
      reqUrl: 'queryStoreOrganization',
      placeholder: '请选择机构',
      // searchKey: organization.organizationName || '',
      getCurrentSelectInfo: (value: string, option: any) => {
        getCurrentSelectInfo(option?.info || {}, 'organizationId');
      },
      searchForm: {
        systemId: gState?.myInfo?.systemId
      }
    });
    const queryMonitorList = ISelectLoadingComponent({
      width: '240px',
      reqUrl: 'queryVehicleGroupByRoleId',
      placeholder: '请选择监控组',
      // searchKey: organization.organizationName || '',
      getCurrentSelectInfo: (value: string, option: any) => {
        getCurrentSelectInfo(option?.info || {}, 'monitor');
      },
      searchForm: {
        systemId: gState?.myInfo?.systemId,
        roleId: currentRoleId
      }
    });
    const queryRoleList = ISelectLoadingComponent({
      width: '300px',
      reqUrl: 'queryRoleList',
      placeholder: '请选择监控角色',
      allowClear: true,
      // searchKey: organization.organizationName || '',
      getCurrentSelectInfo: (value: string, option: any) => {
        getCurrentSelectInfo(option?.info || {}, 'roleId');
      },
      searchForm: {
        systemId: gState?.myInfo?.systemId
      }
    });

    return (
      <div>
        <div style={{ marginBottom: 10 }}>
          <strong style={{ fontSize: 20, marginRight: 10 }}> 监控角色:</strong>
          {queryRoleList}
        </div>
        <Form
          form={aliaNameSearchForm}
          layout={'inline'}
          initialValues={{
            alarmType: -1
          }}
        >
          <Row gutter={[8, 8]}>
            <Col span={8}>
              <Form.Item name="strValue" label="查询车辆/设备">
                <Input placeholder="电话/车牌号/车架号/设备" allowClear={true} />
              </Form.Item>
            </Col>
            <Col span={11}>
              <Form.Item label="时间范围" name="time">
                <TimePickerComponent
                  pickerType="dateTimeRange"
                  getDateTimeInfo={(time: any, other: any) => getCurrentSelectInfo(time, 'time')}
                />
              </Form.Item>
            </Col>
            <Col span={5}>
              <Form.Item label="报警类型" name="alarmType">
                <Select style={{ width: '150px' }}>
                  {AlarmType_FOR_REPORT.map((alarm: any) => (
                    <Select.Option key={alarm.value} value={alarm.value}>
                      {alarm.name}
                    </Select.Option>
                  ))}
                </Select>
              </Form.Item>
            </Col>
          </Row>
          <Row gutter={[8, 8]}>
            <Col span={9}>
              <Form.Item label="所属机构" name="organizationId">
                {queryOrgList}
              </Form.Item>
            </Col>
            <Col span={9}>
              <Form.Item label="监控组" name="groupId">
                {queryMonitorList}
              </Form.Item>
            </Col>
            <Col span={6}>
              <Form.Item label="处理状态" name="isSettle">
                <Select style={{ width: '150px' }} placeholder="请选择状态" allowClear>
                  <Select.Option value={1}>已处理</Select.Option>
                  <Select.Option value={0}>未处理</Select.Option>
                </Select>
              </Form.Item>
            </Col>
            <Form.Item name="beginTime" noStyle></Form.Item>
            <Form.Item name="endTime" noStyle></Form.Item>
            <Form.Item name="roleId" noStyle></Form.Item>
          </Row>
        </Form>
      </div>
    );
  }
  function renderSearchButtons() {
    return (
      <div className="other-search-button-item">
        <Button type="primary" onClick={searchClick}>
          查询
        </Button>
        <Button onClick={initSearchForm}>清空</Button>
      </div>
    );
  }
  function RenderTable() {
    return (
      <ITableComponent
        columns={AlarmParameterColumn(callbackAction)}
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
        pageName={'报警跟进表'}
        selectItems={renderSelectItems()}
        searchButton={renderSearchButtons()}
        table={<RenderTable />}
      ></TablePageTelComponent>
      <SloveModalComponent visible={state.sloveModalVisible} close={handleModalCancel} />
      {recordModalVisible && !sloveModalVisible && showRecordModal()}
    </React.Fragment>
  );
}
