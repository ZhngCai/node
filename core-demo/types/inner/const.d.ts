// 使用常量枚举充当常量，适合给常量分类。

declare const enum OPT_KEY {
  X = 'renderOptionsX',
  Y = 'renderOptionsY',
}

declare const enum CUSTOM_ABORT {
  NAME = ' _custom_abort_ ',
}

declare const enum LANG_NAME {
  ZH_CN = 'zh_cn',
  EN_US = 'en_us',
}

declare const enum STORAGE_KEY {
  THEME = 'theme',
  REWARD_INFO = 'reward_info',
  GIFT = 'gift-',
  /**
   * 用户手动选择的语言要缓存起来，以后优先使用改语言
   */
  LANG = 'language',
  LANG_RESUME = 'lang-resume',
}

declare const enum PROTOCOL {
  HTTP = 'http',
}

declare const enum INFER_SPECIAL_VALUE {
  FORCE_EMPTY = '__FORCE_EMPTY__',
}

/**
 * 问卷版本
 */
declare const enum SURVEY_VERSION {
  /**
   * 调整选项排他专属值的版本
   */
  ADJUST_OPT_EXCLUDE = 2,
}

declare const enum OPT_MUTEX {
  /**
   * 新的选项排他标记专属值
   */
  EXCLUDE = -1,
  /**
   * 老的选项排他标记专属值，已被废弃，为兼容故保留
   */
  EXCLUDE_OLD = 10,
}


declare const enum VAR_CONST {
  JOINT = ':',
  TAG_NAME = 'var-tag',
  TAG_CLASS = '.var-tag',
  FIELD_PREFIX = 'field_',
  VID = 'data-v-id',
  OLD_ID = 'data-id',
  V_CONFIG = 'data-v-config'
}