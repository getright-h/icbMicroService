import { IOrgSelectProps, IOrgSelectState } from './org-select.interface';
import { useStateStore } from '~/framework/aop/hooks/use-base-store';
import { DrapChooseLoadingService } from '~/solution/model/services/drap-choose-loading.service';
import { useCallback, useRef } from 'react';
import { GlobalContext } from '~/solution/context/global/global.provider';
import { debounce } from 'lodash';

export function useOrgSelectStore(props: IOrgSelectProps) {
  const { state, setStateWrap } = useStateStore(new IOrgSelectState());
  const drapChooseLoadingService: DrapChooseLoadingService = new DrapChooseLoadingService();
  const { gState } = React.useContext(GlobalContext);
  const { loading } = state;

  const searchKeyRef = useRef<string>();

  function getOptionList() {
    setStateWrap({ loading: true });
    drapChooseLoadingService
      .queryOrganizationList({
        systemId: gState?.myInfo?.systemId,
        name: searchKeyRef.current,
        index: 1,
        size: 30
      })
      .subscribe(
        (res: any) => {
          let orgList: any[] = [];
          if (res && res.dataList && Array.isArray(res.dataList)) {
            orgList = res.dataList;
          }
          setTimeout(() => {
            setStateWrap({ orgList, loading: false });
          }, 0);
        },
        (error: any) => {
          setStateWrap({ loading: false });
          console.log(error);
        }
      );
  }

  function fetchOptions(value?: string) {
    searchKeyRef.current = value || '';
    getOptionList();
  }

  function focusSearch() {
    const { orgList, curValue } = state;
    if (!curValue) {
      searchKeyRef.current = '';
    }
    if (!orgList.length || !curValue) {
      getOptionList();
    }
  }

  function onChange(v: string) {
    setStateWrap({ curValue: v });
    props.onChange(v);
  }

  const debounceFnSearch = useCallback(debounce(fetchOptions, 1000), [loading]);

  return { state, debounceFnSearch, focusSearch, onChange };
}
