import * as React from 'react';
import style from './move-template.component.less';
import { useMoveTemplateStore } from './move-template.component.store';
import { Modal } from 'antd';
import { IMoveTemplateProps } from './move-template.interface';
import OrganizationControllerComponent from '~/solution/components/organization-controller-component/organization-controller.component';

export default function MoveTemplateComponent(props: IMoveTemplateProps) {
  const { state, handleOk, handleCancel, onExpand, onCheck } = useMoveTemplateStore(props);
  const { addMoveTemplateVisible } = props;
  const { confirmLoading, expandedKeys, checkedKeys } = state;
  function RenderChooseTemplate() {
    return (
      <div className={style.linkOrganization}>
        <div>
          <span>选择模板: </span>
          <div className={style.haveChooseOrganization}>
            <RenderLeft />
          </div>
        </div>
        <div>
          <span>移动至: </span>
          <div className={style.haveChooseOrganization}>{RenderRight()}</div>
        </div>
      </div>
    );
  }

  function RenderLeft() {
    // 选择模板
    return (
      <div>
        <div className={style.searchApproval}></div>
        <div className={style.searchItem}></div>
      </div>
    );
  }

  function RenderRight() {
    const prganizationControllerComponentProps = {
      expandedKeys,
      onExpand,
      getCheckedInfo: onCheck,
      checkedKeys
    };
    // 移动至
    return <OrganizationControllerComponent checkable {...prganizationControllerComponentProps} />;
  }

  return (
    <Modal
      title={'创建移动类型'}
      visible={addMoveTemplateVisible}
      onOk={handleOk}
      width={1000}
      destroyOnClose
      confirmLoading={confirmLoading}
      onCancel={handleCancel}
    >
      {RenderChooseTemplate()}
    </Modal>
  );
}
