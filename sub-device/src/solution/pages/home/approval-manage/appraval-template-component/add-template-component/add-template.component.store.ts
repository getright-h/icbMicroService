import { IAddTemplateState } from './add-template.interface';
import { useService, useStateStore } from '~/framework/aop/hooks/use-base-store';
import { AddTemplateState, FormType } from './add-template-redux/add-template-reducer';
import { ApprovalManageService } from '../../../../../model/services/approval-manage.service';
import { message } from 'antd';
import { ShowNotification } from '../../../../../../framework/util/common/showNotification';
import { useHistory, useParams } from 'react-router-dom';

export function useAddTemplateStore(addTemplateState: AddTemplateState) {
  const { state, setStateWrap } = useStateStore(new IAddTemplateState());
  const approvalManageService: ApprovalManageService = useService(ApprovalManageService);
  const history = useHistory();
  const { id }: any = useParams();
  function next() {
    if (!addTemplateState.templateName) {
      message.warning('请输入模板名称');
      return;
    }
    // 仓位名不能为空 流程节点不能为空
    if (!addTemplateState.flowNodeSettingField.length) {
      message.warning('请添加流程节点');
      return;
    }

    let isNull = false;
    addTemplateState.flowNodeSettingField.map(item => {
      if (!item.isEdit) {
        item.attributeList.map(item => {
          if (!item.storePositionName) {
            isNull = true;
          }
        });
      }
    });

    if (isNull) {
      message.warning('请填写不需要编辑的节点信息');
      return;
    }

    setStateWrap({
      current: state.current + 1
    });
  }

  function prev() {
    console.log(addTemplateState);

    setStateWrap({
      current: state.current - 1
    });
  }

  function commit() {
    if (!addTemplateState.approverInput.length) {
      message.warning('请添加审批人');
      return;
    }
    const commitInfo = {
      templateName: addTemplateState.templateName,
      businessType: addTemplateState.templateType,
      controlList: [{}],
      approverList: [{}],
      groupId: id
    };
    // 拼凑数据类型
    commitInfo.controlList = addTemplateState.formInfo.map((item: any) => {
      if (item.type == FormType.FlowNode) {
        item.controlValue = JSON.stringify(addTemplateState.flowNodeSettingField);
      }
      return item;
    });
    commitInfo.approverList = addTemplateState.approverInput;
    console.log(commitInfo);
    approvalManageService.insertApprovalFormTemplate(commitInfo).subscribe(() => {
      ShowNotification.success('添加成功');
      history.push('./home/approvalManage/approveTemplate');
    });
  }
  return { state, next, prev, commit };
}
