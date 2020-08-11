import { IISelectLoadingState, IISelectLoadingProps } from './i-select-loading.interface';
import { useStateStore, useService } from '~/framework/aop/hooks/use-base-store';
import React, { useEffect, useRef } from 'react';
import { Subscription } from 'rxjs';
import { DrapChooseLoadingService } from '~/solution/model/services/drap-choose-loading.service';
import { debounce } from '~/solution/shared/util/common.util';

export function useISelectLoadingStore(props: IISelectLoadingProps) {
  const { reqUrl, searchForm } = props;
  const { state, setStateWrap } = useStateStore(new IISelectLoadingState());
  const drapChooseLoadingService = useService(DrapChooseLoadingService);
  let getOptionListSubscription: Subscription;

  const optionData = useRef([]);
  const scrollPage = useRef(1);

  function getOptionList(searchInfo?: string) {
    // if (!searchInfo) return;
    setStateWrap({ fetching: true, optionList: [] });
    getOptionListSubscription = drapChooseLoadingService[reqUrl]({
      ...searchForm,
      name: searchInfo,
      key: searchInfo,
      index: 1,
      size: 10
    }).subscribe(
      (res: any) => {
        setStateWrap({ fetching: false, optionList: [...res.data] });
      },
      (error: any) => {
        setStateWrap({ fetching: false });
        console.log(error);
      }
    );
  }

  const getOptionListDebouce = debounce(getOptionList, 500);

  function optionScroll(e: any) {
    e.persist();
    const { target } = e;
    if (target.scrollTop + target.offsetHeight === target.scrollHeight) {
      scrollPage.current++;
      getOptionList();
    }
  }
  useEffect(() => {
    console.log('reqUrl', reqUrl);

    getOptionList();
    return () => {
      getOptionListSubscription && getOptionListSubscription.unsubscribe();
    };
  }, []);
  return { state, optionData, optionScroll, getOptionList, getOptionListDebouce };
}
