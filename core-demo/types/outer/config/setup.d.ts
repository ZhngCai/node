//#region 核心与核心初始化配置相关说明
/**
 * 服务配置信息
 */
interface CFHostConfig {
  /**
   * 错误统计服务key
   */
  sentryKey: string;
  /**
   * 操作记录接口地址
   */
  recordUrl: string;
  /**
   * 主服务接口主机地址
   */
  host: string;
  /**
   * web socket服务主机地址
   */
  wsHost: string;
  /**
   * cdn资源主机地址
   */
  cdnHost: string;
  /**
   * 公共资源主机地址
   */
  publicHost: string;
  /**
   * 地域字典地址
   */
  dictUrl: string;
  /**
   * client端接口地址
   */
  qApiHost?: string;
  /**
   * client通用静态资源地址
   */
  qStaticHost?: string;
}

/**
 * 客户端初始化配置信息
 */
interface CFSetupOptions {
  /**
   * 所代表的的客户端名称
   * 当我们有多个答题客户端时，在设计端发布问卷之前，可以选择使用哪个答题端来渲染问卷。
   * 一般选好以后，按需求这份问卷就只能使用这个客户端来渲染，因为如果不限制仅能在该客户端渲染，
   * 可能会导致不知不觉中误用其他客户端来访问这份文件的情况，
   * 这样就会：
   * 一方面：不是所有的客户端都实现了所有题型，用错客户端可能导致有些题目无法渲染。
   * 另一方面，不同客户端对相同题型渲染方式不同，用错客户端可能导致渲染出来的样子不是客户需要的样子。
   *
   * 但事实上默认情况下，是所有客户端都能访问该问卷的
   *
   * 为了避免上面的两个错误出现，我们可以通过这个属性为每个客户端设置一个唯一的名称。
   *
   * 访问某份问卷前核心包会检查当前客户端名字是否和该问卷在设计端选择的客户端名字相同，只有相同才能访问。
   *
   * 如果名称为ALL则表示这个客户端能访问所有问卷
   *
   * 默认值：ALL
   *
   */
  clientName?: string; // anti-readonly
  /**
   * 指定该客户端是不是动态加载模板的
   * 对支持动态加载的客户端，核心会尝试去动态模板服务器上加载动态的模板。
   * 当前只有web版客户端有可能支持动态模板功能，小程序和本地应用不支持该功能，所以无需配置。
   * 默认：false
   */
  dynamic?: boolean; // anti-readonly
  /**
   * 动态加载的模板文件夹所在路径
   * 如果是动态加载的,则一定要准备好该属性，
   * 核心会去这个路径寻找动态模板文件，
   * 如果dynamic属性指定为true，而不提供这个路径，初始化时会报错。
   * 当前只有web版客户端有可能支持动态模板功能，小程序和本地应用不支持该功能，所以无需配置。
   * 默认：空字符串
   */
  templatePath?: string; // anti-readonly
  /**
   * 模板树所在地址，如果指定一定要指定根目录开始的绝对路径。
   * 如果是动态加载的,则一定要准备好该属性
   * 核心会去获取这个文件来了解动态模板的依赖情况，
   * 如果dynamic属性指定为true，而不提供这个路径，初始化时会报错。
   * 当前只有web版客户端有可能支持动态模板功能，小程序和本地应用不支持该功能，所以无需配置。
   * 默认：/tree.json
   */
  treeUrl?: string; // anti-readonly
  /**
   * 是否要使用wx sdk
   * 当前只有web版可能支持，小程序和本地应用不支持该功能，所以无需配置。
   * 默认：false
   */
  useWxSdk?: boolean; // anti-readonly
  /**
   * os-client的开发者凭证，这是个保留属性，暂时可以不设置
   * 默认：空字符串
   */
  key?: string; // anti-readonly
  /**
   * 资源访问地址配置
   * 默认情况下都指向正式环境服务器的资源地址，如果想访问其他服务器的资源
   * 则需要重写该配置，详情请看每个具体的属性说明
   * 默认：正式环境服务的资源地址
   */
  hostConfig?: CFHostConfig; // anti-readonly
  /**
   * 如果有配置该方法，问卷主题发生变化时，该方法会被调用。
   * 然后可以做一些自定义的事情。
   * 不支持系统主题的客户端不需要配置这个方法
   * 默认行为：什么也不做
   * @param theme 变化后的主题内容
   */
  setTheme?(theme: CFTheme): void;
  /**
   * 常规消息提示方法，如果一道必答题还没有进行作答就点击下一题按钮
   * 这时候不会进入下一题，而是会发出类似”必须作答“这样的提示消息，
   * 通过配置该方法来决定如何在UI中展示这些提示消息。
   *
   * @param message 消息内容
   */
  notify(message: string): void;
  /**
   * 弹框方式提示消息，比提示消息更重要一些，需要弹框，并且用户点击后才消失
   * @param message
   */
  alert(message: string): void;
  /**
   * 严重错误消息提示方法
   * 如尝试下载某份问卷进行作答，但这份问卷已经下线，则不会得到问卷内容
   * 而是会发出一个类似”问卷已下线“的错误消息
   * 通过配置该方法来决定如何在UI中展示这些错误消息。
   * 发生任何错误后，不允许继续操作。
   * @param message 错误内容
   */
  error(message: string): void;
  /**
   * 如果在单页模式中有很多题目，进行作答后点击下一题，其中某道题目的答案不满足要求，
   * 这时候可能这道题目不再滚动条所在的可见范围内，
   * 通过配置该方法，可以自定义定位错误的方式。
   * 第一个参数中有一个[[CFValidateResult.dueToNode]]属性，找到该题目，定位其位置。
   * 比如：可以移动滚动条到有错误的题目位置。
   * 注意这个方法只需用来定位有错误的题目，至于题目中有什么错误，不归这里管，那个归题目渲染模板管。
   * 默认行为：什么都不做
   * @param result 错误信息
   * @param state 总状态
   */
  locateError?(result: CFValidateResult, state: CFSurveyState): void;
  /**
   * 如果觉得核心包中逻辑相关的提示文字多语言翻译不满足你的要求，或者支持的语言不够多
   * 你可以配置该属性指定使用自己准备的翻译文本，这个配置的每个属性的属性名是语言代号，
   * 其属性值是该语言翻译文本对象
   * 比如，核心模块当前仅提供了中文（zh_cn）和英文（en_us）的多语言
   * 现在你对核心模块的中文翻译是满意的但是对核心模块的英文的翻译内容不满意，
   * 这样你就可以配置该属性如下内容
   *
   * ```
   * {
   *  en_us: {...}
   * }
   * ```
   * 以上配置会覆盖掉默认的英文翻译，当进行英文翻译时，会只用你提供的这个对象作为翻译依据，
   * 核心模块提供的英文翻译会被丢弃
   *
   * 如果在此基础上,同时你希望有日文版的多语言翻译，这时你可以添加配置日文翻译文本
   * ```
   * {
   *  en_us: {...}
   *  ja_jp: {...}
   * }
   * ```
   * 以上的配置覆盖了英文翻译，同时新增了日文翻译。
   *
   * 每个json对象要准备的数据格式在[[LANG_ZH_CN]]中做出了示范.
   *
   * 各种语言的代号可参照[百科全书](https://en.wikipedia.org/wiki/Language_localisation)
   *
   * 我们统一使用`xx_xx`小写字母加下划线形式的代号
   *
   * 默认值：空
   */
  langSrcMap?: { [key: string]: any }; // anti-readonly

