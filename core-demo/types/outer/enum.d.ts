/**
 * 数值间进行逻辑比较的方式枚举
 */
declare const enum VALUE_LIMIT_TYPE {
  /**
   *  未选中即可
   */
  NOT_SELECTED = -2,
  /**
   *  选中即可
   */
  SELECTED = -1,
  /**
   *  两者之间
   */
  BETWEEN = 1,
  /**
   *  两者在外
   */
  NOT_BETWEEN = 2,
  /**
   *  相等
   */
  EQUAL = 3,
  /**
   *  不相等
   */
  NOT_EQUAL = 4,
  /**
   *  大于
   */
  GREAT_THAN = 5,
  /**
   *  小于
   */
  LOW_THAN = 6,
  /**
   *  大于等于
   */
  EQUAL_OR_GREAT_THAN = 7,
  /**
   *  小于等于
   */
  EQUAL_OR_LOW_THAN = 8,
  /**
   *  列举
   */
  LIST = 9,
  /**
   *  排除
   */
  EXCLUDE = 10,
  /**
   *  包含
   */
  CONTAIN = 11,
  /**
   *  不包含
   */
  NOT_CONTAIN = 12,
  /**
   * 空
   */
  EMPTY = 13,
  /**
   * 不为空
   */
  NOT_EMPTY = 14,
  /**
   * 为真
   */
  TRUE = 15,
  /**
   * 为假
   */
  FALSE = 16,
}

/**
 * 变量过滤时的限制数据来源枚举
 */
declare const enum LIMIT_SRC_TYPE {
  /**
   *
   */
  EMPTY = 0,
  /**
   * 编号
   */
  NUMBER = 1,
  /**
   *  文字
   */
  TEXT = 2,
  /**
   *  分值
   */
  MARK = 3,
  /**
   *  分值低分排名
   */
  MARK_ASC = 4,
  /**
   *  分支高分排名
   */
  MARK_DESC = 5,
  /**
   *  排序号
   */
  RANK = 6,
  /**
   *  排序号低分排名
   */
  RANK_ASC = 7,
  /**
   *  排序号高分排名
   */
  RANK_DESC = 8,
  /**
   *  输入值
   */
  INPUT = 9,
  /**
   *  输入值低分排名
   */
  INPUT_ASC = 10,
  /**
   *  输入值高分排名
   */
  INPUT_DESC = 11,
  /**
   *  文字低分排名
   */
  TEXT_ASC = 12,
  /**
   *  文字高分排名
   */
  TEXT_DESC = 13,
  /**
   *  编号低分排名
   */
  NUM_ASC = 14,
  /**
   *  编号高分排名
   */
  NUM_DESC = 15,
}

/**
 * 跳过节点的原因枚举
 */
declare const enum SKIP_REASON {
  /**
   * 没有原因，无需跳过
   */
  NONE = '',
  /**
   * 选择类型的题目的只有单个引用选项导致的跳过
   */
  SINGLE_REF_SELECT_OPT = 'single_ref_select_opt',
  /**
   * 数据节点导致的跳过
   */
  DATA_HIDDEN = 'data_hidden',
  /**
   * 自动跳过的设置导致的跳过
   */
  SETTING = 'setting',
  /**
   * 随机组挑选时导致的跳过
   */
  RANDOM_GROUP = 'random_group',
  /**
   * 需要选型的题目动态计算没有取得选项导致的跳过
   */
  NO_OPTIONS = 'no_options',
}

/**
 * 节点类型枚举
 */
