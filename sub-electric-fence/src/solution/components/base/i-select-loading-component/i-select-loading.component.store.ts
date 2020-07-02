import { IISelectLoadingState, IISelectLoadingProps } from './i-select-loading.interface';
import { useStateStore, useService } from '~/framework/aop/hooks/use-base-store';
import React, { useEffect, useRef } from 'react';
import { Subscription } from 'rxjs';
import { DrapChooseLoadingService } from '~/solution/model/services/drap-choose-loading.service';

export function useISelectLoadingStore(props: IISelectLoadingProps) {
  const { reqUrl, searchForm } = props;
  const { state, setStateWrap } = useStateStore(new IISelectLoadingState());
  const drapChooseLoadingService = useService(DrapChooseLoadingService);
  let getOptionListSubscription: Subscription;

  const optionData = useRef([]);
  const scrollPage = useRef(1);

  function getOptionList() {
    setStateWrap({ fetching: true });
    getOptionListSubscription = drapChooseLoadingService[reqUrl]({
      ...searchForm,
      index: scrollPage.current,
      size: 20
    }).subscribe(
      (res: any) => {
        if (res.dataList instanceof Array) {
          optionData.current = [...optionData.current, ...res.dataList];
        } else if (res instanceof Array) {
          optionData.current = [...optionData.current, ...res];
        } else {
          scrollPage.current--;
        }
        setStateWrap({ fetching: false });
      },
      (error: any) => {
        setStateWrap({ fetching: false });
        console.log(error);
      }
    );
  }

  function onClick() {
    scrollPage.current = 1;
    optionData.current = [];
    getOptionList();
  }

  function optionScroll(e: any) {
    e.persist();
    const { target } = e;
    if (target.scrollTop + target.offsetHeight === target.scrollHeight) {
      scrollPage.current++;
      getOptionList();
    }
  }
  useEffect(() => {
    getOptionList();
    return () => {
      getOptionListSubscription && getOptionListSubscription.unsubscribe();
    };
  }, []);
  return { state, optionData, optionScroll, onClick };
}
