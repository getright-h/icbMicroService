import * as React from 'react';
import style from './add-warehouse.component.less';
import { useAddWarehouseStore } from './add-warehouse.component.store';
import { useContext } from 'react';
import { WarehouseListManageContext } from '../warehouse-list.component';
import { Modal, Form, Input, Checkbox } from 'antd';
import { IAreaCascaderComponent, ISelectLoadingComponent } from '~/framework/components/component.module';
import { GlobalContext } from '~/solution/context/global/global.provider';

export default function AddWarehouseComponent() {
  const { state, handleOk, handleCancel, form, getCurrentSelectInfo } = useAddWarehouseStore();
  const { reduxState } = useContext(WarehouseListManageContext);
  const { gState } = React.useContext(GlobalContext);
  const { addWarehousevisible } = reduxState;
  const { confirmLoading } = state;
  const layout = {
    labelCol: { span: 6 },
    wrapperCol: { span: 14 }
  };
  function setAreaInfo() {}
  return (
    <Modal
      title="添加仓库"
      visible={addWarehousevisible}
      onOk={handleOk}
      confirmLoading={confirmLoading}
      onCancel={handleCancel}
    >
      <Form {...layout} form={form}>
        <Form.Item name="name" label="仓库名" rules={[{ required: true }]}>
          <Input placeholder="请输入仓库名" />
        </Form.Item>
        <Form.Item name="name" label="所属组织" rules={[{ required: true }]}>
          <ISelectLoadingComponent
            placeholder="请选择所属组织"
            showSearch
            searchForm={{
              systemId: gState.myInfo.systemId
            }}
            reqUrl="queryStoreOrganization"
            getCurrentSelectInfo={getCurrentSelectInfo}
          ></ISelectLoadingComponent>
        </Form.Item>
        <Form.Item name="name" label="仓库地址" rules={[{ required: true }]}>
          <Input.Group compact>
            <Form.Item noStyle name="orgArea" rules={[{ required: true, message: '请选择省市区' }]}>
              <IAreaCascaderComponent deep={2} setAreaInfo={setAreaInfo} />
            </Form.Item>
            <Form.Item name="address" noStyle rules={[{ required: true, message: '请输入详细地址' }]}>
              <Input style={{ width: '50%' }} placeholder="请输入详细地址" />
            </Form.Item>
          </Input.Group>
        </Form.Item>
        <Form.Item name="name" label="管理员" rules={[{ required: true }]}>
          <ISelectLoadingComponent
            placeholder="请选择库管人员"
            showSearch
            searchForm={{
              systemId: gState.myInfo.systemId
            }}
            reqUrl="queryStoreUser"
            getCurrentSelectInfo={getCurrentSelectInfo}
          ></ISelectLoadingComponent>
        </Form.Item>
        <Form.Item name="name" label="总库存报警" rules={[{ required: true }]}>
          <Input.Group compact>
            <Input style={{ width: 100, textAlign: 'center' }} type="number" suffix="个" placeholder="请输入" />
            <Input
              className="site-input-split"
              style={{
                width: 30,
                borderLeft: 0,
                borderRight: 0,
                pointerEvents: 'none'
              }}
              placeholder="~"
              disabled
            />
            <Input
              type="number"
              className="site-input-right"
              style={{
                width: 100,
                textAlign: 'center'
              }}
              suffix="个"
              placeholder="请输入"
            />
          </Input.Group>
        </Form.Item>
        <Form.Item name="name" label="添加默认仓位" rules={[{ required: true }]}>
          <Checkbox>默认仓位: 1个</Checkbox>
        </Form.Item>
      </Form>
    </Modal>
  );
}
