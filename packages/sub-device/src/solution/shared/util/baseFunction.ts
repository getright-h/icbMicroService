// import { message } from 'antd';
// import { ERROR_BASE } from '../constant/common.const';

export const CommonUtil = {
  downExcel: (
    result: any,
    filename: string,
    type = 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet'
  ) => {
    // const data = result.body;
    const blob = new Blob([result], { type });
    const objectUrl = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.setAttribute('style', 'display:none');
    a.setAttribute('href', objectUrl);
    a.setAttribute('download', decodeURI(filename));
    a.click();
    URL.revokeObjectURL(objectUrl);
  },
  downFile: (data: string, filename: string) => {
    const blob = CommonUtil.base64ToBlob(data);
    const objectUrl = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.setAttribute('style', 'display:none');
    a.setAttribute('href', objectUrl);
    a.setAttribute('download', decodeURI(filename));
    a.click();
    URL.revokeObjectURL(objectUrl);
  },
  base64ToBlob(code: string) {
    const parts = code.split(';base64,');
    const contentType = parts[0].split(':')[1];
    const raw = window.atob(parts[1]);
    const rawLength = raw.length;

    const uInt8Array = new Uint8Array(rawLength);

    for (let i = 0; i < rawLength; ++i) {
      uInt8Array[i] = raw.charCodeAt(i);
    }
    return new Blob([uInt8Array], { type: contentType });
  },
  checkIsError: (object: any, value?: string) => {
    let returnInfo = false;
    if (Array.isArray(object)) {
      for (let index = 0; index < object.length; index++) {
        if (object[index].isSelected) {
          returnInfo = true;
          break;
        }
      }
    } else {
      if (object[value] === 0 || object[value] || object[value] === false) {
        return true;
      }
    }
    // if (!returnInfo) {
    //   message.info(`请${Array.isArray(object) ? '勾选' : '填写'}【${ERROR_BASE[value]}】, 并确认所有带*的都已填写。`);
    //   return false;
    // }
    return true;
  }
};
