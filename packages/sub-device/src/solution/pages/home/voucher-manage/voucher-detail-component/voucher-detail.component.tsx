import { Button, Descriptions, Modal } from 'antd';
import * as React from 'react';
import { ImageDisplayComponent } from '~/framework/components/component.module';
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
            <Descriptions.Item label="关联车辆">{details.vinNo}</Descriptions.Item>
            <Descriptions.Item label="关联设备">
              {details.deviceCodeList.map((item: any) => (
                <div key={item.deviceCode}>{`${item.deviceCode}（${item.typeName}）`}</div>
              ))}
            </Descriptions.Item>
            <Descriptions.Item label="安装时间">{details.time}</Descriptions.Item>
            <Descriptions.Item label="安装工">{details.name}</Descriptions.Item>
            <Descriptions.Item label="联系方式">{details.mobile || '-'}</Descriptions.Item>
            <Descriptions.Item label="安装地址">{details.address || '-'}</Descriptions.Item>
            <Descriptions.Item label="安装图片">
              {details.pictureList
                ? details.pictureList.map((image: string) => <ImageDisplayComponent imageUrl={image} key={image} />)
                : '-'}
            </Descriptions.Item>
            <Descriptions.Item label="创建时间">{details.createTime}</Descriptions.Item>
            <Descriptions.Item label="备注">{details.remark || '-'}</Descriptions.Item>
          </Descriptions>
        )}
      </React.Fragment>
    );
  }
  return (
    <Modal
      title="安装凭证详情"
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
