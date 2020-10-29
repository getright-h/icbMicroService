import * as React from 'react';
import style from './add-template-type.component.less';
import { useAddTemplateTypeStore } from './add-template-type.component.store';
import { IAddTemplateTypeProps } from './add-template-type.interface';
import { Button, Form, Input, Modal, Select, Tree } from 'antd';
import _ from 'lodash';
import { flatAtree } from '~/framework/util/common/treeFunction';
import { HomeOutlined } from '@ant-design/icons';
import OrganizationControllerComponent from '~/solution/components/organization-controller-component/organization-controller.component';
const { Option } = Select;
export default function AddTemplateTypeComponent(props: IAddTemplateTypeProps) {
  const {
    state,
    handleOk,
    handleCancel,
    onChangeHaveChooseShop,
    changeTemplateName,
    onExpand,
    onCheck
  } = useAddTemplateTypeStore(props);
  const { isEdit, addApprovalTypeVisible } = props;
  const { confirmLoading, expandedKeys, checkedKeys, checkedObject, name } = state;
  function RenderLinkOrganization() {
    console.log(checkedObject);

    const checkedObjectFlat = React.useCallback(() => flatAtree(checkedObject), [checkedObject]);
    return (
      <div className={style.linkOrganization}>
        <div>
          <span>选择: </span>
          <div className={style.chooseOrganization}>{RenderTree()}</div>
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
    const prganizationControllerComponentProps = {
      expandedKeys,
      onExpand,
      getCheckedInfo: onCheck,
      checkedKeys
    };
    return (
      <div className={style.approvalListLeft}>
        <OrganizationControllerComponent checkable {...prganizationControllerComponentProps} />
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
        <Input placeholder="请输入模板类型" value={name} onChange={e => changeTemplateName(e.target.value)} />
      </Form.Item>
      <Form.Item name="organization" label="关联机构" rules={[{ required: true }]}>
        {RenderLinkOrganization()}
      </Form.Item>
    </Modal>
  );
}
