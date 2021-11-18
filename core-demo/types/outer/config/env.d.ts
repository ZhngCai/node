//#region 环境配置相关规范说明

/**
 * 开发辅助相关的环境信息
 * 一般不需要配置
 */
interface CFEnvDev {
  /**
   * 是否为本地开发，开发调试辅助参数，一般不用配置。
   */
  local?: boolean; // anti-readonly
  /**
   * 是否为调试模式，开发调试辅助参数，一般不用配置。
   */
  debug?: boolean; // anti-readonly
  /**
   * 是否为实时预览，只有需要实现实时预览模式的时候才配置
   */
  realtime?: boolean; // anti-readonly
  /**
   * 是否为测试模式，开发调试辅助参数，一般不用配置。
   */
  autoRun?: boolean; // anti-readonly
  /**
   * 是否为推导模式，开发调试辅助参数，一般不用配置。
   */
  infer?: boolean; // anti-readonly
  /**
   * 转化加载真实接口的地址成一个执行本地机器的地址
   * 配合[[CFQueryParams.real_port]]
   * 用于在本地开发真实接口时可以让答题核心调用本地的接口地址
   * 不提供则不做任何转化处理
   */
  parseRealUrl?(url: string): string;
  /**
   * 获取测试数据的方法，这方法是用于在本地开发测试时方便快速切换数据源的。
   * 没有此类测试需求则不需要配置这个方法
   * 不配置则默认什么都不做
   */
  getCustomSummary?(): Promise<ICFIntroMeta>;
  /**
   * 获取测试数据的方法，这方法是用于在本地开发测试时方便快速切换数据源的。
   * 没有此类测试需求则不需要配置这个方法
   * 不配置则默认什么都不做
   */
  getCustomSmallPayload?(): Promise<ICFSmallPayload>;
}

/**
 * 环境配置URL相关项目
 */
interface CFEnvApp {
  /**
   * 当前环境是否能后自行处理奖励流程，
   * 能自身处理奖励流程的的平台或app会进入领奖流程
   * 不能自身处理奖励的平台则展示一个二维码，
   * 然后需要领奖者使用能处理领奖流程的app来扫描这个二维码进入领奖流程页面去领奖。
   */
  canHandleReward?(): boolean;
  /**
   * 获取应用程序的参数
   * 其中肯定包含最重要的问卷id，代表访问的是哪份问卷
   * 以及可能包含一些系统附加参数，代表访问该问卷时的一些附加数据
   */
  getParams(): CFQueryParams;
  /**
   * 去往答题页面方法，核心中在某些流程中碰到问题，会需要回到首页。
   * 就会调用这个方法，实现该方法引导程序回到首页。
   * @param params 参数
   */
  gotoStartPage(params: CFQueryParams): void;
  /**
   * 去往答题页面的方法，在开始页面点击开始后，核心需要进入答题页面
   * 就会调用这个方法。实现该方法引导程序去往答题页面。
   * @param params 参数
   */
  gotoSurveyPage(params: CFQueryParams): void;
  /**
   * 获取领奖页面地址的方法，有些问卷是带有奖励的，当完成这些问卷后，核心包会尝试打开领取奖励的页面，
   * 或者将奖励页面的地址展示为二维码，让访问者扫码领奖，核心包默认会使用主客户端的奖励页面地址，
   * 如果你不想使用默认的奖励页面地址，需要实现方法提供地址。
   * 这个方法一般在自定义web客户端时可以用到，因为自定义的web客户端一般都会自定自己的奖励页面，
   * 靠这个方法可以让核心包使用自己定制的奖励页面而不是使用主客户端的奖励页面。
   * 其他场合一般使用规模行为即可
   * 默认行为：使用主客户端的奖励页面
   */
  getRewardUrl?(params: CFQueryParams): string;
  /**
   * 打开一个web页面的方法，核心在某些特殊场合希望打开一个web页面。
   * 这些场合一般是问卷包含了自定义跳转，自定义数据传输跳转等功能。
   * 实现该方法在浏览器上打开页面，
   * 如果你的终端不准备处理这些特殊场合，可以不配置该方法
   * 默认行为：不做任何处理
   * @param url 要打开的地址
   */
  openWebLink?(url: string): void;
  /**
   * 重新加载当前页面的方法
   * 核心包在访问者更改某些设置，如切换语言的时候，会需要重新加载程序。
   * 这时候会调用这个方法
   * 默认行为:什么也不做，不重新加载程序
   */
  reload?(): void;
}

