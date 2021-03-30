import { IEventListener } from '~framework/interfaces/IEvents';

export class EventBus {
  static instance: any = null;
  listeners: IEventListener[] = [];
  static getEventBus(eventName: string) {
    if (!this.instance) {
      this.instance = new EventBus(eventName);
    }
    return this.instance;
  }

  constructor(readonly eventName: string) {}

  // 事件订阅
  subscribe(event: IEventListener, tag: string) {
    const eventLinster: any = { event, tag };
    !this.listeners.filter((listener: any) => listener.tag == tag).length && this.listeners.push(eventLinster);
  }

  // 发布
  publish(...args: any[]) {
    console.log(args);
    const _tag = args.pop();
    this.listeners.forEach((listener: any) => {
      listener.event && listener.tag === _tag && listener.event(...args);
    });
  }

  // 取消订阅
  ubsubscribe(listener: IEventListener) {
    const listenerIndex = this.listeners.indexOf(listener);
    this.listeners.splice(listenerIndex, 1);
  }
}
