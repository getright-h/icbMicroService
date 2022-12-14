import * as React from 'react';
import style from './select-group.component.less';
import { Form, Space, Popover, Button } from 'antd';
import { ISelectLoadingComponent } from '~/solution/components/component.module';
import { PlusOutlined, MinusOutlined, DownOutlined } from '@ant-design/icons';
import { ISelectGroupProps } from './select-group.interface';
import { useSelectGroupStore } from './select-group.component.store';
import { IGlobalState } from '~/solution/context/global/global.interface';
import { GlobalContext } from '~/solution/context/global/global.provider';

export default function SelectGroupComponent(props: ISelectGroupProps) {
  const { gState }: IGlobalState = React.useContext(GlobalContext);
  const { field, index, add, remove, selectValues } = props;
  const { state } = useSelectGroupStore(props);
  const { searchDepartForm, searchPositionForm, relateRolesText } = state;
  return (
    <Space key={field.key} className={style.space} align="center">
      <Form.Item
        {...field}
        name={[field.name, 'organizationId']}
        className={style.fieldItem}
        rules={[{ required: true, message: '请选择所属机构' }]}
      >
        <ISelectLoadingComponent
          width="200px"
          reqUrl="queryOrganizationSelectList"
          placeholder="请选择机构"
          searchForm={{
            systemId: gState.myInfo.systemId,
            hierarchyType: 0
          }}
          searchKey={selectValues ? selectValues.organizationName : ''}
          selectedValue={selectValues ? selectValues.organizationId : undefined}
          getCurrentSelectInfo={(value, option) => props.handleOrganSelect(option, index, 'organization')}
        ></ISelectLoadingComponent>
      </Form.Item>
      <Form.Item {...field} name={[field.name, 'departmentId']} className={style.fieldItem}>
        <ISelectLoadingComponent
          width="200px"
          reqUrl="queryOrganizationSelectList"
          placeholder="请选择部门"
          searchForm={{ ...searchDepartForm, systemId: gState.myInfo.systemId }}
          searchKey={selectValues ? selectValues.departmentName : ''}
          selectedValue={selectValues ? selectValues.departmentId : undefined}
          getCurrentSelectInfo={(value, option) => props.handleOrganSelect(option, index, 'department')}
          disabled={selectValues ? !selectValues.organizationId : true}
        ></ISelectLoadingComponent>
      </Form.Item>
      <Form.Item {...field} name={[field.name, 'positionId']} className={style.fieldItem}>
        <ISelectLoadingComponent
          width="200px"
          reqUrl="queryOrganizationSelectList"
          placeholder="请选择岗位"
          searchForm={{ ...searchPositionForm, systemId: gState.myInfo.systemId }}
          searchKey={selectValues ? selectValues.positionName : ''}
          selectedValue={selectValues ? selectValues.positionId : undefined}
          getCurrentSelectInfo={(value, option) => props.handleOrganSelect(option, index, 'position')}
          disabled={selectValues ? !selectValues.departmentId : true}
        ></ISelectLoadingComponent>
      </Form.Item>
      <Popover content={relateRolesText} title={null} trigger="hover" placement="bottom">
        <Button className={style.relateRole}>
          已关联角色
          <DownOutlined />
        </Button>
      </Popover>
      <div className={style.fieldAddButton}>
        <PlusOutlined
          onClick={() => {
            add();
          }}
        />
        {index != 0 && (
          <MinusOutlined
            onClick={() => {
              remove(field.name);
              props.sendRelateRoles([], index);
            }}
          />
        )}
      </div>
    </Space>
  );
}