declare const enum NODE_TYPE {
  /**
   * 中转断点
   */
  BREAK_POINT = 'break_point',
  /**
   * 图形打分
   */
  ICON_MARK = 'icon_mark',
  /**
   * 单选
   */
  SELECT = 'select',
  /**
   * 排序
   */
  SEQUENCE = 'sequence',
  /**
   * 填空
   */
  FILL = 'fill',
  /**
   * 矩阵
   */
  MATRIX = 'matrix',
  /**
   * 开始
   */
  START = 'start',
  /**
   * 逻辑
   */
  LOGIC = 'logic',
  /**
   * 循环
   */
  LOOP = 'loop',
  /**
   * 甄别
   */
  CHECK = 'check',
  /**
   * 结束
   */
  END = 'end',
  /**
   * 随机
   */
  RANDOM = 'random',
  /**
   * 地域
   */
  REGION = 'region',
  /**
   * 图片选择
   */
  SELECT_IMAGE = 'select_image',
  /**
   * 描述
   */
  DESCRIBE = 'describe',
  /**
   * 验证
   */
  VERIFY = 'verify',
  /**
   * 抽奖
   */
  LOTTERY = 'lottery',
  /**
   * 奖励
   */
  GIFT = 'gift',
  /**
   * 定位
   */
  LOCATION = 'location',
  /**
   * 上传
   */
  UPLOAD = 'upload',
  /**
   * 菜单
   */
  MENU = 'menu',
  /**
   * 范围定位
   */
  AREA = 'area',
  /**
   * 图标
   */
  SELECT_ICON = 'select_icon',
  /**
   * 权重
   */
  WEIGHT = 'weight',
  /**
   * 级联
   */
  CASCADE = 'cascade',
  /**
   * 热点
   */
  HOT_SPOT = 'hot_spot',
  /**
   * 热力
   */
  HEAT_MAP = 'heat_map',
  /**
   * 数据
   */
  DATA = 'data',
  /**
   * 演示评价
   */
  SLIDE_RATE = 'slide_rate',
  /**
   * 图形打分
   */
  VALUE_MARK = 'value_mark',
  /**
   * 最大差分
   */
  MAX_DIFF = 'max_diff',
}

/**
 * 核心包使用到的请求类型枚举
 */
declare const enum API_REQ_TYPE {
  /**
   * GET
   */
  GET = 'GET',
  /**
   * POST
   */
  POST = 'POST',
  /**
   * PUT
   */
  PUT = 'PUT',
}

/**
 * 拼音匹配方式枚举
 */
declare const enum PINYIN_MATCH {
  /**
   * 部分匹配
   */
  PARTIAL = 'partial',
  /**
   * 开头匹配
   */
  START = 'start',
  /**
   * 完全匹配
   */
  FULL = 'full',
}

/**
 * 运行程序的模式枚举
 */
declare const enum APP_RUN_TYPE {
  /**
   * 模板预览模式
   */
  PREVIEW_TEMPLATE = 'preview_template',
  /**
   * 模板编辑模式
   */
  EDIT_TEMPLATE = 'edit_template',
  /**
   * 常规模式
   */
  NORMAL = '',
}

/**
 * 垂直对齐方式枚举
 */
declare const enum VERTICAL_ALIGN {
  /**
   * 垂直居中
   */
  CENTER = 'center',
  /**
   * 垂直置顶
   */
  TOP = 'top',
  /**
   * 垂直置底
   */
  BOTTOM = 'bottom',
}

/**
 * 水平对齐方式枚举
 */
declare const enum HORIZONTAL_ALIGN {
  /**
   * 水平居中
   */
  CENTER = 'center',
  /**
   * 水平靠左
   */
  LEFT = 'left',
  /**
   * 水平靠右
   */
  RIGHT = 'right',
}

/**
 * 富文本解析到的节点类型枚举
 */
declare const enum RICH_NODE_TYPE {
  /**
   * 文本节点
   */
  TEXT = 3,
  /**
   * 容器节点
   */
  NODE = 1,
}

/**
 * 目前富文本能解析到的节点名称枚举
 */
declare const enum RICH_NODE_NAME {
  /**
   * span
   */
  SPAN = 'span',
  /**
   * div
   */
  DIV = 'div',
  /**
   * script
   */
  SCRIPT = 'script',
  /**
   * ol
   */
  OL = 'ol',
  /**
   * ul
   */
  UL = 'ul',
  /**
   * br
   */
  BR = 'br',
}

/**
 * 运行环境名称枚举
 */
declare const enum ENV_NAME {
  NODE = 'node',
  WEB = 'web',
  WECHAT = 'wechat',
  NATIVE_APP = 'native_app',
  WECHAT_APP = 'wechat_app',
  ALI_APP = 'ali_app',
  TOUTIAO_APP = 'toutiao_app',
  OTHER = 'other',
}

/**
 * 事件名称枚举
 */
