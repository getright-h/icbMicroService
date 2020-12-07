import { IDirectiveModalState, ModalType, IDirectiveModalProps } from './directive-list.interface';
import { useStateStore } from '~/framework/aop/hooks/use-base-store';
import { Form } from 'antd';
import { DirectiveService } from '~/solution/model/services/directive-manage.service';
import { useEffect } from 'react';

export function useDirectiveModalStore(props: IDirectiveModalProps) {
  const { state, setStateWrap, getState } = useStateStore(new IDirectiveModalState());
  const directiveService: DirectiveService = new DirectiveService();
  const [form] = Form.useForm();
  useEffect(() => {}, []);

  function getTypeListData() {
    // setStateWrap({ isLoading: true });
    // const { pageIndex, pageSize } = getState();
    // alarmManageService
    //   .queryOwnerPagedList({
    //     ...form.getFieldsValue(),
    //     index: pageIndex,
    //     size: pageSize
    //   })
    //   .subscribe(
    //     res => {
    //       setStateWrap({ tableData: res.dataList, total: res.total, isLoading: false });
    //     },
    //     err => {
    //       setStateWrap({ isLoading: false });
    //     }
    //   );
  }

  function getCurrentSelectInfo(value: any, option: any, type: string) {
    const { info = {} } = option;
    console.log(info);
    if (type === 'monitorGroup') {
    }

    if (type == 'directiveType') {
      setStateWrap({
        currentDirective: info
      });
    }
  }

  function submitForm() {
    form.validateFields().then((values: any) => {
      console.log(values);
    });
  }

  function sloveState() {
    form.validateFields().then((value: any) => {
      const { device } = value;
      setStateWrap({
        isDevice: !!device
      });
    });
  }
  function callbackAction<T>(actionType: number, data?: T) {
    switch (actionType) {
      case ModalType.CUSTOM:
        const { custom } = state;
        setStateWrap({
          custom: !custom
        });
        break;
      case ModalType.FORM:
        sloveState();
        break;
      default:
        break;
    }
  }
  function handleFormDataChange($event: any, type: string) {
    console.log($event, type);
    if (type === 'params') {
      setStateWrap({
        isParams: $event
      });
    }

    if (type === 'device') {
      // 切换时要对当前已选择的数据进行清空
      setStateWrap({
        isDevice: $event
      });
      form.resetFields();
    }
  }

  function selectTemplate(index: number) {
    setStateWrap({
      currentIndex: index
    });
  }
  function selfClose() {
    form.resetFields();
    props.close && props.close();
  }

  return {
    state,
    form,
    submitForm,
    callbackAction,
    selfClose,
    handleFormDataChange,
    selectTemplate,
    getCurrentSelectInfo
  };
}
