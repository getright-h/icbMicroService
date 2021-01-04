import React from 'react';
import style from './approvaler-list.component.less';
import { useApprovalerListStore } from './approvaler-list.component.store';
import { IApprovalerListProps } from './approvaler-list.interface';
import Avatar from 'antd/lib/avatar/avatar';
import { UserOutlined } from '@ant-design/icons';
import { Divider, Card } from 'antd';
import { ApproverList, AttributeList } from '~/solution/model/dto/approval-manage.dto';

export default function ApprovalerListComponent(props: IApprovalerListProps) {
  const { state } = useApprovalerListStore();
  const { approverInput } = props;
  // 连接 的箭头
  function RenderAline() {
    return (
      <div className={style.renderAline}>
        <Divider style={{ width: '20px' }} plain></Divider>
      </div>
    );
  }
  function UserItem(userInfo: AttributeList, index: number) {
    return (
      <div className={style.userItem} key={userInfo.personId + index}>
        <Avatar size={64} icon={<UserOutlined />} />
        <div>{userInfo.personName}</div>
      </div>
    );
  }
  return (
    <div className={style.cardStyle}>
      {approverInput?.map((approverInputItem: ApproverList, index: number) => {
        return approverInputItem.attributeList.length ? (
          <div key={approverInputItem.id} className={style.renderAline}>
            <Card title={`${index + 1}级审批人`}>
              <div className={style.userList}>
                {approverInputItem.attributeList.map(item => {
                  return UserItem(item, index);
                })}
              </div>
            </Card>
            {index != approverInput.length - 1 && RenderAline()}
          </div>
        ) : null;
      })}
    </div>
  );
}
