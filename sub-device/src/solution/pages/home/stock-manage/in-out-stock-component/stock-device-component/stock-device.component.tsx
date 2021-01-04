import React from 'react';
import style from './stock-device.component.less';
import { IStockDeviceProps } from './stock-device.interface';
import { useStockDeviceStore } from './stock-device.component.store';
import { Modal, Table, Input, Button } from 'antd';
const { Search } = Input;

export default function StockDeviceComponent(props: IStockDeviceProps) {
  const { state, selfClose } = useStockDeviceStore(props);
  const { tableData } = state;
  const { visible } = props;

  const columns = [
    {
      title: '设备型号',
      dataIndex: 'typeName'
    },
    {
      title: '设备号',
      dataIndex: 'code'
    }
  ];

  function renderInfo() {
    return (
      <React.Fragment>
        {/* <div className={style.search}>
          <Search
            placeholder="请输入设备型号/设备号"
            onSearch={value => console.log(value)}
            enterButton
            style={{ width: 400 }}
          />
          <Button>导出Excel</Button>
        </div> */}
        <div className={style.deviceTable}>
          <Table columns={columns} dataSource={tableData} pagination={false} bordered rowKey={row => row.materialId} />
        </div>
      </React.Fragment>
    );
  }

  return (
    <Modal
      title="出入库设备详情"
      centered={true}
      visible={visible}
      width={600}
      onCancel={selfClose}
      footer={null}
      maskClosable={false}
      destroyOnClose={true}
    >
      {renderInfo()}
    </Modal>
  );
}
