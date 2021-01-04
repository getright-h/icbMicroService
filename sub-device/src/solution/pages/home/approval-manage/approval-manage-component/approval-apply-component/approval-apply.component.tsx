import React from 'react';
import style from './approval-apply.component.less';
import { useApprovalApplyStore } from './approval-apply.component.store';
import { Col, Row, Modal, Form } from 'antd';
import { ISelectLoadingComponent } from '~/framework/components/component.module';
import { IApprovalApplyProps } from './approval-apply.interface';

export default function ApprovalApplyComponent(props: IApprovalApplyProps) {
  const { state, setGroupId, setTemplateId, handleOk, handleCancel } = useApprovalApplyStore(props);
  const { curGroupId } = state;
  const { visible } = props;
  function renderISelectLoadingComponent({ placeholder, searchForm, reqUrl, onChange, options }: any) {
    const props = {
      placeholder,
      searchForm,
      reqUrl,
      labelInValue: true,
      getCurrentSelectInfo: (value: string, option: any) => onChange && onChange(value, option),
      ...options
    };
    return ISelectLoadingComponent(props);
  }
  const layout = {
    labelCol: { span: 8 },
    wrapperCol: { span: 16 }
  };

  return (
    <>
      <Modal title="申请审批" centered={true} visible={visible} destroyOnClose onOk={handleOk} onCancel={handleCancel}>
        <Row>
          <Col span={20}>
            <Form.Item name="groupId" label="模板类型" {...layout}>
              {renderISelectLoadingComponent({
                placeholder: '请输入模板类型',
                onChange: setGroupId,
                searchForm: {
                  isEnable: true
                },
                reqUrl: 'queryApprovalPagedList'
              })}
            </Form.Item>
          </Col>
          <Col span={20}>
            <Form.Item name="templateId" label="模板名称" {...layout}>
              {renderISelectLoadingComponent({
                placeholder: '请输入模板名称',
                onChange: setTemplateId,
                searchForm: {
                  groupId: curGroupId
                },
                options: {
                  disabled: !state.curGroupId
                },
                reqUrl: 'queryApprovalFormTemplatePagedList'
              })}
            </Form.Item>
          </Col>
        </Row>
      </Modal>
    </>
  );
}
