import { IDirectiveModalState, ModalType, IDirectiveModalProps, ISendCode } from './directive-list.interface';
import { useStateStore } from '~/framework/aop/hooks/use-base-store';
import { Form, message } from 'antd';
import { DirectiveService } from '~/solution/model/services/directive-manage.service';
import { AlarmManageService } from '~/solution/model/services/alarm-manage.service';
import { useEffect, MutableRefObject, useRef } from 'react';
import { Subscription } from 'rxjs';
import { AlarmParamItem, AlarmTemplateListItem, AlarmPackageContent } from '~/solution/model/dto/alarm-manage.dto';

export function useDirectiveModalStore(props: IDirectiveModalProps) {
  const { state, setStateWrap } = useStateStore(new IDirectiveModalState());
  const directiveService: DirectiveService = new DirectiveService();
  const alarmManageService: AlarmManageService = new AlarmManageService();
  const paramTemplatesRef: MutableRefObject<AlarmParamItem[]> = useRef([]);
  const [form] = Form.useForm();
  let getTemplateSubscription: Subscription;
  let sendCmdSubscription: Subscription;
  useEffect(() => {
    getAlarmParamTemplates();
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
      // 指令参数
      const currentTempalte = paramTemplatesRef.current.find((template: any) => template.type === info.cmdCode);
      // 选择指令类型以后,需要重置指令模板以及移除选择指令参数状态
      setStateWrap({
        currentDirective: info,
        currentTempalte: { ...currentTempalte, id: info.id },
        currentIndex: -1,
        custom: false,
        isParams: true
      });
      form.setFieldsValue({ directiveType: info });
      form.setFieldsValue({ params: true });
      const { cmdCode } = info;
      getTemplateListData(cmdCode);
    }
  }

  function submitForm() {
    form.validateFields().then((values: any) => {
      const { codes, type, vehicleGroupId, directiveCode, customValue, verifyCode } = values;
      const { currentDirective, isParams, custom, currentDirectiveTemObj } = state;
      const params: ISendCode = {};
      params.codes = codes && codes.split('\n');
      params.type = type;
      params.cmdCode = currentDirective.cmdCode;
      params.cmdName = currentDirective.cmdName;
      // 指令密码
      currentDirective.isVerify && (params.verifyCode = String(verifyCode));
      // 监控组
      vehicleGroupId && (params.vehicleGroupId = vehicleGroupId);
      params.switch = !currentDirective.hasSwitch ? null : isParams;
      // codes的长度不能大于 1000
      if (Array.isArray(params.codes) && params.codes.length > 1000) {
        message.warn('设备号不能大于1000个!');
        return;
      }
      // 如果打开指令选择 就必须选择一个模板
      if (isParams && !currentDirective.cmdCode) {
        message.warn('请选择一个指令模板!');
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
      if (currentDirective.cmdCode == 'Forward') {
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
          message.success('正在执行指令下发');
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
      let { custom } = state;
      !$event && (custom = $event);
      setStateWrap({
        isParams: $event,
        custom: custom
      });
    }

    if (type === 'type') {
      // 切换时要对当前已选择的数据进行清空
      setStateWrap({
        isDevice: $event,
        currentDirectiveTempalet: [],
        currentDirective: {},
        custom: false
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

  //获取参数管理各个指令的模板参数,之前前端写死,现在从后台获取
  function getAlarmParamTemplates() {
    alarmManageService.queryAlarmParamList().subscribe(res => {
      paramTemplatesRef.current = res;
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
