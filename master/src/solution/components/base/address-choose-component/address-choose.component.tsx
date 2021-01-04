import React from 'react';
import { useAddressChooseFunction } from './address-choose.component.store';
import { Cascader } from 'antd';
import { IProps } from './address-choose.interface';

export default function AddressChooseComponent(props: IProps) {
  const { state, loadData } = useAddressChooseFunction();
  const { setChooseAddress, value } = props;
  return (
    <Cascader
      options={state.options}
      defaultValue={value}
      loadData={loadData}
      onChange={$event => {
        setChooseAddress($event);
      }}
      changeOnSelect
    />
  );
}
