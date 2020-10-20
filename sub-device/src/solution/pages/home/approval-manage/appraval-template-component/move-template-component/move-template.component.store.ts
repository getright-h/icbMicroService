import { IMoveTemplateProps, IMoveTemplateState, TREE_MAP } from './move-template.interface';
import { useStateStore } from '~/framework/aop/hooks/use-base-store';
import { DataNode } from 'rc-tree/lib/interface';

export function useMoveTemplateStore(props: IMoveTemplateProps) {
  const { state, setStateWrap } = useStateStore(new IMoveTemplateState());

  function handleOk() {
    setStateWrap({
      confirmLoading: true
    });
    // 传true表示这个时候需要刷新列表
    props.closeMoveTemplateModal(true);
  }

  function handleCancel() {
    props.closeMoveTemplateModal();
  }

  function onExpand(expandedKeys: string[]) {
    setStateWrap({
      expandedKeys
    });
  }

  function onCheck(treeData: DataNode[], checkedKeys: any = state.checkedKeys) {
    setStateWrap({
      checkedKeys
    });
  }
  return { state, handleOk, handleCancel, onExpand, onCheck };
}
