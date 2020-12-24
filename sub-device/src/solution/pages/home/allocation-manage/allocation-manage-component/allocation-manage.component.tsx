import * as React from 'react';
import { TablePageTelComponent, ITableComponent, TimePickerComponent } from '~/framework/components/component.module';
import { allocationManageColumns } from './allocation-manage.column';
import { useAllocationManageStore } from './allocation-manage.component.store';
import { Button, Input, Select, Form } from 'antd';
import { ModalType } from '~shared/constant/common.const';
import { AllOT_STATE } from '~shared/constant/common.const';
import TransferRecordComponent from './transfer-record-component/transfer-record.component';

const { Option } = Select;

export default function AllocationManageComponent() {
  const {
    state,
    form,
    callbackAction,
    changeTablePageIndex,
    searchClick,
    handleModalCancel,
    openModal,
    searchClean,
    onChange
  } = useAllocationManageStore();
  const { isLoading, searchForm, tableData, total, visibleModal } = state;
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
      <Form {...formItemLayout} layout={'inline'} form={form}>
        <Form.Item label="输入调拨单号" name="code">
          <Input
            allowClear
            placeholder="请输入调拨单号"
            onChange={e => {
              onChange(e.target.value, 'code');
            }}
          />
        </Form.Item>
        <Form.Item label="查找创建时间" name="time">
          <TimePickerComponent
            pickerType={'dateRange'}
            getDateTimeInfo={(time: any, other: any) => onChange(time, 'time')}
          />
        </Form.Item>
        <Form.Item label="调拨状态" name="state">
          <Select
            style={{ width: 200 }}
            defaultValue={''}
            placeholder="请选择"
            onChange={value => {
              onChange(value, 'state');
            }}
          >
            {AllOT_STATE.map((item, index) => (
              <Option key={index} value={item.value}>
                {item.label}
              </Option>
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
          搜索
        </Button>
        <Button onClick={searchClean}>清空</Button>
      </div>
    );
  }
  function renderOtherButtons() {
    return (
      <Button type="primary" onClick={() => callbackAction(ModalType.CREATE)}>
        申请调拨单
      </Button>
    );
  }
  function RenderTable() {
    return (
      <ITableComponent
        columns={allocationManageColumns(callbackAction)}
        rowKey="allotId"
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
    <React.Fragment>
      <TablePageTelComponent
        pageName={'调拨单'}
        selectItems={renderSelectItems()}
        searchButton={renderSearchButtons()}
        // otherSearchBtns={renderOtherButtons()}
        table={<RenderTable />}
      ></TablePageTelComponent>
      <TransferRecordComponent visible={visibleModal} close={handleModalCancel} />
    </React.Fragment>
  );
}