/**
 * 运行系统相关信息
 */
interface CFEnvSystem {
  /**
   * 设备信息
   */
  device?: CFDevice;
  /**
   * 获取进入该程序的来源的方法
   * 用于记录日志，可以知道使用者是从哪个网址或哪个应用跳转过来的。
   * 浏览器中一般时注意document.referer.
   * 其他终端则依照自己的情况设置，尽可能可以提供者信息。
   * 如果获取不到来源信息则可不提供
   * 如果不配置则使用默认值:空字符串
   */
  getReferer?(): string;
  /**
   * 多语言翻译方法，核心包提供了基本的翻译实现，但是不支持messageFormat方式的高级翻译功能。
   * 一般对中文翻译无影响
   * 比如，有个多语言对应的翻译原始内容为："Please enter at least {min, plural, one {# item} other {# items} }"
   * 则核心默认的翻译因为不支持messageformat，所以无法正确处理单复数问题。
   * 所以无论数值是多少都会翻译成：1/2/3/n items 这种形式
   * 如果你对默认的翻译实现方式不满意，可以配置该方法提供自己的实现方法
   * 如果不配置则使用默认值：核心包自带的简易翻译方法
   * @param text 内容代号
   * @param option 替代变量组
   */
  translate?(text: string, option: { [key: string]: string | number }): string;
  /**
   * 获取当前系统语言的方法，答题核心获取系统语言后会尽量优先尝试加载与当前系统的默认语言相匹配的问卷内容
   * 如果不配置则会优先尝试加载中文问卷内容
   */
  getLang?(): string;
  /**
   * 这个运行平台的Js的Function构造函数
   * 一般只有小程序中的答题端需要指定，因为小程序的禁止动态执行脚本，所以其中的Function构造函数被阉割掉了。
   * 我们为了能在小程序执行动态方法，可以自己加载解释器重新构建了一个Function构造函数配置到这个属性
   * 其他没有这种情形的可以不用配置这个属性
   * 不配置则使用默认值：系统自带的构造函数
   */
  functionConstructor?: FunctionConstructor; // anti-readonly
  /**
   * 解码base64的方法，相当于浏览器中有window.atob方法的功能
   * 该方法必须配置，不配置则会无法运行
   * @param s 原始base64内容
   */
  decodeBase64(s: string): string;
  /**
   * 解压方法，核心中默认会使用[pako.inflate方法](https://www.npmjs.com/package/pako)解压某些payload
   * 但是在有些平台上这个方法无法运行。这时候就可以配置该方法，规则参照pako.inflate方法
   *
   * @param raw 待解压数据
   * @param options 附加参数
   */
  inflate?(raw: string, options?: any): Promise<string>;
  /**
   * 生成一个div
   * 举例，web端提供的该方法为如下，其他端需要使用兼容的方式提供
   * ```typescript
   * function parseHtml(html?:string):HTMLElement {
   *   return document.createElement('div');

   * }
   * ```
   */
  newDiv(): HTMLElement;
  /**
   * 生成一个文本节点的方法
   * 举例，web端提供的该方法为如下，其他端需要使用兼容的方式提供
   * ```typescript
   * function newTextNode(html:string):Text {
   *   return document.createText();
   * }
   * ```
   */
  newTextNode(text: string): Text;
}

/**
 * 图片尺寸信息
 */
interface CFImageSize {
  /**
   * 宽度
   */
  width: number;
  /**
   * 高度
   */
  height: number;
}

/**
 * 动态UI功能支持的配置
 */
