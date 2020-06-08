#### 主应用对象参数说明
* 配置地址： /master/src/framework/microApp/fetchChildAppsConfig
* 参数说明：
 ```javascript
[
      {
        name: 'test',  -- 子应用的名称
        devEntry: '//localhost:8081', -- 测试地址
        proEntry: '', -- 线上地址
        activeRule: '/#/home', -- 主应用匹配的路径，模糊匹配
        title: '测试菜单', -- 主应用菜单名称
        icon: 'anticon-mobile', -- 主应用的icon
        defaultMountApp: false, -- 是否默认启用该app
        children: [ -- 相对于主应用子应用的菜单列表
          {
            path: 'login', -- 子应用的路径（相对于主应用）
            title: '登录测试', -- 子应用的菜单名称
            icon: 'anticon-mobile', 
            lazyload: true, -- 是否懒加载（建议启用）
            exact: false, -- 是否完全匹配（建议启用）
            componentUrl: 'login' -- 对用的组件名称
          }
        ]
      }
    ]
```

#### 子应用对应参数说明
* 子应用相对于主应用来说是个独立的应用，对外暴露了生命周期才得以成为微前端的一部分，拥有独立的菜单和路由。


#### 主应用和子应用之间通信
主要是通过广播的方式传值
* 主应用地址： /master/src/framework/microApp/appStore
* 子应用地址：同上
通过该模块暴露的方法setState达到传值的效果，这样所有的应用都能在这个模块的onGlobalStateChange方法中捕获到传的值。这边使用redux来达到从onGlobalStateChange传递到自身应用的效果。

#### 启动
* 子应用可以独立启动
* 要启动父应用需要使用根目录下 - **npm start**
* 全部安装依赖模块 - **yarn ainstall**
 
##### 更多详情 请查看http://220.167.101.49:8092/FE-ZeroToOne/microFront-platform/RM-micro-web/wikis/%E5%BE%AE%E5%89%8D%E7%AB%AFqiankun%E5%AE%9E%E7%8E%B0%E6%96%B9%E5%BC%8F