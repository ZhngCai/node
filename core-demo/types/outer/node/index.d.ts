//#region 题目组成基础信息

/**
 * @ignore
 * 最大最小值配置
 */
interface ICFMinMax {
  /**
   * 最大值
   */
  min: number;
  /**
   * 最小值
   */
  max: number;
}

/**
 * @ignore
 * 开始结束值设置
 */
interface ICFStartEnd {
  /**
   * 开始值
   */
  start: number | string;
  /**
   * 结束值
   */
  end: number | string;
}

/**
 * @ignore
 * 开始结束数值设置
 */
interface ICFNumStartEnd {
  /**
   * 开始数值
   */
  start: number;
  /**
   * 结束数值
   */
  end: number;
}

/**
 * 图标数据
 * @ignore
 */
interface ICFNodeIcon {
  /**
   * 图标所在路径
   */
  path: string;
}

/**
 * 题目验证配置
 * @ignore
 */
interface ICFValidation {
  /**
   * 接口验证设置
   */
  request: ICFRequest;
  /**
   * 内置逻辑验证设置
   */
  logic: ICFValidateLogic;
  /**
   * 是否禁用提示消息，禁用提示消息是会隐藏验证错误
   * 继续下面的题目
   */
  noPreventNext: boolean;
}

interface ICFBacktracking {
  /**
   * 接口验证设置
   */
  request: ICFRequest;
  /**
   * 内置逻辑验证设置
   */
  logic: ICFValidateLogic;
  /**
   * 回溯目标节点id
   */
  targetNodeUuid: string;
}

/**
 * 节点路径目标信息
 * @ignore
 */
interface ICFDest {
  /**
   * 自身的输出口id
   */
  selfPortId: string;
  /**
   * 目标输入口id
   */
  destInputId: string;
  /**
   * 该路径是否仅适用于设计端
   */
  designOnly: boolean;
}

/**
 * 节点基类
 * @ignore
 */
interface ICFNode {
  /**
   * 布局设置
   * 里面含很多设置如字体,对齐方式等
   * UI渲染时可以选择遵守这些规则,也可以选择不遵守这些规则.
   */
  layout: CFNodeLayout;
  /**
   * 模板信息,如果是动态加载组件的答题客户端
   * 问题页面中不是主角判断节点类型来渲染不同的节点组件的
   * 而是要通过该属性获取设计端配置好的组件,然后用该组件渲染
   */
  template: CFNodeTemplate;
  /**
   * 是否自动跳过
   * @ignore
   */
  autoSkip: boolean;
  /**
   * 强制自动跳过的原因
   */
  forceSkipReason?: SKIP_REASON;
  /**
   * 该题目只需要显示,不能更改答案
   * UI上要禁用用户操作
   */
  readonly: boolean;
  /**
   * 原始问题文字
   * @ignore
   */
  questionText: string;
  /**
   * 是否隐藏问题区，如果为true，不要渲染node-head
   */
  headHidden?: boolean;
  /**
   * 原始问题描述
   * @ignore
   */
  describe: string;
  /**
   * 问题标签
   * @ignore
   */
  label: string;
  /**
   * 是否为无视图节点
   */
  noView?: boolean;
  /**
   * 所属组id
   * @ignore
   */
  groupId: string;
  /**
   * 是否处于单页组中
   */
  groupSingle: boolean;
  /**
   * 是否为某一页的开头节点
   */
  pageStart: boolean;
  /**
   * 是否为某一页的结尾节点
   */
  pageEnd: boolean;
  /**
   * 节点名称
   */
  nodeName: string;
  /**
   * @ignore
   */
  realNodeName: string;
  /**
   * 节点类型
   */
  type: NODE_TYPE;
  /**
   * 节点x坐标
   * @ignore
   */
  x: number;
  /**
   * 分组编号
   * @ignore
   */
  groupNumber: number;
  /**
   * 节点id
   * @ignore
   */
  nodeUuid: string;
  /**
   * 锁定循环次数
   * @ignore
   */
  lockLoopCount: number;
  /**
   * 关联一层循环节点id
   * @ignore
   */
  circleNode1Id: string;
  /**
   * 关联二层循环节点id
   * @ignore
   */
  circleNode2Id: string;
  /**
   * 输出目标列表
   * @ignore
   */
  destList: ICFDest[];
  /**
   * 是否为甄别模式
   * @ignore
   */
  checkMode: boolean;
  /**
   * 是否随机跟随引用源
   * @ignore
   */
  followRandom: boolean;
  /**
   * 是否固定位循环
   * @ignore
   */
  circulation: boolean;
  /**
   * 关联随机节点id
   * @ignore
   */
  parentRandomId: string;
  /**
   * 是否被使用过了
   * @ignore
   */
  used: boolean;
  /**
   * 是否被随机组抛弃了
   * @ignore
   */
  randomAbandoned: boolean;
}

