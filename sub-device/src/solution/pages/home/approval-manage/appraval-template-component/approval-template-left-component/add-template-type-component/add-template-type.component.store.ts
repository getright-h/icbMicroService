import { IAddTemplateTypeProps, IAddTemplateTypeState } from './add-template-type.interface';
import { useService, useStateStore } from '~/framework/aop/hooks/use-base-store';
import { getCheckedList } from '~/framework/util/common/treeFunction';
import { DataNode } from 'rc-tree/lib/interface';
import _ from 'lodash';
import { ApprovalManageService } from '../../../../../../model/services/approval-manage.service';
import { message } from 'antd';
import { useEffect } from 'react';

export function useAddTemplateTypeStore(props: IAddTemplateTypeProps) {
  const { state, setStateWrap, getState } = useStateStore(new IAddTemplateTypeState());
  const approvalManageService: ApprovalManageService = useService(ApprovalManageService);
  const { name, checkedKeys, type, parentOrganizationId } = state;

  useEffect(() => {
    props.groupId && getGroupDetail();
  }, [props.groupId]);

  function getGroupDetail() {
    approvalManageService.queryApprovalGroupDetail({ id: props.groupId }).subscribe(res => {
      let expandedKeys: string[] = [];
      const checkedObject: any[] = [];
      const checkedKeys: string[] = [];
      res.organizationList.forEach((item: any) => {
        // 让当前选中的标签的父节点展开
        if (item.isSelected) {
          item.parentId && expandedKeys.push(item.parentId);
          checkedKeys.push(item.id);
          item.key = item.id;
          item.title = item.name;
          checkedObject.push(item);
        } else {
          expandedKeys.push(item.id);
        }
        // 去重
        expandedKeys = [...new Set(expandedKeys)];
      });

      setStateWrap({
        name: res.name,
        parentOrganizationId: res.parentOrganizationId,
        checkedKeys: checkedKeys,
        checkedObject: checkedObject
      });
      onExpand(expandedKeys);
    });
  }
  // 确定创建
  function handleOk() {
    if (!name) {
      message.warning('请输入模板名');
      return;
    }
    if (!(checkedKeys && checkedKeys.length)) {
      message.warning('请选择机构');
      return;
    }
    setStateWrap({
      confirmLoading: true
    });
    // 添加模板类型
    addTemplateType();
  }

  function onCheck(treeData: DataNode[], checkedKeys: any = state.checkedKeys) {
    const checkedObject = getCheckedList(treeData, checkedKeys);
    setStateWrap({
      checkedKeys,
      checkedObject
    });
  }

  function addTemplateType() {
    const url = props.groupId ? 'setApprovalGroup' : 'insertApprovalGroup';
    console.log(url);

    approvalManageService[url]({
      name,
      organizationList: checkedKeys,
      type,
      parentOrganizationId,
      id: props.groupId
    }).subscribe(
      () => {
        setStateWrap({
          confirmLoading: false
        });
        // 是否刷新左边栏
        props.closeAddTemplateTypeModal(true);
      },
      () => {
        setStateWrap({
          confirmLoading: false
        });
      }
    );
  }

  function changeTemplateName(value: any, key: string) {
    if (key == 'name') {
      setStateWrap({
        [key]: value
      });
      return;
    } else if (getState().parentOrganizationId !== value && key == 'parentOrganizationId') {
      setStateWrap({
        [key]: value,
        checkedKeys: checkedKeys,
        checkedObject: []
      });
      onExpand([]);
      // 构建当前的机构树
    }
  }

  // 关闭当前的modal
  function handleCancel() {
    props.closeAddTemplateTypeModal();
  }

  function onExpand(expandedKeys: string[]) {
    console.log('onExpand');

    setStateWrap({
      expandedKeys
    });
  }

  function onChangeHaveChooseShop(id: string) {
    document.getElementById(id).focus();
  }

  function removeHaveChecked(item: DataNode) {
    const checkedKeys = state.checkedKeys.filter(option => {
      return option !== item.key;
    });
    setStateWrap({
      checkedKeys
    });
  }

  return {
    state,
    handleOk,
    onChangeHaveChooseShop,
    handleCancel,
    onExpand,
    changeTemplateName,
    removeHaveChecked,
    onCheck
  };
}
