import { IDemoState } from './demo.interface';
import { useStateStore } from '~/framework/aop/hooks/use-base-store';
import { useEffect } from 'react';

export function useDemoStore() {
  const { state, setStateWrap } = useStateStore(new IDemoState());
  useEffect(() => {
    setStateWrap({
      tableData: [
        {
          id: '111',
          keyword1: 'keyword1',
          keyword2: 'keyword2',
          keyword3: 'keyword3',
          keyword4: 'keyword4'
        }
      ]
    });
  }, []);
  function setAreaInfo(value: any, option: any) {
    console.log(value);
    console.log(option);
  }
  function getCurrentSelectInfo(value: any, option: any) {
    console.log(value);
    console.log(option);
  }
  function tableAction(row: any, actionName: string) {
    console.log(row, actionName);
  }
  function changeTablePageIndex(index: number, pageSize: number) {
    console.log(index, pageSize);
  }
  return { state, setAreaInfo, tableAction, changeTablePageIndex, getCurrentSelectInfo };
}
