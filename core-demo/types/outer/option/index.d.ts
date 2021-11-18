/**
 * 节点连接口
 * @ignore
 */
interface ICFPort {
  /**
   * id
   */
  uuid: string;
}

/**
 * 自动赋值数据
 * @ignore
 */
interface ICFAutoInputConfig {
  /**
   * 要自动赋值的内容
   */
  defaultValue: string;
}

/**
 * 验证选项数据
 */
interface CFValidateOptBase {
  /**
   * 日期级别
   * 1: 年
   * 2: 年-月
   * 3: 年-月-日
   */
  grade?: number;
  /**
   * 小数位数
   * @ignore
   */
  scale?: number;
  /**
   * @ignore
   */
  tolerance?: CHAR_TYPE[];
  /**
   * 允许输入的最多项目数
   */
  itemsMax?: number;
  /**
   * 允许输入的最小项目数
   */
  itemsMin?: number;
  /**
   * @ignore
   */
  autoCpltIds?: string[];
  /**
   * 重新打开问卷恢复断点续答答案时前一次语言，这个在多语言问卷下，
   * 对于恢复自动提示的提示标签，非常重要，因为提示标签上的文字也是可以配置多语言的
   * 而自动提示控件展示标签时，是用上一次输入的内容去匹配标签，在非多语言的使用总是能匹配中
   * 但是在多语言的场合，比如上次在en_us的语言中，选中标签后输入的是英文内容，当切换到中文尝试
   * 恢复到这一题时，自定提示的控件会尝试使用之前缓存下来的因为答案去匹配现在的中文数据表，这样就
   * 总是匹配不到内容，导致这个控件无法恢复出数据展示出来。
   *
   * 所以特地提供这个属性，方便自动提示控件可以发现有该属性时，可以通过这个前语言去匹配到正确的内容展示出来。
   */
  prevCpltLang?: string;
  /**
   * @ignore
   */
  selectText?: string;
  /**
   * 时间跨度级别
   * 1: 天
   * 2: 天-小时
   * 3: 天-小时-分钟
   * 4: 小时
   * 5: 小时-分钟
   * 6: 小时-分钟-秒钟
   */
  timeGrade?: number;
  /**
   * 供以选择的文字列表
   * 当[[CFValidateOptBase.fillType]]是`list_select`需要提供一个下拉列表选择空间
   * 空间中药展示的项目列表文字,就使用该属性的文字列表
   * 当选中某一个项时,就将该项的文字当做输入内容
   * 可以选择多项,每项之间用半角逗号分隔.
   */
  selectList?: string[];
  /**
   * 允许输入的最大值
   */
  validateMax?: number | Date;
  /**
   * 允许输入的最小值
   */
  validateMin?: number | Date;
  /**
   * 默认值
   * @ignore
   */
  defaultValue?: number | Date;
  /**
   * 自动提示时是否使用严格匹配
   */
  simpleCplt?: boolean;
  /**
   * 自动提示数据
   * 当[[CFValidateOptBase.fillType]]是`auto_complete`需要提供一个自动提示输入控件
   * 该控件在输入任何字符内容时,这些字符并不是答案，而是搜索字符
   * 需要使用从@choiceform/os-client-core/dist/support/atcp中提供的[[CFAtcp.getAutoCompleteData]]方法
   * 来搜索能匹配的提示项目，然后这些项目的name和icon属性显示为一个个标签到一个自动提示列表中供用户选择
   * 用户选择以后,把选择到的标签的name当成真正的输入内容,用户可以选择多个标签,
   *
   * 输入搜索字符的过程中需要调用[[CFUIEventHandler.handleAutoCpltInput]]方法
   *
   * 点击提示项后，需要将当前所有已选择的提示项内容的值用半角逗号分隔当成输入值调用[[CFUIEventHandler.handleOptionInput]]方法
   *
   */
  completeGroups?: CFAutoCpltData[];
  /**
   * 是否备注必填
   * @ignore
   */
  fillRequired?: boolean;
  /**
   * 验证类型
   * 填空选项的输入规则,有些输入方式需要提供输入控件支持
   * 有些则只需要提供普通输入框
   * 所有方式都可以根据类型显示对应的提示(图标?,文字? UI自己决定)
   */
  fillType?: FILL_TYPE;
  /**
   * 验证最小值
   * @ignore
   */
  fillStart?: number | string;
  /**
   * 验证最大值
   * @ignore
   */
  fillEnd?: number | string;
  /**
   * UI中输入的自动提示文字缓存
   * @ignore
   */
  atcpTrigger?: string;
}

