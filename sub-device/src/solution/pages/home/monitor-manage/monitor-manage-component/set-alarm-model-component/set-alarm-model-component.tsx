import * as React from 'react';
import { useSetAlarmStore } from './set-alarm-model.component.store';
import { GlobalContext } from '~/solution/context/global/global.provider';
import { ISetAlarmProp } from './set-alarm-model.interface';
import { Form, Modal, Checkbox, Switch } from 'antd';
import style from './set-alarm-model.component.less';
export default function SetAlarmModalComponent(props: ISetAlarmProp) {
  const { state, form, onchange, setAlarm, close } = useSetAlarmStore(props);
  const { gState } = React.useContext(GlobalContext);
  const { submitLoading } = state;
  const { visible, data } = props;
  const layout = {
    labelCol: { span: 6 },
    wrapperCol: { span: 14 }
  };

  return (
    <Modal
      visible={visible}
      title={'报警设置'}
      onOk={() => {
        form.validateFields().then(values => setAlarm(values));
      }}
      confirmLoading={submitLoading}
      onCancel={() => close()}
    >
      <Form form={form}>
        <h3>1. 勾选报警类型</h3>
        <Form.Item className={style.marginBotoom} label="行驶报警" name={'organizationId'}>
          <Switch className={style.floatRight} />
        </Form.Item>
        <Form.Item className={style.marginBotoom} label="离线报警" name={'name'}>
          <Switch className={style.floatRight} />
        </Form.Item>
        <Form.Item className={style.marginBotoom} label="长停报警" name={'roleId'}>
          <Switch className={style.floatRight} />
        </Form.Item>
        <Form.Item className={style.marginBotoom} label="高危险区域报警" name={'roleId'}>
          <Switch className={style.floatRight} />
        </Form.Item>
        <Form.Item className={style.marginBotoom} label="上线提醒" name={'remark'}>
          <Switch className={style.floatRight} />
        </Form.Item>
        <Form.Item className={style.marginBotoom} label="行驶报警" name={'organizationId'}>
          <Switch className={style.floatRight} />
        </Form.Item>
        <Form.Item className={style.marginBotoom} label="碰撞报警" name={'name'}>
          （下发指令后可接收报警）
          <Switch className={style.floatRight} />
        </Form.Item>
        <Form.Item className={style.marginBotoom} label="震动报警" name={'roleId'}>
          （下发指令后可接收报警）
          <Switch className={style.floatRight} />
        </Form.Item>
        <Form.Item className={style.marginBotoom} label="超速报警" name={'roleId'}>
          （下发指令后可接收报警）
          <Switch className={style.floatRight} />
        </Form.Item>
        <Form.Item className={style.marginBotoom} label="拆除报警" name={'remark'}>
          （下发指令后可接收报警）
          <Switch className={style.floatRight} />
        </Form.Item>
        <Form.Item className={style.marginBotoom} label="断油电报警" name={'remark'}>
          （下发指令后可接收报警）
          <Switch className={style.floatRight} />
        </Form.Item>
        <Form.Item className={style.marginBotoom} label="跟进时段" name={'remark'}>
          （下发指令后可接收报警）
          <Switch className={style.floatRight} />
        </Form.Item>
        <Form.Item className={style.marginBotoom} label="跟进方式" name={'remark'}>
          （下发指令后可接收报警）
          <Switch className={style.floatRight} />
        </Form.Item>
        <h3>2. 推送方式</h3>
        <Form.Item className={style.marginBotoom} label="推送方式" name={'remark'}>
          <Checkbox.Group>
            <Checkbox value={0}>平台推送</Checkbox>
            <Checkbox value={1}> 短信推送</Checkbox>
            <Checkbox value={2}>微信推送</Checkbox>
          </Checkbox.Group>
        </Form.Item>
      </Form>
    </Modal>
  );
}
