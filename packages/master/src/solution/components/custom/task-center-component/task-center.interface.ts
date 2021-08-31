/**
 * @export state变量定义和初始化
 * @class ITaskCenterState
 */
export class ITaskCenterState {
  isRefreshing = false;
  hasMore = false;
  taskList: DownloadTask[] = [];
}

export class ITaskCenterProps {
  visible: boolean;
}

export interface DownloadTask {
  id: string;
  name: string;
  fileSize: string;
  businessName: string;
  finishTime: string;
  downloadPath: string;
  state: number;
  suffixName: string;
  creatorId: string;
  creatorName: string;
  createTime: string;
}
