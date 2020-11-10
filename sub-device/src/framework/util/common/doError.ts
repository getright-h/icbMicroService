export const DoError = {
  checkVehicleFrameNumber: (value: string) => {
    const vehicleFrameNumberReg = /^[A-Za-z0-9]{17}$/;
    if (value && vehicleFrameNumberReg.test(value.trim())) {
      return '请输入正确格式的车架号';
    }
    return '';
  },
  checkIsEmpty: (value: any) => {
    return !!value;
  },
  checkImageIsComplete: (value: Array<any>) => {
    const state = value.every(function(item: any) {
      return !!item.imageUrl;
    });
    return state;
  },
  checkAmount: (value: any, minAmount?: number) => {
    const amountReg = /(^[1-9]\d*(\.\d{1,2})?$)|(^0(\.\d{1,2})?$)/;
    if (amountReg.test(value)) {
      if (minAmount && value < minAmount) {
        return '';
      }
      return '请输入正确格式的定损金额';
    }

    return '';
  },
  checkVehicleNumber: (vehicleNumber: string, justCheckReg: boolean, checkEmpty: boolean) => {
    // 可选只check格式
    const express = /^[京津沪渝冀豫云辽黑湘皖鲁新苏浙赣鄂桂甘晋蒙陕吉闽贵粤青藏川宁琼使领][A-Za-z]{1}[A-Za-z0-9]{4,5}[A-Za-z0-9挂学警港澳使领]{1}$/;
    let message = '';
    if (!vehicleNumber.trim() || !justCheckReg) {
      checkEmpty ? (message = '车牌号不能为空') : (message = '');
    } else if (!express.test(vehicleNumber.trim())) {
      message = '请输入正确的车牌号';
    }
    return !message;
  },

  checkIsError: (object: any, state: any) => {
    let message = '';
    Object.keys(object).forEach((key: string) => {
      if (!message) {
        const value = object[key];
        // 如果是嵌套格式需要递归调用
        if (Array.isArray(value)) {
          message = DoError.checkIsError(value[0], state[key]);
        } else {
          if (!value.checkFunction(state[key])) {
            message = value.message;
          }
        }
      }
    });
    return message;
  }
};
