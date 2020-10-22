import * as React from 'react';
import style from './voucher-manage.component.less';
import { TablePageTelComponent, TimePickerComponent } from '~/framework/components/component.module';
import { ITableComponent } from '~/framework/components/component.module';
import { voucherManageColumns } from './voucher-manage.column';
import { useVoucherManageStore } from './voucher-manage.component.store';

import { Button, Input, Select } from 'antd';
import { ModalType } from './voucher-manage.interface';
import VoucherEditComponent from '../voucher-edit-component/voucher-edit.component';
import VoucherDetailComponent from '../voucher-detail-component/voucher-detail.component';

const { Option } = Select;

export default function VoucherManageComponent() {
  const {
    state,
    callbackAction,
    changeTablePageIndex,
    searchClick,
    getDateTimeInfo,
    handleModalCancel,
    onChange
  } = useVoucherManageStore();
  const { isLoading, searchForm, tableData, total, detailVisible, editVisible, currentId } = state;
  function renderSelectItems() {
    return (
      <React.Fragment>
        <div className="push-search-item">
          <span className="label">查找车辆:</span>
          <Input
            allowClear
            placeholder="请输入车架号"
            onChange={e => {
              onChange(e.target.value, 'keyword');
            }}
          />
        </div>
        <div className="push-search-item">
          <span className="label">安装时间:</span>
          <TimePickerComponent pickerType="dateRange" getDateTimeInfo={getDateTimeInfo} />
        </div>
      </React.Fragment>
    );
  }
  function renderSearchButtons() {
    return (
      <div className="other-search-button-item">
        <Button type="primary" onClick={searchClick}>
          查询
        </Button>
        <Button type="primary" onClick={() => callbackAction(ModalType.CREATE)}>
          新建安装单
        </Button>
      </div>
    );
  }
  function RenderTable() {
    return (
      <ITableComponent
        columns={voucherManageColumns(callbackAction)}
        isLoading={isLoading}
        pageIndex={searchForm.page}
        pageSize={searchForm.size}
        data={tableData}
        total={total}
        isPagination={true}
        changeTablePageIndex={(index: number, pageSize: number) => changeTablePageIndex(index, pageSize)}
      ></ITableComponent>
    );
  }

  return (
    <React.Fragment>
      <TablePageTelComponent
        pageName={'安装单管理'}
        selectItems={renderSelectItems()}
        searchButton={renderSearchButtons()}
        table={<RenderTable />}
      ></TablePageTelComponent>
      <VoucherEditComponent visible={editVisible} close={handleModalCancel} id={currentId} />
      <VoucherDetailComponent visible={detailVisible} close={handleModalCancel} id={currentId} />
    </React.Fragment>
  );
}
