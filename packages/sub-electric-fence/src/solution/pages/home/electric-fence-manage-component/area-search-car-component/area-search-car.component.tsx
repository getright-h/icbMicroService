import { Button, DatePicker, Form, Radio, Row, Select } from 'antd';
import * as React from 'react';
import {
  ITableComponent,
  SelectAddressComponent,
  TablePageTelComponent,
  TimePickerComponent
} from '~/solution/components/component.module';
import style from './area-search-car.component.less';
import { useAreaSearchCarStore } from './area-search-car.component.store';
import { AreaSearchCarColumn } from './area-search-car.column';
import { FENCE_TYPE_ENUM } from './area-search-car.interface';
import FenceMapComponent from './fence-map-component/fence-map.component';
import { RangePickerProps } from 'antd/lib/date-picker';
import moment from 'moment';
const { RangePicker } = DatePicker;
const { Option } = Select;

export default function AreaSearchCarComponent() {
  const {
    state,
    form,
    searchClick,
    changeTablePageIndex,
    handleChangeCircle,
    handleCircleLocation,
    getAddressInfo,
    onFenceTypeChange
  } = useAreaSearchCarStore();
  const {
    isLoading,
    tableData,
    pageIndex,
    pageSize,
    total,
    locationList,
    fenceType,
    circleLocation,
    districtAdcode
  } = state;

  function fenceTypeForArea(fenceType: number) {
    switch (fenceType) {
      case FENCE_TYPE_ENUM.POLYGON:
        return (
          <Form.Item extra="请在地图上选择多边形范围" style={{ marginBottom: 0 }}>
            <Select
              showSearch
              placeholder="请输入多边形的中心点地址"
              defaultActiveFirstOption={false}
              showArrow={false}
              filterOption={false}
              onSearch={handleChangeCircle}
              onChange={handleCircleLocation}
              notFoundContent={null}
            >
              {locationList &&
                locationList.map(
                  (d: any) =>
                    d.location && (
                      <Option key={d.id} value={JSON.stringify(d.location)}>
                        {d.name}
                      </Option>
                    )
                )}
            </Select>
          </Form.Item>
        );
      case FENCE_TYPE_ENUM.ADMINISTRATIVEDIVISION:
        return (
          <Form.Item style={{ marginBottom: 0 }}>
            <SelectAddressComponent getAddressInfo={getAddressInfo} initValue={null}></SelectAddressComponent>
          </Form.Item>
        );
      default:
        return null;
    }
  }

  function renderSelectItems() {
    const layout = {
      labelCol: { span: 8 },
      wrapperCol: { span: 16 }
    };
    return (
      <Form form={form} {...layout} style={{ width: '60%' }}>
        <Form.Item
          label="时间范围"
          name="time"
          required
          extra="时间跨度最大支持6小时"
          rules={[
            { required: true, message: '请选择时间范围' },
            {
              validator(_, value) {
                if (value && moment(value[1]).isSameOrBefore(moment(value[0]).add(6, 'h'), 's')) {
                  return Promise.resolve();
                }
                return Promise.reject(new Error('时间范围不能超过6小时'));
              }
            }
          ]}
        >
          <RangePicker showTime />
        </Form.Item>
        <Form.Item label="位置范围" required>
          <Form.Item noStyle>
            <Radio.Group defaultValue={fenceType} onChange={onFenceTypeChange} buttonStyle="solid">
              <Radio.Button value={FENCE_TYPE_ENUM.POLYGON}>多边形</Radio.Button>
              {/* <Radio.Button value={FENCE_TYPE_ENUM.ADMINISTRATIVEDIVISION}>
                行政区域
              </Radio.Button> */}
            </Radio.Group>
          </Form.Item>
          {fenceTypeForArea(fenceType)}
        </Form.Item>
        <Form.Item name="polyline" noStyle></Form.Item>
      </Form>
    );
  }

  function renderSearchButtons() {
    return (
      <div className="other-search-button-item">
        <Button type="primary" onClick={searchClick} loading={isLoading}>
          查询
        </Button>
        {/* <Button type="primary" onClick={() => {}}>
          导出
        </Button> */}
      </div>
    );
  }

  function renderMapAndTable() {
    return (
      <>
        <FenceMapComponent
          fenceType={fenceType}
          onValueChange={(key, value) => {
            key == 'polygon' && form.setFieldsValue({ polyline: value });
          }}
          circleLocation={circleLocation}
          districtAdcode={districtAdcode}
          pointDatas={tableData}
        />
        <ITableComponent
          columns={AreaSearchCarColumn()}
          rowKey="dc"
          isLoading={isLoading}
          pageIndex={pageIndex}
          pageSize={pageSize}
          data={tableData}
          total={total}
          isPagination={true}
          changeTablePageIndex={(pageIndex: number, pageSize: number) => changeTablePageIndex(pageIndex, pageSize)}
          scroll={{ x: 'max-content' }}
        ></ITableComponent>
      </>
    );
  }
  return (
    <>
      <TablePageTelComponent
        pageName={'区域查车'}
        selectItems={renderSelectItems()}
        searchButton={renderSearchButtons()}
        table={renderMapAndTable()}
      ></TablePageTelComponent>
    </>
  );
}
