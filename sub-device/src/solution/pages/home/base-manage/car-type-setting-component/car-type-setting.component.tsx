import React from 'react';
import style from './car-type-setting.component.less';
import { useCarTypeSettingStore } from './car-type-setting.component.store';
import { IHeaderTitleComponent, ITableComponent, TablePageTelComponent } from '~framework/components/component.module';
import { carTypeColumns } from './car-type-column';
import { Form, Button, Input } from 'antd';
import { ModalType } from '../base-manage.const';
export default function CarTypeSettingComponent() {
  const {
    state,
    callbackAction,
    changeTablePageIndex,
    onChange,
    searchClick,
    handleModalCancel,
    searchValueChange,
    getMonitorGroupList
  } = useCarTypeSettingStore();
  const { isLoading, searchForm = {}, tableData, total, currentData, addGroupModalVisible } = state;

  function RenderTable() {
    const data = [];
    for (let i = 0; i < 46; i++) {
      data.push({
        series: i,
        info: `owner ${i}`,
        brand: 156654651654,
        color: Math.random()
          .toString(16)
          .slice(4, 16),
        createTime: i
      });
    }

    return (
      <ITableComponent
        title={'车辆配置'}
        columns={carTypeColumns(callbackAction)}
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

  function renderPageLeft() {
    const { Search } = Input;
    return (
      <div className={style.carBrand}>
        <h3>
          车辆品牌<a className={style.addBrand}>添加品牌</a>
        </h3>
        <Search
          style={{ marginBottom: 8 }}
          placeholder="品牌、厂商、型号"
          onChange={searchValueChange}
          onSearch={getMonitorGroupList}
          enterButton
        />
      </div>
    );
  }
  return (
    <div className={style.carType}>
      <IHeaderTitleComponent pageName={'车型设置'} />

      <TablePageTelComponent selectItems={<h3>车辆配置</h3>} pageLeft={renderPageLeft} table={<RenderTable />} />
    </div>
  );
}
