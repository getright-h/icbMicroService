import { IAddTemplateState } from './add-template.interface';
import { useService, useStateStore } from '~/framework/aop/hooks/use-base-store';
import { addTemplateInitialState, AddTemplateState, FormType } from './add-template-redux/add-template-reducer';
import { ApprovalManageService } from '../../../../../model/services/approval-manage.service';
import { message } from 'antd';
import { ShowNotification } from '../../../../../../framework/util/common/showNotification';
import { useHistory, useParams } from 'react-router-dom';
import { Dispatch, useEffect, useRef } from 'react';
import { ControlList } from '../../../../../model/dto/approval-manage.dto';
import { initTemplateForm } from './add-template-redux/add-template-action';
import { AllotNodeFlowInput } from '~/solution/model/dto/allocation-template.dto';

export function useAddTemplateStore(addTemplateState: AddTemplateState, dispatch: Dispatch<any>) {
  const { state, setStateWrap } = useStateStore(new IAddTemplateState());
  const approvalManageService: ApprovalManageService = useService(ApprovalManageService);
  const history = useHistory();
  const { id, isEdit }: any = useParams();
  const groupId = useRef('');
  useEffect(() => {
    if (!!Number(isEdit)) {
      initForm();
      return;
    }

    groupId.current = id;
  }, [id]);

  function initForm() {
    approvalManageService.queryApprovalFormDetail({ id }).subscribe(res => {
      const initData: any = { ...addTemplateInitialState };
      initData.templateName = res.templateName;
      groupId.current = res.groupId;
      initData.formInfo = res.controlList;
      initData.id = res.id;
      initData.formInfo = initData.formInfo.map((item: ControlList) => {
        item.id = item.id || createRandomId();
        if (item.type == FormType.FlowNode) {
          initData.flowNodeSettingField = JSON.parse(item.controlValue).map(
            (itemFlowNodeSettingField: AllotNodeFlowInput) => {
              itemFlowNodeSettingField.flowNodeSettingFieldId = createRandomId();
              itemFlowNodeSettingField.attributeList = itemFlowNodeSettingField.attributeList.map(itemChild => {
                itemChild.childNodeId = createRandomId();
                return itemChild;
              });
              return itemFlowNodeSettingField;
            }
          );
        }
        return item;
      });

      initData.templateType = res.businessType;
      initData.approverInput = [
        ...res.approverList,
        {
          sort: res.approverList.length + 1,
          isAllPass: true,
          attributeList: []
        }
      ];
      initData.currentSelectItem = initData.formInfo[0];
      initTemplateForm(dispatch, initData);
    });
  }
  function next() {
    const pos = /^[\u4e00-\u9fa5a-zA-Z0-9]+$/g;
    if (!pos.test(addTemplateState.templateName)) {
      message.warning('???????????????????????????????????????????????????????????????');
      return;
    }
    if (!addTemplateState.templateType) {
      message.warning('?????????????????????');
      return;
    }
    // ????????????????????? ????????????????????????
    if (!addTemplateState.flowNodeSettingField.length) {
      message.warning('?????????????????????');
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
      message.warning('???????????????????????????????????????');
      return;
    }

    setStateWrap({
      current: state.current + 1
    });
  }

  function prev() {
    setStateWrap({
      current: state.current - 1
    });
  }

  function commit() {
    if (!addTemplateState.approverInput.length) {
      message.warning('??????????????????');
      return;
    }
    const commitInfo = {
      id,
      templateName: addTemplateState.templateName,
      businessType: addTemplateState.templateType,
      controlList: [{}],
      approverList: [{}],
      groupId: groupId.current
    };
    // ??????????????????
    commitInfo.controlList = addTemplateState.formInfo.map((item: any) => {
      if (item.type == FormType.FlowNode) {
        item.controlValue = JSON.stringify(addTemplateState.flowNodeSettingField);
      }
      return item;
    });
    commitInfo.approverList = addTemplateState.approverInput
      .filter(item => {
        return item.attributeList.length;
      })
      .map(item => {
        if (item.attributeList.length == 1) {
          item.isAllPass = false;
        }
        return item;
      });
    const url = !!Number(isEdit) ? 'setApprovalFormTemplate' : 'insertApprovalFormTemplate';
    setStateWrap({ commitLoading: true });
    approvalManageService[url](commitInfo).subscribe(
      () => {
        setStateWrap({ commitLoading: false });
        ShowNotification.success('????????????');
        history.push('../../approvalTemplate');
      },
      () => {
        setStateWrap({ commitLoading: false });
      }
    );
  }

  function goback() {
    history.push('../../approvalTemplate');
  }
  function createRandomId() {
    return (
      (Math.random() * 10000000).toString(16).substr(0, 4) +
      '-' +
      new Date().getTime() +
      '-' +
      Math.random()
        .toString()
        .substr(2, 5)
    );
  }
  return { state, next, prev, commit, goback };
}