declare const enum EVENT_NAME {
  /**
   * 样本库数据转移事件
   */
  SAMPLER_TRANSFER = 'SAMPLER_TRANSFER',
  /**
   * 实时预览发生变化
   */
  REALTIME_CHANGE = 'REALTIME_CHANGE',
  /**
   * 答案发生变更
   */
  ANSWER_CHANGE = 'ANSWER_CHANGE',
  /**
   * 语言代号已准备好或发生变化
   */
  LANG_CHANGE = 'LANG_CHANGE',
  /**
   * 成功到达下一题的事件名
   */
  NEXT_OK = 'NEXT_OK',
  /**
   * 到达下一题前的事件名，比起NEXT_OK，它还没真正到达下一题。
   */
  BEFORE_NEXT_OK = 'BEFORE_NEXT_OK',
  /**
   * 到达上一题事件名
   */
  PREV_OK = 'PREV_OK',
  /**
   * 去往下一题被中断事件名
   */
  NEXT_FAIL = 'NEXT_FAIL',
  /**
   * 后续题目列表伸展完成事件名
   */
  STRETCH_OK = 'STRETCH_OK',
  /**
   * 出现错误事件名
   */
  ERROR = 'ERROR',
  /**
   * 甄别失败事件名
   */
  CHECK_FAIL = 'CHECK_FAIL',
  /**
   * 甄别提交事件名
   */
  CHECK_SUBMIT = 'CHECK_SUBMIT',
  /**
   * 配额失败事件名
   */
  QUOTA_FAIL = 'QUOTA_FAIL',
  /**
   * 正式提交事件名
   */
  FULL_SUBMIT = 'FULL_SUBMIT',
  /**
   * 结束请求事件名称
   */
  END_REQ = 'END_REQ',
  /**
   * 更新主题事件名
   */
  UPDATE_THEME = 'UPDATE_THEME',
  /**
   * 错误中断事件
   */
  ERROR_ABORT = 'ERROR_ABORT',
  /**
   * 数据发生变更
   */
  SET_PROPS = 'SET_PROPS',
  /**
   * 切换节点
   */
  SWITCH_NODE = 'SWITCH_NODE',
  /**
   * 开始恢复答案
   */
  START_MEMORY = 'START_MEMORY',
  /**
   * 发生选项排他
   */
  OPT_EXCLUDE = 'OPT_EXCLUDE',
  /**
   * 发生选项被选中
   */
  OPT_SELECT = 'OPT_SELECT',
  /**
   * 发生选项被取消选中
   */
  OPT_DESELECT = 'OPT_SELECT',
  /**
   * 结束恢复答案
   */
  END_MEMORY = 'END_MEMORY',
}

/**
 * 自动推导事件名枚举
 */
declare const enum INFER_EVENT_NAME {
  /**
   * 被甄别,推导结束
   */
  CHECK_END = 'CHECK_END',
  /**
   * 正常结束,完成了所有推导
   */
  END = 'END',
  /**
   * 超时,没完成推导
   */
  TIMEOUT = 'TIMEOUT',
  /**
   * 答案被结束节点的设置抛弃了
   */
  ABANDON = 'ABANDON',
}

/**
 * 选项对齐方式
 */
declare const enum OPT_ALIGN {
  /**
   * 竖直对齐
   */
  VERTICAL = 'vertical',
  /**
   * 水平对齐
   */
  HORIZONTAL = 'horizontal',
  /**
   * 指定列数对齐
   */
  COLUMN = 'column',
  /**
   * 自动对齐
   */
  AUTO = 'auto',
}

/**
 * 选项展示方式
 */
declare const enum OPT_MARK {
  /**
   * 常规方式展现
   */
  NORMAL = 'normal',
  /**
   * 块状选项
   */
  BLOCK = 'block',
}

/**
 * 字体粗细方式枚举
 */
declare const enum FONT_WEIGHT {
  /**
   * 普通
   */
  NORMAL = 'normal',
  /**
   * 粗体
   */
  BOLD = 'bold',
}

/**
 * 背景图片布局方式
 */
declare const enum BG_IMG_LAYOUT {
  /**
   * 覆盖，同css的cover模式，不考虑大小
   */
  COVER = 'cover',
  /**
   * 重复展示，需要考虑指定的背景图片大小
   */
  REPEAT = 'repeat',
  /**
   * 不重复展示，需要考虑指定的背景图片大小
   */
  NO_REPEAT = 'no-repeat',
}