/**
 * 主输入类型节点
 * @ignore
 */
interface ICFInputNodeMixin extends ICFNode {
  /**
   * 输出口
   * @ignore
   */
  input: ICFPort;
}

/**
 * 主输出类型节点
 * @ignore
 */
interface ICFOutputNodeMixin extends ICFNode {
  /**
   * 输入口
   * @ignore
   */
  output: ICFPort;
}

/**
 * 主输入输出类型节点
 * @ignore
 */
interface ICFInOutNodeMixin extends ICFInputNodeMixin, ICFOutputNodeMixin { }

/**
 * 选项类型节点掺元
 * @ignore
 */
interface ICFOptNodeMixin extends ICFNode {
  /**
   * 普通选项列表
   */
  options: CFOption[];
  /**
   * 其他选项列表
   */
  otherOptions: CFOption[];
  /**
   * 引用选项列表
   * @ignore
   */
  refOptions: ICFRefOption[];
  /**
   * 选项引用配置
   * @ignore
   */
  optionRefers: ICFOptionRefer[];
}

/**
 * 填充类型节点掺元
 * @ignore
 */
interface ICFFillNodeMixin extends ICFNode {
  /**
   * 要求最少在多少个选项中输入内容
   * @ignore
   */
  fillMin: number;
}

/**
 * 携带媒体的节点掺元
 * @ignore
 */
interface CFMediaNodeMixin extends ICFNode {
  /**
   * 是否在不看完视频是进行下一题操作
   * @ignore
   */
  canSkipVideo: boolean;
  /**
   * 关联的视频
   * 如果有该视频,UI需要在页面中渲染该视频
   * 并且视频播放完成以后UI逻辑中需要负责将将该视频的[[CFVideo.ended]]设置为true
   */
  video: CFVideo;
  /**
   * 关联图标
   * @ignore
   */
  image: CFImageInNode;
  /**
   * 关联的图片,是一个数组,可能有多张图片
   * UI中需要渲染这些图片
   */
  images: CFImageInNode[];
  /**
   * 图片位置
   * 决定图片是渲染在问题文字之前还是渲染在问题文字之后
   * before 将图片渲染在问题文字之前
   * after 将图片渲染在问题文字之后
   */
  imgPosition: IMG_POSITION;
  /**
   * 图片过渡时间
   */
  imgTransTime: 2000;
  /**
   * 图片过渡方式
   */
  imgTransType: IMG_TRANSITION;
}

/**
 * 携带验证功能的节点掺元
 * @ignore
 */
interface ICFValidationNodeMixin extends ICFNode {
  /**
   * 验证配置
   * @ignore
   */
  validation: ICFValidation;
}

interface ICFBacktrackingNodeMixin extends ICFNode {
  /**
   * 回溯配置
   * @ignore
   */
  backtracking: ICFBacktracking;
}

/**
 * 题目节点类
 * @ignore
 */
interface ICFSubjectNode
  extends ICFInOutNodeMixin,
  ICFOptNodeMixin,
  CFMediaNodeMixin,
  ICFBacktrackingNodeMixin,
  ICFValidationNodeMixin,
  ICFOptGroupNodeMixin {
  /**
   * 是否为必答题
   * @ignore
   */
  answerRequired: boolean;
  /**
   * 是否选项随机
   * @ignore
   */
  randomOptionY: boolean;
  /**
   * 当只要一个选项时,仍然显示
   * @ignore
   */
  showWithSingleRefOpt: ICFSwitchValue;
}

/**
 * 矩阵项
 * 矩阵排布的时候代表矩阵项的每个网格
 */
interface CFMatrixOption extends CFOption {
  /**
   * @ignore
   * json中携带的行选项id
   */
  xid: string;
  /**
   * @ignore
   * json中携带的列选项id
   */
  yid: string;
  /**
   * @ignore
   * 根据yid重新关联的解析后的行选项
   */
  optionY: CFOption;
  /**
   * @ignore
   * 根据xid重新关联的关联的列选项
   */
  optionX: CFOption;
}

/**
 * 摊开的矩阵
 */
