/**
 * 矩阵id枚举
 */
declare const enum MATRIX_ID_KEY {
  X = 'xid',
  Y = 'yid',
}

/**
 * 自动推导时的特殊名称枚举
 */
declare const enum INFER_SPECIAL_NAME {
  /**
   * 专用于测试的名称
   */
  TEST_CASE = 'testcase',
}

/**
 * 内置路由名称枚举
 */
declare const enum ROUTE_NAME {
  START = 'start',
  SURVEY = 'survey',
  REWARD = 'reward',
}

/**
 * 预览通信消息名称枚举
 */
declare const enum PREVIEW_MSG {
  LOCATE = 'locate_preview',
  REALTIME_ERROR = 'error_realtime_preview',
  REALTIME_DONE = 'done_preview_realtime',
  MOUSEDOWN = 'mousedown_preview',
  MOUSEUP = 'mouseup_preview',
  INIT = 'init_preview',
}
