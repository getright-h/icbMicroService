import * as React from 'react';
import style from './fence-attention.component.less';
import { Button, Input, Modal, Form } from 'antd';
import { TablePageTelComponent } from '~/solution/components/base/table-page-tel-component/table-page-tel.component';
import { Select } from 'antd';
import { DatePicker } from 'antd';
import { ITableComponent } from '~/solution/components/component.module';
import { stationColumns } from './fence-attention-component.column';
import { useFenceAttentionStore } from './fence-attention.component.store';

const { RangePicker } = DatePicker;

const { Option } = Select;

export default function FenceAttentionComponent() {
  const [form] = Form.useForm();

  const {
    state,
    callbackAction,
    changeTablePageIndex,
    searchClick,
    showModal,
    hideModal,
    handleStatusChange,
    onFinish,
    handleOK
  } = useFenceAttentionStore(form);
  const { isLoading, visible, searchForm, tableData, total, searchLoading } = state;

  function renderSelectItems() {
    return (
      <React.Fragment>
        <div className="push-search-item">
          <div className="label">围栏名</div>
          <Input placeholder="请输入围栏名" />
        </div>
        <div className="push-search-item">
          <div className="label">车辆所属</div>
          <Input placeholder="请输入机构名或者车队名" />
        </div>
        <div className="push-search-item">
          <div className="label">车辆信息</div>
          <Input placeholder="车主电话/车主姓名/车牌号" />
        </div>
        <div className="push-search-item">
          <div className="label">状态</div>
          <Select defaultValue="lucy">
            <Option value="jack">已处理</Option>
            <Option value="lucy">未处理</Option>
          </Select>
        </div>
        <div className="push-search-item">
          <div className="label">告警时间</div>
          <RangePicker
            dateRender={current => {
              const style = {};

              return (
                <div className="ant-picker-cell-inner" style={style}>
                  {current.date()}
                </div>
              );
            }}
          />
        </div>
      </React.Fragment>
    );
  }
  function renderSearchButtons() {
    return (
      <div>
        <Button type="primary" onClick={searchClick} loading={searchLoading}>
          查询
        </Button>
      </div>
    );
  }
  function renderFenceAttentionTable() {
    return (
      <div className={style.test}>
        <ITableComponent
          columns={stationColumns(callbackAction)}
          isLoading={isLoading}
          pageIndex={searchForm.index}
          pageSize={searchForm.size}
          data={tableData}
          total={total}
          isPagination={true}
          changeTablePageIndex={(index: number, pageSize: number) => changeTablePageIndex(index, pageSize)}
        ></ITableComponent>
      </div>
    );
  }
  const drawerInfo = {
    closable: true,
    maskClosable: false,
    mask: false,
    // visible,
    width: '100%',
    styleInfo: { position: 'absolute', zIndex: 0 },
    placement: 'left',
    title: '添加电子围栏',
    getContainer: false,
    // onCloseDrawer: () => onValueChange('visible', false),
    container: <div>嘿嘿</div>
  };
  const layout = {
    labelCol: { span: 4 },
    wrapperCol: { span: 16 }
  };

  return (
    <React.Fragment>
      <Modal title="跟进" visible={visible} onOk={handleOK} onCancel={hideModal} okText="确认" cancelText="取消">
        <Form
          {...layout}
          name="basic"
          initialValues={{ remember: true }}
          onFinish={onFinish}
          form={form}

          // onFinishFailed={onFinishFailed}
        >
          <Form.Item name="status" label="跟进状态" wrapperCol={{ span: 6 }}>
            <Select placeholder="请选择">
              <Option value="已处理">已处理</Option>
              <Option value="未处理">未处理</Option>
            </Select>
          </Form.Item>

          <Form.Item name="remark" label="跟进备注">
            <Input.TextArea />
          </Form.Item>
        </Form>
      </Modal>
      <TablePageTelComponent
        pageName={'围栏告警'}
        leftFlex={0}
        selectItems={renderSelectItems()}
        searchButton={renderSearchButtons()}
        table={renderFenceAttentionTable()}
        drawerInfo={drawerInfo}
      ></TablePageTelComponent>
    </React.Fragment>
  );
}
