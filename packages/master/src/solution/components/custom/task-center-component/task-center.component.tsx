import {
  DownloadOutlined,
  FileDoneOutlined,
  FileSearchOutlined,
  InfoCircleFilled,
  LoadingOutlined,
  ReloadOutlined
} from '@ant-design/icons';
import { Badge, Button, Empty, Popover, Progress, Tabs } from 'antd';
import * as React from 'react';
import style from './task-center.component.less';
import { useTaskCenterStore } from './task-center.component.store';
import InfiniteScroll from 'react-infinite-scroller';
const { TabPane } = Tabs;

export default function TaskCenterComponent() {
  const {
    state,
    indexRef,
    refreshDownloadTasks,
    downloadFile,
    loadMore,
    showTaskCenterChange,
    initiativeClick,
    onTabClick
  } = useTaskCenterStore();
  const { isRefreshing, hasMore, handleList, finishList, hasNewComplete } = state;
  const operations = (
    <Button type="link">
      {isRefreshing ? <LoadingOutlined /> : <ReloadOutlined onClick={refreshDownloadTasks} />}
    </Button>
  );

  function renderMain() {
    return (
      <Tabs tabBarExtraContent={operations} onTabClick={onTabClick}>
        <TabPane tab="处理中" key="1">
          <div className={style.taskContainer}>
            {handleList.length ? (
              handleList.map(task => (
                <div key={task.id} className={style.taskItem}>
                  <div className={style.taskIcon}>
                    <FileSearchOutlined />
                  </div>
                  <div className={style.taskContent}>
                    <div className={style.taskTitle}>{task.businessName}</div>
                    <div className={style.taskAction}>
                      <Progress
                        strokeColor={{
                          from: '#108ee9',
                          to: '#7958fa'
                        }}
                        percent={99.9}
                        status="active"
                        showInfo={false}
                      />
                    </div>
                  </div>
                </div>
              ))
            ) : (
              <Empty image={Empty.PRESENTED_IMAGE_SIMPLE} />
            )}
          </div>
          <div className={style.hint}>
            <InfoCircleFilled />
            <span>关闭浏览器，后台仍会继续执行导出任务</span>
          </div>
        </TabPane>
        <TabPane tab={<Badge dot={hasNewComplete}>已完成</Badge>} key="2">
          <div className={style.taskContainer}>
            <InfiniteScroll
              initialLoad={false}
              pageStart={indexRef}
              loadMore={loadMore}
              hasMore={!isRefreshing && hasMore}
              useWindow={false}
              threshold={30}
            >
              {finishList.length ? (
                finishList.map(task => (
                  <div key={task.id} className={style.taskItem}>
                    <div className={style.taskIcon}>
                      <FileDoneOutlined />
                    </div>
                    <div className={style.taskContent}>
                      <div className={style.taskTitle}>{task.businessName}</div>
                      <div className={style.taskAction}>
                        <span>{task.name}</span>
                        <Button type="link" onClick={() => downloadFile(task)}>
                          下载
                        </Button>
                      </div>
                    </div>
                  </div>
                ))
              ) : (
                <Empty image={Empty.PRESENTED_IMAGE_SIMPLE} />
              )}
            </InfiniteScroll>
          </div>
          <div className={style.hint}>
            <InfoCircleFilled />
            <span>已完成任务下载后可查看文件</span>
          </div>
        </TabPane>
      </Tabs>
    );
  }

  return (
    <span style={{ marginRight: '50px' }}>
      <Popover
        content={renderMain}
        placement="bottomRight"
        trigger="click"
        visible={state.showTaskCenter}
        onVisibleChange={showTaskCenterChange}
        destroyTooltipOnHide={{ keepParent: false }}
      >
        <Badge dot={hasNewComplete}>
          <DownloadOutlined style={{ fontSize: '20px' }} onClick={initiativeClick} />
        </Badge>
      </Popover>
    </span>
  );
}
