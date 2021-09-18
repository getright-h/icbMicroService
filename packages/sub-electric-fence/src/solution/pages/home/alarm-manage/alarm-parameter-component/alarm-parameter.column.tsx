import * as React from 'react';
import { Divider, message, Switch } from 'antd';
import { ModalType } from './alarm-parameter.interface';
import { AlarmManageService } from '~/solution/model/services/alarm-manage.service';
export function AlarmParameterColumn(callbackAction: Function, $auth: Record<string, any>) {
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
          disabled={!$auth['parmOperationCustom']}
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
                <a
                  onClick={() => callbackAction(ModalType.TEMPADD, data)}
                  className={`${$auth['addParamTemplate'] ? '' : 'no-auth-link'}`}
                >
                  新增
                </a>
                <Divider type="vertical" />
                <a
                  onClick={() => callbackAction(ModalType.TEMPLIST, data)}
                  className={`${$auth['queryParamTemplateList'] ? '' : 'no-auth-link'}`}
                >
                  模板列表
                </a>
              </React.Fragment>
            )}
          </React.Fragment>
        );
      }
    }
  ];
}
