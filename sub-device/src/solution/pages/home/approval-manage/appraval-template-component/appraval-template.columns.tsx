import { ColumnsType } from 'antd/lib/table';
import React from 'react';
import { Divider, Switch } from 'antd';
import { ModalType } from '~/solution/shared/constant/common.const';
export function approvalTemplateColumns(action: Function): ColumnsType<any> {
  return [
    {
      title: '模板类型',
      dataIndex: 'businessTypeText'
    },
    {
      title: '模板名称',
      dataIndex: 'name'
    },
    {
      title: '创建人',
      dataIndex: 'stockNumber'
    },
    {
      title: '创建时间',
      dataIndex: 'createTime'
    },
    {
      title: '创建机构',
      dataIndex: 'organizationName'
    },
    {
      title: '是否启动',
      dataIndex: 'state',
      render: (text, row) => {
        return (
          <Switch
            checkedChildren="开启"
            onChange={value => action(row, ModalType.MOVE, value)}
            unCheckedChildren="禁用"
            checked={!!text}
          />
        );
      }
    },
    {
      title: '操作',
      dataIndex: 'action',
      fixed: 'right',
      width: 200,
      render: (text, row) => {
        return (
          <React.Fragment>
            <a onClick={() => action(row, ModalType.EDIT)}>编辑</a>
            <Divider type="vertical" />
            <a onClick={() => action(row, ModalType.DELETE)}>删除</a>
          </React.Fragment>
        );
      }
    }
  ];
}
