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
  const eventBus = new EventBus('global');
  (window as MyWindow & typeof globalThis).eventBus = eventBus;
  eventBus.subscribe(showTaskCenterChange, 'showTaskCenterChange');

  useEffect(() => {
    state.showTaskCenter && refreshDownloadTasks();
  }, [state.showTaskCenter]);

  function getDownloadTasks(isRefresh = false) {
    setStateWrap({ isRefreshing: true });
    homeService.getDownloadTask({ index: indexRef, size: 10 }).subscribe(
      res => {
        let taskList: DownloadTask[] = isRefresh ? [] : state.taskList;
        let hasMore = false;
        if (res.list.dataList.length) {
          taskList = taskList.concat(res.list.dataList);
          hasMore = res.list.total > taskList.length;
        } else {
          indexRef--;
          hasMore = false;
        }
        setStateWrap({ taskList, isRefreshing: false, hasMore });
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

  return { state, indexRef, refreshDownloadTasks, downloadFile, loadMore, showTaskCenterChange };
}
