/**
 * 寻找下一题的规则
 * @ignore
 */
interface ICFNextRule {
  /**
   * 搜索规则方法
   * @param list 节点列表
   * @param question 当前题目
   * @param state 总状态
   * @returns 下一个节点的信息
   */
  findNext(list: ICFNode[], question: CFQuestion, state: CFSurveyState): Promise<ICFNextNodeStatus>;
}

/**
 * 搜索到的下一个节点的信息
 * @ignore
 */
interface ICFNextNodeStatus {
  /**
   * 相关节点
   */
  node?: ICFNode;
  /**
   * 所处的循环状态
   */
  loop?: ICFLoop;
  /**
   * 所处的循环状态栈
   */
  loopStack?: ICFLoop[];
  /**
   * 所处的随机状态
   */
  random?: ICFRandom;
}

/**
 * 节点所处的随机状态
 * @ignore
 */
interface ICFRandom {
  /**
   * 当前随机组索引
   */
  currentIndex: number;
  /**
   * 关联的随机节点
   */
  node: ICFNode;
  /**
   * 所有随机组头的入口id列表
   */
  destPortIds: string[];
  /**
   * 嵌套随机时的随机栈
   */
  stack: ICFRandom[];
}
/**
 * 节点列表伸展配置
 * @ignore
 */
interface ICFStretchConfig {
  /**
   * 伸展类型
   */
  type: STRETCH_TYPE;
  /**
   * 延时伸展的时间
   */
  delay?: number;
  /**
   * 是否为初始化期间
   */
  initial?: boolean;
}
