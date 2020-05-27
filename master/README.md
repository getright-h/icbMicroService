## 微前端的主应用
注意点
* fetchChildAppsConfig 是这个主应用的模板文件格式大概是
```json
    [
      {
        name: 'test',  -- 子应用的名称
        devEntry: '//localhost:8081', -- 开发环境下的地址
        proEntry: '', -- 线上环境下的地址
        activeRule: '/#/home', -- 匹配的父应用的路径
        title: '测试菜单', -- 主应用memu的展示title
        icon: 'anticon-mobile',  -- 主应用memu的展示icon
        defaultMountApp: true, -- 是否显示为默认子应用
        children: [ -- 子应用的菜单
          {
            path: '', --相对于父应用的子应用的菜单 【子应用相对于父应用有自己路由路径配置】
            title: '登录测试', -- 子应用memu的展示title
            icon: 'anticon-mobile',-- icon
            lazyload: true, -- 懒加载
            exact: true, -- 强匹配
            componentUrl: 'login' -- 对应子应用组件
          }
        ]
      }
    ]
```
* 启动的端口 8080