interface CFFlatItem {
  /**
   * 里层项目
   */
  list: CFMatrixOption[];
  /**
   * 文字
   */
  text: string;
}

/**
 * 矩阵节点
 * @ignore
 */
interface ICFMatrixNode extends ICFSubjectNode {
  /**
   * 矩阵方式的选项表
   * 先行后列
   */
  matrix: CFMatrixOption[][];
  /**
   * 适应动态展开方式的选项表
   * 看情况,如果是以行为主,则先行后列
   * 如果是以列为主,则先列后行
   */
  flatten: CFFlatItem[];
  /**
   * 列选项
   * @ignore
   */
  optionsX: CFMatrixXOption[];
  /**
   * 行选项
   * @ignore
   */
  optionsY: CFMatrixYOption[];
  /**
   * 引用列选项
   * @ignore
   */
  refOptionsX: ICFRefOption[];
  /**
   * 引用行选项
   * @ignore
   */
  refOptionsY: ICFRefOption[];
  /**
   * 列选项引用
   * @ignore
   */
  optionXRefers: ICFOptionRefer[];
  /**
   * 行选项引用
   * @ignore
   */
  optionYRefers: ICFOptionRefer[];
  /**
   * 其他选项
   */
  otherOptions: CFOption[];
}

/**
 * 验证节点
 * @ignore
 */
interface ICFValidateNode extends ICFInOutNodeMixin, CFMediaNodeMixin {
  /**
   * 验证类型
   */
  validateType: VERIFY_TYPE;
}

/**
 * 图片热区基础
 */
interface ICFImageMapBase {
  /**
   * 热点图片信息
   */
  mapImage: CFImageInNode;
  /**
   * 热点图片计算比例时的基准高度
   */
  mapImgHeight: number;
  /**
   * 热点图片计算比例时的基准宽度
   */
  mapImgWidth: number;
}

/**
 * 图片热点节点
 * @ignore
 */
interface ICFHotSpotNode extends ICFSubjectNode, ICFImageMapBase {
  /**
   * 是否自动显示热点
   */
  autoShowRect: boolean;
  /**
   * 是否自动显示选项文字
   */
  autoShowText: boolean;
}

/**
 * 图片热力节点
 * @ignore
 */
interface ICFHeatMapNode extends ICFSubjectNode, ICFImageMapBase {
  /**
   * 做答点颜色
   */
  pointColor: string;
  /**
   * 做答点半径
   */
  pointRadius: number;
}

/**
 * 填空节点
 * @ignore
 */
interface ICFFillNode extends ICFSubjectNode, ICFFillNodeMixin { }

/**
 * 级联节点
 * @ignore
 */
interface ICFCascadeNode extends ICFSubjectNode {
  /**
   * @ignore
   * 级联组输出口
   */
  cascadeStart: ICFPort;
}

/**
 * 多选节点掺元
 * @ignore
 */
interface ICFMultiSelectNodeMixin extends ICFNode {
  /**
   * 是否多选
   * @ignore
   */
  multiSelect: boolean;
  /**
   * 最少选择数,解析前
   * @ignore
   */
  multiMin: string | number;
  /**
   * 最大选择数,解析前
   * @ignore
   */
  multiMax: string | number;
  /**
   * 最小需要选择的数量
   */
  min: number;
  /**
   * 最多允许选择的数量
   */
  max: number;
}

/**
 * 菜单节点
 * @ignore
 */
interface ICFMenuNode extends ICFSubjectNode, ICFMultiSelectNodeMixin {
  /**
   * 菜单弹出方式 解析前
   * @ignore
   */
  menuType: number;
  /**
   * 占位符
   */
  placeholder: string;
  /**
   * 多行数量 解析前
   * @ignore
   */
  lineCount: number;
  /**
   * 多行数量
   *
   * UI需要渲染,下拉菜单中每隔项目最多可以展示为多少行
   */
  multiLine: number;
  /**
   * 菜单弹出方式 解析后
   *
   *
   * UI需要渲染
   * 从不同的地方弹出菜单
   */
  display: string;
  /**
   * 是否多选
   */
  multiple: boolean;
  /**
   * 值
   * UI需要渲染,选中后的值
   */
  value: string;
}

/**
 * 评分项中的自定义属性，默认为空对象，UI端可以重新定义该类型，
 * typescript会进行类型合并，这样在UI端就可以自己随意往其中塞数据，
 * 并且可以获得类型辨析功能
 */
interface IRateItemCustomData { }

/**
 * 拥有自定义图标的对象规范
 */
