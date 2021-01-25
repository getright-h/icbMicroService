import * as React from 'react';
import style from './share-link-modal.component.less';
import { useShareLinkModalStore } from './share-link-modal.component.store';
import { Modal, Tabs, Input } from 'antd';
import { IShareLinkModalProps } from './share-link-modal.interface';
import { CopyOutlined } from '@ant-design/icons';
const { TabPane } = Tabs;
const { Search } = Input;
export default function ShareLinkModalComponent(props: IShareLinkModalProps) {
  const { state, inputRef, onCopy } = useShareLinkModalStore();
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
        <TabPane tab="分享二维码" key="2"></TabPane>
      </Tabs>
    </Modal>
  );
}
