[![Dependencies](https://david-dm.org/Diablohu/WhoCallsTheFleet.svg)](https://david-dm.org/Diablohu/WhoCallsTheFleet.svg)

# WhoCallsTheFleet / 是谁呼叫舰队

一款针对网页游戏《舰队COLLECTION》的App，同时提供Web App和适用于Windows桌面及macOS系统的离线程序。供玩家查询舰娘、装备、改修工厂等数据资料，也可模拟打造舰队配置。

## 获取

**访问Web App**

[点击访问 fleet.moe](http://fleet.moe/)

Web App针对手机与平板设备进行了优化适配，可用移动平台浏览器访问后选择将该Web App固定到主屏幕上，以便日后使用。

**获取客户端版本**

[百度网盘](http://pan.baidu.com/s/1kT09CWJ#path=%252FWhoCallsTheFleet) | [OneDrive](https://1drv.ms/f/s!AhBtzFNzki1FiuFy4H2RkZcl1uiiWQ)

* 支持的操作系统：Windows 7/8/8.1/10 (32位/64位)，macOS (32位/64位)
* 不提供Linux平台的可执行版本，如有相关需求，可访问[GitHub REPO](https://github.com/Diablohu/WhoCallsTheFleet)获取源代码进行使用
* 客户端版本支持自动更新

**开源代码**

本应用在MIT许可协议下开源，源代码托管于GitHub（[REPO](https://github.com/Diablohu/WhoCallsTheFleet)）。

基于[NW.js](http://nwjs.io/)开发，需要该运行库才可直接从源代码运行。

## 功能介绍

**舰队 (BETA)**

0.7.0版本新增，该功能目前测试中……

在这里可以模拟创建舰队配置和配装，程序也会自动计算炮击威力、雷击威力、制空战力等数据，相关配置可以导入、导出，支持[舰载机厨](http://www.kancolle-calc.net/deckbuilder.html)的格式

![功能截图](http://fleet.diablohu.com/assets/screenshots/feature-fleet-1.png)
![功能截图](http://fleet.diablohu.com/assets/screenshots/feature-fleet-2.png)

**舰娘**

在这里可以查询游戏中全部舰娘的详细属性，也提供了详尽的对比功能。点击舰娘可查询详细属性，如初始装备、声优、画师，甚至还有节日限定图鉴！

![功能截图](http://fleet.diablohu.com/assets/screenshots/feature-ships-1.png)
![功能截图](http://fleet.diablohu.com/assets/screenshots/feature-ships-2.png)
![功能截图](http://fleet.diablohu.com/assets/screenshots/feature-ships-3.png)

**装备**

想查询装备的详细属性？来这里就对了！还能查询装备的改修信息和初装舰娘哦~

![功能截图](http://fleet.diablohu.com/assets/screenshots/feature-equipments-1.png)
![功能截图](http://fleet.diablohu.com/assets/screenshots/feature-equipments-2.png)

**改修工厂**

明石在工厂恭候多时，请问提督今日的改修计划？

![功能截图](http://fleet.diablohu.com/assets/screenshots/feature-arsenal-1.png)
![功能截图](http://fleet.diablohu.com/assets/screenshots/feature-arsenal-2.png)

## 常见问题解答（FAQ）

**舰队配置保存到哪里了？**

对于Web App，配置保存在浏览器的本地存储空间内。

对于客户端则保存在用户数据目录。客户端版本可通过舰队页面右上角的设置选择配置文件存储位置。

无论何种版本，都提供了导入、导出单独配置和全部配置文件的功能。

**背景图可以下载到本地吗？**

可以！通过App右上角的“图片”按钮可以进入相应设置。

**我想使用自己的图片当背景，这可以吗？**

也可以！通过App右上角的“图片”按钮可以进入相应设置。

**为什么客户端版本自动更新速度很慢，而且时常更新失败？**

目前使用*GitHub Pages*提供的免费空间服务，由于其免费性和国内的连接速度问题，我无法保证提供最佳的更新下载体验。如果更新失败，请关闭程序再打开重试，或选择下载最新版本。

**我的客户端版本无法打开了！**

尝试清空用户目录下的`WhoCallsTheFleet`目录中除`NeDB`目录外的所有文件和目录。

对于Windows系统，这个文件夹在`C:\Users\[你的用户名]\AppData\Local\WhoCallsTheFleet`

## 基础框架

个人 NW.js 项目基础框架：[nw.js-base-framework](https://github.com/Diablohu/nw.js-base-framework)

## 第三方框架/库

* [NW.js](https://github.com/nwjs/nw.js): 程序基础框架
* [jQuery](https://github.com/jquery/jquery): JavaScript前端框架
* [adm-zip](https://github.com/cthackers/adm-zip): 简单的.zip文件解压缩操作
* [jsonfile](https://github.com/jprichardson/node-jsonfile): 简单的JSON文件读写操作
* [Lockr](https://github.com/tsironis/lockr): localStorage操作
* [markdown](https://github.com/evilstreak/markdown-js): Markdown解析
* [mkdirp](https://www.npmjs.com/package/mkdirp): 简单的无级创建目录操作
* [NeDB](https://github.com/louischatriot/nedb): 程序所用NoSQL数据库，对独立JSON文件进行读写操作
* [Q](https://github.com/kriskowal/q): 异步函数步骤/Promise框架
* [request](https://github.com/request/request): HTTP请求框架
* [request-progress](https://github.com/request/request): request请求的进度
* [semver](https://github.com/npm/node-semver): 简单的版本号对比
* [SmoothScroll](https://github.com/galambalazs/smoothscroll): 针对鼠标滚轮的平滑页面滚动
