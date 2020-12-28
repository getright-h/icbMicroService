import { Form, Table } from 'antd';
import * as React from 'react';
import { IHeaderTitleComponent, ITableComponent } from '~components/component.module';
import style from './statistical-detail.component.less';

import { useDirectiveListStore } from './statistical-detail.component.store';

export default function DirectiveListComponent() {
  const {
    state,
    searchForm,
    callbackAction,
    changeTablePageIndex,
    searchClick,
    initSearchForm
  } = useDirectiveListStore();
  const { detail, pageIndex, pageSize } = state;
  const layout = {
    labelCol: { span: 8 },
    wrapperCol: { span: 12 }
  };

  const columns = [
    {
      title: '报警时间',
      dataIndex: 'time'
    },
    {
      title: '报警地址',
      dataIndex: 'address'
    }
  ];
  return (
    <div className={style.mainForm}>
      <IHeaderTitleComponent pageName={'报警统计详情'} />
      <Form {...layout}>
        <div className={style.formPart}>
          <div className={style.formItems}>
            <div className={style.formLeft}>
              <Form.Item label="车主姓名">{detail.ownerName}</Form.Item>
              <Form.Item label="车牌号">{detail.plateNo}</Form.Item>
              <Form.Item label="设备号">{detail.deviceCode}</Form.Item>
              <Form.Item label="报警类型">{detail.alarmTypeText}</Form.Item>
              {/* <Form.Item label="最后报警时间"></Form.Item>
              <Form.Item label="报警次数"></Form.Item>
              <Form.Item label="最后报警地址"></Form.Item> */}
              <Form.Item label="所属机构">{detail.organizationName}</Form.Item>
              {/* <Form.Item label="所属监控组">{detail.ownerName}</Form.Item> */}
              <Form.Item name="remark" label="报警信息">
                <ITableComponent
                  columns={columns}
                  isLoading={state.isLoading}
                  pageIndex={pageIndex}
                  pageSize={pageSize}
                  data={state.tableData}
                  total={state.total}
                  isPagination={true}
                  changeTablePageIndex={(pageIndex: number, pageSize: number) =>
                    changeTablePageIndex(pageIndex, pageSize)
                  }
                ></ITableComponent>
              </Form.Item>
            </div>
          </div>
        </div>
      </Form>
    </div>
  );
}