/**
 * 验证选项类型
 */
interface CFValidateOpt extends CFOption, CFValidateOptBase { }

/**
 * 级联信息
 * @todo 有些数据能使用选项的，自己不要额外定义
 */
interface CFCascade {
  /**
   * 菜单显示位置
   */
  display: string;
  /**
   * 关联的选项
   */
  option: CFValidateOpt;
  /**
   * @ignore
   */
  groupId?: string;
  /**
   * 内层级联信息列表
   */
  list?: CFCascade[];
  /**
   * 是否多选
   */
  multiple?: boolean;
  /**
   * 最少选几个
   */
  min?: number;
  /**
   * 最多选几个
   */
  max?: number;
  /**
   * @ignore
   */
  required?: boolean;
  /**
   * 内容
   */
  text?: string;
  /**
   * 是否被选中
   * 
   */
  selected: boolean;
  /**
   * @ignore
   */
  resultId: string;
  /**
   * 提示信息,当某一层中的选择不满足要求是,该属性会被设置为提示信息
   * UI需要在该层渲染这个提示信息
   */
  hint?: string;
  /**
   * 提示占位符
   */
  placeholder?: string;
}

/**
 * 选项中的自定义属性，默认为空对象，UI端可以重新定义该类型，
 * typescript会进行类型合并，这样在UI端就可以自己随意往其中塞数据，
 * 并且可以获得类型辨析功能
 */
interface IOptionCustomData { }

/**
 * 通用选项类
 *
 */
interface CFOption extends ICFPort {
  /**
   * 由于UI端不可以更改任何核心包提供的数据
   * 但是有时候可能需要放一些自定的数据在选项上
   * 这个属性就是专门给UI端放置自定义数据的地方
   * 默认为一个空对象
   */
  customData: IOptionCustomData; // anti-readonly
  /**
   * 是否处于不可用状态
   * 如果取值为true,则UI要渲染该选项,但是禁用操作.
   */
  disabled: boolean;
  /**
   * 辅助输入数据
   */
  assistValue: CFAssistProps;
  /**
   * @ignore
   */
  label: string;
  /**
   * @ignore
   */
  isRef: boolean;
  /**
   * 映射属性
   */
  mapping: CFMappingProps;
  /**
   * @ignore
   */
  useComment: boolean;
  /**
   * 选项名称
   * UI需要渲染该项
   */
  text: string;
  /**
   * 选项的输入值
   * 内容根据用户的输入变化而变化
   * 对于包含输入内容的选项,UI需要渲染该项
   */
  value: string;
  /**
   * @ignore
   */
  _selected: boolean;
  /**
   * 选项是否被选中
   * UI需要根据该属性的不同将选项渲染成选中状态和非选中状态
   * 让答题者知道当前哪些选项被选中了
   */
  selected: boolean;
  /**
   * @ignore
   */
  mutexNumber: number;
  /**
   * 选项的唯一渲染id,和[[CFQuestion.renderId]]类似
   * 绑定后可以唯一定位UI中的某个选项,用于快速定位错误
   */
  renderId: string;
  /**
   * 如果该选项的回答内容不符合规范,则该属性会被设置为一个错误消息
   * UI需要渲染该消息,让答题者知道为什么错了
   */
  errorMessage: string;
  /**
   * @ignore
   */
  _previewTransferred: boolean;
  /**
   * 原始索引
   * @ignore
   */
  index: number;
  /**
   * 展示后的真实索引,未展示的为负值.
   * 因为选项可能被隐藏,索引需要保证真实索引
   * 用于在随机顺序追随引用源时作为可靠的参考
   * @ignore
   */
  realIndex: number;
  /**
   * @ignore
   */
  autoSelectMarked: boolean;
  /**
   * 选项展示方式
   * UI要根据将选项渲染成不同的模式
   * select 展示为纯选择选项
   * input 展示位纯输入选项
   * select-input初始需要展示位选择选项,当该选项被选中时需要额外展示一个输入控件
   */
  inputType: OPT_ACT_TYPE;
  /**
   * @ignore
   */
  cachedValue: string;
  /**
   * 是否为其他选项
   */
  isOther: boolean;
  /**
   * 对于输入类型的选项时,在用户还未进行任何输入时
   * UI将此属性渲染为占位符提示文字
   */
  placeholder: string;
  /**
   * @ignore
   */
  optComment: string;

