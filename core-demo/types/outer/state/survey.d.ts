/**
 * @ignore
 */
interface IFlowProgress {
  index: number;
  fullLength: number;
  percent: number;
}

/**
 * 上下文数据
 * @ignore
 */
interface ICFContext {
  /**
   * 上下文选项数据
   */
  option?: CFOption;
  /**
   * 上下文题目数据
   */
  question?: CFQuestion;
}

/**
 * 答题总状态
 * 答题页面数据
 * 使用[[CFSurveyState.nodes]]来渲染当前需要渲染的题目
 */
interface CFSurveyState
  extends ICFTranMiniState,
  ICFStartMiniState,
  ICFStartMiniIntro,
  CFStateBase {
  /**
   * 最新答案
   */
  latestResult?: ICFResult;
  /**
   * 进入问卷的模式
   */
  enterMode: SURVEY_ENTER_MODE;
  /**
   * 进入答题页面后答案是否发生了变化
   */
  answerChangedSinceStart: boolean;
  /**
   * 对于核心的引用
   */
  core?: CFCore;
  /**
   * @ignore
   */
  images: CFImageInNode[];
  /**
   * 当前问卷支持的多语言列表
   */
  langTable: CFLangTableItem[];
  /**
   * 当前展示的语言
   */
  language: string;
  /**
   * 测试用例数据
   */
  testCases: ICFTestCase[];
  /**
   * @ignore
   */
  langResume?: boolean;
  /**
   * @ignore
   */
  title: string;
  /**
   * @ignore
   */
  summary: string;
  /**
   * @ignore
   * 问卷原始id
   */
  surveyId: string;
  /**
   * @ignore
   */
  companyID: string;
  /**
   * @ignore
   */
  current: CFQuestion;
  /**
   * @ignore
   */
  nodeList: ICFNode[];
  /**
   * @ignore
   */
  renderList: CFQuestion[];
  /**
   * @ignore
   */
  context: ICFContext;
  /**
   * 当前的单页组
   */
  inSingleGroup: ICFNodeGroup;
  /**
   * 下一题按钮文字
   */
  nextButton: string;
  /**
   * 是否需要进度条
   * @ignore
   */
  progressBarRequired: boolean;
  /**
   * 是否需要进度条,UI靠此属性决定是否显示答题进度条
   */
  needProgressBar: boolean;
  /**
   * 是否为预览模式
   */
  preview: boolean;
  /**
   * @ignore
   */
  loopStack: ICFLoop[];
  /**
   * @ignore
   */
  randomList: ICFRandom[];
  /**
   * @ignore
   */
  noWxShare: boolean;
  /**
   * @ignore
   */
  wxShareInfo?: ICFWxShareInfo;
  /**
   * @ignore
   */
  formalResult?: ICFFormalResult;
  /**
   * @ignore
   */
  prevEnabled: boolean;
  /**
   * @ignore
   */
  themeMode?: boolean;
  /**
   * @ignore
   */
  prevBtnText: string;
  /**
   * @ignore
   */
  nextBtnText: string;
  /**
   * @ignore
   */
  fakeCommitted?: boolean;
  /**
   * @ignore
   */
  transactionID: string;

  /**
   * 是否正在加载,当该属性为true时,UI需要选人加载中的状态
   */
  nextLoading: boolean;
  /**
   * 是否正在更新状态
   * @ignore
   */
  refreshing: boolean;
  /**
   * @ignore
   */
  needRegions: boolean;
  /**
   * @ignore
   */
  completeUrl: string;
  /**
   * @ignore
   */
  quotaFullUrl: string;
  /**
   * @ignore
   */
  screenOutUrl: string;
  /**
   * @ignore
   */
  bonusLimitTime: string;
  /**
   * @ignore
   */
  oneReplyPerTerminal: boolean;
  /**
   * 答题进度,当要求进度条时
   */
  progress: number;
  /**
   * @ignore
   */
  startTime: number;
  /**
   * @ignore
   */
  currentStartTime: number;
  /**
   * 是否限制答题时间
   */
  limitTime: number;
  /**
   * @ignore
   */
  timer: any;
  /**
   * 剩余答题时间
   */
  restTime: string;
  /**
   * @ignore
   */
  phoneUsed: boolean;
  /**
   * @ignore
   */
  phoneNumber: string;
  /**
   * 前一题按钮文字
   */
  prevButton: string;
  /**
   * 回复状态
   */
  responseStatus: RESPONSE_STATUS;
  /**
   * @ignore
   */
  endRequested?: boolean;
  /**
   * 当前要渲染的题目列表
   */
  nodes: CFQuestion[];
  /**
   * @ignore
   */
  address?: CFMapAddress;
  /**
   * @ignore
   */
  point?: CFMapPoint;
  /**
   * @ignore
   */
  rewardInfo?: ICFRewardInfo;
  /**
   * 预览工具信息
   */
  previewTool?: CFPreviewTool;
  /**
   * 答案断点续答工具
   */
  answerResumer?: CFAnswerResumer;

  /**
   * @ignore
   */
  resumeEnabled: boolean;


  /**
   * 是否需要以表格的方式渲染问题，
   * 这个的优先级比 nodes 的要高
   */
  groupTable?: ISinglePageGroupTable
}