  /**
   * 设置该方法来监听核心包的多语言变化,当核心包多语言切换时,会调用该方法
   * UI程序中监听到这个变化后也要切换多语言
   * 才能做到核心包提示的信息和UI组件中自己的显示内容使用了同一种语言
   * 不支持多语言的客户端可以不配置这个方法
   * 默认行为：什么都不做
   * @param key 变化后的语言代号，如zh_cn，
   */
  setLocale?(key: string): void;
  /**
   * 自定义中断回调方法
   * 当核心包中运行发生异常，或者需要去往外部程序时，会中断答题流程，同时触发调用这个方法
   * 客户端中可以配置该方法来在此时机做一些自定义的事情。
   * 默认行为：什么也不做
   */
  customAbort?(relax?: boolean): void;
  /**
   * 自定义的去往开始页面方法,只有使用web核心包是需要关注这个方法
   *
   * 非web核心包使用者无需配置该方法。
   *
   * web定制核心包中配置的页面切换方法是使用的浏览器原始location.replace方法实现的
   * 当使用了单页引用页面的框架实现web客户端时，原生的跳转方法可能会导致页面刷新，使得单页应用的状态丢失。
   * 而不同的框架在单页面内控制路由控制的方式是不一样的，所以需要用该方法提供。
   *
   * 默认行为：浏览器原生location.replace跳转
   * @param routeParam 路由信息
   */
  switchRoute?(routeParam: CFRouteSwitchParam): void;
}