  /**
   * @ignore
   */
  number: number;
  /**
   * @ignore
   */
  visible: boolean;
  /**
   * @ignore
   */
  passRef?: ICFVarPassRef;
  /**
   * @ignore
   */
  selectConfig: ICFLogicConfig;
  /**
   * @ignore
   */
  displayConfig: ICFLogicConfig;
  /**
   * @ignore
   */
  autoInputConfig: ICFAutoInputConfig;
  /**
   * @ignore
   */
  followRndIdx: number;
  /**
   * @ignore
   */
  groupName: string;
  /**
   * 推导配置列表
   * @ignore
   */
  inferList?: ICFInferConfig[];
  /**
   * 是否为其他选项
   * @ignore
   */
  isOtherOpt: boolean;
  /**
   * 选项类型
   * @ignore
   */
  optionType: OPTION_TYPE;
  /**
   * 选项所处的位置
   */
  position?: OPTION_POSITION;
}

/**
 * 图标题选项
 */
interface CFSelectIconOption extends CFOption, CFCustomIconOwner {

}

/**
 * 填空题选项
 */
interface CFFillOption extends CFValidateOpt {
  /**
   * 前缀文字，在输入框前显示。
   */
  prefix: string;
  /**
   * 后缀文字，在输入框后面显示，一般是单位之类的文字。
   */
  suffix: string;
}

/**
 * 级联题选项
 */
interface CFCascadeOption extends CFOption {
  /**
   * @ignore
   */
  cascadePath: string;
}

/**
 * 图形打分题选项
 */
interface CFIconMarkOption extends CFOption {
  /**
   * 图形数量
   */
  iconCount: number;
  /**
   * 图形名称
   */
  iconName: string;
}

/**
 * 拖拽打分题选项
 */
interface CFValueMarkOption extends CFOption {
  /**
   * 最小分值
   * 如果打分方式是分值打分的时候需要渲染
   */
  minValue: number;
  /**
   * 分值步进,UI在分支打分滑竿上拨动一次改变的分值.
   */
  step: number;
  /**
   * 最大分值
   * 如果打分方式是分值打分的时候需要渲染
   */
  maxValue: number;
  /**
   * 最小分值描述
   * 如果打分方式是分值打分的时候需要渲染
   */
  minValueText: string;
  /**
   * 最大分值描述
   * 如果打分方式是分值打分的时候需要渲染
   */
  maxValueText: string;
}

/**
 * 演示评价选项
 */
interface CFSlideRateOption extends CFOption, CFSelectImageOption { }

/**
 * 权重选项
 */
interface CFWeightOption extends CFOption {
  /**
   * 当前全向分值在总权重值中的占比
   */
  percent: string;
  /**
   * 权重最大值原始值
   */
  maxMark: number | string;
  /**
   * @ignore
   */
  comment: boolean;
  /**
   * 颜色,UI渲染是使用改颜色渲染以区分不同选项.
   */
  color: string;
  /**
   * 权重最大值,解析后的值
   */
  maxValue: number;
}

/**
 * 抽奖奖项,无需被渲染
 */
interface CFLotteryOption extends CFOption {
  /**
   * 抽奖总数
   * @ignore
   */
  rewardCount: number;
  /**
   * 抽奖名称
   * @ignore
   */
  rewardName: string;
}

/**
 * 范围定位选项,无需被渲染
 */
interface CFAreaOption extends CFOption {
  /**
   * 中心点经度
   * @ignore
   */
  longitude: number;
  /**
   * 中心点纬度
   * @ignore
   */
  latitude: number;
  /**
   * 范围半径
   * @ignore
   */
  radius: number;
}

/**
 * 图片选修题选项
 */
interface CFSelectImageOption extends CFOption {
  /**
   * 图片选择题除了渲染选项文字之外
   * 还要渲染该选项的图片
   */
  image: CFImageInNode;
}

/**
 * 上传结果类型
 * @ignore
 */
