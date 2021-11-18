/**
 * @ignore
 */
interface ICFInferMsg {
  name: 'infer_worker';
  round: number;
  type: string;
  id: string;
  nodeName: string;
  ended: boolean;
  data?: any;
  message: string;
}

/**
 * 测试用例数据
 * @ignore
 */
interface ICFTestCase {
  when: ICFLogicConfig;
  should: ICFLogicConfig;
  name: string;
  disabled?: boolean;
  done?: boolean;
}

/**
 * @ignore
 */
interface ICFInferConfig {
  name?: string;
  type: INFER_TYPE;
  activeConfig?: ICFLogicConfig;
  weight?: number;
  candidates?: string;
  active?: boolean;
}
