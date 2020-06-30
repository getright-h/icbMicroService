import * as React from 'react';
import { useState } from 'react';
import style from './create-electric-fence.component.less';
import { Input, Form, Switch, Radio, Button } from 'antd';
import { useCreateElectricFenceStore } from './create-electric-fence.component.store';
import { AddressChooseComponent } from '~/solution/components/component.module';
import { FENCETYPENUM, ICreateElectricProps } from './create-electric-fence.interface';
import { RadioChangeEvent } from 'antd/lib/radio';
import * as _ from 'lodash';
const { Search } = Input;
export default function CreateElectricFenceComponent(props: ICreateElectricProps) {
  const { state, onFinish, form, handleChangeCircle, onCrPlaceChange } = useCreateElectricFenceStore(props);
  const [fenceType, setFenceType] = useState(FENCETYPENUM.CIRCLE);
  const formItemLayout = {
    labelCol: { span: 5 },
    wrapperCol: { span: 19 }
  };

  const onFenceTypeChange = (e: RadioChangeEvent) => {
    setFenceType(e.target.value);
    props.onValueChange('currentChoose', e.target.value);
  };

  function fenceTypeForArea(fenceType: number) {
    switch (fenceType) {
      case FENCETYPENUM.CIRCLE:
        return (
          <>
            <Form.Item name="centerPlace">
              <Search placeholder="input search text" onSearch={handleChangeCircle} style={{ width: 300 }} />
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
            <Form.Item name="centerPlace">
              <Input placeholder="输入圆的中心点地址" onChange={handleChangeCircle} />
            </Form.Item>
          </>
        );
      // case FENCETYPENUM.ADMINISTRATIVEDIVISION:
      //   return (
      //     <Form.Item name="rPlace">
      //       <AddressChooseComponent />
      //     </Form.Item>
      //   );
      default:
        return null;
    }
  }

  return (
    <div className={style.test}>
      <Form name="validate_other" form={form} {...formItemLayout} onFinish={onFinish} initialValues={{ fenceType }}>
        <Form.Item label="围栏名称" name="name">
          <Input placeholder="请输入围栏名称" />
        </Form.Item>
        <Form.Item name="outAttention" label="驶出提醒" valuePropName="checked">
          <Switch />
        </Form.Item>
        <Form.Item name="inAttention" label="驶入提醒" valuePropName="checked">
          <Switch />
        </Form.Item>
        <Form.Item label="围栏范围">
          <Form.Item name="fenceType">
            <Radio.Group value={fenceType} onChange={onFenceTypeChange}>
              <Radio.Button value={FENCETYPENUM.CIRCLE}>圆形</Radio.Button>
              <Radio.Button value={FENCETYPENUM.POLYGON}>多边形</Radio.Button>
              <Radio.Button value={FENCETYPENUM.ADMINISTRATIVEDIVISION}>行政区域</Radio.Button>
            </Radio.Group>
          </Form.Item>
          {fenceTypeForArea(fenceType)}
        </Form.Item>
      </Form>
    </div>
  );
}