interface ICFUploadResult {
  /**
   * 上传后的在服务器上的文件路径
   */
  filePath: string;
  /**
   * 上传后的文件内容
   * 如果是图片则是图片的base64内容
   * 如果是其他文件,则是原始文件名绘制成canvas后的base64内容
   * UI需要渲染该内容为一个图片
   */
  value: string;
  /**
   * 被压缩后的内容，适用于缓存，
   * 因为原始内容可能非常大会撑爆浏览器缓存，
   * 当发现有该属性时会缓存该属性，否则仍然缓存value
   * @ignore
   */
  miniValue: string;
  /**
   * 原始文件名 UI需要渲染
   */
  fileName: string;
  /**
   * 是否图片
   */
  isImage: boolean;
  /**
   * 文件类型
   * 诸如: application/json, video/mp4, image/jpg
   */
  fileType: string;
  /**
   * 进度,上传文件过程中,UI需要渲染该进度作为提示
   */
  progress?: number;
}

/**
 * 上传题选项
 */
interface CFUploadOption extends CFOption, ICFUploadResult {
  /**
   * 上传文件格式限制说明
   */
  fileLimits: UPLOAD_LIMIT[];
  /**
   * 接受类型
   */
  accept: string;
  /**
   * 上传完后的图片信息,以后后续节点引用媒体变量
   * @ignore
   */
  image: CFImageInNode;
}

interface CFHotSpotGraph {
  /**
   * @ignore
   */
  x: number;
  /**
   * @ignore
   */
  y: number;
  /**
   * 唯一id
   */
  uuid: string;
  /**
   * 偏移
   */
  transform: string;
  /**
   * path绘制路径
   */
  pathD: string;
  /**
   * 图形区域，主要用于判断图形层级，图形区域小的应该在图形面积大的上方
   */
  area: number;
  /**
   * @ignore
   */
  points: { x: number; y: number }[];
}

/**
 * 图片热点选项
 */
interface CFHotSpotOption extends CFOption {
  /**
   * 颜色
   */
  color: string;
  /**
   * 图形列表
   */
  graphs: CFHotSpotGraph[]
}

/**
 * 热图选项
 */
interface CFHeatMapOption extends CFOption {
  /**
   * 输入的坐标
   */
  point: ICoords;
}

/**
 * 排序选项
 */
interface CFSequenceOption extends CFOption {
  /**
   * 当前选项所排在的位置
   * 进行排序后会发生变化
   */
  sortNo: number;
  /**
   * 是否为排序目标
   * @ignore
   */
  seqTarget: boolean;
}

/**
 * 矩阵列选项
 */
interface CFMatrixXOption extends CFOption {
  /**
   * 行选项高度
   * hidden: 不需要显示该选项，这个在核心包会处理掉
   * auto: 自动适应
   * string: 单位可能会有 px 和 % 两种，需要UI端去适配
   */
  width?: string | MATRIX_OPTION_DISPLAY_MODE
  /**
   * 二级标题
   */
  extraTitle?: string
}

/**
 * 矩阵行选项
 */
interface CFMatrixYOption extends CFOption {
  /**
   * 行选项高度
   * hidden: 不需要显示该选项，这个在核心包会处理掉
   * auto: 自动适应
   * string: 单位可能会有 px 和 % 两种，需要UI端去适配
   */
  height?: string | MATRIX_OPTION_DISPLAY_MODE
}
/**
 * 最大差分评分记录
 */
interface CFMaxDiffRecord {
  /**
   * 所处在第几轮任务
   */
  round: number;
  /**
   * 在该轮中的得分
   */
  value: MAX_DIFF_VALUE;
}

/**
 * 最大差分选项
 */
interface CFMaxDiffOption extends CFSelectImageOption {
  /**
   * 得分分布
   * @ignore
   */
  records: CFMaxDiffRecord[];
}

/**
 * @ignore
 */
interface ICFRefOption extends CFOption {
  /**
   * 关联的选项id
   */
  refOptId: string;
  /**
   * 关联的选项引用id
   */
  referId: string;
  /**
   * 引用源的真实索引
   */
  refIndex: number;
  /**
   * 引用源展示后的真实索引
   */
  refRealIndex: number;
}

/**
 * @ignore
 */
interface ICFRefOptExtracted {
  text: string;
  image?: CFImageInNode;
  icon?: string;
  passRef?: ICFVarPassRef;
}

/**
 * @ignore
 */
interface ICFReformOptResult {
  options: CFOption[];
  hiddenOptions?: CFOption[];
  otherOptions?: CFOption[];
}

/**
 * @ignore
 */
interface ICFOptionRefer extends IRawVarDetail {
  uuid: string;
}

/**
 * @ignore
 */
interface ICFDataOption extends CFOption, CFSelectIconOption, CFSelectImageOption { }
