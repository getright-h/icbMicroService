export class DepUtil {
  // 注入服务等
  static Inject(constructor: { new (): any; __injectable?: boolean }) {
    return (target: any, propertyKey: string) => {
      if (typeof constructor !== 'function') {
        throw new TypeError('Only class is injectable.');
      }
      if (!constructor.__injectable) {
        throw new TypeError(`Class ${constructor.name} is not injectable.`);
      }

      // console.log(target.constructor.name, constructor.name);

      // const metadataKey = `${target.constructor.name}_${constructor.name}`
      // Reflect.defineMetadata(target, "design:paramtypes", metadataKey);

      target[propertyKey] = new constructor();
    };
  }
  static Injectable() {
    return (target: any) => {
      target.__injectable = true;
    };
  }
}
