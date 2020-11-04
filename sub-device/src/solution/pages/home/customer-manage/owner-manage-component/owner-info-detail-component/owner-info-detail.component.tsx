import * as React from 'react';
import style from './owner-info-detail.component.less';
import { useOwnerInfoDetailStore } from './owner-info-detail.component.store';
import { IOwnerInfoDetailProps, WorkEnum } from './owner-info-detail.interface';
import { Modal, Form } from 'antd';
import { DownOutlined, UpOutlined } from '@ant-design/icons';
import { SEX_ENUM } from '~/solution/shared/constant/common.const';

export default function OwnerInfoDetailComponent(props: IOwnerInfoDetailProps) {
  const { state, selfClose, toggleShowMore } = useOwnerInfoDetailStore(props);
  const { visible } = props;
  const { confirmLoading, hasMore, details } = state;
  const layout = {
    labelCol: { span: 6 },
    wrapperCol: { span: 14 }
  };
  function renderForm() {
    return (
      <React.Fragment>
        <Form {...layout}>
          <Form.Item label="车主姓名">{details.name}</Form.Item>
          <Form.Item label="车主电话">{details.mobile}</Form.Item>
          <Form.Item label="车主性别">{SEX_ENUM[details.sex] || '-'}</Form.Item>
          <Form.Item label="证件类型">{details.certificateTypeText || '-'}</Form.Item>
          <Form.Item label="证件号">{details.certificateNo || '-'}</Form.Item>
        </Form>
      </React.Fragment>
    );
  }
  function renderExtraForm() {
    return (
      <React.Fragment>
        <Form {...layout}>
          <Form.Item label="车主年龄">{details.age || '-'}</Form.Item>
          <Form.Item label="工作领域">{WorkEnum[details.work] || '-'}</Form.Item>
          <Form.Item label="备用电话">{details.spareMobile || '-'}</Form.Item>
          <Form.Item label="电子邮箱">{details.email || '-'}</Form.Item>
          <Form.Item label="地址">
            {(details.address && `${details.provinceName}${details.cityName}${details.areaName}${details.address}`) ||
              '-'}
          </Form.Item>
          <Form.Item label="客服跟进方式">{details.followText || '-'}</Form.Item>
          <Form.Item label="备注">{details.remark || '-'}</Form.Item>
        </Form>
      </React.Fragment>
    );
  }
  return (
    <Modal
      title="车主详情"
      visible={visible}
      width={600}
      onCancel={selfClose}
      footer={null}
      maskClosable={false}
      destroyOnClose={true}
      confirmLoading={confirmLoading}
    >
      {details && (
        <React.Fragment>
          {renderForm()}
          <div className={style.more}>
            <a onClick={toggleShowMore}>查看更多个人信息{hasMore ? <UpOutlined /> : <DownOutlined />}</a>
          </div>
          {hasMore && renderExtraForm()}
        </React.Fragment>
      )}
    </Modal>
  );
}
