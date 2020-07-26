import { ISelectAddressState, ADDRESSINFO, ISelectAddressProps } from './select-address.interface';
import { useStateStore } from '~/framework/aop/hooks/use-base-store';
import { useEffect } from 'react';
import { FenceManageService } from '~/solution/model/services/fence-manage.service';

export function useSelectAddressStore(props: ISelectAddressProps) {
  const { state, setStateWrap } = useStateStore(new ISelectAddressState());
  const fenceManageService = new FenceManageService();
  useEffect(() => {
    getAddressInfo(ADDRESSINFO.PROVINCE);
  }, []);

  useEffect(() => {
    // 用于回显
    if (props.initValue) {
      const { city, province, district } = props.initValue;
      city && getAddressInfo(ADDRESSINFO.CITY, province.adcode);
      district && getAddressInfo(ADDRESSINFO.AREA, city.adcode);
      setStateWrap({
        city: city && city.adcode,
        province: province && province.adcode,
        district: district && district.adcode
      });
    } else {
      setStateWrap({
        city: undefined,
        province: undefined,
        district: undefined
      });
    }
  }, [props.initValue]);

  function getAddressInfo(type: ADDRESSINFO, parentCode?: string, currentType?: ADDRESSINFO) {
    // 编辑的时候根据传入的类型来决定
    if (currentType) {
      setStateWrap(
        {
          [currentType]: parentCode
        },
        (state: ISelectAddressState) => {
          props.getAddressInfo(state);
        }
      );
    }

    // 如果是清空就不用查询或者当前是选择的区
    if ((type != ADDRESSINFO.PROVINCE && !parentCode) || !type) {
      return;
    }
    fenceManageService.fenceDistrict({ parentCode }).subscribe(res => {
      setStateWrap({
        [type + 's']: res.data
      });
    });
  }

  return { state, getAddressInfo };
}
