/**
 * 选项组的children类型
 */
type ICFNodeOptGroupChild = ICFNodeOptGroup | ICFOptGroupOptChild
interface ICFNodeOptGroup {
  /**
   * @ingore
   */
  currentLevel?: number;
  /**
   * 组的标题
   */
  groupTitle: string;
  /**
   * 是否显示组号
   */
  showGroupTitle?: boolean;
  /**
   * 组的Uuid
   */
  uuid: string;
  /**
   * 子节点
   */
  children: ICFNodeOptGroupChild[];
  /**
   * 随机模式
   */
  randomMode?: OPTION_GROUP_RANDOM_MODE;

  type: OPTION_GROUP_CHILD_TYPE;
  /**
   * 组的颜色
   * @ingore
   */
  color?: string;
}

/**
 * 选项组中的 children 中，类型为 选项的Child
 */
interface ICFOptGroupOptChild {
  optionUuid: string;
  groupUuids: string[];
  text: string;
  type: OPTION_GROUP_CHILD_TYPE;
  currentLevel?: number;
}
/**
 * 选项和选项组的关系
 */
interface IOptionGroupsRelationship {
  /**
   * 选项为键 找到对应组的关系
   */
  optionsRelationship: { [optionUuid: string]: string[] };
  /**
   * 选项组为键，找到其对应的选项
   */
  groupsRelationship: {
    [groupUuid: string]: {
      parentUuids: string[];
      optionUuids: string[];
    }
  };
}



/* <-------------> */


/**
 * 选项分组
 */
interface ICFReformOptGroupResult {
  optGroups: ICFOptGroupChild[]
}

type ICFOptGroupChild =  (ICFOptGroup | CFOption);

/**
 * 专门给答题端使用的数据结构,
 */
interface ICFOptGroup {
  uuid: string;
  /**
   * 组标题
   */
  groupTitle : string;
  /**
   * 是否显示组标题，当为true时才在UI上显示标题
   */
  showGroupTitle: boolean
  /**
   * 选项组的设置
   */
  type : OPTION_GROUP_CHILD_TYPE;
  /**
   * 随机的模式
   * @ignore
   */
  randomMode: OPTION_GROUP_RANDOM_MODE
  /**
   * 可能是子选项组，也可能是选项。看type == 'group'
   */
  children: ICFOptGroupChild[]
  /**
   * 当前组的层级，注意层级从1开始递增
   */
  currentLevel: number;
}