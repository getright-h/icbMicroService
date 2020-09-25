export default class TreeDealer<T> {
  treeInfo: Array<T>;
  constructor(treeInfo: Array<T>) {
    this.treeInfo = treeInfo;
  }

  exchangeTreeInfo(treeMap: Record<string, any>) {
    this.treeInfo = this.treeInfo.map(element => {
      Object.keys(treeMap).forEach(key => {
        element[key] = element[treeMap[key]];
      });
      element['isLeaf'] = false;
      return element;
    });
  }

  getTreeInfo() {
    return this.treeInfo;
  }
}
