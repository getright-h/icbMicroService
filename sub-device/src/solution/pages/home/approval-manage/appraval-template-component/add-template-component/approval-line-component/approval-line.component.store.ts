import { IApprovalLineState } from './approval-line.interface';
import { useStateStore } from '~/framework/aop/hooks/use-base-store';
import { IAddApprovalLineState } from './add-approval-line-component/add-approval-line.interface';
import { useRef } from 'react';
import { AddTemplateManageContext } from '../add-template.component';
import { ApproverInput, AttributeList } from '../add-template-redux/add-template-reducer';
import { setApproverInputAction } from '../add-template-redux/add-template-action';

export function useApprovalLineStore() {
  const { state, setStateWrap } = useStateStore(new IApprovalLineState());
  const currentIndex = useRef(0);
  const { reduxState, dispatch } = React.useContext(AddTemplateManageContext);
  const { approverInput } = reduxState;

  function setAddAddApprovalLineVisible(status: boolean, index = -1) {
    index > -1 && (currentIndex.current = index);
    setStateWrap({
      addAddApprovalLineVisible: status
    });
  }

  function deleteUserInfo(userInfo: AttributeList, index: number) {
    approverInput[index].attributeList = approverInput[index].attributeList.filter((item: AttributeList) => {
      return userInfo.personId !== item.personId;
    });

    setApproverInputAction(dispatch, approverInput);
  }

  function changeAllPassChoose(approverInputItem: ApproverInput, value: boolean) {
    approverInputItem.isAllPass = value;
    approverInput.map((item: ApproverInput) => {
      if (item.sort == approverInputItem.sort) {
        return approverInputItem;
      }
      return item;
    });
    setApproverInputAction(dispatch, approverInput);
  }

  function addUserInfo(state: IAddApprovalLineState) {
    if (state.currentMode == 1) {
      state.userList.forEach(item => {
        approverInput[currentIndex.current].attributeList.push({
          mode: state.currentMode,
          personId: item.key,
          personName: item.info.name
        });
      });
    } else {
      state.roleList.forEach(item => {
        approverInput[currentIndex.current].attributeList.push({
          mode: state.currentMode,
          personId: item.key,
          personName: item.info.name
        });
      });
    }
    if (currentIndex.current == approverInput.length - 1 && approverInput[currentIndex.current].attributeList.length) {
      approverInput.push({
        sort: currentIndex.current + 2,
        isAllPass: true,
        attributeList: []
      });
    }
    setApproverInputAction(dispatch, approverInput);
  }

  return { state, setAddAddApprovalLineVisible, addUserInfo, deleteUserInfo, changeAllPassChoose };
}
