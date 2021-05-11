import { Button, Col, Form, Input, Row, Select } from 'antd';
import * as React from 'react';
import {
  ITableComponent,
  TablePageTelComponent,
  TimePickerComponent,
  ISelectLoadingComponent,
  InputExportFilenameComponent
} from '~/solution/components/component.module';
import { AlarmParameterColumn } from './monitor-list.column';
import { GlobalContext } from '~/solution/context/global/global.provider';
import { useDirectiveListStore } from './monitor-list.component.store';
import { AlarmType_FOR_REPORT } from '~shared/constant/alarm.const';

export default function DirectiveListComponent() {
  const {
    state,
    searchForm,
    callbackAction,
    changeTablePageIndex,
    searchClick,
    initSearchForm,
    getCurrentSelectInfo,
    handleExport,
    handleExportVisible
  } = useDirectiveListStore();
  const { isLoading, tableData, total, pageIndex, pageSize } = state;
  const { gState } = React.useContext(GlobalContext);

  function renderSelectItems() {
    const layout = {
      labelCol: { span: 8 },
      wrapperCol: { span: 16 }
    };
    const queryOrgList = ISelectLoadingComponent({
      reqUrl: 'queryStoreOrganization',
      placeholder: '请选择机构',
      getCurrentSelectInfo: (value: string, option: any) => {
        getCurrentSelectInfo(option.info || {}, 'organizationId');
      },
      searchForm: {
        systemId: gState?.myInfo?.systemId
      }
    });
    const queryMonitorGroup = ISelectLoadingComponent({
      reqUrl: 'queryGroupSearchList',
      placeholder: '请选择监控组',
      getCurrentSelectInfo: (value: string, option: any) => {
        getCurrentSelectInfo(option.info || {}, 'groupId');
      },
      searchForm: {
        systemId: gState?.myInfo?.systemId
      }
    });
    return (
      <Form form={searchForm} {...layout} style={{ width: '90%' }}>
        <Row gutter={24}>
          <Col span={8}>
            <Form.Item
              label={
                <strong
                  style={{
                    fontSize: 20
                  }}
                >
                  监控组
                </strong>
              }
              name="groupId"
            >
              {queryMonitorGroup}
            </Form.Item>
          </Col>
        </Row>
        <Row gutter={[8, 8]}>
          <Col span={8}>
            <Form.Item name="strValue" label="查询车辆/设备">
              <Input placeholder="电话/车牌号/车架号/设备" allowClear={true} />
            </Form.Item>
          </Col>
          <Col span={8}>
            <Form.Item label="所属机构" name="organizationId">
              {queryOrgList}
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
        pageName={'监控组报表'}
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
