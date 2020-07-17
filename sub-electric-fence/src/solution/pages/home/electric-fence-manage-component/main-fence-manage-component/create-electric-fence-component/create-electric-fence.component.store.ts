import { ICreateElectricFenceState, ICreateElectricProps } from './create-electric-fence.interface';
import { useStateStore } from '~/framework/aop/hooks/use-base-store';
import { ChangeEvent, useEffect } from 'react';
import { Form } from 'antd';
import * as _ from 'lodash';
import { Store } from 'antd/lib/form/interface';
declare const AMap: any;
let geocoder = new AMap.Geocoder({
  // city: '全国', //城市设为北京，默认：“全国”
  // radius: 1000 //范围，默认：500
});
export function useCreateElectricFenceStore(props: ICreateElectricProps) {
  const { state, setStateWrap } = useStateStore(new ICreateElectricFenceState());
  const { onValueChange, circlrR, centerPlace, editData } = props;
  const [form] = Form.useForm();
  function onFinish(values: Store) {
    console.log(values);
  }

  _.debounce(handleChangeCircle, 1000);

  useEffect(() => {
    form.setFieldsValue({ rPlace: circlrR });
  }, [circlrR]);

  useEffect(() => {
    centerPlace && regeoCode();
  }, [centerPlace]);

  function regeoCode() {
    if (!geocoder) {
      geocoder = new AMap.Geocoder({});
    }
    geocoder.getAddress(centerPlace, function(status: string, result: any) {
      if (status === 'complete' && result.regeocode) {
        let info = '...';
        console.log(result.regeocode.formattedAddress.length);

        if (result.regeocode.formattedAddress.length > 15) {
          info += result.regeocode.formattedAddress.slice(-10);
        }
        form.setFieldsValue({ centerPlace: info, centerLatlng: centerPlace });
      }
    });
  }

  function handleChangeCircle(value: string) {
    geocoder.getLocation(value, function(status: string, result: any) {
      if (status === 'complete' && result.geocodes.length) {
        const lnglat = result.geocodes[0].location;
        onValueChange('circleLocation', [lnglat.lng, lnglat.lat]);
      }
    });
  }

  const onCrPlaceChange = (e: ChangeEvent<HTMLInputElement>) => {
    onValueChange('circlrR', e.target.value);
  };
  return { state, onFinish, handleChangeCircle, onCrPlaceChange, form };
}
