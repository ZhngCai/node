/**
 * 开始状态
 * @ignore
 */
interface ICFStartMiniIntro {
  /**
   * 主题信息
   */
  theme: CFTheme;
  /**
   * @ignore
   */
  userInfo: CFUserInfo;
  /**
   * @ignore
   * 收集器id
   */
  sid: string;
  /**
   * @ignore
   */
  hasVar: boolean;
  /**
   * @ignore
   */
  parsedPayload: ICFParsedSmallPayload;
  /**
   * @ignore
   */
  startNode: ICFStartNode;
}

/**
 * 开始状态
 * @ignore
 */
interface ICFStartMiniState extends ICFCustomLogo {
  /**
   * @ignore
   * 是否在预览模式下预览隐身节点
   */
  previewShadowNodes: boolean;
  /**
   * @ignore
   * 挂载的fake接口服务
   */
  fakedServers: string[];
  /**
   * @ignore
   * 挂载的自动提示数据
   */
  autoCpltGroups: ICFAutoCpltGroup[];
  /**
   * @ignore
   * 自定义logo的图片内容
   */
  logoImage?: CFImageInNode;
  /**
   * 是否显示题目编号
   */
  qNumberRequired: boolean;
  /**
   * 是否显示题目必答提示
   */
  asterisksRequired: boolean;
  /**
   * 是否需要显示答题进度
   */
  progressBarRequired: boolean;
  /**
   * @ignore
   * 是否需要题目类型信息
   */
  nodeTypeInfoRequired: boolean;
  /**
   * @ignore
   */
  limitTime: number;
  /**
   * @ignore
   */
  minTime: number;
  /**
   * @ignore
   */
  timeoutText: string;
  /**
   * @ignore
   */
  timeLessText: string;
}

/**
 * 封面数据
 * 需要渲染一写封面基本信息:文字描述和图片等
 * 以及一个开始答题的开始按钮.
 * 开始按钮点击后应该调用[[CFUIEventHandler.handleNextClick]]方法
 */
interface CFStartState extends ICFTranMiniState, ICFStartMiniIntro, CFStateBase, ICFCustomLogo {
  core?: CFCore;
  /**
   * 开始节点的布局设置
   */
  layout?: CFNodeLayout;
  /**
   * 开始页模板信息
   */
  template: CFNodeTemplate;
  /**
   * 当前问卷支持的多语言列表
   */
  langTable: CFLangTableItem[];
  /**
   * 当前展示的语言
   */
  language: string;
  /**
   * @ignore
   */
  langResume?: boolean;
  /**
   * 图片
   */
  images: CFImageInNode[];
  /**
   * 标题
   */
  title: string;
  /**
   * 描述
   */
  summary: string;
  /**
   * 是否为预览模式
   */
  preview: boolean;
  /**
   * 描述,解析前
   * @ignore
   */
  description: string;
  /**
   * @ignore
   * 问卷原始id
   */
  surveyId: string;
  /**
   * 开始按钮文字
   */
  nextButton: string;
  /**
   * 图片位置
   */
  imgPosition: IMG_POSITION;
  /**
   * 是否图片缩放
   */
  imgScale: boolean;
  /**
   * 图片过渡方式
   */
  imgTransType: IMG_TRANSITION;
  /**
   * 图片过渡时间
   */
  imgTransTime: number;
  /**
   * 内嵌页面地址,UI需要用iframe渲染
   */
  welcomeUrl: string;
  /**
   * @ignore
   */
  startAuto: boolean;
  /**
   * 如果为true,开始页面不要显示
   */
  hidden: boolean;
  /**
   * @ignore
   */
  noWxShare: boolean;
  /**
   * @ignore
   */
  wxShareInfo?: ICFWxShareInfo;
  /**
   * 是否正在加载,当该属性为true时,UI需要选人加载中的状态
   */
  nextLoading: boolean;
}
