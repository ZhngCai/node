/**
 * 原始变量信息的识别分部
 */
interface IRawVarIdentity {
  /**
   * 最基础的id，显式变量和全局隐式变量就是该id
   * 从题目中抽取的变量，该id为空。
   */
  baseId: string;
  /**
   * 关联节点id
   */
  nodeId: string;
  /**
   * 关联节点分部id
   */
  nodePartId: string;
  /**
   * 关联选项id
   */
  optId: string;
  /**
   * 选项过滤分部id
   */
  optFilterId: string;
  /**
   * 选项数据分部id
   */
  optPartId: string;
}


interface IRawVarLimit {
  /**
   * 过滤方式类型
   */
  limitType: number;
  /**
   * 过滤参考开始值
   */
  limitStart: string;
  /**
   * 过滤参考结束值
   */
  limitEnd: string;
  /**
   * 过滤比较数据源
   */
  limitSrc: number;
  /**
   * 随机抽取数量
   */
  limitRnd: string;
}


interface IRawImgSize {
  /**
 * 图片高度
 */
  imgHeight?: number;
  /**
   * 图片宽度
   */
  imgWidth?: number;
}

/**
 * 原始变量信息的配置分部
 */
interface IRawVarConfig extends IRawVarLimit, IRawImgSize {
  /**
   * 变量占位设置
   */
  phParams: CFParamItem[];
  /**
   * 乱序标记
   */
  disorder: boolean;
  /**
   * 不加入结果标记
   */
  outOfResult?: boolean;
}

/**
 * 原始变量详情
 */
interface IRawVarDetail {
  /**
   * 识别分部
   */
  identity: IRawVarIdentity;
  /**
   * 配置分部
   */
  config: IRawVarConfig;
}