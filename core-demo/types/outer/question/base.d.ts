/**
 * 题目类型信息
 * @ignore
 */
interface ICFTypeInfo {
  /**
   * 题目类型名,提示答题者这是一道什么题目
   * 如该属性有值,UI需要渲染出来
   */
  typeName?: string;
  /**
   * 具体的答题规则描述,让答题知道答题规则
   * 如该属性有值,UI需要渲染出来
   */
  typeDescription?: string;
}

/**
 * 题目中的自定义属性，默认为空对象，UI端可以重新定义该类型，
 * typescript会进行类型合并，这样在UI端就可以自己随意往其中塞数据，
 * 并且可以获得类型辨析功能
 */
interface IQuestionCustomData {}

/**
 * 题目基础类型
 */
interface CFQuestion extends ICFNode, ICFTypeInfo {
  __ques__: true;
  /**
   * 预留，其实很多题目并不需要该属性
   */
  value: string;
  /**
   * 由于UI端不可以更改任何核心包提供的数据
   * 但是有时候可能需要放一些自定的数据在节点上
   * 这个属性就是专门给UI端放置自定义数据的地方
   * 默认为一个空对象
   */
  customData: IQuestionCustomData; // anti-readonly
  /**
   * 动作
   * @ignore
   */
  actions: ICFNodeAction[];
  /**
   * 是否已经被回复，包含了答案
   */
  hasAnswer: boolean;
  /**
   * 是否实时预览模式
   */
  realtimePreview: boolean;
  /**
   * 原始节点
   * @ignore
   */
  origin: ICFNode;
  /**
   * 选择类型
   * 对于选择类型的题目有效,用于确定这是单选模式和多选模式
   * 对于选择类型的题目,UI需要根据此属性渲染成单选或多选的样子
   * 对于非选择类型的题目可以无视该属性.
   */
  selectType: SELECT_TYPE;
  /**
   * 是否显示必答标星
   * 如果该属性为true,则UI上需要显示一个标志告知该题是必答题
   */
  asterisks: boolean;
  /**
   * 问题文字
   * UI需要渲染该内容
   */
  title: string;
  /**
   * 描述文字
   * UI需要渲染该内容
   */
  description: string;
  /**
   * 总状态引用
   * 通过该属性可以访问到上一层数据
   */
  parent: CFSurveyState;
  /**
   * 循环状态栈
   * @ignore
   */
  loopStack: ICFLoop[];
  /**
   * 循环状态
   * @ignore
   */
  loop: ICFLoop;
  /**
   * 是否验证失败
   * @ignore
   */
  validateFailed?: boolean;
  /**
   * 验证失败次数
   * @ignore
   */
  validateFailTimes?: number;
  /**
   * 渲染id
   * UI中可以用它来绑定唯一确定一个题目的元素
   * 如在单页中靠它来滚动对位到出现错误的题目
   */
  renderId: string;
  /**
   * 前一道题
   */
  prev: CFQuestion;
  /**
   * 后一道题
   */
  next: CFQuestion;
  /**
   * 编号,该题的唯一代号
   * 如果有该属性,UI要渲染
   */
  number: string;
  /**
   * 答题消耗时间
   * @ignore
   */
  costTime: number;
  /**
   * 开始回答本题的时间
   */
  startTime: string;
  /**
   * 结束回答本题的时间
   */
  endTime: number;
  /**
   * 要求的标准答题最大时间（秒）
   * @ignore
   */
  maxAnswerTime: number;
  /**
   * 要求的标准答题最小时间（秒）
   * @ignore
   */
  minAnswerTime: number;

  /**
   * 关联的错误消息
   * 当单页存在很多题目,点击下一题按钮时,如果有些题目的回答内容不符合规范
   * 这些题目的该属性会被设置为一个错误消息,这时候UI需要在该题目的某个渲染该错误消息
   * 让答题者知道为什么错了.
   */
  errorMessage: string;
  /**
   * 随机组信息
   * @ignore
   */
  random: ICFRandom;
  /**
   * 是否已到达
   * @ignore
   */
  reached: boolean;
  /**
   * 内嵌变量映射表
   * @ignore
   */
  embedVarMaps: ICFVarMapItem[];
}

/**
 * 带选项的题目类型
 */
interface CFSubjectQuestion extends ICFSubjectNode, CFQuestion ,ICFOptGroupNodeMixin  {
  /**
   * 选项头部信息
   * @ignore
   */
  optionMappingHeads: ICFOptionHead[];
  /**
   * 被隐藏的选项列表
   * @ignore
   */
  hiddenOptions: CFOption[];
  /**
   * 原始节点
   * @ignore
   */
  origin: ICFSubjectNode;
  /**
   * 是否包含隐藏的选项
   * @ignore
   */
  hasOptShowHide: boolean;
  /**
   * 引用变量映射表
   * @ignore
   */
  referVarMaps: ICFVarMapItem[];
  /**
   * 选中推导最大数
   * @ignore
   */
  selectInferLimit: number;
  /**
   * 输入推导最大数
   * @ignore
   */
  inputInferLimit: number;
}
