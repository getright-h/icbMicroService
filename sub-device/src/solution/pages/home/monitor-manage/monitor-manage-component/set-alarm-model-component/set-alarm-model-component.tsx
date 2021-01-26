import * as React from 'react';
import { useSetAlarmStore } from './set-alarm-model.component.store';
import { GlobalContext } from '~/solution/context/global/global.provider';
import { EditAlarmTemplateItem, ISetAlarmProp, PushModeEnum, tempHiddenTypes } from './set-alarm-model.interface';
import { Form, Modal, Checkbox, Switch, Radio, Popover } from 'antd';
import style from './set-alarm-model.component.less';
import AlarmFormItemComponent from '~/solution/components/alarm-form-item-component/alarm-form-item.component';
import { AlarmPackageContent } from '~/solution/model/dto/alarm-manage.dto';
import { FormTypeEnum } from '~/solution/components/alarm-form-item-component/alarm-form-item.interface';

export default function SetAlarmModalComponent(props: ISetAlarmProp) {
  const { state, form, setAlarm, close, switchTemplate, selectTemplate, handleFormChange } = useSetAlarmStore(props);
  const { gState } = React.useContext(GlobalContext);
  const { submitLoading, templateList } = state;
  const { visible } = props;

  function PopContent(content: AlarmPackageContent[], template: EditAlarmTemplateItem) {
    const formatContent: { label: string; value: string }[] = [];
    const formatArr = template.childList;
    content.map((item, i) => {
      switch (formatArr[i].type) {
        case FormTypeEnum.DurationSetting:
          const durationArr = item.alarmValue ? JSON.parse(item.alarmValue) : [];
          durationArr &&
            durationArr.map((duration: any, j: number) => {
              const { Begin, End, Speed } = duration;
              formatContent.push({
                label: item.alarmText,
                value: `${Begin}-${End} ${Speed}km/h`
              });
            });
          break;
        default:
          formatContent.push({
            label: item.alarmText,
            value: `${formatArr[i].prefix || ''} ${item.alarmValue} ${formatArr[i].suffix || ''}`
          });
          break;
      }
    });

    return (
      <React.Fragment>
        {formatContent.map((item, i) => (
          <div key={template.code + 'Content' + i}>
            {item.label}：{item.value}
          </div>
        ))}
      </React.Fragment>
    );
  }

  function TemplateItem(template: EditAlarmTemplateItem) {
    return (
      <div className={style.itemContent}>
        <Form.Item className={style.marginBottom} label="参数设置" required={true}>
          <Radio.Group
            name={template.code}
            value={template.curSelectTemp?.id || null}
            onChange={e => selectTemplate(e.target.value, template)}
          >
            {template.packageList.map(item => (
              <Radio key={`${template.code}-${item.id}`} value={item.id}>
                {item.isPackageCustom ? (
                  '自定义设置'
                ) : (
                  <Popover content={() => PopContent(item.content, template)} trigger="hover">
                    {item.alarmValue}
                  </Popover>
                )}
              </Radio>
            ))}
          </Radio.Group>
        </Form.Item>
        {template.curSelectTemp?.alarmKey === 'UserCustom' && (
          <AlarmFormItemComponent
            initialInfo={template}
            selectTempId={template.curSelectTemp.id}
            selectTemp={template.curSelectTemp.content}
            getFormInfo={info => handleFormChange(info, template)}
          />
        )}
      </div>
    );
  }

  function AlarmForm() {
    return (
      <div className={style.formContainer}>
        {templateList &&
          templateList
            .filter(o => tempHiddenTypes.indexOf(o.code) < 0)
            .map(template => (
              <div className={style.alarmFormItem} key={template.id}>
                <div className={style.itemTitle}>
                  <h3>{template.name}</h3>
                  {template.downMode == 1 && <span style={{ flex: 1, fontSize: '0.8rem' }}>（需先发送指令）</span>}
                  <Switch
                    defaultChecked={template.isTemplateSelected}
                    onChange={checked => switchTemplate(checked, template)}
                  />
                </div>
                {template.isTemplateSelected &&
                  template.isParam &&
                  template.downMode === PushModeEnum.PLATFORM &&
                  (template.packageList.length > 0 ? (
                    TemplateItem(template)
                  ) : (
                    <div className={style.itemError}>当前报警类型下未设置参数模板，无法开启报警</div>
                  ))}
              </div>
            ))}
      </div>
    );
  }

  function PushModeForm() {
    const pushOptions = [
      { value: 'isPlatFormPush', label: '平台推送', disabled: true },
      { value: 'isMessagePush', label: '短信推送' },
      { value: 'isWeChatPush', label: '微信推送' }
    ];
    return (
      <div className={style.formContainer}>
        <Form.Item className={style.marginBottom} label="推送方式" name="pushTypes">
          <Checkbox.Group options={pushOptions} />
        </Form.Item>
      </div>
    );
  }

  return (
    <Modal
      visible={visible}
      title={'报警通知'}
      width={900}
      onOk={setAlarm}
      confirmLoading={submitLoading}
      onCancel={() => close()}
    >
      <Form form={form} wrapperCol={{ offset: 1 }} labelCol={{ span: 3 }}>
        <h3 className={style.title}>1. 勾选报警类型</h3>
        <AlarmForm />
        <h3 className={style.title}>2. 推送方式</h3>
        <PushModeForm />
      </Form>
    </Modal>
  );
}
