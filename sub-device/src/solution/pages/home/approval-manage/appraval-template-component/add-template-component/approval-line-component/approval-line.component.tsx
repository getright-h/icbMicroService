import * as React from 'react';
import style from './approval-line.component.less';
import { useApprovalLineStore } from './approval-line.component.store';
import { Card, Button, Divider, Switch } from 'antd';
import { CloseOutlined, UserOutlined } from '@ant-design/icons';
import Avatar from 'antd/lib/avatar/avatar';
import { AddTemplateManageContext } from '../add-template.component';
import { ApproverInput, AttributeList } from '../add-template-redux/add-template-reducer';
import AddApprovalLineComponent from './add-approval-line-component/add-approval-line.component';

export default function ApprovalLineComponent() {
  const {
    state,
    setAddAddApprovalLineVisible,
    changeAllPassChoose,
    addUserInfo,
    deleteUserInfo
  } = useApprovalLineStore();
  const { reduxState } = React.useContext(AddTemplateManageContext);
  const { addAddApprovalLineVisible } = state;
  const { approverInput } = reduxState;
  // 连接 的箭头
  function RenderAline() {
    return (
      <div>
        <Divider type="vertical" style={{ height: '50px' }} plain></Divider>
        <div className={style.arrowhead}></div>
      </div>
    );
  }

  function UserItem(userInfo: AttributeList, index: number) {
    return (
      <div className={style.userItem} key={userInfo.personId}>
        <Avatar size={64} icon={<UserOutlined />} />
        <Button
          className={style.deleteButton}
          type="dashed"
          size="small"
          shape="circle"
          danger
          icon={<CloseOutlined />}
          onClick={() => deleteUserInfo(userInfo, index)}
        />
        <div>{userInfo.personName}</div>
      </div>
    );
  }

  function AddApprovalLineComponentC() {
    return (
      <AddApprovalLineComponent
        addUserInfo={addUserInfo}
        setAddAddApprovalLineVisible={setAddAddApprovalLineVisible}
        addAddApprovalLineVisible={addAddApprovalLineVisible}
      />
    );
  }
  return (
    <div>
      <span> 添加审批人:</span>
      {approverInput.map((approverInputItem: ApproverInput, index: number) => {
        return (
          <div className={style.cardStyle} key={index}>
            <Card title={`${index + 1}级审批人`}>
              <div className={style.userList}>
                {approverInputItem.attributeList.map(item => {
                  return UserItem(item, index);
                })}

                <Button type="primary" size="large" onClick={() => setAddAddApprovalLineVisible(true, index)}>
                  添加{`${index + 1}级审批人`}
                </Button>
              </div>
              {approverInputItem.attributeList.length > 1 && (
                <div className={style.allPass}>
                  <span>是否全部通过</span>
                  <Switch
                    checked={approverInputItem.isAllPass}
                    onChange={value => changeAllPassChoose(approverInputItem, value)}
                  ></Switch>
                </div>
              )}
            </Card>
            {index != approverInput.length - 1 && RenderAline()}
          </div>
        );
      })}
      <AddApprovalLineComponentC />
    </div>
  );
}