interface CFEnvUi {
  /**
   * 设置全局样式的方法，会尝试调用该方法将HTML全局变量的样式应用上去产生效果。
   * 如果不配置则不应用全局样式。
   * @param style 样式：css字符形式
   */
  setGlobalStyle?(style: string): void;
  /**
   * 设置变量自定义样式方法，对于每一种变量，问卷总都可以指定他们的通用样式
   * 会尝试调用调用该方法运用样式得到各个变量标签。
   * 如果不配置则不应用变量标签样式
   * @param style 样式：css字符形式
   * @param styleGroup 样式信息：JSON形式
   */
  setVarStyle?(style: string, styleGroup: CFVarStyleGroup): void;
  /**
   * 初始化一个节点动态模板的方法，该方法去动态获取设计端指定的自定义组件模板来渲染节点。
   * 只有实现了动态模板机制的答题端需要配置这个方法
   * 如果不配置则什么都不做
   * @param template 模板名称
   * @param state 答题状态
   * @param loop 循环信心
   */
  initNodeTemplate?(
    template: CFNodeTemplate,
    state: CFSurveyState,
    loop: ICFLoop
  ): Promise<CFNodeTemplate>;
  /**
   * 加载当前问卷所有使用到的额UI动态插件的方法
   * 只有实现了动态模板机制的答题端需要配置这个方法
   * 如果不配置则什么都不做
   * @param theme 主题
   * @param templates 模板列表
   */
  loadUiTemplates?(theme: CFTheme, templates: string[]): Promise<void>;
}

/**
 * 请求参数格式
 */
interface CFApiReqConfig {
  /**
   * 请求类型
   */
  type: API_REQ_TYPE;
  /**
   * 数据格式
   */
  contentType?: string;
  /**
   * 数据
   */
  data?: any;
  /**
   * 凭证
   */
  jwt?: string;
}

/**
 * 请求结果
 */
interface CFApiReqResult {
  /**
   * 状态码
   */
  status: number;
  /**
   * 数据
   */
  response: string | object;
}


interface CFUploadBaseConfig {
  /**
   * 关联的节点id
   */
  nodeId: string;
  /**
   * 关联的选项id
   */
  optionId: string;
}

/**
 * 图片上传参数
 */
interface CFUploadConfig extends CFUploadBaseConfig {
  /**
   * 上传进度回调方法
   * @param e 进度
   */
  onprogress(e: number): void;
  /**
   * 接受的文件格式
   */
  accept: string;
}

/**
 * 环境配置：网络连接与资源加载
 */
interface CFEnvNetWork {
  /**
   * 移除上传文件时的处理
   * @param config 配置信息
   */
  removeUpload(config: CFUploadBaseConfig): Promise<void>;
  /**
   * 上传文件的方法，答题端的上传题需要上传文件，在不同的平台上上传机制不同
   * 需要独立实现这个方法将文件正确上传到服务器
   * 如果答题端要实现上传题，则该方法必须实现，否则会无法上传。
   * 如果你的上传需要初始化，则可以配置[[CFEnvNetWork.initUploader]]方法先初始化一下状态
   * @param config 上传配置信息
   */
  upload(config: CFUploadConfig): Promise<ICFUploadResult>;
  /**
   * 加载伪造接口文件的方法，伪造的接口是放在网络上的某本js中的，当需要使用这些接口时，核心包需要
   * 加载这些js文件并运行其中的方法。在不同平台上，加载js的方式不一样，而且伪造接口的初始化流程也需要处理
   * 需要配合[[CFEnvNetWork.getFakeHost]]方法一起运作。
   * 平台需要提供这个方法，将远程脚本加载后，运行这个脚本，将运行脚本得到的对象依附在一个对象上，这个对象就是
   * [[CFEnvNetWork.getFakeHost]]需要返回的对象。
   * 在web这种这个流程非常简单：直接将js脚本加载到head中，就会自动运行，js脚本中的对象是默认依附到window.CFPlugin上的。
   * [[CFEnvNetWork.getFakeHost]]就直接返回window.CFPlugin就实现了整个流程。
   * 在其他平台上则可能需要自行动态执行脚本，且在执行前需要把加载到的脚本内容中window.CFPlugin整个关键字改成自己想要
   * 依附的对象在全局的名字，具体的实现方式要见机行事。
   * 该方法必须实现，不实现则无法运行伪造接口
   * @param url 文件地址
   * @param options 附加参数
   */
  loadFakeFile(url: string, options: SignStrStr): Promise<void>;
  /**
   * 获取伪造接口应该依附的对象
   * [[CFEnvNetWork.loadFakeFile]]成功将伪造接口加载成功后会粘附到一个对象上。
   * 这个方法返回这个对象，当核心需要调用某个伪造接口时，就会通过这个方法获取到接口。
   * 这个方法必须实现，不实现则无法运行伪造接口
   */
  getFakeHost(): CFPlugin;
  /**
   * 初始化上传插件的方法，配合[[CFEnvNetWork.upload]]方法，
   * 一般的上传插件需要被初始化一些状态才方便后续调用[[CFEnvNetWork.upload]]方法进行上传
   * 如果不配置则什么都不做
   * @param state 答题总状态
   */
  initUploader?(state: CFSurveyState): Promise<void>;
  /**
   * 发起网络请求的方法，不同的平台请求网络资源的方式不同，需要通过该方法配置。
   * @param url 地址
   * @param options 请求参数
   */
  request(url: string, options: CFApiReqConfig): Promise<CFApiReqResult>;
  /**
   * 通服务器建立socket连接的的方法，连通后使得客户端可以即时通信接受服务器的一些推送消息：如配额满
   * 各个运行平台socket连接方式不同，配置到这个方法中。
   * 核心包需要连接的时候会调用这个方法进行连接。
   * 和closeSocket方法配合工作，
   * 实现的规则参照web核心包中的实现。
   * 默认行为：什么也不做，不会建立socket连接
   * @param responseId
   * @param collectorId
   */
  connectSocket?(responseId: string, collectorId: string): void;
  /**
   * 断开socket的方法
   * 当提交问卷后，不再需要接受服务器的即时通信，核心包会调用这个方法断开socket
   * 和connectSocket方法配合工作，
   * 默认行为：什么也不做
   */
  closeSocket?(): void;
}
/**
 * 授权相关的配置，不同的运行平台有不同的账户系统，所以授权方式也不一样。
 * 如果你构建的答题端有用户系统需要授权则这这个规则进行配置。
 * 如果无账户系统，也不需授权则无需配置这个规则
 */
