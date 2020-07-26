import * as React from 'react';
import style from './create-bind-car.component.less';
import { Input, Form, Spin, DatePicker, Select } from 'antd';
import { useCreateBindCarStore } from './create-bind-car.component.store';
import { ICreateBindCarProps } from './create-bind-car.interface';
import locale from 'antd/es/date-picker/locale/zh_CN';
const { Option } = Select;
function CreateBindCarComponent(props: ICreateBindCarProps) {
  const { form, state, throFetchCarInfo, handleSearchFence } = useCreateBindCarStore(props);
  const { fetching, searchDataList, searchFenceList } = state;
  const { onValuesChange, formInitValue } = props;
  const formItemLayout = {
    labelCol: { span: 5 },
    wrapperCol: { span: 19 }
  };

  return (
    <div className={style.test}>
      <Form name="validate_other" form={form} onValuesChange={() => onValuesChange(form)} {...formItemLayout}>
        {!formInitValue ? (
          <Form.Item label="请选择绑定对象" name="bindData">
            <Select
              mode="multiple"
              labelInValue
              placeholder="请输入车辆所属机构或车队名或车牌号"
              notFoundContent={fetching ? <Spin size="small" /> : null}
              filterOption={false}
              onSearch={throFetchCarInfo}
              style={{ width: '100%' }}
            >
              {searchDataList &&
                searchDataList.map((d: any) => (
                  <Option key={d.key} value={JSON.stringify({ key: d.key, type: d.type })} type={d.value}>
                    {d.value}
                  </Option>
                ))}
            </Select>
          </Form.Item>
        ) : (
          <Form.Item label="绑定对象" name="thingName">
            <Input disabled />
          </Form.Item>
        )}
        <Form.Item name="fenceId" label="选择围栏">
          <Select
            showSearch
            placeholder="请选择电子围栏"
            defaultActiveFirstOption={false}
            showArrow={false}
            filterOption={false}
            onSearch={handleSearchFence}
            notFoundContent={fetching ? <Spin size="small" /> : null}
          >
            {searchFenceList &&
              searchFenceList.map((d: any) => (
                <Option key={d.id} value={d.id}>
                  {d.name}
                </Option>
              ))}
          </Select>
        </Form.Item>
        <Form.Item name="begin" label="绑定开始时间">
          <DatePicker showTime locale={locale} format="YYYY-MM-DD" />
        </Form.Item>
        <Form.Item name="end" label="绑定结束时间">
          <DatePicker showTime locale={locale} format="YYYY-MM-DD" />
        </Form.Item>
      </Form>
    </div>
  );
}

export default CreateBindCarComponent;
