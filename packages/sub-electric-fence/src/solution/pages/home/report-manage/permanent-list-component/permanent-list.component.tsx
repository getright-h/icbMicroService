import { Button, Col, Form, Input, Row } from 'antd';
import * as React from 'react';
import {
  ITableComponent,
  TablePageTelComponent,
  TimePickerComponent,
  ISelectLoadingComponent,
  InputExportFilenameComponent
} from '~/solution/components/component.module';
import { PermanentListColumn } from './permanent-list.column';
import { usePermanentListStore } from './permanent-list.component.store';
import { GlobalContext } from '~/solution/context/global/global.provider';

export default function PermanentListComponent() {
  const {
    state,
    searchForm,
    callbackAction,
    changeTablePageIndex,
    searchClick,
    initSearchForm,
    getCurrentSelectInfo,
    handleTableOnchange,
    handleExport,
    handleExportVisible
  } = usePermanentListStore();
  const { isLoading, tableData, total, pageIndex, pageSize, sortInfo, timeInfo } = state;
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
        form={searchForm}
        {...layout}
        style={{ width: '90%' }}
        initialValues={{
          alarmType: -1
        }}
      >
        <Row gutter={24}>
          <Col span={8}>
            <Form.Item name="strValue" label="查询车辆/设备">
              <Input placeholder="电话/车牌号/车架号/设备" allowClear={true} />
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
        columns={PermanentListColumn(sortInfo, callbackAction)}
        isLoading={isLoading}
        pageIndex={pageIndex}
        pageSize={pageSize}
        data={tableData}
        total={total}
        isPagination={true}
        onChange={handleTableOnchange}
        sortDirections={['descend']}
        scroll={{ x: '110%' }}
        changeTablePageIndex={(pageIndex: number, pageSize: number) => changeTablePageIndex(pageIndex, pageSize)}
      ></ITableComponent>
    );
  }

  return (
    <React.Fragment>
      <TablePageTelComponent
        pageName={'常驻点统计表'}
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
