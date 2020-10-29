import * as React from 'react';
import style from './approval-line.component.less';
import { useApprovalLineStore } from './approval-line.component.store';
import { Card, Button, Divider } from 'antd';
import { CloseOutlined, PlusCircleOutlined, UserOutlined, PlusOutlined } from '@ant-design/icons';
import Avatar from 'antd/lib/avatar/avatar';
import { AddTemplateManageContext } from '../add-template.component';
import { AttributeList } from '../add-template-redux/add-template-reducer';

export default function ApprovalLineComponent() {
  const { state, approverInput } = useApprovalLineStore();
  const { reduxState } = React.useContext(AddTemplateManageContext);
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

  function UserItem(userInfo: AttributeList) {
    return (
      <div className={style.userItem} key={userInfo.id}>
        <Avatar size={64} icon={<UserOutlined />} />
        <Button
          className={style.deleteButton}
          type="dashed"
          size="small"
          shape="circle"
          danger
          icon={<CloseOutlined />}
        />
        <div>{userInfo.userName}</div>
      </div>
    );
  }
  return (
    <div>
      <span> 添加审批人:</span>
      {approverInput.map((approverInputItem, index) => {
        console.log('approverInput', approverInput);

        return (
          <div className={style.cardStyle} key={index}>
            <Card title={`${index + 1}级审批人`}>
              <div className={style.userList}>
                {approverInputItem.attributeList.map(item => {
                  return UserItem(item);
                })}

                <Button type="primary" size="large" onClick={approverInput}>
                  添加{`${index + 1}级审批人`}
                </Button>
              </div>
            </Card>
            {index != approverInput.length - 1 && RenderAline()}
          </div>
        );
      })}
    </div>
  );
}
