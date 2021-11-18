/**
 * @ignore
 */
type ICFLimitFilter = (opt: CFOption, question?: CFQuestion) => boolean;

/**
 * @ignore
 */
interface ICFVarRaw {
  /**
   * 显式变量的变量值
   */
  value?: string;
  type: VAR_TYPE;
  name?: string;
  uuid: string;
  request?: ICFRequest;
}

/**
 * @ignore
 */
interface ICFLoop {
  destInputId: string;
  node: ICFNode;
  varList: ICFLoopVar[];
  replacements: ICFLoopRep[];
  currentIndex: number;
}
/**
 * @ignore
 */
interface ICFLoopVar extends CFOption {
  index: number;
  number: number;
  text: string;
  uuid: string;
  image: CFImageInNode;
  passRef: ICFVarPassRef;
  refOptId: string;
}
/**
 * @ignore
 */
interface ICFLoopRep {
  loopNodeId: string;
  outerIndex?: number;
  outerLoopId?: string;
  index: number;
  uuid: string;
  refOptId: string;
  refText?: string; // 循环来源文字（锁定为循环来源选项的文字）
  text: string; // 循环来源文字（循环节点上明确指定的选项分部的内容，动态）
  value: number | string; // 循环来源分值
  number: number; // 循环来源编号
  image: CFImageInNode; // 循环来源图片
  label: string;
  mapping: CFMappingProps;
}

/**
 * @ignore
 */
interface ICFVarPassRef {
  value: string | number;
  optComment: string;
  image: CFImageInNode;
  number: number;
  text: string;
  label: string;
  mapping: CFMappingProps;
}

/**
 * @ignore
 */
interface ICFVarPart {
  /**
   * 如果是动态的,则说明该会随运行条件变换形态
   * 需要调用该方法获得最新形态
   */
  getDynamicProps?(question: CFSubjectQuestion): Partial<ICFVarPart>;
  type: VAR_TYPE;
  uuid: string;
  inBunch?: boolean;
  expOpr?: string;
  blOpr?: string;
  split?: string;
  filter?: (param: ICFVarExtParam) => Promise<CFOption[]>;
  getBool?: (param: ICFVarExtParam) => Promise<boolean>;
  getText?: (param: ICFVarExtParam) => Promise<string | undefined>;
  /**
   * 获取图片，对于节点图片可能会获取到多张，也会使用多张，
   * 对于选项图片，尽管有可能获得多张，现在的需求只会只用一张，
   * 为了统一我们们都遵从可以获取多张的规则，至于在选项中我们每次只取第一张
   * 为了取值快速方便取第一张，我们这里规定所有实现getImages放的地方，如果取不到任何图片
   * 则返回一个空数组。
   *
   * 关于节点的图片解析功能，一开始不了解行业规范，系统过度设计了，其实有文本内嵌图片功能就能满足节点的图片显示功能，
   * 因为节点上的图片都是为了显示，对于数据统计与展现是无关紧要的，所以节点上根本不需要数据结构层面的图片对象
   * 更不用说图片数组对象，只需要能在文本中内嵌图片用于答题展示即可。
   *
   * 而对于选项，在数据统计层面上来看，图片对象则还是必要的，但是肯定每个属性只需要一张图片，所以符合规范的应该是
   * getImage方法，而不是getImages方法，而且只会解析一张图片
   *
   * 当前，我们仍然维持现状，等后续找个时间转成成新的规则
   */
  getImages?: (param: ICFVarExtParam) => Promise<CFImageInNode[]>;
  getIcon?: (param: ICFVarExtParam) => string;
}

/**
 * @ignore
 */
interface ICFVarDetail extends IRawVarDetail {
  name?: string;
  /**
   * 是否在编辑样式标签内
   */
  inEdist?: boolean;
}

/**
 * @ignore
 */
interface ICFVarInfo extends ICFVarDetail, ICFVarRaw, ICFVarPart {
  type: VAR_TYPE;
  value?: string;
  /**
   * 关联问题
   */
  question?: CFQuestion;
  /**
   * 关联选项
   */
  option?: CFOption;
  /**
   * 节点分部
   */
  nodePart?: ICFVarPart;
  /**
   * 选项分部
   */
  optionPart?: ICFVarPart;
  /**
   * 选项过滤器
   */
  optionFilter?: ICFVarPart;
  /**
   * 关联循环节点的id
   */
  loopNodeId?: string;
  /**
   * 用于变量映射表中匹配变量的映射id,一般有uuid,limit,limitSrc,limitRnd拼接而成
   */
  mapId?: string;
  isMedia?: boolean;
  inEdist?: boolean;
}

/**
 * @ignore
 */
interface ICFVarMapUsage {
  /**
   * 变量使用题目
   */
  question: CFQuestion;
  /**
   * 变量使用选项,只要使用在选项中才有
   */
  option?: CFOption;
  /**
   * 排他id,当某些题目中的变量会被反复解析的时候,依靠该id只用最后一次的解析结果
   * 目前只有问题描述中有这种情况
   */
  exclusiveId?: VAR_MAP_GROUP;
}

/**
 * 变量扩展参数类型
 * @ignore
 */
interface ICFVarExtParam {
  spaceRep?: string;
  /**
   * 变量使用信息,如果指定了该参数
   * 则直接下层变量解析出来的值会被做成映射表添加到拥有省身上,深层嵌套的变量不会这样做.
   */
  usage?: ICFVarMapUsage;
  /**
   * 总状态
   */
  state: CFSurveyState;
  /**
   * 变量信息
   */
  varInfo?: ICFVarInfo;
  /**
   * 指定选项, 有该属性时所有的操作都会优先使用该选项
   */
  specifiedOpt?: CFOption;
  /**
   * 中间连接符,有多个选项进行取文字时,会用该属性做连接符 默认空
   */
  joinBy?: string;
  /**
   * 里层中间连接符.当前一层不会应该改连接符,但更进一层解析是就会开始使用这个分隔符
   */
  innerJoinBy?: string;
  /**
   * 关联循环节点id
   */
  loopNodeId?: string;
  /**
   * 是否需要其他选项,需要的话,过滤选项时会考虑其他选项,否则只管正常选项
   */
  needOtherOpt?: boolean;
  /**
   * 是否使用纯文字,指定该项时,图片文字会使用图片名或关联选项名,否则会使用嵌套图片地址
   */
  pureText?: boolean;
  /**
   * 是否保留原有的变量包裹层
   */
  keepWrap?: boolean;
}
