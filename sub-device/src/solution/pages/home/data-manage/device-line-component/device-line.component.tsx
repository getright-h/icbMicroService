import * as React from 'react';
import style from './device-line.component.less';
import { useDeviceLineStore } from './device-line.component.store';
import { TablePageTelComponent, TimePickerComponent } from '~/framework/components/component.module';
import { IHeaderTitleComponent, ITableComponent } from '~framework/components/component.module';
import { deviceLineColumns } from './device-line-column';
import { Form, Button, Input, Select } from 'antd';
export default function DeviceLineComponent() {
  const { state, onChange, searchClick, cleanClick, callbackAction, changeTablePageIndex } = useDeviceLineStore();
  const { searchForm = {}, tableData, isLoading, total } = state;
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
      <Form layout={'inline'} {...formItemLayout}>
        <Form.Item label={'查找设备'}>
          <Input
            style={{ width: 200 }}
            allowClear
            placeholder={'设备号, SIM卡号'}
            onChange={e => {
              onChange(e.target.value, 'keyword');
            }}
          ></Input>
        </Form.Item>
        <Form.Item label={'环节'}>
          <Select style={{ width: 100 }}>
            <Select.Option value={-1}>全部</Select.Option>
            <Select.Option value={1}>在库</Select.Option>
            <Select.Option value={1}>遗失</Select.Option>
            <Select.Option value={1}>调拨中</Select.Option>
            <Select.Option value={1}>已绑定</Select.Option>
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
        <Button type="primary" onClick={cleanClick}>
          清空
        </Button>
      </div>
    );
  }
  function RenderTable() {
    return (
      <ITableComponent
        columns={deviceLineColumns(callbackAction)}
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
    </div>
  );
}
