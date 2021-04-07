import { Descriptions, Form, Table } from 'antd';
import * as React from 'react';
import { IHeaderTitleComponent, ITableComponent } from '~components/component.module';
import style from './statistical-detail.component.less';

import { useDirectiveListStore } from './statistical-detail.component.store';

export default function DirectiveListComponent() {
  const { state, changeTablePageIndex } = useDirectiveListStore();
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
      <div className={style.formPart}>
        <Descriptions column={2}>
          <Descriptions.Item label="车主姓名">{detail.ownerName}</Descriptions.Item>
          <Descriptions.Item label="车牌号">{detail.plateNo}</Descriptions.Item>
          <Descriptions.Item label="设备号">{detail.deviceCode}</Descriptions.Item>
          <Descriptions.Item label="报警类型">{detail.alarmTypeText}</Descriptions.Item>
          <Descriptions.Item label="所属机构" span={2}>
            {detail.organizationName}
          </Descriptions.Item>
          <Descriptions.Item label="报警信息" span={2}>
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
          </Descriptions.Item>
        </Descriptions>
      </div>
    </div>
  );
}
