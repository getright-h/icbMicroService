import { Form, Modal, Radio, Input, Button } from 'antd';
import * as React from 'react';
import style from './directive-patch-modal.component.less';
import { useDirectiveModalStore } from './directive-patch-moda.component.store';
import { ISelectLoadingComponent } from '~/solution/components/component.module';
import { AlarmFormItemComponent } from '~/solution/components/component.module';
import { InfoCircleTwoTone } from '@ant-design/icons';

import { IDirectiveModalProps, ModalType, Type } from './directive-list.interface';
import { StorageUtil } from '~/framework/util/storage';

export default function DirectivePatchModalComponent(props: IDirectiveModalProps) {
  const { visible, close, deviceId } = props;
  const {
    state,
    form,
    submitForm,
    callbackAction,
    selfClose,
    handleFormDataChange,
    selectTemplate,
    getCurrentSelectInfo,
    setCustomCmdValue,
    handleCustomSet
  } = useDirectiveModalStore(props);
  const {
    custom,
    isDevice,
    isParams,
    currentIndex,
    currentDirective,
    currentDirectiveTempalet,
    currentDirectiveTemObj,
    tempalteValue = [],
    currentTempalte,
    confirmLoading,
    editParam
  } = state;
  const formItemLayout = {
    labelCol: {
      xs: { span: 24 },
      sm: { span: 4 }
    },
    wrapperCol: {
      xs: { span: 24 },
      sm: { span: 16 }
    }
  };
  return (
    <Modal
      title={'下发指令'}
      visible={visible}
      // visible={true}
      confirmLoading={confirmLoading}
      onOk={submitForm}
      onCancel={() => selfClose()}
      width={'700px'}
    >
      <Form {...formItemLayout} form={form} initialValues={{ type: Type.Deivce, codes: deviceId }}>
        {
          <Form.Item
            className={style.marginBootom10}
            style={deviceId ? { visibility: 'hidden', height: 0 } : {}}
            label="关联设备"
            name="type"
            rules={[{ required: true }]}
          >
            <Radio.Group defaultValue={isDevice} onChange={(e: any) => handleFormDataChange(e.target.value, 'type')}>
              <Radio value={Type.Deivce}>设备号</Radio>
              <Radio value={Type.MonitorGroup}>监控组</Radio>
            </Radio.Group>
          </Form.Item>
        }
        {isDevice == Type.Deivce ? (
          <Form.Item
            className={style.marginBootom10}
            label={deviceId ? '关联设备' : '  '}
            prefixCls={deviceId ? '' : ' '}
            name={'codes'}
            rules={[{ required: true, message: '请录入设备号码！' }]}
            style={{ marginBottom: 10 }}
          >
            <Input.TextArea
              disabled={!!deviceId}
              style={{ minHeight: deviceId ? 10 : 50 }}
              placeholder={'请输入设备号, 多个设备换行输入 \n (录入上限为1000个设备号)'}
              onChange={(e: any) => handleFormDataChange(e.target.value, 'codes')}
            />
          </Form.Item>
        ) : (
          <Form.Item
            className={style.marginBootom10}
            label={'选择监控组'}
            name={'vehicleGroupId'}
            rules={[{ required: true }]}
            style={{ marginBottom: 10 }}
          >
            <ISelectLoadingComponent
              reqUrl="queryGroupSearchList"
              placeholder="请输入监控组名称"
              searchForm={{
                organizationId: StorageUtil.getLocalStorage('organizationId')
              }}
              showSearch={true}
              getCurrentSelectInfo={(value: any, option: any) => getCurrentSelectInfo(value, option, 'monitorGroup')}
            />
          </Form.Item>
        )}
        <Form.Item
          label="指令类型"
          name={'directiveType'}
          className={style.marginBootom10}
          rules={[{ required: true, message: '请选择指令类型！' }]}
        >
          <ISelectLoadingComponent
            reqUrl="getTypesList"
            placeholder="请选择指令类型"
            getCurrentSelectInfo={(value: any, option: any) => getCurrentSelectInfo(value, option, 'directiveType')}
          />
        </Form.Item>
        {currentDirective.hasSwitch && (
          <Form.Item label="下发指令选择" name={'params'} style={{ marginBottom: 0 }}>
            <Radio.Group defaultValue={isParams} onChange={(e: any) => handleFormDataChange(e.target.value, 'params')}>
              <Radio value={true}>打开</Radio>
              <Radio value={false}>关闭</Radio>
            </Radio.Group>
          </Form.Item>
        )}
        {/* 
          如果 currentDirective.hasSwitch === true , 打开 关闭 两个按钮用于控制 [模板] 以及 [自定义] 的显示 
          如果 currentDirective.hasSwitch === false 但是 currentDirective.hasArgs === true [模板] 以及 [自定义] 的显示 脱离于
          如果  currentDirective.hasSwitch === true 并且 currentDirective.hasArgs === true 以 开关 为主导配置
        currentDirective.hasSwitch的开关
         */}
        {((isParams && currentDirective.hasSwitch) || (isParams && currentDirective.hasArgs)) &&
          currentDirective.hasArgs && (
            <Form.Item label={' '} prefixCls={' '} className={style.templateWapper} name="selectTemplate">
              <div className={style.template} style={{ height: !currentDirectiveTempalet.length && 50 }}>
                {currentDirectiveTempalet.length > 0 ? (
                  <Radio.Group value={currentDirectiveTemObj}>
                    {[...currentDirectiveTempalet].map((template: any, index) => (
                      <Radio
                        key={index}
                        value={template}
                        onClick={() => selectTemplate(index, template)}
                        style={{ display: 'block', marginBottom: 10 }}
                      >
                        {template.alarmValue}
                      </Radio>
                    ))}
                  </Radio.Group>
                ) : (
                  // (
                  //   currentDirectiveTempalet.map((template: any, index) => (
                  //     <p
                  //       key={index}
                  //       className={index == currentIndex ? style.checked : ''}
                  //       onClick={() => selectTemplate(index, template)}
                  //     >
                  //       {template.alarmValue}
                  //     </p>
                  //   ))
                  // )
                  <p className={style.noTemplate}>暂无指令模板</p>
                )}
                {/* {
                  <Button className={style.customBtn} onClick={() => callbackAction(ModalType.CUSTOM)}>
                    {!custom ? '自定义' : '取消'}
                  </Button>
                } */}
              </div>
            </Form.Item>
          )}
        {/* {(isParams || currentDirective.hasArgs) &&
          currentDirectiveTempalet.length > 0 &&
          currentDirectiveTempalet[currentIndex]?.packageList && (
            <AlarmFormItemComponent
              initialInfo={currentTempalte}
              selectTempId={currentDirectiveTemObj.id}
              hasTempName={false}
              isEnbaleEdit={false}
              tempalteValue={tempalteValue}
              getFormInfo={(info: any) => {}}
            />
          )} */}
        {isParams &&
          currentDirective.hasArgs &&
          currentDirectiveTempalet.length > 0 &&
          currentDirectiveTempalet[currentIndex]?.packageList && (
            <>
              <AlarmFormItemComponent
                initialInfo={currentTempalte}
                selectTempId={currentDirectiveTemObj.id + tempalteValue[0]?.alarmValue}
                hasTempName={false}
                isEnbaleEdit={editParam}
                tempalteValue={JSON.parse(JSON.stringify(tempalteValue))}
                getFormInfo={(info: any) => {
                  setCustomCmdValue(info);
                }}
                // extraEle={
                //   <Button
                //     type="primary"
                //     danger
                //     style={{ marginLeft: 8 }}
                //     onClick={() => handleCustomSet(tempalteValue)}
                //   >
                //     {editParam ? '取消修改' : '自定义'}
                //   </Button>
                // }
              />
              {editParam && (
                <p className={style.riskNotify}>
                  <InfoCircleTwoTone twoToneColor="red" />
                  风险提示：错误指令可能造成设备误报，指令参数请联系管理员后谨慎填写！
                </p>
              )}
            </>
          )}
        {/* {custom && (
          <Form.Item prefixCls={' '} name="customValue" rules={[{ required: true }]} style={{ marginLeft: '3%' }}>
            <p style={{ color: 'red' }}>
              {' '}
              <InfoCircleTwoTone twoToneColor="red" />
              风险提示：请勿随意修改指令参数，修改前请询问管理员！
            </p>
            <AlarmFormItemComponent
              initialInfo={currentTempalte}
              selectTempId={currentDirectiveTemObj.id}
              hasTempName={false}
              isEnbaleEdit={editParam}
              tempalteValue={tempalteValue}
              getFormInfo={(info: any) => {
                setCustomCmdValue(info);
              }}
              extraEle={
                <Button type="primary" danger>
                  自定义
                </Button>
              }
            />
          </Form.Item>
        )} */}
        {currentDirective.cmdCode == 'Forward' && (
          <Form.Item
            label="指令码"
            name={'directiveCode'}
            className={style.marginBootom10}
            rules={[{ required: true }]}
          >
            <Input onChange={(e: any) => handleFormDataChange(e.target.value, 'directiveCode')} />
          </Form.Item>
        )}
        {currentDirective.isVerify && (
          <Form.Item label="指令密码" name={'verifyCode'} className={style.marginBootom10} rules={[{ required: true }]}>
            <Input
              placeholder="请输入当前登录账户密码"
              onChange={(e: any) => handleFormDataChange(e.target.value, 'directivePasswd')}
            />
          </Form.Item>
        )}
      </Form>
    </Modal>
  );
}
