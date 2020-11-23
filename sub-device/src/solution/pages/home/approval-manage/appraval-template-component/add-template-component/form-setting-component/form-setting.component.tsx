import * as React from 'react';
import style from './form-setting.component.less';
import { useFormSettingStore } from './form-setting.component.store';
import { Form, Input, Switch, Button, PageHeader, Select } from 'antd';
import { ToolMap } from './form-setting.interface';
import { ReactSortable } from 'react-sortablejs';
import { useCallback } from 'react';
import { DeleteOutlined } from '@ant-design/icons';
import AddFlowNodeComponent from '../add-flow-node-component/add-flow-node.component';
import ViewFlowNodeComponent from '~/solution/components/view-flow-node-component/view-flow-node.component';
import AssignDeviceComponent from '../assign-device-component/assign-device.component';
import { AddTemplateManageContext } from '../add-template.component';
import { FormType, IFormInfo } from '../add-template-redux/add-template-reducer';
const { Option } = Select;
export default function FormSettingComponent() {
  const { reduxState, dispatch } = React.useContext(AddTemplateManageContext);
  const {
    setFormInfo,
    onFormEditClick,
    onChangeCustomInfo,
    deleteCurrentItem,
    onChangeTemplateName
  } = useFormSettingStore(dispatch, reduxState);

  const { flowNodeSettingField, formInfo, currentSelectItem, templateName } = reduxState;
  const GlobalComponent = {
    [FormType.Input]: Input,
    [FormType.FlowNode]: ViewFlowNodeComponent,
    [FormType.AssignDevice]: AssignDeviceComponent
  };

  function IsRequire() {
    return (
      <div>
        <Form.Item label="设为必填项" rules={[{ required: true }]}>
          <Switch
            checked={currentSelectItem.isRequired}
            onChange={value => onChangeCustomInfo<boolean>(currentSelectItem, 'isRequired', value)}
          />
        </Form.Item>
      </div>
    );
  }

  // function IsCanEdit() {
  //   return (
  //     <div>
  //       <Form.Item label="是否可编辑" rules={[{ required: true }]}>
  //         <Switch
  //           checked={currentSelectItem.canEdit}
  //           onChange={value => onChangeCustomInfo<boolean>(currentSelectItem, 'canEdit', value)}
  //         />
  //       </Form.Item>
  //     </div>
  //   );
  // }

  function EditField() {
    let returnElement = null;

    switch (currentSelectItem.type) {
      case FormType.Input:
        const props = {
          style: { width: '150px' },
          placeholder: '请输入标题内容'
        };
        // Input 框编辑
        returnElement = (
          <div style={{ padding: 15 }}>
            <div>
              <Form.Item label="标题">
                <Input
                  {...props}
                  allowClear
                  onChange={value => onChangeCustomInfo(currentSelectItem, 'controlKey', value.target.value)}
                  value={currentSelectItem.controlKey}
                />
              </Form.Item>
            </div>
            <IsRequire />
          </div>
        );
        break;
      case FormType.FlowNode:
        returnElement = (
          <>
            <AddFlowNodeComponent canEdit={currentSelectItem.canEdit} />
            <IsRequire />
          </>
        );
        break;
      default:
        break;
    }
    return returnElement;
  }

  const EditFieldMemo = useCallback(() => EditField(), [
    currentSelectItem.id,
    flowNodeSettingField,
    currentSelectItem.canEdit
  ]);

  const [list, setList] = React.useState(ToolMap);
  return (
    <div className={style.formSetting}>
      <Form.Item label="模板名称">
        <Input
          style={{ width: '500px' }}
          onChange={value => onChangeTemplateName(value.target.value)}
          value={templateName}
          placeholder="请输入模板名称，例： 机构名 + 模板名"
        />
      </Form.Item>
      <Form.Item label="模板类型">
        <Select
          value={reduxState.templateType}
          onChange={value => onChangeTemplateName(value, 'templateType')}
          placeholder="请选择关联机构"
        >
          <Option value={1} key={1}>
            调拨模板
          </Option>
        </Select>
      </Form.Item>
      <Form.Item label="配置表单" rules={[{ required: true }]}></Form.Item>
      <div className={style.formContent}>
        <div className={style.formContentLeft}>
          <div>
            <h4>点击选择填写项</h4>
            <ReactSortable // here they are!
              group={{ name: 'itemLab', pull: 'clone', put: false }}
              list={list}
              setList={setList}
              style={{ paddingBottom: 15 }}
              animation={200}
              className={style.lastChild}
              delayOnTouchStart={true}
              delay={2}
              sort={false}
            >
              {list.map((item, index) => {
                return (
                  <div className={style.listDev} key={index}>
                    {item.controlKey}
                  </div>
                );
              })}
            </ReactSortable>
          </div>
          <div>
            <h4>点击选择填写项</h4>
            <div>
              <EditFieldMemo />
            </div>
          </div>
        </div>
        <div className={style.formContentRight}>
          <h4>预览</h4>
          <PageHeader className="site-page-header" title={templateName} />

          <ReactSortable // here they are!
            group="itemLab"
            list={formInfo}
            setList={setFormInfo}
            animation={200}
            delayOnTouchStart={true}
            delay={2}
          >
            {formInfo.map((item: IFormInfo) => {
              const ComponentInfo: any = GlobalComponent[item.type];
              let props: any = {
                style: { width: '300px' },
                placeholder: `请输入${item.controlKey}`
              };
              item.type == FormType.FlowNode &&
                (props = {
                  flowNodeSettingField,
                  canEdit: item.canEdit
                });
              return (
                <div
                  key={item.id}
                  className={`${style.formItemContent} ${currentSelectItem &&
                    currentSelectItem.id == item.id &&
                    style.formItemContentSelect}`}
                  onClick={() => onFormEditClick(item)}
                >
                  <div
                    style={{
                      width: '100%',
                      display: item.type !== FormType.FlowNode && 'flex',
                      alignItems: 'center'
                    }}
                  >
                    {item.isRequired && <span style={{ color: 'red' }}>*</span>}
                    <span style={{ margin: '0 10px' }}>{item.controlKey}: </span>
                    <ComponentInfo {...props} disabled={true} />
                  </div>
                  <div>
                    {item.canDelete && (
                      <Button
                        type="dashed"
                        onClick={() => deleteCurrentItem(item.id)}
                        icon={<DeleteOutlined />}
                      ></Button>
                    )}
                  </div>
                </div>
              );
            })}
          </ReactSortable>
        </div>
      </div>
    </div>
  );
}
