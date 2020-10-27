import { IWarehouseCascaderState, IWarehouseCascaderProps } from './warehouse-cascader.interface';
import { useStateStore, useService } from '~/framework/aop/hooks/use-base-store';
import { useEffect, useRef } from 'react';
import { WarehouseListService } from '~/solution/model/services/warehouse-list.service';

export function useWarehouseCascaderStore(props: IWarehouseCascaderProps) {
  const { state, setStateWrap } = useStateStore(new IWarehouseCascaderState());
  const warehouseListService: WarehouseListService = useService(WarehouseListService);
  useEffect(() => {
    loadDefaultValueData([], []);
  }, [props.organizationId]);

  useEffect(() => {
    setStateWrap({ value: props.value });
  }, [props.value]);

  async function loadDefaultValueData(defaultValue: string[], info?: any, value?: string) {
    info = await getWarehouseInfo(value);
    if (defaultValue && defaultValue.length > 1) {
      value = defaultValue.shift();
      const childNode = await loadDefaultValueData(defaultValue, info.children, value);
      info.forEach((item: any) => {
        item.value == value && (item.children = childNode);
        return item;
      });
    }

    setStateWrap({ warehouseOptions: info });
    return info;
  }

  const loadAreaData = (selectedOptions: string | any[]) => {
    const targetOption = selectedOptions[selectedOptions.length - 1];
    const isLeaf = true;
    targetOption.loading = true;

    warehouseListService
      .queryStorePositionPagedListByStoreId({
        storeId: targetOption.value,
        name: '',
        index: 1,
        size: 1000,
        beginTime: -1,
        endTime: -1
      })
      .subscribe(res => {
        targetOption.loading = false;

        targetOption.children = res.storePositionPagedList.dataList.map(item => {
          return {
            value: item.id,
            label: item.name,
            isLeaf
          };
        });
        setStateWrap({
          warehouseOptions: [...state.warehouseOptions]
        });
      });
  };

  function queryWarehouseInfo(value: string) {
    return warehouseListService
      .queryStoreListByOrganizationId(value ? { organizationId: value } : { organizationId: props.organizationId })
      .toPromise();
  }

  async function getWarehouseInfo(value?: string) {
    const res = await queryWarehouseInfo(value);

    const resList = res.map(item => {
      return {
        value: item.id,
        label: item.name,
        isLeaf: false
      };
    });
    return resList;
  }

  const onChange = (value: any, selectedOptions: any) => {
    setStateWrap({ value });
    props.setInfo(value, selectedOptions);
  };

  return { state, loadAreaData, onChange };
}