/**
 * 路由跳转参数,仅web端需要关注
 * 传入参数就是该类型
 */
interface CFRouteSwitchParam {
  /**
   * 完整的URL
   */
  url: string;
  /**
   * 路由路径
   */
  route: string;
  /**
   * 从URL主机根目录开始的路由部分内容
   */
  tail: string;
  /**
   * 全部的查询参数对象
   */
  params: CFQueryParams;
}

/**
 * 已完成选项概要信息
 */
interface CFTaskOption {
  /**
   * 选项文字
   */
  text: string;
  /**
   * 选项输入内容，只有输入型的选项才有
   */
  value?: string;
}

/**
 * 已完成节点概要信息
 */
interface CFTaskNode {
  /**
   * 题目标题，优先使用问题文字，其实用问题编号
   */
  title: string;
  /**
   * 题目描述
   */
  description: string;
  /**
   * 直接放在题目上的答案信息，不同题目内容不同：
   * 手动定位题：手选的位置信息
   * 自动定位题：定位的位置信息
   * 
   */
  value?: string;
  /**
   * 放在选项中的答案
   */
  options?: CFTaskOption[];
}

/**
 * 答题任务进展情况数据
 */
interface CFTaskInfo {
  /**
   * 进度
   */
  progress: number;
  /**
   * 原始的结果
   */
  result: ICFResult;
  /**
   * 任务概览信息，比起的原始结果来更多一些描述信息，方便查看
   */
  nodes: CFTaskNode[];
}

/**
 * 核心中暴露的一些辅助工具方法
 */
interface CFUtil {
  /**
   * 解压文本
   * @param text
   */
  inflate(text: string, config: { to: string }): string;
  /**
   * 将JSON样式配置转成css样式
   * @param varStyle
   */
  convertVarStyle(varStyle: CFVarStyle): string;
  /**
   * 获取当前答题任务已完成的概要信息
   */
  getTaskInfo(): Promise<CFTaskInfo>;
}

/**
 * 核心对象
 */
