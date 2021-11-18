//#region 包声明

/**
 * 这本文档的注释中, 所有带`@ignore`的属性和类型都不会在UI文档中出现，代表UI中不应该使用。
 * 最开始：的时候构建UI包的type类型中也会将这些属性移除，以确保在UI仓库中编写代码时，这些非UI使用的
 * 属性不会被提示出来。
 * 到后来：在定制UI模块时，由于灵活性比较大，有时会有偶尔访问非UI使用的属性的需求
 * 所以不再移除`@ignore`的属性，这样在UI仓库中，所有属性都会提示可访问，但是在编写UI程序的时候
 * 要注意大部分的时候只能使用UI专用属性，只有特殊场合且明确知道自己要做什么才有限度的使用非UI使用的属性。
 * 有些非UI使用的属性在升级后可能会被修改或移除，UI中滥用可能会导致难以维护的错误。
 *
 * 命名风格上, 都会进UI文档的类型都应该以CF开头,不进文档都应该以ICF开头
 * 所有的属性声明都得以;结尾, 否则构建发布包的type文件会出错乱
 * 通过(\[\]|: \w+,)\n这个正则表达式来检查是否有些属性没有使用;来结尾
 * 打包时，会将属性都变成readonly模式，以达到不让UI中更改属性值的目的
 * 但是有部分暴露给配置的属性是允许被配置的，这些属性不能被变成readonly模式
 * 我们使用^(\s+)(\w+\??:[^);\n]+;)$这个正则表达式来匹配属性并添加readonly
 * 如果有不愿意被添加readonly的属性，破坏到这个规则即可，最好的方式是在最末尾加个注释
 * 当前所有的不愿被添加readonly的属性，后面都有一个// anti-readonly 的注释
 *
 * 最后会打包并发布以下两个包
 * 1. 纯核心包：`@choiceform/os-client--core`，纯js基础版，不携带运行环境的配置，
 * 可运行与任何js运行平台，但要自行按要求添加好运行环境配置，携带了ts类型包。
 * 2. web核心包：`@choiceform/os-client-core/dist/web-core`, 自带了web端运行环境配置，方便web端直接使用
 * 携带了ts类型包。
 *
 * 纯核心包
 */
declare module '@choiceform/os-client-core' {
  const CFClient: CFClient;
  export = CFClient;
}

/**
 * 自带了web端运行环境配置web核心包
 * web核心包
 */
declare module '@choiceform/os-client-core/dist/web-core' {
  const CFClient: CFClient;
  export = CFClient;
}


/**
 * 自带了web端运行环境配置web核心包
 * web核心包
 */
 declare module '@choiceform/os-client-core/dist/node-core' {
  const CFClient: CFClient;
  export = CFClient;
}


/**
 * 分离的辅助包：填空自动提示查询功能包
 */
declare module '@choiceform/os-client-core/dist/support/atcp' {
  const CFAtcp: CFAtcp;
  export = CFAtcp;
}

//#endregion
