import * as React from 'react';
import style from './supplier-setting.component.less';
import { useSupplierSettingStore } from './supplier-setting.component.store';
import { sppplierColumns } from './supplier-setting-column';
import {
  TablePageTelComponent,
  IHeaderTitleComponent,
  ITableComponent,
  ISelectLoadingComponent
} from '~/framework/components/component.module';
import { ModalType } from '../base-manage.const';
import AddSupplierComponent from './add-supplier-component/add-supplier.component';
import { Button, Input, Select } from 'antd';
export default function SupplierSettingComponent() {
  const {
    state,
    changeTablePageIndex,
    onChange,
    searchClick,
    searchValueChange,
    getMonitorGroupList,
    callbackAction,
    handleCloseVisible,
    getTableList
  } = useSupplierSettingStore();
  const { isLoading, searchForm = {}, tableData, total, addSupplierVisible } = state;
  function renderSelectItems() {
    return (
      <>
        <div className="push-search-item">
          <span className="label">选择供应商:</span>
          <ISelectLoadingComponent
            reqUrl={'querySupplierList'}
            placeholder="输入供应商名称"
            getCurrentSelectInfo={(value: any, option: any) => onChange(value, 'supplier')}
          />
        </div>
        <div className="push-search-item">
          <Button type="primary" onClick={searchClick}>
            查询
          </Button>
        </div>
      </>
    );
  }
  function renderSearchButtons() {
    return (
      <div className="other-search-button-item">
        <Button type="primary" onClick={() => callbackAction(ModalType.ADD)}>
          新增供应商
        </Button>
      </div>
    );
  }
  function RenderTable() {
    const data = [];
    for (let i = 0; i < 46; i++) {
      data.push({
        key: i,
        supplier: `owner ${i}`,
        phone: 156654651654,
        address: Math.random()
          .toString(16)
          .slice(4, 16),
        contract: i
      });
    }

    return (
      <ITableComponent
        columns={sppplierColumns(callbackAction)}
        isLoading={isLoading}
        pageIndex={searchForm.index}
        pageSize={searchForm.size}
        data={data}
        total={total}
        isPagination={true}
        changeTablePageIndex={(index: number, pageSize: number) => changeTablePageIndex(index, pageSize)}
      ></ITableComponent>
    );
  }

  return (
    <div>
      <IHeaderTitleComponent pageName={'设备型号设置'} />

      <TablePageTelComponent
        selectItems={renderSelectItems()}
        searchButton={renderSearchButtons()}
        table={<RenderTable />}
      />
      <AddSupplierComponent close={handleCloseVisible} visible={addSupplierVisible} />
    </div>
  );
}
