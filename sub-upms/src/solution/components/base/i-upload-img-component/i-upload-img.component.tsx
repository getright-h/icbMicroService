import * as React from 'react';
import style from './i-upload-img.component.less';
import { Upload, Modal } from 'antd';
import { useIUploadImgStore } from './i-upload-img.component.store';
import { UploadListType } from 'antd/lib/upload/interface';
import { IIUploadImgProps } from './i-upload-img.interface';
import { PlusOutlined } from '@ant-design/icons';

IUploadImgComponent.defaultProps = {
  isJustShowImg: false,
  maxImgNumber: 1,
  remarkText: '',
  fileList: []
};

export default function IUploadImgComponent(props: IIUploadImgProps) {
  const { state, customReq, handleChange, handlePreview, handleCancel, handleDownload } = useIUploadImgStore(props);
  const uploadsProps = {
    action: state.action,
    customRequest: customReq,
    listType: 'picture-card' as UploadListType,
    onChange: handleChange,
    fileList: state.fileList,
    onPreview: handlePreview,
    onDownload: handleDownload
  };
  const uploadButton = (
    <div>
      <PlusOutlined />
      <div className="ant-upload-text">上传</div>
    </div>
  );
  return (
    <div>
      <Upload {...uploadsProps}>
        {state.fileList && state.fileList.length < props.maxImgNumber ? uploadButton : null}
      </Upload>
      <Modal visible={state.previewVisible} footer={null} onCancel={handleCancel}>
        <img alt="example" style={{ width: '100%' }} src={state.previewImage} />
      </Modal>
      <div className={style.iIploadImgTipInfo}>{props.remarkText || ''}</div>
    </div>
  );
}
