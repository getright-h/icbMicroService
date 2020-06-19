import { IISelectLoadingState, IISelectLoadingProps } from './i-select-loading.interface';
import { useStateStore, useService } from '~/framework/aop/hooks/use-base-store';
import { useEffect, useRef } from 'react';
import { Subscription } from 'rxjs';
import { DrapChooseLoadingService } from '~/solution/model/services/drap-choose-loading.service';

let scrollPage = 1;
let searchVal = '';

export function useISelectLoadingStore(props: IISelectLoadingProps) {
  const { reqUrl, searchKey, searchForm } = props;
  const { state, setStateWrap } = useStateStore(new IISelectLoadingState());
  const drapChooseLoadingService = useService(DrapChooseLoadingService);
  let getOptionListSubscription: Subscription;
  const optionData = useRef([]);

  function getOptionList() {
    setStateWrap({ fetching: true });
    getOptionListSubscription = drapChooseLoadingService[reqUrl](
      searchKey
        ? {
            ...searchForm,
            index: scrollPage,
            [searchKey]: searchVal,
            size: 15
          }
        : {
            ...searchForm,
            index: scrollPage,
            size: 15
          }
    ).subscribe(
      (res: any) => {
        if (res.dataList instanceof Array) {
          optionData.current = [...optionData.current, ...res.dataList];
        } else if (res instanceof Array) {
          optionData.current = [...optionData.current, ...res];
        }
        setStateWrap({ fetching: false });
      },
      (error: any) => {
        setStateWrap({ fetching: false });
        console.log(error);
      }
    );
  }

  function fetchOptions(value: string) {
    scrollPage = 1;
    searchVal = value;
    optionData.current = [];
    getOptionList();
  }

  function optionScroll(e: any) {
    e.persist();
    const { target } = e;
    if (target.scrollTop + target.offsetHeight === target.scrollHeight) {
      scrollPage++;
      getOptionList();
    }
  }
  useEffect(() => {
    return () => {
      getOptionListSubscription && getOptionListSubscription.unsubscribe();
    };
  }, []);
  return { state, optionData, optionScroll, fetchOptions };
}
