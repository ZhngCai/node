//#region 辅助类型
/**
 * @ignore
 * 属性可以是任何内容的类型
 */
interface SignStrAny {
  [key: string]: any;
}
/**
 * @ignore
 * 每个属性都是字符串的类型
 */
interface SignStrStr {
  [key: string]: string;
}

/**
 * @ignore
 * 每个属性都是字符串的类型
 */
 interface SignStrStrArr {
  [key: string]: string[];
}

/**
 * @ignore
 * 把类型的的所欲属性转变成指定类型
 */
type AllKeyToType<T, B> = {
  [P in keyof T]: B;
};
/**
 * @ignore
 * 把方法的返回值替换成指定类型
 */
type ReplaceReturnType<T extends (...a: any) => any, TNewReturn> = (
  ...a: Parameters<T>
) => TNewReturn;

/**
 * @ignore
 * 获取某个类型的所有属性名作为联合
 */
type OptionalKeys<T> = {
  [K in keyof T]-?: {} extends Pick<T, K> ? K : never;
}[keyof T];

/**
 * @ignore
 * 抽取所有可选属性作为必须是指默认值的属性
 * 这些可选的属性可能在启动时不会传入配置，这时需要一个确保有一个默认值。
 * 通过这类型控制这个确保
 * 那些必须制定的属性，则无需默认值，如果没有传如该配置则是使用者的锅。
 */
type ShouldSetDefault<T> = Required<Pick<T, OptionalKeys<T>>>;

//#endregion

//#region 包入口与全局依附类型说明
/**
 * 动态UI组件类型
 */
interface CFUiComponent {
  /**
   * 样式对象
   */
  style: {
    toString(): string;
  };
}

/**
 * 动态UI组件组
 */
interface CFUiComGroups {
  [key: string]: CFUiComponent;
}

/**
 * 使用了往全局追加属性的加载方式加载核心包时
 * os-client-core对window的扩展的属性
 */
interface Window {
  /**
   * 核心对象
   */
  CFClient: CFClient;
  /**
   * 动态UI组件表
   */
  CF_UI_COMS: CFUiComGroups;
}

/**
 * 简单版的MessageFormat类型说明
 */
interface CFMessageFormat {
  new (): CFMessageFormat;
  compile(
    message: string
  ): {
    (options: any): string;
  };
}

/**
 * os-client默认的多语言翻译模块
 */
interface CFI18n {
  /**
   * 获取多语言资源配置
   */
  getLangSrcMap(): SignStrAny;
  /**
   * 合并多言翻译资源配置
   * @ignore
   */
  mergeLangSrcMap(map: SignStrAny): void;
  /**
   * messageformat类型，参考https://github.com/messageformat/messageformat
   * 这是核心包中使用的多语言翻译工具
   * 因为核心包中翻译好的多语言只涉及到核心逻辑中使用要的语言内容
   * UI中的文本多语言化需要UI的实现者自行解决.
   * 在这里把这个工具暴露出来,答题UI程序中也可以沿用这个工具进行多语言翻译.
   * 如果你不喜欢这个工具,也可以无视它,使用自己的想用的翻译工具
   */
  MessageFormat?: CFMessageFormat;
}

/**
 * 伪造结构服务表
 */
interface CFFakeServer {
  [key: string]: ICFRequestFn;
}

/**
 * 插件对象
 */
interface CFPlugin {
  /**
   * 当前正在加载的插件命名空间
   */
  currentSpace?: string;
  /**
   * 逻辑插件配置
   */
  fakedServers?: CFFakeServer;
  /**
   * UI插件配置
   */
  uiPlugins?: any;
}

/**
 * 核心包
 */
interface CFClient {
  /**
   * 核心对象，常用。
   */
  Core: CFCore;
  /**
   * 自定义事件管理器，一般不太使用。
   */
  EventHub: CFEventHub;
  /**
   * 核心中使用的多语言翻译模块
   * 携带了MessageFormat工具,UI程序中处理多语言时可以复用
   */
  I18n: CFI18n;
}

//#endregion
