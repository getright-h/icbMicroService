import { IISelectLoadingState, IISelectLoadingProps } from './i-select-loading.interface';
import { useStateStore, useService } from '~/framework/aop/hooks/use-base-store';
import { useEffect, useRef, useCallback } from 'react';
import { DrapChooseLoadingService } from '~/solution/model/services/drap-choose-loading.service';
import _ from 'lodash';
import { Subscription } from 'rxjs';

export function useISelectLoadingStore(props: IISelectLoadingProps) {
  const { reqUrl } = props;
  const { state, setStateWrap } = useStateStore(new IISelectLoadingState());
  const drapChooseLoadingService = useService(DrapChooseLoadingService);
  let getOptionListSubscription: Subscription;

  const scrollPage = useRef(1);
  const searchParams = useRef({});
  searchParams.current = props.searchForm || {};

  function getOptionList(isSearch = false) {
    setStateWrap({ fetching: true });
    getOptionListSubscription = drapChooseLoadingService[reqUrl]({
      ...searchParams.current,
      index: scrollPage.current,
      size: 20
    }).subscribe(
      (res: any) => {
        if (res.dataList instanceof Array) {
          const optionList = [...(isSearch ? [] : state.optionList), ...res.dataList];
          setStateWrap({ optionList, fetching: false });
        } else if (res instanceof Array) {
          const optionList = [...(isSearch ? [] : state.optionList), ...res];
          setStateWrap({ optionList, fetching: false });
        } else if (scrollPage.current == 1 && !res.dataList) {
          setStateWrap({ optionList: [], fetching: false });
        } else {
          scrollPage.current--;
          setStateWrap({ fetching: false });
        }
      },
      (error: any) => {
        setStateWrap({ fetching: false });
        console.log(error);
      }
    );
  }

  const fetchOptions = useCallback(
    _.throttle((isSearch?: boolean, value?: string) => {
      if (isSearch) {
        scrollPage.current = 1;
      }
      getOptionList(isSearch);
    }, 300),
    []
  );

  function optionScroll(e: any) {
    e.persist();
    const { target } = e;
    if (target.scrollTop + target.offsetHeight === target.scrollHeight) {
      scrollPage.current++;
      getOptionList();
    }
  }
  useEffect(() => {
    setStateWrap({ value: props.selectedValue });
    getOptionList();
  }, [props.selectedValue]);
  useEffect(() => {
    return () => {
      getOptionListSubscription && getOptionListSubscription.unsubscribe();
    };
  }, []);
  return { state, optionScroll, fetchOptions };
}