/**
 * 选中选中模式
 */
declare const enum OPT_EFFECT {
  /**
   * 常规效果
   */
  NORMAL = 'normal',
  /**
   * 圆圈散开效果
   */
  CIRCLE = 'circle',
  /**
   * 小点散开效果
   */
  PARTICLE = 'particle',
  /**
   * 路径动画
   */
  TRIM_PATHS = 'trim_paths',
}

/**
 * 图片位置枚举
 */
declare const enum IMG_POSITION {
  /**
   * 在问题文字之前
   */
  BEFORE = 'before',
  /**
   * 在问题文字之后
   */
  AFTER = 'after',
}

/**
 * 图片切换方式枚举
 */
declare const enum IMG_TRANSITION {
  /**
   * 滑动切换
   */
  SLIDE = 'slide',
  /**
   * 渐隐渐现切换
   */
  FADE = 'fade',
}

/**
 * 上传限制枚举
 */
declare const enum UPLOAD_LIMIT {
  /**
   * 图片
   */
  IMAGE = 'image',
  /**
   * 音频
   */
  AUDIO = 'audio',
  /**
   * 视频
   */
  VIDEO = 'video',
  /**
   * 文档
   */
  DOC = 'doc',
}

/**
 * 动作触发时机枚举
 */
declare const enum ACTION_EVENT {
  /**
   * 前进进入节点时
   */
  FORWARD_ENTER = 'forward_enter',
  /**
   * 前进离开节点时
   */
  FORWARD_LEAVE = 'forward_leave',
  /**
   * 后退进入节点时
   */
  BACKWARD_ENTER = 'backward_enter',
  /**
   * 后退离开节点时
   */
  BACKWARD_LEAVE = 'backward_leave',
}

/**
 * 动作类型枚举
 */
declare const enum ACTION_TYPE {
  /**
   * 邮件
   */
  EMAIL = 'email',
  /**
   * 调用接口
   */
  HTTP_REQUEST = 'http_request',
  /**
   * 发送短信
   */
  SMS = 'sms',
}

/**
 * 选项映射属性类型枚举
 */
declare const enum OPT_MAP_TYPE {
  /**
   * 图片
   */
  IMAGE = 'image',
  /**
   * 字符串
   */
  STRING = 'string',
  /**
   * 数值
   */
  NUMBER = 'number',
}

/**
 * 权重输入方式
 */
declare const enum WEIGHT_DISTRIBUTE_BY {
  /**
   * 滑杆
   */
  SLIDER = 'slider',
  /**
   * 输入框
   */
  INPUT = 'input',
  /**
   * 滑杆 + 输入框
   */
  SLIDER_INPUT = 'slider-input',
}

/**
 * 组内节点排列方向
 */
declare const enum GROUP_DISPLAY_DIRECTION {
  /**
   * 左右排列
   */
  HORIZONTAL = 'horizontal',
  /**
   * 上下排列
   */
  VERTICAL = 'vertical',
}

/**
 * 矩阵多选方式枚举
 */
declare const enum MATRIX_MULTI {
  /**
   * 全部多选
   */
  ALL = 'all',
  /**
   * 行多选
   */
  ROW = 'row',
  /**
   * 列多选
   */
  COL = 'col',
}

/**
 * 选择类型枚举
 */
declare const enum SELECT_TYPE {
  /**
   * 单选
   */
  RADIO = 'radio',
  /**
   * 多选
   */
  CHECKBOX = 'checkbox',
}

/**
 * 矩阵做答方式枚举
 * @ignore
 */
declare const enum MATRIX_SELECT {
  /**
   * 单选
   */
  SINGLE = 'single',
  /**
   * 多选
   */
  MULTI = 'multi',
  /**
   * 行单选
   */
  SINGLE_ROW = 'single_row',
  /**
   * 列单选
   */
  SINGLE_COL = 'single_col',
  /**
   * 行列单选
   */
  SINGLE_ROW_COL = 'single_row_col',
}

/**
 * 矩阵随机方式枚举
 * @ignore
 */
