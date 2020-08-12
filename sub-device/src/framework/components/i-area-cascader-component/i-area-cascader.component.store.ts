import { IIAreaCascaderState, IIAreaCascaderProps } from './i-area-cascader.interface';
import { useStateStore, useService } from '~/framework/aop/hooks/use-base-store';
import { AreaChooseService } from '~/solution/model/services/area-choose.service';
import { useEffect } from 'react';

export function useIAreaCascaderStore(props: IIAreaCascaderProps) {
  const { state, setStateWrap } = useStateStore(new IIAreaCascaderState());
  const areaChooseService: AreaChooseService = useService(AreaChooseService);

  useEffect(() => {
    if (props.defaultValue) {
      loadDefaultValueData([...props.defaultValue], []);
      setStateWrap({ value: props.defaultValue });
    } else {
      loadDefaultValueData([], []);
    }
  }, [props.defaultValue]);

  const onChangeArea = (value: any, selectedOptions: any) => {
    setStateWrap({ value });
    props.setAreaInfo(value, selectedOptions);
  };

  const loadAreaData = (selectedOptions: string | any[]) => {
    const targetOption = selectedOptions[selectedOptions.length - 1];
    const isLeaf = selectedOptions.length >= props.deep ? true : false;
    targetOption.loading = true;

    areaChooseService.queryAreaInfoHttp({ code: targetOption.value }).subscribe(res => {
      targetOption.loading = false;

      targetOption.children = res.map(item => {
        return {
          value: item.code,
          label: item.name,
          isLeaf
        };
      });
      setStateWrap({
        areaOptions: [...state.areaOptions]
      });
    });
  };

  function queryAreaInfo(value: string) {
    return areaChooseService.queryAreaInfoHttp(value ? { code: value } : {}).toPromise();
  }

  async function loadDefaultValueData(defaultValue: string[], info?: any, value?: string) {
    info = await getAreaInfo(value);
    if (defaultValue && defaultValue.length > 1) {
      value = defaultValue.shift();
      const childNode = await loadDefaultValueData(defaultValue, info.children, value);
      info.forEach((item: any) => {
        item.value == value && (item.children = childNode);
        return item;
      });
    }

    setStateWrap({ areaOptions: info });
    return info;
  }

  async function getAreaInfo(value?: string) {
    const res = await queryAreaInfo(value);

    const resList = res.map(item => {
      return {
        value: item.code,
        label: item.name,
        isLeaf: false
      };
    });
    return resList;
  }

  return { state, loadAreaData, onChangeArea };
}
