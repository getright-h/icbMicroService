import { IDirectiveModalState, ModalType, IDirectiveModalProps, ISendCode } from './directive-list.interface';
import { useStateStore } from '~/framework/aop/hooks/use-base-store';
import { Form, message } from 'antd';
import { DirectiveService } from '~/solution/model/services/directive-manage.service';
import { useEffect } from 'react';
import { Subscription } from 'rxjs';

export function useDirectiveModalStore(props: IDirectiveModalProps) {
  const { state, setStateWrap, getState } = useStateStore(new IDirectiveModalState());
  const directiveService: DirectiveService = new DirectiveService();
  const [form] = Form.useForm();
  let getTemplateSubscription: Subscription;
  let sendCmdSubscription: Subscription;
  useEffect(() => {
    return () => {
      getTemplateSubscription && getTemplateSubscription.unsubscribe();
      sendCmdSubscription && sendCmdSubscription.unsubscribe();
    };
  }, []);

  function getTemplateListData(code: string) {
    if (!code) return;
    getTemplateSubscription = directiveService.queryAlarmTemplatePackage({ code }).subscribe((res: any) => {
      setStateWrap({
        currentDirectiveTempalet: res
      });
    });
  }
  function getCurrentSelectInfo(value: any, option: any, type: string) {
    const { info = {} } = option;
    if (type === 'monitorGroup') {
      form.setFieldsValue({ vehicleGroupId: value });
    }

    if (type == 'directiveType') {
      setStateWrap({
        currentDirective: info
      });
      form.setFieldsValue({ directiveType: info });
      const { cmdCode } = info;
      getTemplateListData(cmdCode);
    }
  }

  function submitForm() {
    form.validateFields().then((values: any) => {
      const { codes, type, vehicleGroupId, directiveCode, directiveType = {}, customValue } = values;
      const { currentDirective, isParams, custom, currentDirectiveTemObj } = state;
      const params: ISendCode = {};
      params.codes = codes && codes.split('\n');
      params.type = type;
      params.cmdCode = currentDirective.cmdCode;
      params.cmdName = currentDirective.cmdName;
      // 监控组
      vehicleGroupId && (params.vehicleGroupId = vehicleGroupId);
      params.switch = !currentDirective.hasSwitch ? null : isParams;
      // codes的长度不能大于 1000
      if (Array.isArray(params.codes) && params.codes.length > 1000) {
        message.warn('设备号不能大于1000个');
        return;
      }
      const cmdValue: any[] = [];

      // 选择模板
      if (currentDirectiveTemObj.alarmKey) {
        // 如果当前已经选择了模板
        const { packageList = [] } = currentDirectiveTemObj;
        packageList.forEach((item: any) => {
          cmdValue.push({
            key: item.alarmKey || '',
            value: item.alarmValue || ''
          });
          params.cmdValue = JSON.stringify(cmdValue);
        });
      }

      // 自定义模板
      if (currentDirective.cmdCode == 'Forword') {
        cmdValue.push({
          key: 'content',
          value: directiveCode
        });
        params.cmdValue = JSON.stringify(cmdValue);
      }

      // 自定义参数值
      if (custom) {
        params.cmdValue = customValue;
      }

      setStateWrap({ confirmLoading: true });
      sendCmdSubscription = directiveService.sendCmd(params).subscribe(
        (res: any) => {
          message.success('下发指令成功');
          setStateWrap({ confirmLoading: false });
          selfClose(true);
        },
        (error: any) => {
          message.warn('下发指令失败');
          setStateWrap({ confirmLoading: false });
        }
      );
    });
  }

  function sloveState() {
    form.validateFields().then((value: any) => {
      const { device } = value;
      setStateWrap({
        isDevice: device
      });
    });
  }

  function callbackAction<T>(actionType: number, data?: T) {
    switch (actionType) {
      case ModalType.CUSTOM:
        // 如果是选择自定义按钮,新增模板参数,则需要移除当前选择的模板
        const { custom } = state;
        setStateWrap({
          custom: !custom,
          currentIndex: -1,
          currentDirectiveTemObj: {},
          tempalteValue: []
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
    if (type === 'params') {
      setStateWrap({
        isParams: $event
      });
    }

    if (type === 'type') {
      // 切换时要对当前已选择的数据进行清空
      setStateWrap({
        isDevice: $event,
        currentDirectiveTempalet: [],
        currentDirective: {}
      });
      form.resetFields();
      form.setFieldsValue({ type: $event });
    }

    if (type === 'codes') {
      console.log($event);
    }
  }

  function setCustomCmdValue(info: any) {
    // 对得到的数据进行处理
    if (!info || !Array.isArray(info)) return;
    const customCmdValue: any[] = [];
    info.forEach((item: any) => {
      customCmdValue.push({
        key: item.alarmKey || '',
        values: item.alarmValue || ''
      });
    });
    form.setFieldsValue({
      customValue: JSON.stringify(customCmdValue)
    });
  }
  function selectTemplate(index: number, template: any) {
    // 选择指定的模板参数
    const { currentDirectiveTempalet } = state;
    const currentDirectiveTemObj = currentDirectiveTempalet[index];
    const tempalteValue = [currentDirectiveTemObj, currentDirectiveTemObj?.packageList[0]];
    // 选择了模板就不能进行自定义按钮操作
    setStateWrap({
      currentIndex: index,
      currentDirectiveTemObj,
      tempalteValue,
      custom: false
    });
  }
  function selfClose(isSuccess = false) {
    form.resetFields();
    props.close && props.close(isSuccess);
  }

  return {
    state,
    form,
    submitForm,
    callbackAction,
    selfClose,
    handleFormDataChange,
    selectTemplate,
    getCurrentSelectInfo,
    setCustomCmdValue
  };
}
