import { IDirectiveModalState, IDirectiveModalProps, ISendCode } from './directive-list.interface';
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
  const beforeModifyemplateRef: MutableRefObject<any> = useRef([]);
  const cmdValueRef: MutableRefObject<any> = useRef(null);

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
      // 获取默认值
      // 选择的模板 第 0 位始终是自定义的一个按钮，这个按钮用于存放初始值，用户自定义就是更改这个东西
      const directiveDefaultValue = { ...res.find((item: any) => item.isDefault) };
      const currentDirectiveTempalet = [...res.reverse()];

      if (directiveDefaultValue) {
        directiveDefaultValue.alarmValue = '自定义';
        directiveDefaultValue.isDefault = false; // 防止于真的初始值发生混乱
        currentDirectiveTempalet.unshift(directiveDefaultValue);
      }

      // 拿到完整的模板数据以后，需要默认选择初始值， 虽然知道是 第 1 位 但是还是要去查找
      const defaultTempIndex = currentDirectiveTempalet.findIndex((item: any) => item.isDefault);
      const currentDirectiveTemObj = currentDirectiveTempalet[defaultTempIndex];
      setStateWrap({
        currentDirectiveTempalet,
        currentDirectiveTemObj,
        currentIndex: defaultTempIndex,
        tempalteValue: JSON.parse(JSON.stringify([currentDirectiveTemObj, currentDirectiveTemObj?.packageList[0]]))
      });
    });
  }
  //
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
        isParams: true,
        editParam: false
      });
      // 切换后
      form.setFieldsValue({ directiveType: info });
      form.setFieldsValue({ params: true });
      cmdValueRef.current = null;
      const { cmdCode } = info;
      getTemplateListData(cmdCode);
    }
  }

  function submitForm() {
    form.validateFields().then((values: any) => {
      const { codes, type, vehicleGroupId, directiveCode, verifyCode } = values;
      const { currentDirective, isParams } = state;
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

      // 自定义模板
      if (currentDirective.cmdCode == 'Forward') {
        const cmdValue: any[] = [];
        cmdValue.push({
          key: 'content',
          value: directiveCode
        });
        params.cmdValue = JSON.stringify(cmdValue);
      } else {
        cmdValueRef.current && (params.cmdValue = cmdValueRef.current);
      }
      // 关闭以后则不传递参数
      !params.switch && delete params.cmdValue;

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
        value: item.alarmValue || ''
      });
    });
    cmdValueRef.current = JSON.stringify(customCmdValue);
  }

  function selectTemplate(index: number, template: any) {
    // 选择指定的模板参数
    const { currentDirectiveTempalet } = state;
    const currentDirectiveTemObj = currentDirectiveTempalet[index];
    const tempalteValue = [currentDirectiveTemObj, currentDirectiveTemObj?.packageList[0]];
    const _value_ = JSON.parse(JSON.stringify(tempalteValue));
    // 第 0 位 就是自定义
    const isCoustom = index === 0 ? true : false;
    // 选择了模板就不能进行自定义按钮操作
    // 对当前选择的模板进行备份，当用户取消自定义修改的时候方便回退
    beforeModifyemplateRef.current = _value_;

    setStateWrap({
      currentIndex: index,
      currentDirectiveTemObj,
      tempalteValue: _value_,
      // 每一次切换都要关闭编辑
      editParam: isCoustom
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

  /**
   * @param template 用户自定义
   */
  function handleCustomSet(template: any) {
    const { editParam, tempalteValue } = state;
    let modifyTempalte = tempalteValue;
    // 点击取消修改以后恢复为之前的值
    if (editParam) {
      modifyTempalte = beforeModifyemplateRef.current;
      const { packageList = [] } = modifyTempalte[0];
      const cmdValue: any = [];
      packageList.forEach((item: any) => {
        cmdValue.push({
          key: item.alarmKey || '',
          value: item.alarmValue || ''
        });
      });
      cmdValueRef.current = JSON.stringify(cmdValue);
      console.log('取消编辑', editParam, modifyTempalte);
    } else {
      console.log('点击编辑以后：', editParam, modifyTempalte);
    }

    setStateWrap({
      editParam: !editParam,
      tempalteValue: [...modifyTempalte]
    });
  }
  return {
    state,
    form,
    submitForm,
    selfClose,
    handleFormDataChange,
    selectTemplate,
    getCurrentSelectInfo,
    setCustomCmdValue,
    handleCustomSet
  };
}
