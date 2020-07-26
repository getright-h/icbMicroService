import * as React from 'react';
import { useState, useEffect } from 'react';
import style from './create-electric-fence.component.less';
import { Input, Form, Switch, Radio, Button } from 'antd';
import { useCreateElectricFenceStore } from './create-electric-fence.component.store';
import { SelectAddressComponent } from '~/solution/components/component.module';
import { FENCETYPENUM, ICreateElectricProps } from './create-electric-fence.interface';
import { RadioChangeEvent } from 'antd/lib/radio';
import * as _ from 'lodash';
import { MainFenceManageContext } from '../main-fence-manage.provider';
const { Search } = Input;
// 用来编辑和增加的组件
export default function CreateElectricFenceComponent(props: ICreateElectricProps) {
  const { state, onFinish, form, handleChangeCircle, onCrPlaceChange, getAddressInfo } = useCreateElectricFenceStore(
    props
  );
  const [fenceType, setFenceType] = useState(FENCETYPENUM.POLYGON);
  const { mainFenceManageState, dispatch } = React.useContext(MainFenceManageContext);
  const { editData, isEdit } = mainFenceManageState;

  const { isLoading } = state;
  useEffect(() => {
    form.resetFields();
    editData && onFenceTypeChange(editData.fenceType);
  }, [editData]);

  const formItemLayout = {
    labelCol: { span: 5 },
    wrapperCol: { span: 19 }
  };

  // 改变当前的围栏类型
  const onFenceTypeChange = (e: RadioChangeEvent | number) => {
    let value: any = e;
    if (typeof e == 'object') {
      value = e.target.value;
    }
    setFenceType(value);
    props.onValueChange('currentChoose', value);
  };

  // 不同的围栏类型有不同的UI
  function fenceTypeForArea(fenceType: number) {
    switch (fenceType) {
      case FENCETYPENUM.CIRCLE:
        return (
          <>
            <Form.Item name="centerPlace">
              <Search placeholder="输入圆的中心点地址" onSearch={handleChangeCircle} style={{ width: 200 }} />
              {/* <Input placeholder="输入圆的中心点地址" onChange={handleChangeCircle} /> */}
            </Form.Item>
            <Form.Item name="rPlace">
              <Input placeholder="输入圆的半径" onChange={onCrPlaceChange} />
            </Form.Item>
          </>
        );
      case FENCETYPENUM.POLYGON:
        return (
          <>
            <span>请在地图上选择多边形范围</span>
            <br />
            <br />
            <Form.Item name="centerPlace">
              <Search placeholder="输入多边形的中心点地址" onSearch={handleChangeCircle} style={{ width: 200 }} />
            </Form.Item>
          </>
        );
      case FENCETYPENUM.ADMINISTRATIVEDIVISION:
        return (
          <SelectAddressComponent
            getAddressInfo={getAddressInfo}
            initValue={editData && editData.district}
          ></SelectAddressComponent>
        );
      default:
        return null;
    }
  }

  return (
    <div className={style.test}>
      <Form
        name="validate_other"
        form={form}
        {...formItemLayout}
        onFinish={onFinish}
        initialValues={{ fenceType, ...editData }}
      >
        <Form.Item label="围栏名称" name="name">
          <Input placeholder="请输入围栏名称" />
        </Form.Item>
        <Form.Item name="alarmIn" label="驶出提醒" valuePropName="checked">
          <Switch />
        </Form.Item>
        <Form.Item name="alarmOut" label="驶入提醒" valuePropName="checked">
          <Switch />
        </Form.Item>
        <Form.Item label="围栏范围">
          <Form.Item name="fenceType">
            <Radio.Group value={fenceType} onChange={onFenceTypeChange} disabled={isEdit}>
              {/* <Radio.Button value={FENCETYPENUM.CIRCLE}>圆形</Radio.Button> */}
              <Radio.Button value={FENCETYPENUM.POLYGON}>多边形</Radio.Button>
              <Radio.Button value={FENCETYPENUM.ADMINISTRATIVEDIVISION}>行政区域</Radio.Button>
            </Radio.Group>
          </Form.Item>
          {fenceTypeForArea(fenceType)}
        </Form.Item>
        <Form.Item>
          <div style={{ textAlign: 'center' }}>
            <Button type="primary" htmlType="submit" loading={isLoading}>
              提交
            </Button>
          </div>
        </Form.Item>
      </Form>
    </div>
  );
}
