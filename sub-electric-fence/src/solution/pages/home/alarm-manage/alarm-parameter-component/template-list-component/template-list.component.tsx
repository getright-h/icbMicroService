import { CloseOutlined } from '@ant-design/icons';
import { Button, Form, Modal } from 'antd';
import * as React from 'react';
import { AlarmFormItemComponent } from '~/solution/components/component.module';
import style from './template-list.component.less';
import { useTemplateListStore } from './template-list.component.store';
import { ITemplateListProps } from './template-list.interface';

export default function TemplateListComponent(props: ITemplateListProps) {
  const { state, selfClose, selectTemplate, submitTemplate, getFormInfo, deleteAlarmTemplate } = useTemplateListStore(
    props
  );
  const { confirmLoading, templateList, selectTempId, tempalteValue, isCurTempDefault } = state;
  const { visible, info } = props;

  function TemplateList() {
    return (
      <ul className={style.templateList}>
        {templateList.length ? (
          templateList.map(template => (
            <li
              className={style.templateItem + ' ' + (template.id === selectTempId ? style.selected : '')}
              key={template.id}
              onClick={() => selectTemplate(template.id)}
            >
              <span>{template.alarmValue}</span>
              {!template.isDefault && <CloseOutlined onClick={() => deleteAlarmTemplate(template)} />}
            </li>
          ))
        ) : (
          <p style={{ color: '#ccc', margin: '20px' }}>当前报警类型无模板</p>
        )}
      </ul>
    );
  }

  function EditField() {
    const layout = {
      labelCol: { span: 4 },
      wrapperCol: { span: 20 }
    };
    return (
      <div className={style.templateForm}>
        <Form {...layout}>
          {selectTempId ? (
            <AlarmFormItemComponent
              initialInfo={info}
              selectTempId={selectTempId}
              hasTempName
              tempalteValue={tempalteValue}
              getFormInfo={info => getFormInfo(info)}
            />
          ) : (
            <p style={{ color: '#ccc' }}>未选择模板</p>
          )}
        </Form>
      </div>
    );
  }

  return (
    <Modal
      title="模板列表"
      width={1000}
      visible={visible}
      onCancel={() => selfClose()}
      footer={[
        <Button key="back" onClick={() => selfClose()}>
          返回
        </Button>
      ]}
      maskClosable={false}
      destroyOnClose={true}
    >
      <div>
        <div className={style.title}>
          报警类型：<span>{info.name}</span>
        </div>
        <div className={style.container}>
          <section className={style.left}>
            <div className={style.subTitle}>模板</div>
            <div className={style.template}>
              <TemplateList />
            </div>
          </section>
          <section className={style.right}>
            <div className={style.subTitle}>参数</div>
            <div className={style.template}>
              <EditField />
              {selectTempId && (
                <Button
                  className={style.submit}
                  type="primary"
                  loading={confirmLoading}
                  onClick={submitTemplate}
                  disabled={isCurTempDefault}
                >
                  保存
                </Button>
              )}
            </div>
          </section>
        </div>
      </div>
    </Modal>
  );
}
