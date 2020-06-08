// 启用应用间通讯
import { MenuState } from '~/solution/context/redux/reducer/reducer.interface';
const GlobalStore: any = {};
const NAME = '1';
function appStore(props: any) {
  const { onGlobalStateChange, setGlobalState } = props;
  // 在当前应用监听全局状态，有变更触发 callback，fireImmediately = true 立即触发 callback
  onGlobalStateChange((state: MenuState, prev: MenuState) => {
    // state: 变更后的状态; prev 变更前的状态
    console.log('sub', state, prev);
  });

  // 按一级属性设置全局状态，微应用中只能修改已存在的一级属性
  setGlobalState({});
  GlobalStore.setGlobalState = setGlobalState;
  GlobalStore.name = NAME;
}

const setState = (data: any) => {
  GlobalStore.setGlobalState({
    ignore: NAME,
    ...data
  });
};

export { setState, appStore };