interface CFEnvAuth {
  /**
   * 用户信息，在有些平台上，可能开始答问卷时，用户已经登录了。
   * 这种情形下把用户的昵称和id按改规则配置到此处即可。
   */
  userInfo?: CFUserInfo; // anti-readonly
  /**
   * 有些平台需要初始化授权，为后续的第三放收取做好准备。
   * @param res 首页元数据
   */
  init?(res: ICFIntroMeta): Promise<void>;
  /**
   * 授权领奖的方法，该方法仅用于那些需要在微信浏览器中运行微信红包领奖流程的答题端
   * web核心包中一般需要配置该方法。
   * 其他方式的答题端无需配置这个方法。
   * @param appId
   * @param componentAppId
   * @param redirectUrl
   */
  authorizeGift?(appId: string, componentAppId: string, params: CFQueryParams): void;
  /**
   * 普通授权方法，该方法仅用于那些需要在微信浏览器中运行且需要获取微信信息的答题端
   * web核心包中一般需要配置该方法。
   * 其他方式的答题端无需配置这个方法。
   * @param ICFIntroMeta 源数据
   */
  authorize?(meta: ICFIntroMeta): void;
  /**
   * 问卷在某些平台可能需要第三方授权，这里尝试取回授权之前缓存的数据，
   * 取到了就不需要继续去后台获取了
   */
  retrieveAuthMeta?(): ICFIntroMeta;
}

/**
 * 环境配置本地存储
 */
interface CFEnvStorage {
  /**
   * 同步写缓存方法
   * @param key
   * @param value
   */
  set(key: string, value: string): void;
  /**
   * 写缓存方法(至关重要的)
   * 在离线模式下，有些重要的缓存数据不能写在内嵌的浏览器中，而是要传给App宿主帮写，
   * 这种场合下的缓存读写就需要用到这个方法而不是set方法，为确保通信操作完成，会变成异步的。
   * 如果不是离线模式的时候，会自动退化到使用set方法。
   * @param key
   * @param value
   */
  setVital(key: string, value: string): Promise<void>;
  /**
   * 读缓存方法
   * @param key
   */
  get(key: string): string;
  /**
   * 写缓存方法(至关重要的)
   * 说明同上
   * @param key
   */
  getVital(key: string): Promise<string>;
  /**
   * 移除缓存方法
   * @param key
   */
  remove(key: string): void;
  /**
   * 移除缓存方法(至关重要的)
   * 说明同上
   * @param key
   */
  removeVital(key: string): Promise<void>;
}

/**
 * 环境配置钩子，配置对应的钩子可以在对应的时机执行一些自定义的行为。
 * 如果没有特别的自定义行为需要执行，则无需配置
 */
