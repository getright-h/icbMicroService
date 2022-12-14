import * as React from 'react';
import style from './allocation-detail.component.less';
import { useAllocationDetailStore } from './allocation-detail.component.store';
import { IHeaderTitleComponent } from 'fch-shop-component-micweb';
import { Table, Row, Col, Form, Button } from 'antd';
import { ColumnsType } from 'antd/lib/table';
export default function AllocationDetailComponent() {
  const { state, useAuthorityRender, authority } = useAllocationDetailStore();
  const layout = {
    labelCol: { span: 7 },
    wrapperCol: { span: 12 }
  };
  const { detail = {}, flowList = [] } = state;
  console.log(flowList);
  function ArrowComponent() {
    return (
      <div className={style.arrowWapepr}>
        <div className={style.line}>
          <i className="arrow"></i>
        </div>
      </div>
    );
  }
  function RenderTable() {
    const columns: ColumnsType<any> = [
      {
        title: '设备型号',
        dataIndex: 'typeName',
        key: 'typeName'
      },
      {
        title: '设备个数',
        dataIndex: 'number',
        key: 'number',
        render: text => <span>{text}个</span>
      }
    ];
    return (
      <Table
        rowKey={(row: any) => row.typeId}
        size="small"
        columns={columns}
        dataSource={detail.deviceList || []}
        pagination={false}
      />
    );
  }
  return (
    <div className={style.alloctionDetailWapper}>
      <IHeaderTitleComponent pageName={'设备调拨单详情'} />
      <Form {...layout}>
        <div className={style.formPart}>
          <div className={style.formItems}>
            <div className={style.formLeft}>
              {useAuthorityRender(authority, 'ss') && (
                <Form.Item label={<strong>调拨单名称</strong>}>{detail.name}</Form.Item>
              )}

              <Form.Item label={<strong>调拨模板</strong>}>{detail.allotTemplateName}</Form.Item>
              <Form.Item label={<strong>流程节点</strong>}>
                {flowList.length > 0 &&
                  flowList.map((flows: any, index: number) => (
                    <div key={index}>
                      <div className={`${style.flowNodeWapper} ${index == 0 && style.minWidth}`}>
                        {Array.isArray(flows) && flows.length > 1 ? (
                          flows.map((flow: any) => (
                            <div className={style.node} key={flow.flowId}>
                              <i className={flow.isSelected ? style.checked : style.notchecked}></i>
                              <span>{flow.name || flow.storeName}</span>
                            </div>
                          ))
                        ) : flows.length == 1 ? (
                          <div className={style.node} key={flows[0].flowId}>
                            {/* 如果当前节点只有一个选项,那么默认选中,并且不显示,复选框 */}
                            <span>{flows[0].name || flows[0].storeName}</span>
                          </div>
                        ) : null}
                      </div>
                      {index < flowList.length - 1 && ArrowComponent()}
                    </div>
                  ))}
              </Form.Item>
              <Form.Item label={<strong>调拨设备</strong>}>
                <RenderTable />
              </Form.Item>
              <Form.Item label={<strong>申请人</strong>}>{detail.creatorName}</Form.Item>
              <Form.Item label={<strong>申请时间</strong>}> {detail.createTime}</Form.Item>
              <Form.Item label={<strong>创建机构</strong>}>{detail.organizationName}</Form.Item>
            </div>
          </div>
        </div>
      </Form>
    </div>
  );
}
