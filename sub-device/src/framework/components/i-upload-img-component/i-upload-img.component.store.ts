import { IIUploadImgState, IIUploadImgProps } from './i-upload-img.interface';
import { useStateStore } from '~/framework/aop/hooks/use-base-store';
import { UploadFile, UploadChangeParam, RcCustomRequestOptions } from 'antd/lib/upload/interface';
import { useRef, useEffect, MutableRefObject } from 'react';
import axios from 'axios';
import Compressor from 'compressorjs';

export function useIUploadImgStore(props: IIUploadImgProps) {
  const { state, setStateWrap } = useStateStore(new IIUploadImgState());
  const returnImageListInfo: MutableRefObject<Array<string>> = useRef([]);
  useEffect(() => {
    setStateWrap({ fileList: props.fileList });
    returnImageListInfo.current = props.fileList.map(file => file.url);
  }, [props.fileList]);

  /**
   * @param {UploadChangeParam} { file, fileList } 上传图片change事件，返回file的状态和文件信息
   * [...fileList] 是为了解决一直uploading的bug（官方的）
   */
  function handleChange({ file, fileList }: UploadChangeParam<UploadFile>) {
    if (file.status === 'done') {
      fileList = fileList.map(item => {
        return item;
      });
    } else if (file.status === 'removed') {
      returnImageListInfo.current = returnImageListInfo.current.filter(returnImage => {
        return returnImage != file['url'];
      });
      props.getFileList(returnImageListInfo.current);
    }
    setStateWrap({ fileList: file.status ? [...fileList] : state.fileList });
  }

  /**
   * @param {UploadFile} file 预览功能
   */
  function handlePreview(file: UploadFile) {
    setStateWrap({ previewImage: file.response || file.url, previewVisible: true });
  }

  /**
   * @param  取消功能
   */
  function handleCancel() {
    setStateWrap({ previewVisible: false });
  }

  /**
   * @param {RcCustomRequestOptions} item 自定义上传的请求，其中包含了前端上传压缩
   * @returns
   */
  function customReq(item: RcCustomRequestOptions) {
    new Compressor(item.file as any, {
      quality: 0.6,
      convertSize: 1000000,
      success(result: any) {
        const formData = new FormData();
        formData.append('file', result, result.name);
        formData.append('id', '1000');
        return axios
          .post(item.action, formData, {
            onUploadProgress: ({ total, loaded }) => {
              item.onProgress({ percent: Number(Math.round((loaded / total) * 100).toFixed(2)) }, item.file);
            }
          })
          .then(({ data: response }) => {
            returnImageListInfo.current.push(response.data[0].fileFullUrl);
            props.getFileList(returnImageListInfo.current);
            item.onSuccess(response.data[0].fileFullUrl, item.file);
          })
          .catch(item.onError);
      },
      error(err) {
        console.log(err);
      }
    });
  }
  return { state, customReq, handleChange, handlePreview, handleCancel };
}
