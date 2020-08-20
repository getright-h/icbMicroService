import * as React from 'react';
import style from './warehouse-manage.component.less';
import { TablePageTelComponent } from '~/framework/components/component.module';
import { ITableComponent } from '~/framework/components/component.module';
import { warehouseManageColumns } from './warehouse-manage.column';
import { useWarehouseManageStore } from './warehouse-manage.component.store';

import { Button, Input, Select } from 'antd';
import { ModalType } from './warehouse-manage.interface';
import WarehouseLeftComponent from '../warehouse-left-component/warehouse-left.component';
import EditStorageBinComponent from '../widget/edit-storage-bin-component/edit-storage-bin.component';

export default function WarehouseManageComponent() {
  const {
    state,
    callbackAction,
    changeTablePageIndex,
    searchClick,
    handleSearchFormChange,
    modalClose
  } = useWarehouseManageStore();
  const { isLoading, searchForm, tableData, total, visibleModal, currentId } = state;

  function renderPageLeft() {
    return <WarehouseLeftComponent />;
  }
  function warehouseInfo() {
    return (
      <>
        <h3>库存总数：</h3>
        <div className={style.infoRow}>
          <div className="push-search-item">仓库名：</div>
          <div className="push-search-item">仓库地址：</div>
          <div className="push-search-item">总库存报警：</div>
          <div className="push-search-item">仓库管理人：</div>
          <div className="push-search-item">管理人手机号：</div>
        </div>
      </>
    );
  }
  function renderSelectItems() {
    return (
      <>
        <div className="push-search-item">
          {/* <span className="label">仓位名：</span> */}
          <Input
            allowClear
            placeholder="请输入仓位名"
            onChange={e => {
              handleSearchFormChange(e.target.value, 'keyword');
            }}
          />
        </div>
      </>
    );
  }
  function renderSearchButtons() {
    return (
      <div className="other-search-button-item">
        <Button type="primary" onClick={searchClick}>
          查询
        </Button>
        <Button type="primary" onClick={() => callbackAction(ModalType.CREATE)}>
          添加仓位
        </Button>
      </div>
    );
  }
  function RenderTable() {
    return (
      <ITableComponent
        columns={warehouseManageColumns(callbackAction)}
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
        leftFlex={1}
        rightFlex={4}
        pageLeft={renderPageLeft()}
        pageName={'仓库管理'}
        selectTags={warehouseInfo()}
        selectItems={renderSelectItems()}
        searchButton={renderSearchButtons()}
        table={<RenderTable />}
      ></TablePageTelComponent>
      <EditStorageBinComponent visible={visibleModal} close={modalClose} id={currentId} />
    </React.Fragment>
  );
}
