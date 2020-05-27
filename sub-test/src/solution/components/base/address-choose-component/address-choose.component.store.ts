import { CascaderOptionType } from 'antd/lib/cascader';
import { AddressChooseService } from '../../../model/services/address-choose.service';
import { Subscription } from 'rxjs';
import { ADDRESS_TYPE } from '../../../shared/constant/common.const';
import { AreasListReturn } from '../../../model/dto/address-choose.dto';
import { useEffect } from 'react';
import { useService, useStateStore } from '~/framework/aop/hooks/use-base-store';

const initState: { options: CascaderOptionType[] } = {
  options: undefined
};

export function useAddressChooseFunction() {
  let addressChooseSubscription: Subscription;
  const addressChooseService = useService(AddressChooseService);
  const { state, setStateWrap } = useStateStore(initState);

  useEffect(() => {
    init();
    return () => {
      addressChooseSubscription.unsubscribe();
    };
  }, []);

  function init() {
    addressChooseSubscription = addressChooseService.areasList({ deep: 1 }).subscribe(
      (response: any) => {
        const optionsCurrent = formatResponse(response, ADDRESS_TYPE.Province);
        setStateWrap({ options: optionsCurrent });
        loadData(optionsCurrent, 0);
      },
      (error: any) => {
        console.log(error);
      }
    );
  }

  function formatResponse(response: AreasListReturn[], type: ADDRESS_TYPE) {
    const returnInfo: CascaderOptionType[] = [];
    response.forEach((element: AreasListReturn) => {
      returnInfo.push({
        value: element.cityCode,
        label: element.cityName,
        code: element.cityCode,
        isLeaf: type == ADDRESS_TYPE.Area,
        type
      });
    });
    return returnInfo;
  }

  function loadData(selectedOptions?: CascaderOptionType[], isIndex = selectedOptions.length - 1) {
    const selectedOption = selectedOptions[isIndex];
    selectedOption.loading = true;
    addressChooseService.areaListByCode({ cityCode: selectedOption.code }).subscribe(
      (response: any) => {
        selectedOption.loading = false;
        if (response.length) {
          const children: CascaderOptionType[] = changeResponse(response, selectedOption.type + 1, selectedOption);
          selectedOption.type + 1 == ADDRESS_TYPE.City && loadData(children, 0);
        } else {
          selectedOption.isLeaf = true;
        }
        state.options && setStateWrap({ options: [...state.options] });
      },
      (error: any) => {
        console.log(error);
      }
    );
  }

  function changeResponse(response: AreasListReturn[], type: ADDRESS_TYPE, selectedOptions?: CascaderOptionType) {
    selectedOptions.children = formatResponse(response, type);
    return selectedOptions.children;
  }

  return { state, loadData };
}
