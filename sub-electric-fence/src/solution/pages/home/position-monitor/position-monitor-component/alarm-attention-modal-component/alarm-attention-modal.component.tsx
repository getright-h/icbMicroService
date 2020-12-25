import * as React from 'react';
import { useAlarmAttentionModalStore } from './alarm-attention-modal.component.store';
import { Modal } from 'antd';
import { IAlarmAttentionModalProps } from './alarm-attention-modal.interface';
import { ITableComponent } from '~/solution/components/component.module';
import { initAlarmAttentionColumns } from './alarm-attention-modal.column';

export default function AlarmAttentionModalComponent(props: IAlarmAttentionModalProps) {
  const { state, changeTablePageIndex } = useAlarmAttentionModalStore();
  const { total, isLoading, index, size, tableInfo } = state;
  const { isModalVisible, handleCancel } = props;
  function TableInfo() {
    return (
      <ITableComponent
        columns={initAlarmAttentionColumns()}
        isLoading={isLoading}
        pageIndex={index}
        pageSize={size}
        data={tableInfo}
        total={total}
        isPagination={true}
        changeTablePageIndex={(index: number, pageSize: number) => changeTablePageIndex(index, pageSize)}
      ></ITableComponent>
    );
  }
  return (
    <Modal
      title="未处理报警消息"
      width={1200}
      onOk={handleCancel}
      closable
      visible={isModalVisible}
      onCancel={handleCancel}
    >
      <span>未处理信息合计：{total}(已处理信息可在报警记录中查看)</span>
      {TableInfo()}
    </Modal>
  );
}
