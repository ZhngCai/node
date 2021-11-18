/**
 * 逻辑条件
 * @ignore
 */
interface ICFLogic extends CFOption {
  /**
   * 是否为内嵌逻辑组
   */
  isGroup?: boolean;
  /**
   * 内嵌逻辑组运算类型
   */
  groupLogicType?: LOGIC_TYPE;
  /**
   * 内嵌逻辑组条件列表
   */
  groupLogicList?: ICFLogic[];
  /**
   * 计算类型id
   */
  markId: VALUE_LIMIT_TYPE;
  /**
   * 关联的变量id
   */
  relatedVarId: string;
  /**
   * 关联的内嵌内容
   */
  relatedEmbed: { text: string };
  /**
   * 分类限制类型
   */
  limitType: number;
  /**
   * 计算参照开始值
   */
  markStart: string | number;
  /**
   * 计算参照结束值
   */
  markEnd: string | number;
  /**
   * 关联的节点id
   */
  relatedNodeId: string;
  /**
   * 关联的选项id
   */
  relatedOptionId: string;
}

/**
 * 逻辑配置信息类
 * @ignore
 */
interface ICFLogicConfig {
  /**
   * 逻辑条件列表
   */
  options: ICFLogic[];
  /**
   * 逻辑运算方式
   */
  logicType: LOGIC_TYPE;
  /**
   * 是否逻辑反转
   */
  reverse : boolean;
}
/**
 * 开关值
 * @ignore
 */
type ICFSwitchValue = boolean | ICFLogicConfig;

/**
 * 逻辑验证类型
 * @ignore
 */
interface ICFValidateLogic extends ICFLogicConfig {
  /**
   * 验证未通过时的消息
   */
  message: string;
}
