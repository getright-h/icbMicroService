import { Button, Steps, message, PageHeader } from 'antd';
import * as React from 'react';
import { AddTemplateReducer, addTemplateInitialState } from './add-template-redux/add-template-reducer';
const { Step } = Steps;
import style from './add-template.component.less';
import { useAddTemplateStore } from './add-template.component.store';
import ApprovalLineComponent from './approval-line-component/approval-line.component';
import FormSettingComponent from './form-setting-component/form-setting.component';

export const AddTemplateManageContext = React.createContext({
  reduxState: undefined,
  dispatch: undefined
});
export default function AddTemplateComponent() {
  const [addTemplateState, dispatch] = React.useReducer(
    AddTemplateReducer,
    JSON.parse(JSON.stringify(addTemplateInitialState))
  );

  const { state, next, prev, commit, goback } = useAddTemplateStore(addTemplateState, dispatch);

  const { current, commitLoading } = state;
  const STEPS = [
    {
      title: '表单设置',
      content: <FormSettingComponent />
    },
    {
      title: '审核流程',
      content: <ApprovalLineComponent />
    }
  ];

  return (
    <AddTemplateManageContext.Provider value={{ reduxState: addTemplateState, dispatch }}>
      <div className={style.addTemplate}>
        <PageHeader className="site-page-header" title="创建模板" />

        <Steps current={current} className={style.steps}>
          {STEPS.map(item => (
            <Step key={item.title} title={item.title} />
          ))}
        </Steps>
        <div className={style.stepsContent}>{STEPS[current].content}</div>
        <div className={style.stepsAction}>
          {current < STEPS.length - 1 && (
            <>
              <Button type="primary" onClick={() => next()}>
                下一步
              </Button>
              <Button onClick={() => goback()} style={{ margin: '0 8px' }}>
                返回
              </Button>
            </>
          )}
          {current === STEPS.length - 1 && (
            <Button type="primary" onClick={commit} loading={commitLoading}>
              完成
            </Button>
          )}
          {current > 0 && (
            <Button style={{ margin: '0 8px' }} onClick={prev}>
              上一步
            </Button>
          )}
        </div>
      </div>
    </AddTemplateManageContext.Provider>
  );
}
