import { Button, Descriptions, Modal } from 'antd';
import * as React from 'react';
import style from './voucher-detail.component.less';
import { useVoucherDetailStore } from './voucher-detail.component.store';
import { IVoucherDetailProps } from './voucher-detail.interface';

export default function VoucherDetailComponent(props: IVoucherDetailProps) {
  const { state, selfClose } = useVoucherDetailStore(props);
  const { visible } = props;
  const { details } = state;
  function renderDetail() {
    return (
      <React.Fragment>
        {details && (
          <Descriptions bordered size="small" column={1}>
            <Descriptions.Item label="关联车辆">{details.vehicle}</Descriptions.Item>
            <Descriptions.Item label="关联设备">{details.deviceList}</Descriptions.Item>
            <Descriptions.Item label="安装时间">{details.installTime}</Descriptions.Item>
            <Descriptions.Item label="安装工">{details.name}</Descriptions.Item>
            <Descriptions.Item label="联系方式">{details.stateText}</Descriptions.Item>
            <Descriptions.Item label="安装地址">{details.location}</Descriptions.Item>
            <Descriptions.Item label="安装图片">{details.img}</Descriptions.Item>
            <Descriptions.Item label="创建时间">{details.createTime}</Descriptions.Item>
            <Descriptions.Item label="备注">{details.remark}</Descriptions.Item>
          </Descriptions>
        )}
      </React.Fragment>
    );
  }
  return (
    <Modal
      title="标题"
      visible={visible}
      width={600}
      onCancel={selfClose}
      footer={[
        <Button key="back" onClick={selfClose}>
          返回
        </Button>
      ]}
      maskClosable={false}
      destroyOnClose={true}
    >
      {renderDetail()}
    </Modal>
  );
}