interface CFEnvHook {
  /**
   * 初始化即将完成前要执行的钩子
   * @param core 核心对象
   */
  beforeSetupEnd?(core: CFCore): Promise<void>;
  /**
   * 初始化完成后的钩子
   * @param core 核心对象
   */
  afterSetup?(core: CFCore): Promise<void>;
  /**
   * 成功获取首页数据后的钩子
   * @param data 首页数据
   */
  afterFetchStart?(data: CFStartState): Promise<void>;
  /**
   * 成功获取答题页数据后的钩子
   * @param data 答题数据
   */
  afterFetchSurvey?(data: CFSurveyState): Promise<void>;
  /**
   * 成功获取奖励页数据后的钩子
   * @param data 奖励数据
   */
  afterFetchReward?(data: CFRewardState): Promise<void>;
  /**
   * 强行离开应用前的回调，在这时候可以做一些善后处理
   */
  beforeForceLeave?(): void;
  /**
   * 当语言发生变化时的回调
   * @param lang 语言代号：zh_cn/en_us/ja_jp格式
   */
  onLangChange?(lang: string): void;
  /**
   * 当进行上一题/下一题切换题目时的回调
   */
  onSwitchPage?(): void;
  /**
   * 当标题发生变更时的回调
   * @param title 标题内容
   */
  onTitleChange?(title: string): void;
  /**
   * 开始一个新回复时的回调，
   * 非断点续答询问后选择断点续答或重新开始的时候不算做这种情况之内
   * @param state 
   */
  onStartNewSurvey?(state: CFSurveyState): Promise<void>;
  /**
   * 断点续答询问后后选择重新开始时的回调
   * @param state 
   */
  onRestartSurvey?(state: CFSurveyState): Promise<void>;
  /**
   * 断点续答询问后选择续答时的回调
   * @param state 
   */
  onResumeSurvey?(state: CFSurveyState): Promise<void>;
  /**
   * 当一个回复完成走到结束节点时的回调，此时数据已经提交了。
   * @param state 
   */
  onEndSurvey?(state: CFSurveyState): Promise<void>;
}

/**
 * 客户端初始化环境相关配置
 * 由于纯核心包可以运行在不同的平台，而不同的平台对于数据请求，缓存控制，文件上传等操作的处理是不同的
 * 纯核心包不会准备这些模块，但是核心包需要调用这些模块，所以不同平台中使用该核心包时。
 * 需要提供给核心包自己平台的相关处理方法
 *
 */
interface CFEnvOptions {
  /**
   * 环境名称
   * 根据你的客户端性质从规定的环境名称中[[ENV_NAME]]选一个，
   * 无法确定就用默认值other
   * 默认：other
   */
  name?: ENV_NAME; // anti-readonly
  /**
   * 开发测试辅助配置，一般无需配置，
   * 详情请看子属性说明
   */
  dev?: CFEnvDev; // anti-readonly
  /**
   * 访问地址相关环境信息，详情请看子属性说明
   */
  app: CFEnvApp; // anti-readonly
  /**
   * 运行相关信息，详情请见子属性的说明
   */
  system: CFEnvSystem; // anti-readonly
  /**
   * 网络连接和数据加载相关信息
   * 这个配置项很关键，其中部分内容必须配置，详情请见子属性的说明
   */
  network: CFEnvNetWork; // anti-readonly
  /**
   * 授权相关的配置，不同的运行平台有不同的账户系统，所以授权方式也不一样。
   * 如果你构建的答题端有用户系统需要授权则这这个规则进行配置。
   * 如果无账户系统，也不需授权则无需配置这个规则
   * 详情请看子属性说明
   */
  auth?: CFEnvAuth; // anti-readonly
  /**
   * 缓存支持，告诉核心包如果在你的平台上操作缓存数据，
   * 相当于浏览器中的localStorage功能，详情请看子属性说明
   *
   */
  storage: CFEnvStorage; // anti-readonly
  /**
   * 答题流程中的钩子
   * 你可以按需实现这些钩子达到在流程中的对应时机添加自定义的处理，详情请看子属性说明
   */
  hook?: CFEnvHook; // anti-readonly
  /**
   * 支持动态UI相关的配置
   * 如果你构建的答题端不支持动态UI则可不指定这个配置，详情请看子属性说明
   */
  ui?: CFEnvUi; // anti-readonly
}
//#endregion
