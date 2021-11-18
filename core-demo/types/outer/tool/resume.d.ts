/**
 * @ignore
 */
interface ICFResumeRandom {
  nodeId: string;
  destPortIds: string[];
}
/**
 * @ignore
 */
interface ICFResumeHolder {
  /**
   * 回复id
   */
  responseId: string;
  /**
   * 缓存的数据
   */
  data: ICFMemory;
  /**
   * 需要回复到的位置
   */
  point: string;
  /**
   * 在恢复点之前爆发了多少
   */
  count: number;
  /**
   * 随机记录
   */
  randomList: ICFResumeRandom[];
  /**
   * 随机抽取中被抛弃过的节点id列表
   */
  randomAbandonedNodeIds: string[];
  /**
   * 缓存时使用的语言
   */
  lang: string;
}

/**
 * 答案断点续答工具
 * 如果问卷设置了允许断点续答,答题者中途离开的答题页面,下次再打开这份问卷进入答题页面前
 * 需要先渲染这个断点续答面板,询问是要基于上次的记录继续答题,还是重新开始答题.
 * 这种情况下[[CFSurveyState.answerResumer]]属性会有值
 *
 * 参考下面的属性来渲染标题,消息和按钮
 *
 * 确认按钮点击后需要调用[[CFAnswerResumer.handleSure]]方法
 * 拒绝按钮点击后需要调用[[CFAnswerResumer.handleDeny]]方法
 */
interface CFAnswerResumer {
  /**
   * 要显示的消息
   */
  message: string;
  /**
   * 确定按钮文字
   */
  sureText: string;
  /**
   * 拒绝按钮文字
   */
  denyText: string;
  /**
   * 要显示的标题
   */
  title: string;
  /**
   * 是否可见
   */
  show: boolean;
  /**
   * 确定使用断点续答时的回调函数
   */
  handleSure(): Promise<void>;
  /**
   * 拒绝使用断点续答时的回调函数
   */
  handleDeny(): Promise<void>;
}

/**
 * @ignore
 */
interface ICFResumeHandler {
  onSuspend?(): void;
  onEnd(data: { failed: boolean; error: any }): void;
  onProgress(e: string): void;
}

/**
 * @ignore
 */
interface ICFOperationResult {
  noValidate?: boolean;
  refresh?: boolean;
  result?: boolean | number[];
}

/**
 * @ignore
 */
interface ICFCascadeCache {
  list?: ICFCascadeCache[];
  selected: boolean;
  resultId: string;
}

/**
 * @ignore
 */
interface ICFMaxDiffTaskItemCache {
  uuid: string;
  value: MAX_DIFF_VALUE;
  round: number;
}

/**
 * @ignore
 */
interface ICFMaxDiffTaskCache {
  items: ICFMaxDiffTaskItemCache[];
  done: boolean;
}

/**
 * @ignore
 */
interface ICFMemory {
  [key: string]: ICFQuestionCache;
}

/**
 * 题目答题状态缓存，混合了各个题目的内容，但是针对单个题目只会包含这里面的部分内容。
 * 简化类型定义混合到了一起。
 * @ignore
 */
interface ICFQuestionCache {
  /**
   * 题目类型
   */
  type: NODE_TYPE;
  /**
   * 选项状态
   */
  options: ICFOptionCache[];
  /**
   * 其他选项状态
   */
  otherOptions: ICFOptionCache[];
  /**
   * 位置装填，仅定位相关题目使用
   */
  position?: CFMapLocation;
  /**
   * 位置选取索引，仅定位相关题目使用
   */
  indexes: string;
  /**
   * 一般的值
   */
  value: string;
  /**
   * 手机号码
   */
  phoneNumber: string;
  code: string;
  cascade: ICFCascadeCache;
  validateFailed: boolean;
  validateFailTimes: number;
  costTime: number;
  startTime: string;
  succeed: boolean;
  failed: boolean;
  failedSkipActivated: boolean;
  tasks: ICFMaxDiffTaskCache[];
  /**
   * MaxDiff问题和连续评价题当前任务索引
   */
  currentTaskIndex: number;
  rankList: string[];
}
/**
 * @ignore
 */
type ICFQuestionMemoryKeys = keyof ICFQuestionCache;

/**
 * 坐标
 */
interface ICoords {
  x: number;
  y: number;
}
/**
 * @ignore
 */
interface ICFOptionCache {
  uuid: string;
  percent: string;
  point: ICoords;
  records: CFMaxDiffRecord[];
  sortNo: number;
  value: string;
  filePath: string;
  fileName: string;
  isImage: boolean;
  fileType: string;
  selected: boolean;
  miniValue: string;
  assistValue: CFAssistProps;
}
