import { Button, Col, Form, Input, Row, Select } from 'antd';
import * as React from 'react';
import {
  InputExportFilenameComponent,
  ISelectLoadingComponent,
  ITableComponent,
  TablePageTelComponent,
  TimePickerComponent
} from '~/solution/components/component.module';
import { GlobalContext } from '~/solution/context/global/global.provider';
import { DeviceStateConst } from '~/solution/shared/enums/home.enum';
import { StateListColumn } from './state-list.column';

import { useStateListStore } from './state-list.component.store';

export default function StateListComponent() {
  const {
    state,
    searchForm,
    callbackAction,
    changeTablePageIndex,
    searchClick,
    initSearchForm,
    getCurrentSelectInfo,
    handleExport,
    handleExportVisible,
    getCurrentInfo
  } = useStateListStore();
  const { isLoading, tableData, total, pageIndex, pageSize, timeInfo } = state;
  const { gState } = React.useContext(GlobalContext);

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

  function renderSelectItems() {
    const layout = {
      labelCol: { span: 8 },
      wrapperCol: { span: 16 }
    };
    return (
      <Form {...layout} form={searchForm} style={{ width: '90%' }} initialValues={{ status: -1 }}>
        <Row gutter={24}>
          <Col span={8}>
            <Form.Item name="strValue" label="查询车辆/设备">
              <Input placeholder="电话/车牌号/车架号/设备号" allowClear />
            </Form.Item>
          </Col>
          <Col span={8}>
            <Form.Item name="status" label="设备状态">
              <Select placeholder="请选择设备状态">
                <Select.Option value={-1}>全部</Select.Option>
                {DeviceStateConst.map(item => (
                  <Select.Option key={item.key} value={item.key}>
                    {item.title}
                  </Select.Option>
                ))}
              </Select>
            </Form.Item>
          </Col>
          <Col span={8}>
            <Form.Item label="所属机构" name="organizationId">
              {queryOrgList}
            </Form.Item>
          </Col>
          <Col span={12}>
            <Form.Item label="时间范围" name="time" labelCol={{ span: 4 }}>
              <TimePickerComponent
                timeInfo={timeInfo}
                pickerType="dateTimeRange"
                getDateTimeInfo={(time: any, other: any) => getCurrentInfo(time, 'time')}
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
        <Button type="primary" onClick={() => handleExportVisible(true)}>
          导出
        </Button>
      </div>
    );
  }
  function RenderTable() {
    return (
      <ITableComponent
        columns={StateListColumn(callbackAction)}
        isLoading={isLoading}
        pageIndex={pageIndex}
        pageSize={pageSize}
        data={tableData}
        total={total}
        isPagination={true}
        scroll={{ x: 'max-content' }}
        changeTablePageIndex={(pageIndex: number, pageSize: number) => changeTablePageIndex(pageIndex, pageSize)}
      ></ITableComponent>
    );
  }

  return (
    <React.Fragment>
      <TablePageTelComponent
        pageName={'设备状态统计'}
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
