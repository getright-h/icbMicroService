import * as React from 'react';
import style from './data-push-log-modal.component.less';
import { useDataPushLogModalStore } from './data-push-log-modal.component.store';
import { IDataPushLogModalProps, LogDetail } from './data-push-log-modal.interface';
import { Modal, Descriptions, Image } from 'antd';

export default function DataPushLogModalComponent(props: IDataPushLogModalProps) {
  const { state, handleOk, cancelModal } = useDataPushLogModalStore(props);
  const { visible, currentData = {} } = props;
  const { isLoading } = state;
  const render = (text?: any) => (text ? text : '-');

  function renderCarInfo() {
    return LogDetail.map(item => {
      if (Array.isArray(currentData?.[item.key])) {
        return currentData?.[item.key].map((data: { [x: string]: any }) => {
          return renderItem(item, data);
        });
      } else {
        return renderItem(item, currentData?.[item.key]);
      }
    });
  }

  function renderItem(item: { title: any; key?: string; children: any }, data: { [x: string]: any }) {
    return (
      <Descriptions title={item.title} key={item.title}>
        {item?.children?.map(
          (itemChild: { title: string; type: string; param: string | number; run: (arg0: never) => any }) => {
            return (
              <Descriptions.Item label={itemChild.title} key={itemChild.title}>
                {itemChild?.type == 'IMAGE'
                  ? data?.[itemChild.param]?.map((image: string) => {
                      <Image width={200} src={image} />;
                    })
                  : render(itemChild.run ? itemChild.run(data?.[itemChild.param] as never) : data?.[itemChild.param])}
              </Descriptions.Item>
            );
          }
        )}
      </Descriptions>
    );
  }
  return (
    <Modal
      confirmLoading={state.isLoading}
      width={1000}
      title={'详情'}
      visible={visible}
      onOk={handleOk}
      cancelButtonProps={null}
      onCancel={cancelModal}
    >
      {renderCarInfo()}
    </Modal>
  );
}
