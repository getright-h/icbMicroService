import { ISelectAddressState, ADDRESSINFO } from './select-address.interface';
import { useStateStore } from '~/framework/aop/hooks/use-base-store';
import { useEffect } from 'react';
import { FenceManageService } from '~/solution/model/services/fence-manage.service';

export function useSelectAddressStore() {
  const { state, setStateWrap } = useStateStore(new ISelectAddressState());
  const fenceManageService = new FenceManageService();
  useEffect(() => {
    getAddressInfo(ADDRESSINFO.PROVINCE);
  }, []);

  function getAddressInfo(type: ADDRESSINFO, parentCode?: string) {
    fenceManageService.fenceDistrict({ parentCode }).subscribe(res => {
      setStateWrap({
        [type]: res
      });
    });
  }

  return { state, getAddressInfo };
}
