import * as React from 'react';
import style from './device-line.component.less';
import { useDeviceLineStore } from './device-line.component.store';
import { TablePageTelComponent } from '~/framework/components/component.module';
import { IHeaderTitleComponent, ITableComponent } from '~framework/components/component.module';
import { deviceLineColumns } from './device-line-column';
import { Form, Button, Input, Select } from 'antd';
import { DEVICE_ROUTE } from '~shared/constant/common.const';
import DeviceRouteModalComponent from './device-route-modal-component/device-route-modal.component';
export default function DeviceLineComponent() {
  const {
    state,
    form,
    onChange,
    searchClick,
    searchClean,
    getFlowNode,
    changeTablePageIndex,
    handleModalCancel
  } = useDeviceLineStore();
  const { searchForm = {}, tableData, isLoading, total, routeModalVisible, currentData } = state;
  const formItemLayout = {
    labelCol: {
      xs: { span: 24 },
      sm: { span: 8 }
    },
    wrapperCol: {
      xs: { span: 24 },
      sm: { span: 16 }
    }
  };
  function renderSelectItems() {
    return (
      <Form
        layout={'inline'}
        {...formItemLayout}
        form={form}
        initialValues={{
          route: -1
        }}
      >
        <Form.Item name={'deviceValue'} label={'查找设备'}>
          <Input
            style={{ width: 200 }}
            allowClear
            placeholder={'设备号, SIM卡号'}
            onChange={e => {
              onChange(e.target.value, 'deviceValue');
            }}
          ></Input>
        </Form.Item>
        <Form.Item label={'环节'} name={'route'}>
          <Select
            style={{ width: 100 }}
            onChange={e => {
              onChange(e, 'route');
            }}
          >
            {DEVICE_ROUTE.map((route: any, index: number) => (
              <Select.Option key={index} value={route.value}>
                {route.title}
              </Select.Option>
            ))}
          </Select>
        </Form.Item>
      </Form>
    );
  }
  function renderSearchButtons() {
    return (
      <div className="other-search-button-item">
        <Button type="primary" onClick={searchClick}>
          查询
        </Button>
        <Button type="primary" onClick={searchClean}>
          清空
        </Button>
      </div>
    );
  }
  function RenderTable() {
    return (
      <ITableComponent
        columns={deviceLineColumns(getFlowNode)}
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
    <div className={style.deviceLine}>
      <IHeaderTitleComponent pageName={'设备路线表'}></IHeaderTitleComponent>
      <TablePageTelComponent
        selectItems={renderSelectItems()}
        searchButton={renderSearchButtons()}
        table={<RenderTable />}
      />
      <DeviceRouteModalComponent visible={routeModalVisible} data={currentData} close={handleModalCancel} />
    </div>
  );
}
