/**
 * 说明：为第三方库编写types
 * 标准types文件都定义在 https://github.com/DefinitelyTyped/DefinitelyTyped
 *
 * 使项目对第三方库的具备types静态辨型功能一般有一下三种方式：
 * 1. 第三方库在DefinitelyTyped库中有对应的types文件，这时候项目中import someLib from 'some-lib'的话
 * Typescript会自动去node_modules/@types/some-lib/index.d.ts中找到它的types
 * (一般都是index.d.ts，当然可以叫其他名字，这个在各自的types文件包的package.json中可以指定),
 * 然后就具备了对这个库的静态辨型功能，这是标准方式，任何人可以往DefinitelyTyped仓库中贡献各种第三方库的types
 *
 * 2. 第三方库在DefinitelyTyped中没有types文件，则可以按标准流程去DefinitelyTyped仓库贡献这个库的types，
 * 当然偷懒一点的办法就会使自己定义一个简单版够自己的types文件，就像这本文件是为device.js定义了一个简单版types文件
 * 我们这个文件路径是types/device/index.d.ts，除了node_modules中的types,Typescript也会到使用这里的types文件,
 * 这个规则在tsconfig.json中的paths属性中进行了配置，里面配置了哪个包去找那个目录，
 * 当我们这本types文件没有定义时，import {device} from 'device' 时Typescript会报错，说找不到device模块
 * (我们的代码是能正常运行的，只是TypeScript无法对它进行静态分析而已)
 * 当我们这本types文件定义好后，import {device} from 'device'不在报错,对device执行跳转到定义就会跳转到这本文件
 * 说明Typescript已经能静态分析这库了。
 * 当然我们之帮忙定义了其中的一部分属性，够我们项目用就行了。
 *
 * 3. 有些库如baidu地图不是用import方式，而是直接用的挂载在window上的的属性，
 * 这时候可以在当前项目的types文件global.d.ts中定义全局的types,
 *
 */

interface Window {
  cfState: any;
  device: {
    ios: boolean;
  };
  ReactNativeWebView: {
    postMessage(data: string): void;
  };
}

/**
 * 为数值变量计算而扩展的Math
 */
interface Math {
  avg(...args: number[]): number;
}

interface NumKeyStrValue {
  [key: number]: string;
}

interface StrKeyStrValue {
  [key: string]: string;
}

interface StrKeyFunValue {
  [key: string]: Function;
}

interface PhoenixChannel {
  on(eventName: string, callback: Function): void;
  join(): PhoenixChannel;
  receive(eventName: string, callback: Function): PhoenixChannel;
}

interface PhoenixSocket {
  connect(): void;
  channel(id: string, data: any): PhoenixChannel;
  disconnect(): void;
}

interface Window {
  vTemplate: any;
  Handlebars: any;
  WeixinJSBridge: any;
  Raven: any;
  wxMenuForceShow: boolean;
  wx: {
    hideOptionMenu(): void;
    showOptionMenu(): void;
    config(options: any): any;
    ready(callback: Function): any;
    onMenuShareTimeline(config: any): any;
    onMenuShareAppMessage(config: any): any;
    onMenuShareQQ(config: any): any;
    error(config: any): any;
  };
  /**
   * 虚拟请求插件脚本信息
   */
  CFPlugin: CFPlugin;
  /**
   * 七牛在全局暴露的属性
   */
  QiniuJsSDK: {
    new (): Qiniu;
  };
}

interface Qiniu {
  uploader(options: any): QiniuUploader;
}

interface QiniuUploader {
  removeFile(file: QiniuFile): void;
}

interface QiniuFile {
  getNative(): File;
  id: string;
  name: string;
}

interface PakoConfig {
  to: string;
}

declare module 'ua-parser-js' {
  const UAParser: {
    (): CFDevice;
  };
  export = UAParser;
}

declare module 'phoenix' {
  const Phoenix: {
    Socket: {
      new (url: string, data: any): PhoenixSocket;
    };
  };
  export = Phoenix;
}

declare module 'pako' {
  const pako: Pako;
  export = pako;
}

interface Pako {
  inflate(text: string, config: PakoConfig): string;
  deflate(text: string, config: PakoConfig): string;
}
