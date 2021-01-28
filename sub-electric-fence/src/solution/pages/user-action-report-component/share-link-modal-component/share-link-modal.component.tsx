import * as React from 'react';
import style from './share-link-modal.component.less';
import { useShareLinkModalStore } from './share-link-modal.component.store';
import { Modal, Tabs, Input, Button } from 'antd';
import { IShareLinkModalProps } from './share-link-modal.interface';
import { CopyOutlined, DownloadOutlined } from '@ant-design/icons';
import { IQrcodeComponent } from '~/solution/components/component.module';
const { TabPane } = Tabs;
const { Search } = Input;
export default function ShareLinkModalComponent(props: IShareLinkModalProps) {
  const { state, inputRef, qrCodeRef, onCopy, downloadQRCodeImg } = useShareLinkModalStore(props);
  const { handleCancel, isModalVisible } = props;
  return (
    <Modal title="分享" width={800} onOk={handleCancel} closable visible={isModalVisible} onCancel={handleCancel}>
      <Tabs defaultActiveKey="1" centered>
        <TabPane tab="分享链接" key="1">
          <Search
            ref={inputRef}
            placeholder="复制粘贴"
            enterButton={<CopyOutlined />}
            size="large"
            value={state.copyValue}
            onSearch={onCopy}
          />
        </TabPane>
        <TabPane tab="分享二维码" key="2">
          <div className={style.qrCodeContainer}>
            <IQrcodeComponent url={state.copyValue} qrRef={qrCodeRef} widthAndHeight={240} />
            <Button type="primary" onClick={downloadQRCodeImg}>
              <DownloadOutlined />
              下载二维码
            </Button>
          </div>
        </TabPane>
      </Tabs>
    </Modal>
  );
}
