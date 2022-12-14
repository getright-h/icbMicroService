import { Button, Col, Form, Input, Row, Select } from 'antd';
import * as React from 'react';
import {
  ITableComponent,
  TablePageTelComponent,
  TimePickerComponent,
  ISelectLoadingComponent,
  InputExportFilenameComponent
} from '~/solution/components/component.module';
import { RecordListColumn } from './record-list.column';
import { useRecordListStore } from './record-list.component.store';
import { GlobalContext } from '~/solution/context/global/global.provider';
import { AlarmType_FOR_REPORT } from '~shared/constant/alarm.const';

export default function RecordListComponent() {
  const {
    state,
    searchForm,
    getCurrentSelectInfo,
    callbackAction,
    changeTablePageIndex,
    searchClick,
    initSearchForm,
    handleExport,
    handleExportVisible
  } = useRecordListStore();
  const { isLoading, tableData, total, pageIndex, pageSize, timeInfo } = state;
  const { gState } = React.useContext(GlobalContext);

  function renderSelectItems() {
    const layout = {
      labelCol: { span: 7 },
      wrapperCol: { span: 16 }
    };
    const queryOrgList = ISelectLoadingComponent({
      reqUrl: 'queryStoreOrganization',
      placeholder: '请选择机构',
      // searchKey: organization.organizationName || '',
      getCurrentSelectInfo: (value: string, option: any) => {
        getCurrentSelectInfo(option.info || {}, 'organizationId');
      },
      searchForm: {
        systemId: gState?.myInfo?.systemId
      }
    });
    return (
      <Form
        {...layout}
        style={{ width: '90%' }}
        form={searchForm}
        initialValues={{
          alarmType: 1
        }}
      >
        <Row gutter={24}>
          <Col span={8}>
            <Form.Item name="strValue" label="查询车辆/设备">
              <Input placeholder="电话/车牌号/车架号/设备" allowClear={true} />
            </Form.Item>
          </Col>
          <Col span={5}>
            <Form.Item label="报警类型" name="alarmType">
              <Select>
                {AlarmType_FOR_REPORT.map((alarm: any) => (
                  <Select.Option key={alarm.value} value={alarm.value}>
                    {alarm.name}
                  </Select.Option>
                ))}
              </Select>
            </Form.Item>
          </Col>
          <Col span={11}>
            <Form.Item label="时间范围" name="time">
              <TimePickerComponent
                timeInfo={timeInfo}
                pickerType="dateTimeRange"
                getDateTimeInfo={(time: any, other: any) => getCurrentSelectInfo(time, 'time')}
              />
            </Form.Item>
          </Col>
          <Col span={8}>
            <Form.Item label="所属机构" name="organizationId">
              {queryOrgList}
            </Form.Item>
          </Col>
          {/* <Form.Item name="beginTime" noStyle></Form.Item>
          <Form.Item name="endTime" noStyle></Form.Item> */}
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
        <Button type="primary" onClick={() => handleExportVisible(true)}>
          导出
        </Button>
      </div>
    );
  }
  function RenderTable() {
    return (
      <ITableComponent
        columns={RecordListColumn(callbackAction)}
        isLoading={isLoading}
        pageIndex={pageIndex}
        pageSize={pageSize}
        data={tableData}
        total={total}
        isPagination={true}
        // scroll={{ x: '110%' }}
        changeTablePageIndex={(pageIndex: number, pageSize: number) => changeTablePageIndex(pageIndex, pageSize)}
      ></ITableComponent>
    );
  }

  return (
    <React.Fragment>
      <TablePageTelComponent
        pageName={'报警记录表'}
        selectItems={renderSelectItems()}
        searchButton={renderSearchButtons()}
        table={<RenderTable />}
      ></TablePageTelComponent>
      <InputExportFilenameComponent
        visible={state.exportVisible}
        getValues={v => handleExport(v.name)}
        close={() => handleExportVisible(false)}
      />
    </React.Fragment>
  );
}
