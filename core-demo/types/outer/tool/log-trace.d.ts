/**
 * 设备信息探测结果
 */
interface CFDevice {
  browser: {
    name: string;
    version: string;
  };
  device: {
    type: DEVICE_TYPE;
    vendor: string;
    model: string;
  };
  engine: {
    name: string;
    version: string;
  };
  os: {
    name: string;
    version: string;
  };
}

/**
 * 答题时的操作动作记录信息
 * @ignore
 */
interface ICFRecord {
  /**
   * 描述
   */
  description: string;
  /**
   * 问卷id
   */
  survey_id?: string;
  /**
   * 收集器id
   */
  collector_id?: string;
  /**
   * 恢复id（事务id）
   */
  response_id?: string;
  /**
   * 节点id
   */
  node_id?: string;
  /**
   * 选项id
   */
  option_id?: string;
  /**
   * 行选项id
   */
  row_option_id?: string;
  /**
   * 列选项id
   */
  col_option_id?: string;
  /**
   * 操作类型
   */
  type: string;
  /**
   * 操作时间
   */
  recorded_at: Date | string;
  /**
   * 操作平台类型
   */
  provider?: string;
  /**
   * 用户名
   */
  user_name?: string;
  /**
   * 用户id
   */
  user_id?: string;
  /**
   * 查询参数
   */
  query_params?: string;
  /**
   * 收集器代号
   */
  collector_code?: string;
  /**
   * 浏览器id
   */
  browser_uuid?: string;
}
