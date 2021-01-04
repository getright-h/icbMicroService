import React from 'react';
import style from './popover-user-info.component.less';
import { Popover, Button, Table } from 'antd';
import { IPopoverUserInfoProps } from './popover-user-info.interface';
import { usePopoverUserInfoStore } from './popover-user-info.component.store';
import { EllipsisOutlined } from '@ant-design/icons';

function PopoverUserInfoComponent(props: IPopoverUserInfoProps) {
  const { state, getUserBelongDetails, close } = usePopoverUserInfoStore();
  const { data } = state;
  const columns = [
    {
      title: '机构',
      dataIndex: 'organizationName'
    },
    {
      title: '部门',
      dataIndex: 'departmentName',
      render: (text: string) => <span>{text || '-'}</span>
    },
    {
      title: '岗位',
      dataIndex: 'positionName',
      render: (text: string) => <span>{text || '-'}</span>
    }
  ];
  return (
    <Popover
      content={
        <Table size="small" columns={columns} dataSource={data} pagination={false} rowKey={row => row.organizationId} />
      }
      title={null}
      trigger="click"
      placement="topLeft"
      visible={state.visible}
      onVisibleChange={(visible: boolean) => close(visible)}
    >
      <Button onClick={() => getUserBelongDetails(props.userId)}>
        <EllipsisOutlined />
      </Button>
    </Popover>
  );
}
export default React.memo(PopoverUserInfoComponent);
