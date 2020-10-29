import { FormType } from '../add-template-redux/add-template-reducer';

/**
import { enum } from '../../../../../../../../../sub-electric-fence/src/solution/pages/home/electric-fence-manage-component/monitoring-object-component/monitoring-object.interface';
 * @export state变量定义和初始化
 * @class IFormSettingState
 */
export class IFormSettingState {
  templateName: string;
}

export const ToolMap = [
  {
    id: '1',
    title: 'Input 输入框',
    controllerEnum: FormType.Input,
    isRequired: true,
    value: '',
    name: 'Input 输入框',

    canDelete: true
  }
  // {
  //   id: 'TextArea',
  //   title: '多行填写',
  //   type: 'TextArea'
  // }
  //   {
  //     id: 'TimePicker',
  //     title: '日期填写',
  //     type: 'TimePicker'
  //   },
  //   { id: 'Radio', title: '添加单选', type: 'Radio' },
  //   {
  //     id: 'Checkbox',
  //     title: '添加多选',
  //     type: 'Checkbox'
  //   }
];
