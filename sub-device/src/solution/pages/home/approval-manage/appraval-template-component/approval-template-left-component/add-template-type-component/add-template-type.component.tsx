import * as React from 'react';
import style from './add-template-type.component.less';
import { useAddTemplateTypeStore } from './add-template-type.component.store';
import { IAddTemplateTypeProps } from './add-template-type.interface';
import { Button, Form, Input, Modal, Select, Tree } from 'antd';
import { ISelectLoadingComponent } from '~/framework/components/component.module';
import { GlobalContext } from '~/solution/context/global/global.provider';
import _ from 'lodash';
import { flatAtree } from '~/framework/util/common/treeFunction';
import { HomeOutlined } from '@ant-design/icons';
const { Option } = Select;
export default function AddTemplateTypeComponent(props: IAddTemplateTypeProps) {
  const {
    state,
    handleOk,
    handleCancel,
    onChangeHaveChooseShop,
    onExpand,
    onCheck,
    getCurrentSelectInfo,
    onLoadData
  } = useAddTemplateTypeStore(props);
  const { isEdit, addApprovalTypeVisible } = props;
  const { confirmLoading, expandedKeys, treeData, checkedKeys, checkedObject } = state;
  const { gState } = React.useContext(GlobalContext);
  function RenderLinkOrganization() {
    const checkedObjectFlat = React.useCallback(() => flatAtree(checkedObject), [checkedObject]);
    return (
      <div className={style.linkOrganization}>
        <div>
          <span>选择: </span>
          <div className={style.chooseOrganization}>
            <RenderTree />
          </div>
        </div>
        <div>
          <span>已选: </span>
          <div className={style.haveChooseOrganization}>
            <div className={style.searchApproval}>
              <Select
                showSearch
                style={{ width: 200 }}
                placeholder="选择已选的机构"
                optionFilterProp="children"
                onChange={onChangeHaveChooseShop}
                allowClear
                filterOption={(input, option) => {
                  return option.children.toLowerCase().indexOf(input.toLowerCase()) >= 0;
                }}
              >
                {checkedObjectFlat().map(item => {
                  return (
                    <Option value={item.key} key={item.key}>
                      {item.name}
                    </Option>
                  );
                })}
              </Select>
            </div>

            <div className={style.searchItem}>
              {checkedObjectFlat().map((item, index) => {
                return (
                  <div key={item.key} className={style.flatObject} tabIndex={index + 1} id={item.key}>
                    <div className={style.item}>
                      <HomeOutlined />
                      <span>{item.title}</span>
                    </div>

                    {/* <Button icon={<DeleteOutlined />} onClick={() => removeHaveChecked(item)} type="link"></Button> */}
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      </div>
    );
  }

  function RenderTree() {
    return (
      <div className={style.approvalListLeft}>
        <div className={style.searchApproval}>
          <ISelectLoadingComponent
            placeholder="请输入机构名称"
            width={'100%'}
            showSearch
            searchForm={{
              systemId: gState.myInfo.systemId
            }}
            reqUrl="queryStoreOrganization"
            getCurrentSelectInfo={value => getCurrentSelectInfo<string>(value, 'id')}
          />
        </div>
        <div className={style.searchItem}>
          <Tree
            loadData={onLoadData}
            expandedKeys={expandedKeys}
            onExpand={onExpand}
            checkedKeys={checkedKeys}
            onCheck={onCheck}
            blockNode
            treeData={treeData}
            checkable
          />
        </div>
      </div>
    );
  }

  return (
    <Modal
      title={`${isEdit ? '编辑' : '创建'}模板类型`}
      visible={addApprovalTypeVisible}
      onOk={handleOk}
      width={1000}
      destroyOnClose
      confirmLoading={confirmLoading}
      onCancel={handleCancel}
    >
      <Form.Item name="name" label="模板类型" rules={[{ required: true }]}>
        <Input placeholder="请输入模板类型" />
      </Form.Item>
      <Form.Item name="organization" label="关联机构" rules={[{ required: true }]}>
        <RenderLinkOrganization />
      </Form.Item>
    </Modal>
  );
}
