import * as React from 'react';
import { useAddWarehouseStore } from './add-warehouse.component.store';
import { Modal, Form, Input, Switch } from 'antd';
import { IAreaCascaderComponent, ISelectLoadingComponent } from '~/framework/components/component.module';
import { GlobalContext } from '~/solution/context/global/global.provider';
import { IAddWarehouseProps } from './add-warehouse.interface';

export default function AddWarehouseComponent(props: IAddWarehouseProps) {
  const {
    state,
    handleOk,
    handleCancel,
    form,
    getCurrentSelectInfo,
    setAreaInfo,
    getCurrentSelectAdmin
  } = useAddWarehouseStore(props);
  const { gState } = React.useContext(GlobalContext);
  const { confirmLoading, editOrganizationName, editmanageName, areaDetail } = state;
  const { addWarehouseVisible, isEdit } = props;
  const layout = {
    labelCol: { span: 6 },
    wrapperCol: { span: 14 }
  };
  const IAreaCascaderComponentForm: any = React.useCallback(
    () =>
      IAreaCascaderComponent({
        deep: 2,
        setAreaInfo,
        defaultValue: areaDetail
      }),
    [areaDetail]
  );
  return (
    <Modal
      title={`${isEdit ? '编辑' : '创建'}仓库`}
      visible={addWarehouseVisible}
      onOk={handleOk}
      destroyOnClose
      confirmLoading={confirmLoading}
      onCancel={handleCancel}
    >
      <Form {...layout} form={form} initialValues={{ isDefault: true }}>
        <Form.Item name="name" label="仓库名" rules={[{ required: true }]}>
          <Input placeholder="请输入仓库名" />
        </Form.Item>
        <Form.Item name="organizationId" label="所属组织" rules={[{ required: true }]}>
          {ISelectLoadingComponent({
            placeholder: '请选择所属组织',
            showSearch: true,
            searchKey: editOrganizationName,
            searchForm: {
              systemId: gState.myInfo.systemId
            },
            reqUrl: 'queryStoreOrganization',
            getCurrentSelectInfo: getCurrentSelectInfo
          })}
        </Form.Item>
        <Form.Item label="仓库地址" name="areaDetail" rules={[{ required: true, message: '请选择省市区' }]}>
          <Input.Group compact>
            <Form.Item noStyle name="areaDetail">
              <IAreaCascaderComponentForm />
            </Form.Item>
            <Form.Item name="addressDetail" noStyle rules={[{ required: true, message: '请输入详细地址' }]}>
              <Input style={{ width: '70%', marginTop: 10 }} placeholder="请输入详细地址" />
            </Form.Item>
          </Input.Group>
        </Form.Item>
        <Form.Item name="personId" label="管理员" rules={[{ required: true }]}>
          {ISelectLoadingComponent({
            placeholder: '请选择库管人员',
            showSearch: true,
            searchKey: editmanageName,
            searchForm: {
              systemId: gState.myInfo.systemId
            },
            reqUrl: 'queryStoreUser',
            getCurrentSelectInfo: getCurrentSelectAdmin
          })}
        </Form.Item>
        <Form.Item label="总库存报警">
          <Input.Group compact>
            <Form.Item name="minAlarm" noStyle>
              <Input style={{ width: 100, textAlign: 'center' }} type="number" suffix="个" placeholder="请输入" />
            </Form.Item>
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
            <Form.Item name="maxAlarm" noStyle>
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
            </Form.Item>
          </Input.Group>
        </Form.Item>
        <Form.Item name="isDefault" label="添加默认仓位" valuePropName="checked">
          <Switch checkedChildren="默认仓位: 1个" unCheckedChildren="无默认仓位" />
        </Form.Item>
      </Form>
    </Modal>
  );
}
