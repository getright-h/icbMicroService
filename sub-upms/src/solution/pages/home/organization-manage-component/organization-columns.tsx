import { ColumnsType } from 'antd/lib/table';
import * as React from 'react';
import { Divider } from 'antd';
import { Link } from 'react-router-dom';
export const organizationColumns = (action: Function): ColumnsType<any> => {
  return [
    {
      title: '机构类型',
      dataIndex: 'type'
    },
    {
      title: '机构全称',
      dataIndex: 'name',
      render: (v: any) => {
        console.log(v);
      }
    },
    {
      title: '机构简称',
      dataIndex: 'shortName'
    },
    {
      title: '上级机构',
      dataIndex: 'parentName'
    },
    {
      title: '联系人',
      dataIndex: 'contactName'
    },
    {
      title: '联系电话',
      dataIndex: 'contactMobile'
    },
    {
      title: '操作',
      dataIndex: 'action',
      render: row => {
        return (
          <React.Fragment>
            <Link to={'/account/organizationManage/organizationDetail/'}>详情</Link>
            <Divider type="vertical" />
            <a
              onClick={() => {
                console.log(row);
              }}
            >
              编辑
            </a>
            <Divider type="vertical" />
            <a>删除</a>
          </React.Fragment>
        );
      }
    }
  ];
};
// export const organizationColumns: ColumnsType<any> = [
//   {
//     title: '机构类型',
//     dataIndex: 'type'
//   },
//   {
//     title: '机构全称',
//     dataIndex: 'name'
//   },
//   {
//     title: '机构简称',
//     dataIndex: 'shortName'
//   },
//   {
//     title: '上级机构',
//     dataIndex: 'parentName'
//   },
//   {
//     title: '联系人',
//     dataIndex: 'contactName'
//   },
//   {
//     title: '联系电话',
//     dataIndex: 'contactMobile'
//   },
//   {
//     title: '操作',
//     dataIndex: 'action',
//     render: row => {
//       return (
//         <React.Fragment>
//           <Link to={'/account/organizationManage/organizationDetail/'}>详情</Link>
//           <Divider type="vertical" />
//           <a
//             onClick={() => {
//               console.log(row);
//             }}
//           >
//             编辑
//           </a>
//           <Divider type="vertical" />
//           <a>删除</a>
//         </React.Fragment>
//       );
//     }
//   }
// ];