declare const enum MATRIX_RANDOM {
  /**
   * 不随机
   */
  NONE = 'none',
  /**
   * 行列随机
   */
  ROW_COL = 'row_col',
  /**
   * 行随机
   */
  ROW = 'row',
  /**
   * 列随机
   */
  COL = 'col',
  /**
   * 行循环
   */
  ROW_LOOP = 'row_loop',
  /**
   * 列循环
   */
  COL_LOOP = 'col_loop',
}

/**
 * 验证节点验证类型枚举
 */
declare const enum VERIFY_TYPE {
  /**
   * 短信验证
   */
  SMS = 'sms',
  /**
   * 密码验证
   */
  PASSWORD = 'password',
  /**
   * 图形验证码验证
   */
  IMAGE = 'image',
}

/**
 * 表格评价时的表头展示方式枚举
 */
declare const enum RATE_TABLE_HEAD {
  /**
   * 不显示表头
   */
  NONE = 'none',
  /**
   * 仅显示文字表头
   */
  TEXT = 'text',
  /**
   * 仅显示分值表头
   */
  VALUE = 'value',
  /**
   * 同时显示文字表头和分值表头，文字表头在上。
   */
  TEXT_VALUE = 'text_value',
}

/**
 * 奖励类型枚举
 */
declare const enum GIFT_TYPE {
  /**
   * 微信现金红包
   */
  RED_ENVELOPE = 'red_envelope',
  /**
   * 自定义奖励
   */
  CUSTOM = 'custom',
}

/**
 * 地区信息收集级别枚举
 */
declare const enum REGION_RANGE {
  /**
   * 省级
   */
  PROVINCE = 'province',
  /**
   * 市级
   */
  CITY = 'city',
  /**
   * 区县级
   */
  COUNTY = 'county',
  /**
   * 乡镇街道级
   */
  STREET = 'street',
}

/**
 * 图片适应规则枚举
 */
declare const enum PIC_FIT_TYPE {
  /**
   * 保持比例
   */
  NONE = '',
  /**
   * 网格撑满
   */
  GRID_FULL = 'cover',
  /**
   * 网格包含
   */
  ALL = 'contain',
}

/**
 * 选项作答方式枚举
 * + select: 纯选择
 * + input: 纯输入
 * + select-input: 选择+输入
 */
declare const enum OPT_ACT_TYPE {
  /**
   * 纯选择作答
   */
  SELECT = 'select',
  /**
   * 纯输入作答
   */
  INPUT = 'input',
  /**
   * 选中后输入作答
   */
  SELECT_INPUT = 'select-input',
}

/**
 * 选项类型枚举
 */
declare const enum OPTION_TYPE {
  /**
   * 纯选项
   */
  OPTION = 'option',
  /**
   * 纯备注
   */
  COMMENT = 'comment',
  /**
   * 选项+备注
   */
  OPTION_COMMENT = 'option_comment',
}

/**
 * 变量解析文字是的图片保留模式
 */
declare const enum VAR_TEXT_IMG_MODE {
  /**
   * 不保留图片地址，但是保留图片名称
   */
  NAME = 'NAME',
  /**
   * 保留图片信息为url地址
   */
  URL = 'URL',
  /**
   * 保留图片信息为被##包裹的url地址
   */
  WRAPPED_URL = 'WRAPPED_URL',
}

/**
 * 节点模式
 */
declare const enum NODE_MODE {
  /**
   * 甄别阶段模式
   */
  CHECK = 'check',
  /**
   * 正式阶段模式
   */
  NORMAL = 'normal',
  /**
   * 所有模式
   */
  ALL = 'all',
}

/**
 * 变量类型枚举
 */
declare const enum VAR_TYPE {
  /**
   * 字符串变量
   */
  VAR_STRING = 'var-string',
  /**
   * 数值变量
   */
  VAR_EXP = 'var-expression',
  /**
   * 媒体变量
   */
  VAR_MEDIA = 'var-media',
  /**
   * 循环变量
   */
  VAR_LOOP = 'var-loop',
  /**
   * 布尔变量
   */
  VAR_BOOL = 'var-bool',
  /**
   * 接口请求变量
   */
  VAR_REQUEST = 'var-request',
  /**
   * HTML变量
   */
  VAR_HTML = 'var-html',
}

/**
 * 推导类型枚举
 * @ignore
 */
