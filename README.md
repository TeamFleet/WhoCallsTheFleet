[![Dependencies](https://david-dm.org/Diablohu/WhoCallsTheFleet.svg)](https://david-dm.org/Diablohu/WhoCallsTheFleet.svg)

# WhoCallsTheFleet / 是谁呼叫舰队

这是一款针对网页游戏《舰队COLLECTION》（艦隊これくしょん～艦これ～）的本地离线程序，供玩家离线查询舰娘、装备、改修工厂等数据资料，也可模拟打造舰队配置。

本工具基于NW.js开发 (http://nwjs.io/ | https://github.com/nwjs/nw.js )。本REPO为源代码，需要NW.js来启动。

## 下载

**下载最新版本**

[GitHub](https://github.com/Diablohu/WhoCallsTheFleet/releases) | [百度网盘](http://pan.baidu.com/s/1kT09CWJ#path=%252FWhoCallsTheFleet) | [OneDrive](http://1drv.ms/1LuUlMq)

**支持自动更新**

现在可通过开启程序自动更新至最新版本 (需要至少v0.5.2)

**支持操作系统**

下载版本支持以下操作系统：Windows 7/8/8.1/10 (32位/64位)，Mac OS X (32位/64位)

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
