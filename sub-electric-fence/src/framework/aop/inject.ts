// 类型元数据使用元数据键"design:type"
// 参数类型元数据使用元数据键"design:paramtypes"
// 返回值类型元数据使用元数据键"design:returntype"
export function Injectable() {
  return (target: any) => {
    console.log(1, target.name);

    const metadata = Reflect.getMetadata(target.name, target);
    if (!metadata) {
      Reflect.defineMetadata(target.name, new target(), target);
    }
    // console.log(getArgs(target));

    const construcerParams = Reflect.getMetadata('self:properties_metadata', target.constructor);
    console.log('param', construcerParams);
    // if (construcerParams.length > 0) {
    //   const objectArray: any = [];
    //   construcerParams.forEach((param: any) => {
    //     const constructMetadata = Reflect.getMetadata(param.name, target);
    //     if (constructMetadata) {
    //       objectArray.push(constructMetadata);
    //     } else {
    //       objectArray.push(new param());
    //     }
    //   });
    //   // getArgs(target).forEach((arg: any, index: number) => {
    //   //   target.prototype[arg] = objectArray[index];
    //   // });
    // }
  };
}

function getArgs(func: Function) {
  // 先用正则匹配,取得符合参数模式的字符串.
  // 第一个分组是这个: ([^)]*) 非右括号的任意字符
  const args = func.toString().match(/function\s.*?\(([^)]*)\)/)[1];
  // 用逗号来分隔参数(arguments string).
  return args
    .split(',')
    .map(function(arg: any) {
      // 去除注释(inline comments)以及空格
      return arg.replace(/\/\*.*\*\//, '').trim();
    })
    .filter(function(arg: any) {
      // 确保没有 undefined.
      return arg;
    });
}
