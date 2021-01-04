import { Form, Modal, Radio, Input, Button } from 'antd';
import * as React from 'react';
import style from './directive-patch-modal.component.less';
import { useDirectiveModalStore } from './directive-patch-moda.component.store';
import { ISelectLoadingComponent } from '~/solution/components/component.module';
import { AlarmFormItemComponent } from '~/solution/components/component.module';

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
    setCustomCmdValue
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
    confirmLoading
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
            rules={[{ required: true }]}
            style={{ marginBottom: 10 }}
          >
            <Input.TextArea
              disabled={!!deviceId}
              style={{ height: deviceId ? 10 : 200 }}
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
          rules={[{ required: true }]}
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

        {isParams && currentDirective.hasSwitch && (
          <Form.Item label={' '} prefixCls={' '} className={style.templateWapper}>
            <div className={style.template} style={{ height: !currentDirectiveTempalet.length && 50 }}>
              {currentDirectiveTempalet.length > 0 ? (
                currentDirectiveTempalet.map((template: any, index) => (
                  <p
                    key={index}
                    className={index == currentIndex ? style.checked : ''}
                    onClick={() => selectTemplate(index, template)}
                  >
                    {template.alarmValue}
                  </p>
                ))
              ) : (
                <p className={style.noTemplate}>暂无指令模板</p>
              )}
              {
                <Button className={style.customBtn} onClick={() => callbackAction(ModalType.CUSTOM)}>
                  {!custom ? '自定义' : '取消'}
                </Button>
              }
            </div>
          </Form.Item>
        )}

        {isParams && currentDirectiveTempalet.length > 0 && currentDirectiveTempalet[currentIndex]?.packageList && (
          <AlarmFormItemComponent
            initialInfo={currentTempalte}
            selectTempId={currentDirectiveTemObj.id}
            hasTempName={false}
            isEnbaleEdit={false}
            tempalteValue={tempalteValue}
            getFormInfo={(info: any) => {}}
          />
        )}

        {custom && (
          <Form.Item name="customValue" rules={[{ required: true }]}>
            <AlarmFormItemComponent
              initialInfo={currentTempalte}
              selectTempId={currentDirectiveTemObj.id}
              hasTempName={false}
              isEnbaleEdit={true}
              tempalteValue={tempalteValue}
              getFormInfo={(info: any) => {
                setCustomCmdValue(info);
              }}
            />
          </Form.Item>
        )}
        {currentDirective.cmdCode == 'Forword' && (
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
