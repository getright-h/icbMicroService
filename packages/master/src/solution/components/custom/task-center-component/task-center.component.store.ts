import { DownloadTask, ITaskCenterState } from './task-center.interface';
import { useStateStore } from '~/framework/aop/hooks/use-base-store';
import { useEffect, useRef } from 'react';
import { HomeService } from '~/solution/model/services/home.service';
import { ShowNotification } from '~/framework/util/common';
import { EventBus } from '~/framework/util/common';

interface MyWindow {
  eventBus?: EventBus;
}

export function useTaskCenterStore() {
  const { state, setStateWrap } = useStateStore(new ITaskCenterState());
  const homeService: HomeService = new HomeService();
  let { current: indexRef } = useRef(1);
  let { current: handleListLengthRef } = useRef(0);
  let { current: timer } = useRef(null);
  const eventBus = new EventBus('global');
  (window as MyWindow & typeof globalThis).eventBus = eventBus;
  eventBus.subscribe(showTaskCenterChange, 'showTaskCenterChange');

  useEffect(() => {
    if (state.showTaskCenter && !state.hasNewComplete) {
      refreshDownloadTasks();
    }
  }, [state.showTaskCenter]);

  function getDownloadTasks(isRefresh = false) {
    setStateWrap({ isRefreshing: true });
    homeService.getDownloadTask({ index: indexRef, size: 10 }).subscribe(
      res => {
        let taskList: DownloadTask[] = isRefresh ? [] : state.taskList;
        let handleList: DownloadTask[] = [];
        let finishList: DownloadTask[] = [];
        let hasMore = false;
        if (res.list.dataList.length) {
          taskList = taskList.concat(res.list.dataList);
          handleList = taskList.filter(task => task.state == 0);
          finishList = taskList.filter(task => task.state == 1);
          hasMore = res.list.total > taskList.length;
        } else {
          indexRef--;
          hasMore = false;
        }
        setStateWrap({
          taskList,
          handleList,
          finishList,
          isRefreshing: false,
          hasMore,
          hasNewComplete: handleListLengthRef && !handleList.length
        });
        handleListLengthRef = handleList.length;
        if (handleListLengthRef) {
          timer = setInterval(() => {
            refreshDownloadTasks();
          }, 10000);
        } else {
          timer && clearInterval(timer);
        }
      },
      err => {
        ShowNotification.error(err);
        setStateWrap({ isRefreshing: false });
      }
    );
  }

  function loadMore(page: number) {
    indexRef++;
    getDownloadTasks();
  }

  function refreshDownloadTasks() {
    indexRef = 1;
    getDownloadTasks(true);
  }

  function downloadFile(task: DownloadTask) {
    const a = document.createElement('a');
    a.setAttribute('style', 'display:none');
    a.setAttribute('href', task.downloadPath);
    a.click();
  }

  function showTaskCenterChange(visible: boolean) {
    setStateWrap({ showTaskCenter: visible });
  }

  function initiativeClick() {
    if (!state.showTaskCenter) {
      timer && clearInterval(timer);
    }
  }

  function onTabClick(key: string, e: any) {
    if (key == '2' && state.hasNewComplete) {
      timer && clearInterval(timer);
      setStateWrap({ hasNewComplete: false });
    }
  }

  return {
    state,
    indexRef,
    refreshDownloadTasks,
    downloadFile,
    loadMore,
    showTaskCenterChange,
    initiativeClick,
    onTabClick
  };
}
