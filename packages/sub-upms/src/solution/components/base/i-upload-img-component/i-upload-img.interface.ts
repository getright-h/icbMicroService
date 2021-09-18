import { UploadFile } from 'antd/lib/upload/interface';

/**
 * @export state变量定义和初始化
 * @class IIUploadImgState
 */
export class IIUploadImgState {
  fileList: Array<UploadFile> = [];
  loading = false;
  previewImage = '';
  previewVisible = false;
  action: string = process.env.UPLOAD + 'DistributedFileManagerPlugin/FormUploadFiles';
}

export interface IIUploadImgProps {
  isJustShowImg?: boolean;
  maxImgNumber?: number;
  remarkText?: string;
  fileList?: Array<UploadFile>;
  getFileList?: (url: string | Array<string>) => void;
}

interface ImageContent {
  uid: string;
  url?: string;
  name: string;
  formType?: string;
  path: string | string[];
  isShow?: boolean;
  type?: number;
}
