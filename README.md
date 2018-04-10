# react-mobx

## 项目介绍
  该项目中，react, mobx, webpack 均使用当前比较新的版本，支持es7 async await 以及decorators。
  store支持全局注入，开发过程中store中请开启严格模式，在该模式下所有store中的数据，需走action
### 目录

```
.
├── dist                                // webpack输出目录
├── favicon.ico                         // favicon
├── index.html                          // webpack编译生成的html
├── package.json                        // 依赖包信息
├── deploy.js                             // 发布脚本
├── src                                 // 源码目录
│   ├── index.js                          // 入口文件
│   ├── components                      // 公共组件
│   ├── mock                            // mock目录
│   ├── model                           // mobx model层
│   ├── public                          // 静态资源
│   ├── App.js                       // 路由配置文件
│   ├── pages                          // 所有页面(页面级组件)
│   ├── service                         // 请求
│   ├── template                        // html模板
│   └── utils                           // 工具类方法
└── webpack.conf.js        // webpack配置文件
└── config.js        // 全局配置文件
└── .babelrc        // babel配置文件
└── .eslintrc        // eslint配置文件
```

### local开发

1. 下载远程代码至本地

`
  git clone git@github.com:WebCaiQingChong/react-mobx.git
`

2. 安装依赖

  进入目录

  `
    cd  react-mobx
  `
  `
    npm install
  ` 
  (如果没有墙，请使用淘宝镜像或使用cnpm安装)

  淘宝镜像安装

  `
    npm install --registry https://registry.npm.taobao.org
  `

  cnpm 安装

  本地先全局安装
  `
     cnpm  npm install cnpm -g
  `
  然后执行 
  `
    cnpm install
  `

3. 本地开发环境启动
  `
    npm run local
  `

  修改webpack.conf.js 中

  ```javascript
  devServer: {
      contentBase: path.resolve(__dirname, '/'),
      port: config.port,
      host: '127.0.0.1',
      compress: true,
      publicPath: '',
      historyApiFallback: true,
      proxy: {
        "/foxDspPlat": {
          target: 'http://60.205.169.188:8080'
        }
      }
    },
  ```
  如果使用mock数据，请注释下面的proxy，如果需要连接不同环境的接口，请更改proxy中请求的代理ip(target)

  webpack编译完成后，会自动打开浏览器

## git 提交规范

提交请添加提交信息，后续开发过程中的提交加入emoji，便于其他开发者快速了解本地更新内容

   :bug: Fixing a bug.

   :fire: Removing code or files.

   :memo: Writing docs.

   :rocket: Deploying stuff.

   :arrow_up: Upgrading dependencies.

   :hammer: Refactoring code.

   :heavy_plus_sign: Adding a dependency.

   :twisted_rightwards_arrows: Merging branches.

   :truck: Moving or renaming files.

   具体可参考[emoji](https://gitmoji.carloscuesta.me/)
   
   <span style="color: #64f38f">可使用 push.sh 文件进行提交</span>
   * 该脚本为shell脚本 
   * 执行命令 `./push `
   * 若提示无操作权限报错，执行  `chomd 777 ./push`

## 命名规范

#### 文件命名
* 目录名称小写字母开头，驼峰式
* 单文件组件类首字母大写
* 单文件非组件类，首字母小写，驼峰式

#### css命名
* 请使用语义化单词，双单词链接请使用'-',不要使用'_'，或驼峰式命名
* 使用class(.classname)而尽量不使用或少使用id(#idname)
* 自己开发，请尽量使用sass或者less以及其他预编译，让css可扩展性更好

#### js 变量，函数命名
* 函数命名请使用语义化单词，并使用驼峰式命名，不使用'-'，'_',
* 变量命名同上，如有特殊含义可在前加特殊'$'等
* 函数如有参数，请添加参数注释
* 注释风格如下
`
/**
 * @param options
 * options {
 *  url: 请求url
 *  method： 请求类型
 *  params: 请求参数
 * }
 */
`

## 代码风格

* 所有项目eslint风格均使用standard
* 推荐使用vscode编译器，轻量级，安装插件 JavaScript Standard Style
* 全局安装 Standard 重启编译器即可


## 适配
* 该项目为移动端项目
* 适配方案为淘宝的flexible
* less文件中的px都会被替换成rem，单位转换规则  750设计稿尺寸 / (remUnit: 75)

## 项目版本介绍
* react ^16.2.0 支持Fragment
* react-router ^4.2.2
* 可使用 @decorators 装饰器 可使用async await
* webpack ^4.1.1 不同环境的编译npm script 请看package.json 中的 "scripts"
* mobx^4.1.0
* mobx-react^5.0.0
* 路由模式请使用BrowserHistory 即浏览器url中不含有#

## 测试期间bug修复 以及 发布规范

* 本地代码merge至dev
* bug修复请在本地分支修改，然后重新merge至dev
* 上线是请将本地已测试完毕的分支代码merge至master
* 多版本功能上线，若非其他特殊因素限制，请务必拆分上线









