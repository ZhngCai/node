/**
 * @ignore
 */
interface ICFRemoteLang {
  /**
   * 语言代号
   */
  locale: string;
  /**
   * 这个是外置语言资源地址
   */
  url: string;
}


interface ICFLang {
  /**
   * 语言代号
   */
  locale: string;
  /**
   * 这个是外置语言资源地址
   */
  url?: string;
  /**
   * 内置语言包
   */
  pack?: ICFLangStore;
}

/**
 * 多语言项数据
 */
interface CFLangTableItem {
  /**
   * 语言id
   */
  id: string;
  /**
   * 语言名称
   */
  value: string;
}

/**
 * @ignore
 */
interface ICFLangTargets {
  nodes?: ICFNode[];
  variables?: ICFVarRaw[];
  groups?: ICFNodeGroup[];
}

/**
 * @ignore
 */
interface ICFLangStore {
  nodes?: { [key: string]: ICFLangNodeStore };
  variables?: { [key: string]: ICFLangVarStore };
  groups?: { [key: string]: ILangNodeGroupStore };
}

interface ICFLangNodeOptGroupStore {
 [key: string]: {
   groupTitle : string;
 }
}
/**
 * @ignore
 */
interface ICFLangNodeStore {
  questionText: string;
  describe: string;
  optionGroups: ICFLangNodeOptGroupStore
}

/**
 * @ignore
 */
interface ICFLangEndNodeStore extends ICFLangNodeStore {
  endBtnText: string;
}

/**
 * @ignore
 */
interface ICFLangGiftNodeStore extends ICFLangNodeStore {
  endBtnText: string;
  activityName: string;
}

/**
 * @ignore
 */
interface ICFLangValidateStore {
  logic: { message: string };
}

/**
 * @ignore
 */
interface ICFLangSubjectNodeStore extends ICFLangNodeStore {
  options: { [key: string]: ICFLangOptStore };
  validation: ICFLangValidateStore;
}

/**
 * @ignore
 */
interface ICFLangLotteryNodeStore extends ICFLangSubjectNodeStore {
  fail: { title: string; summary: string };
  success: { title: string; summary: string };
}

/**
 * @ignore
 */
interface ICFLangValueMarkNodeStore extends ICFLangSubjectNodeStore {
  minText: string;
  maxText: string;
}

/**
 * @ignore
 */
interface ICFLangMenuNodeStore extends ICFLangSubjectNodeStore {
  placeholder: string;
}

/**
 * @ignore
 */
interface ICFLangStartNodeStore extends ICFLangNodeStore {
  startName: string;
  logoText: string;
  startBtnText: string;
  nextBtnText: string;
  prevBtnText: string;
  timeoutText: string;
  timeLessText: string;
  validation: ICFLangValidateStore;
}

/**
 * @ignore
 */
interface ILangNodeGroupStore {
  prevText: string;
  nextText: string;
}

/**
 * @ignore
 */
interface ICFLangDataOptStore {
  text: string;
  optComment: string;
  number: string;
  value: string;
}

/**
 * @ignore
 */
interface ICFLangLotteryOptStore {
  rewardName: string;
}

/**
 * @ignore
 */
interface ICFLangVarStore {
  value: string;
}

/**
 * @ignore
 */
interface ICFLangAutoInputStore {
  defaultValue: string;
}

/**
 * @ignore
 */
interface ICFLangOptStore {
  autoInputConfig: ICFLangAutoInputStore;
  text: string;
  optComment: string;
  mapping: {
    field_1: string;
    field_2: string;
    field_3: string;
    field_4: string;
    field_5: string;
    field_6: string;
  };
  selectText: string;
  // 奖励节点专用,借位
  rewardName: string;
}
