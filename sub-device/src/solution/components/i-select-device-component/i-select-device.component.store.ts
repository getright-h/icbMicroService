import { IISelectDeviceProps, IISelectDeviceState } from './i-select-device.interface';
import { useService, useStateStore } from '~/framework/aop/hooks/use-base-store';
import _ from 'lodash';
import { useRef, useCallback, useEffect } from 'react';
import { Subscription } from 'rxjs';
import { StockManageService } from '~/solution/model/services/stock-manage.service';

export function useISelectDeviceStore(props:IISelectDeviceProps) {
    const { state, setStateWrap } = useStateStore(new IISelectDeviceState());
  const stockManageService = useService(StockManageService);
  let getOptionListSubscription: Subscription;

  const scrollPage = useRef(1);
  const searchName = useRef('');
  const searchParams = useRef({});
  searchParams.current = props.searchForm || {};
  searchName.current = props.searchKey || '';

  function getOptionList(isSearch = false) {
    setStateWrap({ fetching: true });
    getOptionListSubscription = stockManageService.queryDeviceSelected({
      ...searchParams.current,
      code: searchName.current,
      index: scrollPage.current,
      size: 20
    }).subscribe(
      (res: any) => {
        if (res.dataList) {
          const optionList = [...(isSearch ? [] : state.optionList), ...res.dataList];
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
        searchName.current = value || '';
      }
      getOptionList(true);
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
    // getOptionList();
  }, [props.selectedValue]);

  useEffect(() => {
    props.searchKey && fetchOptions(true, props.searchKey);
  }, [props.searchKey]);

  useEffect(() => {
    return () => {
      getOptionListSubscription && getOptionListSubscription.unsubscribe();
    };
  }, []);
  return { state, optionScroll, fetchOptions };
}