import * as React from 'react';
import style from './demo.component.less';
import { useDemoStore } from './demo.component.store';
import {
  TablePageTelComponent,
  ITableComponent,
  TimePickerComponent,
  IUploadImgComponent,
  ImageDisplayComponent,
  ISelectLoadingComponent
} from '~/framework/components/component.module';
import IAreaCascaderComponent from '~/framework/components/i-area-cascader-component/i-area-cascader.component';
import { Button } from 'antd';
import { demoColumns } from './demo-columns';

export default function DemoComponent() {
  const { state, setAreaInfo, tableAction, changeTablePageIndex, getCurrentSelectInfo } = useDemoStore();
  const { searchForm, tableData, total, isLoading } = state;
  function renderPageLeft() {
    return <h3>pageLeft</h3>;
  }
  function renderSelectItems() {
    return (
      <React.Fragment>
        <h3>selectItems</h3>
        <div className="push-search-item">
          <span className="label">区域选择：</span>
          <IAreaCascaderComponent
            deep={2}
            setAreaInfo={(value: any, selectedOptions: any) => setAreaInfo(value, selectedOptions)}
          />
        </div>
        <div className="push-search-item">
          <span className="label">时间选择：</span>
          <TimePickerComponent pickerType="dateRange" />
        </div>
        <div className="push-search-item">
          <span className="label">下拉搜索：</span>
          <ISelectLoadingComponent
            reqUrl="queryOrganizationSelectList"
            placeholder="请选择"
            getCurrentSelectInfo={(value, option) => getCurrentSelectInfo(value, option)}
          ></ISelectLoadingComponent>
        </div>
        <div className="push-search-item">
          <span className="label">图片上传：</span>
          <IUploadImgComponent />
        </div>
        <div className="push-search-item">
          <span className="label">图片预览：</span>
          <ImageDisplayComponent imageUrl="https://upload.i-cbao.com/files/20200320/ca0f4722-bece-4c41-9d8d-52d49774c9d0.png" />
        </div>
      </React.Fragment>
    );
  }
  function renderSearchButtons() {
    return (
      <div className="push-search-button-item">
        <Button type="primary">searchButton</Button>
      </div>
    );
  }
  function renderOtherButtons() {
    return (
      <div className="other-search-button-item">
        <Button type="primary">otherSearchBtns</Button>
      </div>
    );
  }
  function renderTable() {
    return (
      <ITableComponent
        columns={demoColumns(tableAction)}
        isLoading={isLoading}
        pageIndex={searchForm.index}
        pageSize={searchForm.size}
        data={tableData}
        total={total}
        isPagination={true}
        changeTablePageIndex={(index: number, pageSize: number) => changeTablePageIndex(index, pageSize)}
      ></ITableComponent>
    );
  }
  return (
    <TablePageTelComponent
      leftFlex={1}
      rightFlex={5}
      pageName={'页面标题-pageName'}
      pageLeft={renderPageLeft()}
      selectItems={renderSelectItems()}
      searchButton={renderSearchButtons()}
      otherSearchBtns={renderOtherButtons()}
      table={renderTable()}
    ></TablePageTelComponent>
  );
}