interface CFCustomIconOwner {
  /**
   * 自定义图标原始对象
   */
  icon: ICFNodeIcon;
  /**
   * 解析后的未激活或未选中时的图标地址
   */
  normalIconUrl: string;
  /**
   * 解析后的被激活或者被选中时的图标url
   * 未激活或者未选中时展示[[CFCustomIconOwner.normalIconUrl]]
   *
   * 激活或者选中时选中时展示[[CFCustomIconOwner.activeIconUrl]]
   */
  activeIconUrl: string;
}

/**
 * 评分项标准
 */
interface CFRateItem extends CFCustomIconOwner {
  /**
   * 由于UI端不可以更改任何核心包提供的数据
   * 但是有时候可能需要放一些自定的数据在评分项上
   * 这个属性就是专门给UI端放置自定义数据的地方
   * 默认为一个空对象
   */
  customData: IRateItemCustomData; // anti-readonly
  /**
   * 展示的文本
   */
  text: string;
  /**
   * 评价权值
   * 代表点击该项之后应该给目标选项评多少分
   */
  value: string;
  /**
   * uuid
   */
  uuid: string;
}

/**
 * 演示评价节点
 * @ignore
 */
interface ICFSlideRateNode extends ICFSubjectNode, ICFFillNodeMixin {
  /**
   * 评价项列表
   * UI需要为每个普通选项渲染出这个列表
   * 点击某个项目后就当成该给该选项进行了该项所对应评价权值的的评价
   */
  rateOptions: CFRateItem[];
}

/**
 * 奖励节点
 * @ignore
 */
interface ICFGiftNode extends ICFInputNodeMixin {
  /**
   * 结束按钮文字
   * @ignore
   */
  endBtnText: string;
  /**
   * 跳转链接
   * @ignore
   */
  linkUrl: string;
  /**
   * 活动名称
   */
  activityName: string;
  /**
   * 原始描述
   * @ignore
   */
  describe: string;
  /**
   * 祝福语
   */
  blessings: string;
  /**
   * 中奖id
   * @ignore
   */
  goalId: string;
  /**
   * 手机号码
   */
  phoneNumber: string;
  /**
   * 奖励类型
   * @ignore
   */
  giftType: GIFT_TYPE;
  /**
   * 奖励数量
   * @ignore
   */
  giftCount: number;
  /**
   * 是否需要短信验证
   * @ignore
   */
  needSendNote: boolean;
  /**
   * 是否需要核销码
   * @ignore
   */
  needVerification: boolean;
}

/**
 * 结束节点
 * @ignore
 */
interface ICFEndNode extends ICFInOutNodeMixin, CFMediaNodeMixin {
  /**
   * 跳转链接
   * @ignore
   */
  linkUrl: string;
  /**
   * 结束按钮文字
   * @ignore
   */
  endBtnText: string;
  /**
   * 是否抛弃答案
   * @ignore
   */
  abandonAnswer: boolean;
  /**
   * 结束请求信息
   * @ignore
   */
  request: ICFRequest;
}

/**
 * 图形打分节点
 * @ignore
 */
interface ICFIconMarkNode extends ICFSubjectNode, ICFFillNodeMixin {
  /**
   * 打分图形名称
   * @ignore
   */
  markImgName: string;
  /**
   * 图形数量
   * @ignore
   */
  markImgCount: string | number;
}

/**
 * 分值打分节点
 * @ignore
 */
interface ICFValueMarkNode extends ICFSubjectNode, ICFFillNodeMixin {
  /**
   * 是否显示输入框,如果值为true
   */
  showInput: boolean;
  /**
   * 打分最小值
   * @ignore
   */
  markMin: string | number;
  /**
   * 打分最大值
   * @ignore
   */
  markMax: string | number;
  /**
   * 低分描述
   * @ignore
   */
  minText: string;
  /**
   * 高分描述
   * @ignore
   */
  maxText: string;
  /**
   * 分值步进
   * @ignore
   */
  markStep: number;
}

/**
 * 抽奖信息
 * @ignore
 */
interface ILotteryInfo {
  /**
   * 标题
   */
  title: string;
  /**
   * 说明
   */
  summary: string;
  /**
   * 图片名称
   */
  imageName: string;
  /**
   * 中奖图片高度
   * @ignore
   */
  imageHeight: number;
  /**
   * 中奖图片宽度
   * @
   */
  imageWidth: number;
}

/**
 * 抽奖节点
 * @ignore
 */
