# WhoCallsTheFleet / 是谁呼叫舰队

针对网页游戏《艦隊これくしょん～艦これ～》（舰队收藏）的离线工具。

本工具基于NW.js开发 (http://nwjs.io/ | https://github.com/nwjs/nw.js )。

本REPO为源代码，需要NW.js来启动。

## 基础框架

你或许注意到在 JavaScript 和 LESS 源代码中有许多“!Shared”目录的引用，这些都来自于我个人的 NW.js 项目基础框架：[nw.js-base-framework](https://github.com/Diablohu/nw.js-base-framework)

## 第三方框架/库

* [NW.js](https://github.com/nwjs/nw.js): 程序基础框架
* [jQuery](https://github.com/jquery/jquery): JavaScript前端框架
* [adm-zip](https://github.com/cthackers/adm-zip): 简单的.zip文件解压缩操作
* [jsonfile](https://github.com/jprichardson/node-jsonfile): 简单的JSON文件读写操作
* [markdown](https://github.com/evilstreak/markdown-js): Markdown解析
* [mkdirp](https://www.npmjs.com/package/mkdirp): 简单的无级创建目录操作
* [NeDB](https://github.com/louischatriot/nedb): 程序所用NoSQL数据库，对独立JSON文件进行读写操作
* [Q](https://github.com/kriskowal/q): 异步函数步骤/Promise框架