declare const enum INFER_TYPE {
  /**
   * 选择推导
   */
  SELECT = 'select',
  /**
   * 输入推导
   */
  INPUT = 'input',
}

/**
 * 回复数据状态类型枚举
 */
declare const enum RESPONSE_STATUS {
  /**
   * 刚创建，等待后续的结果
   */
  CREATED = 'created',
  /**
   * 已通过甄别和配额
   */
  EXAMINE_PASSED = 'examine_passed',
  /**
   * 配额失败结束
   */
  EXAMINE_FAILED = 'examine_failed',
  /**
   * 甄别失败结束
   */
  EXAMINE_SKIPPED = 'examine_skipped',
  /**
   * 正常提交结束
   */
  COMMITTED = 'committed',
  /**
   * 测试提交结束
   */
  TEST = 'test',
}

/**
 * 选项输入与验证类型
 */
declare const enum FILL_TYPE {
  /**
   * 字符数量控制
   */
  CHARS = 'chars',
  /**
   * 整数
   */
  INTEGER = 'integer',
  /**
   * 小数
   */
  FLOAT = 'float',
  /**
   * 日期
   */
  DATE = 'date',
  /**
   * 邮箱
   */
  EMAIL = 'email',
  /**
   * 不验证
   */
  NONE = 'none',
  /**
   * 日期范围
   */
  DATE_RANGE = 'date_range',
  /**
   * 时间
   */
  TIME = 'time',
  /**
   * 时间范围
   */
  TIME_RANGE = 'time_range',
  /**
   * 邮编
   */
  POSTCODE = 'postcode',
  /**
   * 网址
   */
  URL = 'url',
  /**
   * 手机号码
   */
  PHONE_NUMBER = 'phone_number',
  /**
   * 时间间隔
   */
  TIME_DURATION = 'time_duration',
  /**
   * 自动提示填充内容
   */
  AUTO_COMPLETE = 'auto_complete',
  /**
   * 下拉列表选择内容
   */
  LIST_SELECT = 'list_select',
}

/**
 * 容忍字符类型枚举
 */
declare const enum CHAR_TYPE {
  /**
   * 数值
   */
  NUMBER = 'number',
  /**
   * 字母
   */
  ALPHABET = 'alphabet',
  /**
   * 中文
   */
  CHINESE = 'chinese',
}

/**
 * 消息级别枚举
 */
declare const enum MSG_LEVEL {
  /**
   * 消息应该以弹框方式出现，用户点击确定以后可以关闭继续答题
   */
  ALERT = 'alert',
  /**
   * 严重错误，应该显示错误，并终止答题。
   */
  VITAL = 'vital',
  /**
   * 常规消息,直接提示一下即可
   */
  NORMAL = '',
}

/**
 * 链接类型
 */
declare const enum LINK_TYPE {
  /**
   * 实时预览
   */
  REALTIME_PREVIEW = 'realtime_preview',
  /**
   * 完整预览
   */
  PREVIEW = 'preview',
  /**
   * 正式答题
   */
  FORMAL = 'formal',
}

/**
 * 设备类型
 */
declare const enum DEVICE_TYPE {
  UNKNOWN = '',
  CONSOLE = 'console',
  MOBILE = 'mobile',
  TABLET = 'tablet',
  SMARTTV = 'smarttv',
  WEARABLE = 'wearable',
  EMBEDDED = 'embedded',
}

/**
 * 题目列表伸展类型枚举
 */
declare const enum STRETCH_TYPE {
  /**
   * 页内伸展
   */
  PAGE_INNER = 'page_inner',
  /**
   * 翻页伸展
   */
  PAGE_NEXT = 'page_next',
}

/**
 * 接口插件的请求类型枚举
 */
declare const enum PLUGIN_REQ {
  /**
   * GET请求后台
   */
  GET = 'get',
  /**
   * POST请求后台
   */
  POST = 'post',
  /**
   * FAKE接口
   */
  FAKE = 'fake',
  /**
   * 内置接口
   */
  EMBED = 'embed',
}

/**
 * 逻辑运算类型枚举
 */
declare const enum LOGIC_TYPE {
  /**
   * 与运算
   */
  AND = 'and',
  /**
   * 或运算
   */
  OR = 'or',
}

/**
 * 数据转移名称枚举
 */