interface ICFLotteryNode extends ICFNode, ICFOptNodeMixin {
  /**
   * 中奖成功要展示的信息
   */
  success: ILotteryInfo;
  /**
   * 中奖失败要展示的信息
   */
  fail: ILotteryInfo;
  /**
   * 是否显示奖励信息,如果显示,则在抽奖页面上显示[[CFLotteryPage.options]]的内容
   * 显示出各个奖项的名称和数量.
   */
  showRewards: boolean;
  /**
   * 奖项列表
   */
  options: CFLotteryOption[];
}

/**
 * 奖项信息
 * @ignore
 */
interface ICFRewardItem {
  /**
   * 名称
   */
  rewardName: string;
  /**
   * 数量
   */
  rewardNumbering: number;
}

/**
 * 开始节点
 * @ignore
 */
interface ICFStartNode extends ICFNode, ICFStartMiniState, ICFOutputNodeMixin, CFMediaNodeMixin {
  /**
   * 问卷中包含使用的模板id列表
   */
  templates: string[];
  /**
   * 验证配置
   * @ignore
   */
  validation: ICFValidation;
  /**
   * 是否图片缩放
   */
  imgScale: boolean;
  /**
   * 内嵌页面地址
   */
  welcomeUrl: string;
  /**
   * 自动开始
   * @ignore
   */
  startAuto: boolean;
  /**
   * 禁用微信分享
   * @ignore
   */
  noWxShare: boolean;
  /**
   * @ignore
   */
  startName: string;
  /**
   * @ignore
   */
  qsnrName: string;
  /**
   * @ignore
   */
  questionText: string;
  /**
   * @ignore
   */
  describe: string;
  /**
   * @ignore
   */
  logoText: string;
  /**
   * @ignore
   */
  startBtnText: string;
  /**
   * @ignore
   */
  hasVar: boolean;
  /**
   * @ignore
   */
  passed: boolean;
  /**
   * @ignore
   */
  nextBtnText: string;
  /**
   * @ignore
   */
  prevBtnText: string;
  /**
   * @ignore
   */
  goBackEnabled: boolean;
  /**
   * @ignore
   */
  resumeEnabled: boolean;
  /**
   * @ignore
   * 当前语言
   */
  currentLang: string;
}

/**
 * 循环节点
 * @ignore
 */
interface ICFLoopNode extends ICFInOutNodeMixin {
  loopEnd: ICFPort;
  loopStart: ICFPort;
}

/**
 * 随机节点
 * @ignore
 */
interface ICFRandomNode extends ICFInOutNodeMixin {
  randomStart: ICFPort;
  customDestCount: number;
  customNodeCount: number;
  csNcDone: boolean;
}

/**
 * @ignore
 */
interface ICFLogicNode extends ICFNode, ICFOptNodeMixin, ICFInOutNodeMixin {
  outputN: ICFPort;
  logicType: LOGIC_TYPE;
  reverse: boolean;
}

/**
 * 最大差分节点
 * @ignore
 */
interface ICFMaxDiffNode extends ICFSubjectNode {
  /**
   * 每个任务页显示的项目数
   * @ignore
   */
  itemCountPerTask: number;
  /**
   * 任务重复次数
   * @ignore
   */
  taskCount: number;
  /**
   * 积极描述文字
   */
  positiveDesc: string;
  /**
   * 消极描述文字
   */
  negativeDesc: string;
}

/**
 * 选项分组的mixin
 */
interface ICFOptGroupNodeMixin extends ICFNode {
  /**
   * 选项分组设置
   * 如果有这个设置，那么就不使用原始的按照选项来排序，而是按照其他选项来分组
   * @ignore
   */
  optionGroups?: ICFNodeOptGroup[]
  /**
   * 选项和选项分组的关系
   * @ignore
   */
  optionGroupsRelationship?: IOptionGroupsRelationship;
  /**
   * 选项分组设置，当题目上发现该属性时，放弃使用[[CFSubjectQuestion.options]]，转而使用该属性的结构来渲染选项
   * 该属性是树形递归结构,
   * 虽然当前所有题目的类型上都有该属性，
   * 但只有`选择题`，`图标选择题`，`图片选择题`，`拖拽打分题`，`图形打分题`，`填空题`，`数值分配题`等这几题需要支持组渲染
   * 
   * 其他题目还是维持以前的状态。
   * 
   * 使用分组渲染中，节点的布局设置中的控制，如果方便保留则保留，如果很麻烦则可以先不实现。
   */
  optGroups?: ICFOptGroupChild[]
}

//#endregion
