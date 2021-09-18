# Components - web

## IAreaCascaderComponent

1. 功能：省市区级联选择
2. 参数：
  ```javascript
  setAreaInfo: (value: any, selectedOptions: any) => void;
  deep: number;
  defaultValue?: string[];
  ```

## IEditPasswordComponent

## IHomeHeaderComponent

## ISelectLoadingComponent

## ITableComponent

## IUploadImgComponent

1. 功能: 

## ImageDisplayComponent

1. 功能：图片预览
2. 参数：
   - `imageUrl`: 图片url，必填
   - `width`: 图片宽度，默认`100px`
   - `height`: 图片高度，默认`100px`

## LazyloadLoadingComponent

1. 功能：用户等待加载页面时显示一个加载效果
2. 使用：
```javascript
// xxx.route.ts
{
  path: 'xxx',
  component: () => import('/../xxx.component'),
  lazyload: true,  // 设置为true使用LazyloadLoadingComponent
  exact: true
}
```

## MenuComponent

1. 功能：路由菜单
2. 使用：
```javascript
// src/solution/shared/constant/common.const.ts
export const PAGES_MENU = {
  MENU: [
    {
      path: 'home',
      title: 'XX模块',
      icon: 'container',
      children: [
        {
          path: 'demo', // 链接到 '/home/demo'
          title: 'XX管理-示例页面',
          icon: 'container'
        }
      ]
    }
  ]
};
```

## TablePageTelComponent

1. 功能：页面布局，主要用于列表展示页
2. 参数：
   - `pageName`: 页面标题
   - `isFlex`: 是否使用 `flex` 布局
   - `leftFlex`: 左侧占据宽度比例
   - `rightFlex`: 右侧占据宽度比例
   - `pageLeft`: 左侧内容区
   - `selectTags`: 标签预设位置
   - `selectItems`: 列表查询项预设位置
   - `searchButton`: 列表查询按钮预设位置
   - `otherSearchBtns`: 其他按钮预设位置，无特定样式
   - `table`: 表格预设位置，无特定样式

## TimePickerComponent

1. 功能：时间、日期选择
2. 参数：
   - `pickerType`: 默认 `timePicker` 时间选择，可选： `datePicker` 日期选择， `dateTimePicker` 日期+时间选择， `timeRange` 时间区间， `dateRange` 日期区间， `dateTimeRange` 日期+时间区间， 
   - `getDateTimeInfo`: 函数，获取所选时间数据
   - `timeInfo`: 设置默认时间（或时间区间），格式 `string | Array<string>`
   - `timeFormat`: 时间格式，默认 `HH:mm:ss`
   - `dateFormat`: 日期格式，默认 `YYYY-MM-DD HH:mm:ss`
