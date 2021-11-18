/**
 * @ignore
 */
interface ICFNodeVarMap {
  node_id: string;
  loop_idxs: number[];
  var_maps: ICFVarMapItem[];
}
/**
 * @ignore
 */
interface ICFVarMapItem {
  exclusiveId?: VAR_MAP_GROUP;
  var_id?: string;
  value: string;
  type: VAR_MAP_TYPE;
  option_id?: string;
}
