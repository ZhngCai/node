/**
 * 选项显示结果
 * @ignore
 */
interface ICFOptDisplayInfo {
  /**
   * 关联的节点id
   */
  node_id: string;
  /**
   * 关联的循环上下文
   */
  loop_idxs: number[];
  /**
   * 显示的选项id列表
   */
  option_ids: string[];
}

type IOptionAnswerValue = number | string | ICoords | CFMaxDiffRecord[];

/**
 * 一般与选项一一对应答案项数据结构
 * @ignore
 */
interface ICFAnswerItem {
  /**
   * 输入值
   */
  value: IOptionAnswerValue;
  /**
   * 是否为其他选项
   */
  other: boolean;
  /**
   * 答案类型（各种题目的不同选项，答案类型是不一样的）
   */
  type: OPT_ANSWER_TYPE;
  /**
   * 关联的行选项id（仅矩阵题）
   */
  row_option_id?: string;
  /**
   * 关联的列选项id（仅矩阵题）
   */
  col_option_id?: string;
  /**
   * 行内容（仅矩阵题）
   */
  row_content?: string;
  /**
   * 列内容（仅矩阵题）
   */
  col_content?: string;
  /**
   * 选项id
   */
  option_id?: string;
  /**
   * 选项文字内容（变量解析后）
   */
  content?: string;
  /**
   * 选项是否被隐藏了（被隐藏的选项仍然可能被自动选中或自动填充内容，这些答案也会被收集）
   */
  hidden?: boolean;
}

/**
 * 与题目一一对应的节点答案项结构
 * @ignore
 */
interface ICFAnswer {
  /**
   * 答案类型，不同类型的题目不同
   */
  type: NODE_ANSWER_TYPE;
  /**
   * 节点id
   */
  node_id: string;
  /**
   * 本题消耗时间，用毫秒为单位
   */
  cost_time: number;
  /**
   * 本题开始时间
   */
  start_time: string;
  /**
   * 循环上下文信息
   */
  loop_ctxs?: ICFLoopContext[];
  /**
   * 选项中的答案列表
   */
  items?: ICFAnswerItem[];
  /**
   * 定位信息（仅定位相关题目携带）
   */
  location?: CFMapLocation;
  /**
   * 地域信息（仅地域题）
   */
  region?: string;
  /**
   * 手机号码（仅验证题）
   */
  phone_num?: string;
  /**
   * 验证码（仅验证题）
   */
  code?: string;
  /**
   * 逻辑计算结果（仅逻辑题）
   */
  logic_result?: boolean;
}

/**
 * 循环上下文信息
 * @ignore
 */
interface ICFLoopContext {
  /**
   * 关联的循环节点id
   */
  node_id: string;
  /**
   * 当前循环索引（第几次循环）
   */
  index: number;
  /**
   * 当前循环所使用的循环选项id
   */
  option_id: string;
}

/**
 * 问卷收集的结果总结构
 * @ignore
 */
interface ICFResult {
  /**
   * 问卷id
   */
  survey_id?: string;
  /**
   * 答案列表
   */
  answers: ICFAnswer[];
  /**
   * 问卷运行过程中的变量解析结果映射表记录
   * 仅限课时内容中的变量解析
   */
  var_map_info: ICFNodeVarMap[];
  /**
   * 问卷运行过程中的选项显示控制的运行结果记录
   */
  options_display_info: ICFOptDisplayInfo[];
  /**
   * URL查询参数
   */
  query_params: CFQueryParams;
  /**
   * 调用webhooks的参数解析记录
   */
  webhook_params: SignStrStr;
  /**
   * 整份问卷的消耗总时间,用秒为单位
   */
  time_consuming: number;
  /**
   * 测试和离线专用:
   * 回复创建时间
   */
  created_at?: string;
  /**
   * 测试和离线专用:
   * 提交时间
   */
  committed_at?: string;
  /**
   * 测试和离线专用:
   * 离线终端ip地址
   */
  ip_address?: string;
  /**
   * 测试和离线专用:
   * 回复状态
   */
  status: RESPONSE_STATUS;
  /**
   * 测试和离线专用:
   * 收集器id
   */
  collector_id?: number;
}