declare const enum DATA_TRANSFER_NAME {
  /**
   * 甄别失败转移url
   */
  EXAMINE_SKIP = 'examine_skipped_url',
  /**
   * 配置满转移url
   */
  EXAMINE_FAIL = 'examine_failed_url',
  /**
   * 提交成功转移url
   */
  COMMITTED = 'committed_url',
  /**
   * 数据无效转移url
   */
  INVALID = 'invalid_url',
}

/**
 * 进入答题页面的模式
 */
declare const enum SURVEY_ENTER_MODE {
  /**
   * 正常进入
   */
  START = 'start',
  /**
   * 重新开始
   */
  RESTART = 'restart',
  /**
   * 断点续答
   */
  RESUME = 'resume',
}

/**
 * 数据传输方式枚举
 */
declare const enum SAMPLE_METHOD {
  /**
   * 后台调用,安全性高
   */
  BACKEND = 'BACKEND',
  /**
   * 调用伪造接口的样本数据传输方式
   */
  FAKE = 'FAKE',
  /**
   * 调用POST接口的样本数据传输方式
   */
  POST = 'POST',
  /**
   * 调用GET请求的样本数据传输方式
   */
  GET = 'GET',
  /**
   * 直接进行连接跳转的数据传输方式
   */
  LINK = 'LINK',
  /**
   * 由于配置不足没有进行样本传输
   */
  ABORT = 'ABORT',
}

/**
 * 变量映射表排他ID枚举
 */
declare const enum VAR_MAP_GROUP {
  TITLE = 'title',
  DESCRIPTION = 'description',
}

/**
 * 变量映射表类型枚举
 */
declare const enum VAR_MAP_TYPE {
  EMBED = 'embed',
  CASCADE = 'cascade',
  REF = 'ref',
}

/**
 * 题目答案特殊类型
 */
declare const enum NODE_ANSWER_SPECIAL_TYPE {
  /**
   * 地域题答案类型不一样，这是它的专用名
   */
  PRE_DEF = 'predef',
}

/**
 * 选项答案特殊类型
 */
declare const enum OPT_ANSWER_SPECIAL_TYPE {
  /**
   * 地域题选项的答案类型不一样，这是它的专用名
   */
  PRE_DEF_REGION = 'predef_region',
}

/**
 * 题目答案类型枚举
 */
type NODE_ANSWER_TYPE = NODE_TYPE | NODE_ANSWER_SPECIAL_TYPE;

/**
 * 选项答案类型枚举
 */
type OPT_ANSWER_TYPE = OPTION_TYPE | NODE_TYPE | OPT_ANSWER_SPECIAL_TYPE;

/**
 * 最大差分值枚举
 */
declare const enum MAX_DIFF_VALUE {
  /**
   * 正向评价值
   */
  POSITIVE = 1,
  /**
   * 未评价值
   */
  NONE = 0,
  /**
   * 负向评价值
   */
  NEGATIVE = -1,
}

/**
 * 矩阵题的行列宽高的配置
 */
declare const enum MATRIX_OPTION_DISPLAY_MODE {
  /**
   * 行列选项自动适应
   */
  AUTO = 'auto',
  /**
   * 隐藏行列选项
   */
  HIDDEN = 'hidden',
}


/**
 * 选项分组随机模式
 */
declare const enum OPTION_GROUP_RANDOM_MODE {

  /**
   * 跟随题目
   */
  FLLOW_NODE = 'followNode',
  /**
   * 不随机
   */

  NO_RANDOM = 'noRandom',
  /**
   * 随机
   */

  RANDOM = 'random',
  /**
   * 固定位循环
   */
  CIRCULATION = 'circulation'
}

/**
 * 选项分组的列表子项类型
 */
declare const enum OPTION_GROUP_CHILD_TYPE {
  /**
   * 选项类型的子项
   */
  OPTION = 'option',
  /**
   * 选项组类型的子项
   */
  GROUP = 'group',
}


/**
 * 选项所处位置枚举
 */
declare const  enum OPTION_POSITION {

  /**
   * 常规位置
   */
  NORMAL = 'normal',
  /**
   * 置顶
   */
  TOP_FIXED = 'top-fixed',
  /**
   * 置底
   */
  BOTTOM_FIXED = 'bottom-fixed',
}