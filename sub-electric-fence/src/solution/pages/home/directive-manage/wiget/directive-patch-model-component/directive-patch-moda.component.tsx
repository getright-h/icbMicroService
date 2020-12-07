import { Form, Modal, Radio, Input, Select, Button } from 'antd';
import * as React from 'react';
import style from './directive-patch-modal.component.less';
import { useDirectiveModalStore } from './directive-patch-moda.component.store';
import {
  ITableComponent,
  TablePageTelComponent,
  ISelectLoadingComponent,
  TimePickerComponent
} from '~/solution/components/component.module';
import { IDirectiveModalProps, ModalType } from './directive-list.interface';
import { StorageUtil } from '~/framework/util/storage';

export default function DirectivePatchModalComponent(props: IDirectiveModalProps) {
  const { visible, close } = props;
  const {
    state,
    form,
    submitForm,
    callbackAction,
    selfClose,
    handleFormDataChange,
    selectTemplate,
    getCurrentSelectInfo
  } = useDirectiveModalStore(props);
  const { custom, isDevice, isParams, currentIndex, currentDirective } = state;
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
  console.log(form.getFieldValue('deivce'), 333);
  return (
    <Modal title={'下发指令'} visible={visible} onOk={submitForm} onCancel={selfClose} width={'700px'}>
      <Form {...formItemLayout} form={form}>
        <Form.Item className={style.marginBootom10} label="关联设备" name="deivce">
          <Radio.Group defaultValue={isDevice} onChange={(e: any) => handleFormDataChange(e.target.value, 'device')}>
            <Radio value={true}>设备号</Radio>
            <Radio value={false}>监控组</Radio>
          </Radio.Group>
        </Form.Item>
        {isDevice ? (
          <Form.Item
            className={style.marginBootom10}
            label={'  '}
            prefixCls={' '}
            name={'deviceList'}
            style={{ marginBottom: 10 }}
          >
            <Input.TextArea
              style={{ height: 200 }}
              placeholder={'请输入设备号, 多个设备换行输入 \n (录入上限为1000个设备号)'}
              onChange={(e: any) => handleFormDataChange(e.target.value, 'deviceList')}
            />
          </Form.Item>
        ) : (
          <Form.Item
            className={style.marginBootom10}
            label={'选择监控组'}
            name={'monitorGroup'}
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

        <Form.Item label="指令类型" name={'directiveType'} className={style.marginBootom10}>
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

        {isParams && (
          <Form.Item label={' '} prefixCls={' '} className={style.templateWapper}>
            <div className={style.template}>
              {Array(6)
                .fill({ name: '模板', value: '2' })
                .map((tem: any, index) => (
                  <p
                    key={index}
                    className={index == currentIndex ? style.checked : ''}
                    onClick={() => selectTemplate(index)}
                  >
                    {tem.name}
                  </p>
                ))}
              {
                <Button className={style.customBtn} onClick={() => callbackAction(ModalType.CUSTOM)}>
                  {!custom ? '自定义' : '取消'}
                </Button>
              }
            </div>
          </Form.Item>
        )}

        {custom &&
          Array(2)
            .fill('')
            .map((item, index) => (
              <Form.Item
                className={style.marginBootom10}
                labelCol={{
                  xs: { span: 24 },
                  sm: { span: 6 }
                }}
                wrapperCol={{
                  xs: { span: 24 },
                  sm: { span: 10 }
                }}
                label="参数字段"
                name={'directivePramse'}
                key={index}
              >
                <Input />
              </Form.Item>
            ))}

        <Form.Item label="指令值" name={'directiveValue'} className={style.marginBootom10}>
          <Input onChange={(e: any) => handleFormDataChange(e.target.value, 'directiveValue')} />
        </Form.Item>
        {currentDirective.isVerify && (
          <Form.Item label="指令密码" name={'directivePasswd'} className={style.marginBootom10}>
            <Input onChange={(e: any) => handleFormDataChange(e.target.value, 'directivePasswd')} />
          </Form.Item>
        )}
      </Form>
    </Modal>
  );
}