interface CFCore extends CFSetupOptions {
  /**
   * 发布的版本号
   */
  releaseVersion: string;
  /**
   * 发布日期
   */
  releaseDate: string;
  /**
   * 主题是否已经更新为何服务器上的一致，还未更新好时，APP页面渲染但是不要显示，可以控制透明度或display。
   * 等稍后改属性准备好后再显示出来。
   *
   * 问：为什么要这么做？
   *
   *
   * 我们的app初始化流程是这样的
   *
   * 1. APP初始化，调用核心包的setup
   * 2. APP开始渲染（还没来得及获取主题，使用默认主题）
   * 3. APP渲染后转到默认主路由
   * 4. 主路由调用核心包的fetchStartState方法获取开始页面的数据，获取到了服务器的而主题，重新设置为当前主题，同时该属性变成true.
   * 5. APP重新用新主题渲染页面。
   *
   * 因为我们的主题信息是存在服务器上的，初始APP渲染的时候还没有主题，为了保证渲染不出错（不给主题，渲染的时候就读不到东西），核心包先给了一个默认主题。
   * 但是在第2步和第5步之间，如果默认主题和服务器上的主题颜色不一样，则会出现页面闪烁效果。所以我们第2步渲染后暂时掩藏内容，等到第5步的时候再显示。
   * 就不会闪烁了。
   *
   * 问：如果没有主题就不渲染，等有主题了在渲染可以吗？
   *
   * 不可以，因步渲染APP组件，就没有机会引导到主路由，也就没有机会进行第4步，获取远程数据，从而永远也拿不到主题，程序初始化就被中断了，永远也运行不起来了。
   *
   * 所以只能先渲染，但不显示，等该属性准备好后在显示
   */
  themeUpdated: boolean;
  /**
   * 挂载的事件中心
   */
  eventHub: CFEventHub;
  /**
   * 配置此属性让setter执行以后不派发变化事件
   * 这个事件被派发的比较频繁，当运行测试和自动推导的时候
   * 可以禁用之，以节约时间。
   * 测试专用，平时不用配置
   * @ignore
   */
  silentSetter?: boolean;
  /**
   * 环境配置
   */
  env: CFEnvOptions;
  /**
   * 是否为预览模式
   */
  preview?: boolean;
  /**
   * 是否禁用预览工具条
   */
  needPreviewFlag: boolean;
  /**
   * 是否初始化成功了
   */
  initialized?: boolean;
  /**
   * 是否已经终止运行
   */
  crashed?: boolean;
  /**
   * 开始页面/封面数据
   */
  startState: CFStartState;
  /**
   * 答题页面数据
   */
  surveyState: CFSurveyState;
  /**
   * 奖励页面数据
   */
  rewardState: CFRewardState;
  /**
   * 实时预览页面数据
   */
  realtime: CFRealtime;
  /**
   * 收集器id，必须设置，如果是预览模式则是问卷的原始长id
   * 如果是正式答题模式，则是当前收集器短id
   */
  sid: string;
  /**
   * 离线任务任务id,一般为空，当前只有离线应用会指明该id
   * 如果指明了任务id，则：
   * 1. 会强制开启断点续答
   * 2. 则缓存的数据会使用任务id+问卷id的方式分区
   * 否则缓存的数据只按问卷id分区
   * 3. 答题期间每答完一题会往离线服务器发送最新的数
   *
   * 预览模式下总是为空
   *
   */
  offlineTaskId?: string;
  /**
   * 是否为实时预览
   */
  realTimePreview: boolean;
  /**
   * 提示消息是否已挂起，挂起后不会发出提示消息
   */
  notifySuspended: boolean;
  /**
   * 注册环境适配信息，之后才能初始化
   *
   * 核心包中包含的是与运行平台无关纯答题流程的逻辑代码，但是运行过程中某些时候需要访问系统页面或者外部资源。
   * 当运行的平台不同时，访问这些信息的方式也不同，所以[[CFEnvOptions]]中列出了所有可能需要与系统或外界交互的需求项
   * 其中大部分是可选实现的，小部分是必须实现的，构建答题端时请参考文档按需实现配置。
   * 如果你使用的是纯核心包，则在[[CFCore.setup]]之前需要调用该方法将配置传入，然后才调用[[CFCore.setup]]方法初始化
   * 如果使用的是已经配置好的web包，则不需要调用该方法
   * @param options 具体的环境配置内容
   */
  registerEnv(options: CFEnvOptions): void;
  /**
   * 初始化方法
   * 多次调用时,调用前请先调用[[CFCore.reset]]方法，才会重新setup
   * 否则会使用前一次setup的记过，不会重新setup
   * 如果你使用的是纯核心包，则在此之前需要调用[[CFCore.registerEnv]]方法进行环境适配
   * 如果使用的是已经配置好的包，如web适配包则可以直接初始化
   * @param options 初始化配置
   */
  setup(options: CFSetupOptions): Promise<CFCore>;
  /**
   * 获取首页数据的方法
   * 多次调用,只有第一次会发送请求
   * 请求的数据会放到缓存中,后面几次获得的都是返回的缓存数据
   */
  fetchStartState(): Promise<CFStartState>;
  /**
   * 获取答题也数据的方法
   * 多次调用,只有第一次会发送请求
   * 请求的数据会放到缓存中,后面几次获得的都是返回的缓存数据
   */
  fetchSurveyState(): Promise<CFSurveyState>;
  /**
   * 获取奖励页面数据的方法
   * 多次调用,只有第一次会发送请求
   * 请求的数据会放到缓存中,后面几次获得的都是返回的缓存数据
   */
  fetchRewardState(): Promise<CFRewardState>;
  /**
   * 获取主题
   */
  getTheme(): CFTheme;
  /**
   * 初始化实时预览
   */
  initRealtimePreview(): void;
  /**
   * 重置，重置以后需要重新进行初始化流程
   * 适用于多问卷应用中切换问卷的时候使用
   */
  reset(): void;
  /**
   * 工具类
   */
  util: CFUtil;
}

//#endregion
