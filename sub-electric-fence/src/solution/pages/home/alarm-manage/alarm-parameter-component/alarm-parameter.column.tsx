import * as React from 'react';
import { Divider, message, Switch } from 'antd';
import { ModalType } from './alarm-parameter.interface';
import { AlarmManageService } from '~/solution/model/services/alarm-manage.service';
export function AlarmParameterColumn(callbackAction: Function) {
  const alarmManageService: AlarmManageService = new AlarmManageService();

  return [
    {
      title: '报警类型',
      dataIndex: 'name'
    },
    {
      title: '参数说明',
      dataIndex: 'description'
    },
    {
      title: '下发方式',
      dataIndex: 'downModeText'
    },
    {
      title: '支持自定义',
      dataIndex: 'isCustom',
      render: (text: boolean, data: any) => (
        <Switch
          defaultChecked={text}
          onChange={() => {
            data.isCustom = !data.isCustom;
            alarmManageService.setAlarmCustom(data.id).subscribe(res => {
              message.success('切换成功！');
            });
          }}
        />
      )
    },
    {
      title: '最后修改时间',
      dataIndex: 'modifyTime'
    },
    {
      title: '操作人',
      dataIndex: 'modifyName'
    },
    {
      title: '操作',
      fixed: 'right' as 'right',
      dataIndex: 'action',
      render: (render: any, data: any, index: number) => {
        return (
          <React.Fragment>
            {data.isParam && (
              <React.Fragment>
                <a onClick={() => callbackAction(ModalType.TEMPADD, data)}>新增</a>
                <Divider type="vertical" />
                <a onClick={() => callbackAction(ModalType.TEMPLIST, data)}>模板列表</a>
              </React.Fragment>
            )}
          </React.Fragment>
        );
      }
    }
  ];
}
