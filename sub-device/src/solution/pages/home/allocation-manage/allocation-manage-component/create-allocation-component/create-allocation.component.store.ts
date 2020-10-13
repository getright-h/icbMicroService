import { ICreateAllocationState } from './create-allocation.interface';
import { useStateStore } from '~/framework/aop/hooks/use-base-store';
import { useEffect } from 'react';
import { Form } from 'antd';
import { ShowNotification } from '~/framework/util/common';
import { TemplateServiceService } from '~/solution/model/services/template-service.service';
import { useHistory } from 'react-router-dom';
import { Subscription } from 'rxjs';
export function useCreateAllocationStore() {
  const { state, setStateWrap } = useStateStore(new ICreateAllocationState());
  const templateServiceService: TemplateServiceService = new TemplateServiceService();
  const history = useHistory();
  const [form] = Form.useForm();
  let templateServiceServiceSubscription: Subscription;
  // 新增调拨单
  function createNewAllocation() {
    const { searchForm } = state;
    templateServiceServiceSubscription = templateServiceService.insertAllotFlowTemplate({ ...searchForm }).subscribe(
      (res: any) => {
        console.log(res);
      },
      (error: any) => {
        console.log(error);
      }
    );
  }

  function onChange(value: any, valueType: string) {
    setStateWrap({
      searchForm: {
        ...state.searchForm,
        [valueType]: value
      }
    });
  }
  // 用于设置设备
  function updateTypeDevice(value: any, valueType: string) {
    const { searchForm = {} } = state;
    const { field = {}, option = {}, number = -1 } = value;
    const { key } = field;
    const { info = {} } = option;
    let currentType: {
      key?: number;
      typeId?: string;
      typeName?: string;
      number?: number;
    } = { key };

    if (valueType == 'type') {
      // 输入设备型号数据结构
      currentType = {
        ...currentType,
        typeId: info.id,
        typeName: info.name
      };
    } else {
      // 输入设备数量数据结构
      currentType = {
        ...currentType,
        number
      };
    }
    if (searchForm.content && Array.isArray(searchForm.content) && searchForm.content.length) {
      //寻找存在相同Key的对象
      const sameContentIndex = searchForm.content.findIndex((content: any) => content.key === currentType.key);
      // 若存在
      if (sameContentIndex != -1) {
        searchForm.content[sameContentIndex] = {
          ...searchForm.content[sameContentIndex],
          ...currentType
        };
      } else {
        // 不存在
        searchForm.content = [...searchForm.content, currentType];
      }
    } else {
      // 将当前值与Key放入数组
      searchForm.content = [currentType];
    }
    setStateWrap({ searchForm });
  }

  function removeTypeDevice(field: any) {
    const { key } = field;
    const { searchForm = {} } = state;
    if (searchForm.content && Array.isArray(searchForm.content) && searchForm.content.length) {
      //寻找存在相同Key的对象
      const sameContentIndex = searchForm.content.findIndex((content: any) => content.key === key);
      if (sameContentIndex != -1) {
        searchForm.content.splice(sameContentIndex, 1);
      }
    }
    setStateWrap({ searchForm });
  }

  useEffect(() => {
    return () => {
      templateServiceServiceSubscription && templateServiceServiceSubscription.unsubscribe();
    };
  });
  return { state, form, onChange, createNewAllocation, removeTypeDevice, updateTypeDevice };
}
