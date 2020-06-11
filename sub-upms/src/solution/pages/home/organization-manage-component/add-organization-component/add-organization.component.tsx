import * as React from 'react';
import style from './add-organization.component.less';
import { useAddOrganizationStore } from './add-organization.component.store';
import { RouteComponentProps } from 'react-router-dom';
import { Button, Form } from 'antd';

export default function AddOrganizationComponent(props: RouteComponentProps) {
  const { state } = useAddOrganizationStore(props);
  const {} = state;
  const formItemLayout = {
    labelCol: {
      xs: { span: 24 },
      sm: { span: 8 }
    },
    wrapperCol: {
      xs: { span: 24 },
      sm: { span: 14 }
    }
  };
  function renderHeader(leftChild: any, rightChild?: any) {
    return (
      <div className={[style.header].join(' ')}>
        {leftChild()}
        {rightChild && rightChild()}
      </div>
    );
  }
  function renderBaseInfo() {
    return (
      <div className={style.lineContainer}>
        {/* <Form.Item label="经销店:" className={`${style.require} push-search-item-form`}>
          <DrapChooseLoadingComponent
            reqUrl="getOrganizationPagedList"
            placeholder="请选择经销店"
            type={1}
            defaultValue={state.formInfo.distributorName}
            getCurrentSelectInfo={value =>
              drapChooseLoading(CHECKGROUPTYPE.DISTRIBUTORNAMEID, CHECKGROUPTYPE.DISTRIBUTORNAME, value)
            }
          ></DrapChooseLoadingComponent>
          {/* <span className={style.labelValue}>{gState.userInfo.name}</span> 
        </Form.Item>

      <Form.Item label="金融机构:" className={`${style.require} push-search-item-form`}>
        <DrapChooseLoadingComponent
          reqUrl="getOrganizationPagedList"
          placeholder="请选择金融机构"
          defaultValue={state.formInfo.financialCompanyName}
          type={2}
          getCurrentSelectInfo={value =>
            drapChooseLoading(CHECKGROUPTYPE.CONTRACTNUMBER, CHECKGROUPTYPE.FINANCIALCOMPANYNAME, value)
          }
        ></DrapChooseLoadingComponent>
      </Form.Item>

      <Form.Item label="合同号:" className={`${style.require} push-search-item-form`}>
        {getFieldDecorator('contractNum', {
          initialValue: state.formInfo.contractNum
        })(<Input placeholder="合同号" />)}
      </Form.Item>

      <Form.Item label="客户名:" className={`${style.require} push-search-item-form`}>
        {getFieldDecorator('customerName', {
          initialValue: state.formInfo.customerName
        })(<Input placeholder="客户名" />)}
      </Form.Item>

      <Form.Item label="客户联系方式:" className={`${style.require} push-search-item-form`}>
        {getFieldDecorator('customerMobile', {
          initialValue: state.formInfo.customerMobile
        })(<Input placeholder="客户联系方式" />)}
      </Form.Item>

      <Form.Item label="是否代上牌:" className={`${style.require} push-search-item-form`}>
        {getFieldDecorator('isNumberPlate', {
          initialValue: state.formInfo.isNumberPlate
        })(
          <Radio.Group name="radiogroup">
            <Radio value={true}>是</Radio>
            <Radio value={false}>否</Radio>
          </Radio.Group>
        )}
      </Form.Item>

        {
    (props.form.getFieldValue('isNumberPlate') || state.formInfo.isNumberPlate) && (
      <Form.Item
        label="上牌地点:"
        className={`${props.form.getFieldValue('isNumberPlate') && style.require} push-search-item-form`}
      >
        {console.log(props.form.getFieldValue('isNumberPlate') || state.formInfo.isNumberPlate)}

        <DrapChooseLoadingComponent
          reqUrl="getAreaPagedList"
          placeholder="请选择上牌地点"
          defaultValue={state.formInfo.numberPlateAddressName}
          getCurrentSelectInfo={value =>
            drapChooseLoading(CHECKGROUPTYPE.AREAPAGEDLIST, CHECKGROUPTYPE.NUMBERPLATEADDRESSNAME, value)
          }
        ></DrapChooseLoadingComponent>
      </Form.Item>
    );
    }

    <Form.Item label="服务商:" className={`${style.require} push-search-item-form`}>
      <DrapChooseLoadingComponent
        reqUrl="getOrganizationPagedList"
        placeholder="请选择服务商"
        type={3}
        defaultValue={state.formInfo.serviceProviderName}
        getCurrentSelectInfo={value =>
          drapChooseLoading(CHECKGROUPTYPE.ORGANIZATIONPAGEDLIST, CHECKGROUPTYPE.SERVICEPROVIDERNAME, value)
        }
      ></DrapChooseLoadingComponent>
    </Form.Item>

      <Form.Item label="接单人:" className={`${style.require} push-search-item-form`}>
        <DrapChooseLoadingComponent
          reqUrl="getUserPagedList"
          placeholder="请选择接单人"
          defaultValue={state.formInfo.staffName}
          params={{ unitId: state.formInfo.serviceProviderId }}
          isDisable={state.formInfo.serviceProviderId == ''}
          getCurrentSelectInfo={value =>
            drapChooseLoading(CHECKGROUPTYPE.USERPAGEDLIST, CHECKGROUPTYPE.STAFFNAME, value)
          }
        ></DrapChooseLoadingComponent>
      </Form.Item>

      <Form.Item label="备注描述：" className="push-search-item-form">
        {getFieldDecorator('remark', { initialValue: state.formInfo.remark })(<Input placeholder="备注描述" />)}
      </Form.Item>*/}
      </div>
    );
  }
  return (
    <div className={style.organizationMain}>
      {renderHeader(
        () => {
          return <h4>添加机构</h4>;
        },
        () => {
          return (
            <Button type="primary" onClick={() => window.history.back()}>
              返回上一页
            </Button>
          );
        }
      )}
      <Form layout="inline" {...formItemLayout}>
        {renderBaseInfo()}
        <Form.Item wrapperCol={{ span: 12, offset: 6 }} className={style.submitButton}>
          <Button type="primary" htmlType="submit">
            保存
          </Button>
        </Form.Item>
      </Form>
    </div>
  );
}
