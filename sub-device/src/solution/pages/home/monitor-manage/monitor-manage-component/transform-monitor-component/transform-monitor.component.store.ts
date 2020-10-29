import { ITransformMonitorState } from './transform-monitor.interface';
import { useStateStore } from '~/framework/aop/hooks/use-base-store';
import { ITransformMonitorProps } from './transform-monitor.interface';
import { Form } from 'antd';
import { DataNode } from 'rc-tree/lib/interface';
import { getCheckedList } from '~/framework/util/common/treeFunction';
export function useTransformMonitorStore(props: ITransformMonitorProps) {
  const { state, setStateWrap } = useStateStore(new ITransformMonitorState());
  const [form] = Form.useForm();
  function close() {
    form.resetFields();
    props.close && props.close();
  }

  function onSubmit() {
    form.validateFields().then(res => {
      console.log(res);
    });
  }

  function onchange(e: any, type: string) {
    if (type == 'copy') {
      form.setFieldsValue({
        [type]: e.target.checked
      });
    }
  }

  function onExpand(expandedKeys: []) {
    setStateWrap({
      expandedKeys
    });
  }
  function onCheck(treeData: DataNode[], checkedKeys: any = state.checkedKeys) {
    const checkedObject = getCheckedList(treeData, checkedKeys);
    setStateWrap({
      checkedKeys,
      checkedObject
    });
  }
  return { state, form, close, onSubmit, onchange, onExpand, onCheck };
}
