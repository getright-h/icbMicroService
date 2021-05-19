// 启用应用间通讯

import { MicroAppStateActions } from 'qiankun';
import { MenuState } from '~/solution/context/redux/reducer/reducer.interface';
import { initialState } from '../../solution/context/redux/reducer/menu.redux';
const GlobalStore: any = {};
const NAME = 'name';
function appStore(initGlobalState: (initState: MenuState) => MicroAppStateActions) {
  const { onGlobalStateChange, setGlobalState } = initGlobalState(initialState);
  console.log('1---------');
  const eventBus = window['eventBus'];

  // 在当前应用监听全局状态，有变更触发 callback，fireImmediately = true 立即触发 callback
  onGlobalStateChange((state, prev) => {
    // state: 变更后的状态; prev 变更前的状态
    console.log('father', state, prev);
    if (!!state['showTaskCenter']) {
      eventBus.publish(state['showTaskCenter'], 'showTaskCenterChange');
    }
  });

  // 按一级属性设置全局状态，微应用中只能修改已存在的一级属性
  setGlobalState({});
  GlobalStore.setGlobalState = setGlobalState;
  GlobalStore.name = NAME;
}

const setState = (data: any) => {
  console.log(data);

  GlobalStore.setGlobalState({
    ...data
  });
};

export { setState, appStore };
