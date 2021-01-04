import * as React from 'react';
import style from './move-template.component.less';
import { useMoveTemplateStore } from './move-template.component.store';
import { Modal, Checkbox, Col, Tree } from 'antd';
import { IMoveTemplateProps } from './move-template.interface';

export default function MoveTemplateComponent(props: IMoveTemplateProps) {
  const {
    state,
    handleOk,
    handleCancel,
    onCheckData,
    onChangeIsCopy,
    onLoadData,
    onChangeTemplate
  } = useMoveTemplateStore(props);
  const { addMoveTemplateVisible } = props;
  const { confirmLoading, allTemplate, isCopy, treeData, groupIdList, formTemplateIdList } = state;
  function RenderChooseTemplate() {
    return (
      <div className={style.linkOrganization}>
        <div>
          <span>选择模板: </span>
          <div className={`${style.haveChooseOrganization} ${style.haveChooseTemplate}`}>
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
        <div className={style.searchItem}>
          <Checkbox.Group style={{ width: '100%' }} value={formTemplateIdList} onChange={onChangeTemplate}>
            {allTemplate &&
              allTemplate.map((item: { id: string; name: string }) => {
                return (
                  <Col span={24} key={item.id}>
                    <Checkbox value={item.id}>{item.name}</Checkbox>
                  </Col>
                );
              })}
          </Checkbox.Group>
        </div>
      </div>
    );
  }

  function RenderRight() {
    // 移动至
    return (
      <div style={{ textAlign: 'center' }}>
        <Tree
          checkable
          loadData={onLoadData}
          checkedKeys={groupIdList}
          onCheck={onCheckData}
          blockNode
          treeData={treeData}
        />
      </div>
    );
  }

  return (
    <Modal
      title={'创建移动类型'}
      centered={true}
      visible={addMoveTemplateVisible}
      onOk={handleOk}
      width={700}
      destroyOnClose
      confirmLoading={confirmLoading}
      onCancel={handleCancel}
    >
      {RenderChooseTemplate()}
      <Checkbox onChange={onChangeIsCopy} value={isCopy}>
        复制并移动副本
      </Checkbox>
    </Modal>
  );
}
