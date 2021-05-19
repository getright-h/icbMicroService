import { Button, Col, Form, Input, Row, Select } from 'antd';
import * as React from 'react';
import {
  ISelectLoadingComponent,
  ITableComponent,
  TablePageTelComponent
} from '~/solution/components/component.module';
import { GlobalContext } from '~/solution/context/global/global.provider';
import { OdometerListColumn } from './odometer-list.column';

import { useDirectiveListStore } from './odometer-list.component.store';

export default function DirectiveListComponent() {
  const {
    state,
    searchForm,
    callbackAction,
    changeTablePageIndex,
    searchClick,
    initSearchForm,
    getCurrentSelectInfo
  } = useDirectiveListStore();
  const { isLoading, tableData, total, pageIndex, pageSize } = state;
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
      <Form {...layout} form={searchForm} style={{ width: '90%' }}>
        <Row gutter={24}>
          <Col span={8}>
            <Form.Item name="strValue" label="查询车辆/设备">
              <Input placeholder="电话/车牌号/车架号/设备" allowClear={true} />
            </Form.Item>
          </Col>
          <Col span={8}>时间</Col>
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
      </div>
    );
  }
  function RenderTable() {
    return (
      <ITableComponent
        columns={OdometerListColumn(callbackAction)}
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
        pageName={'里程统计'}
        selectItems={renderSelectItems()}
        searchButton={renderSearchButtons()}
        table={<RenderTable />}
      ></TablePageTelComponent>
    </React.Fragment>
  );
}
