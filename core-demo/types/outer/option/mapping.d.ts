/**
 * 辅助属性
 */
interface CFAssistProps {
  field_1: string;
  field_2: string;
  field_3: string;
  field_4: string;
  field_5: string;
  field_6: string;
}
/**
 * 映射属性的值
 */
type CFMappingValue = string | CFImageInNode;

/**
 * 映射属性
 */
type CFMappingProps = AllKeyToType<CFAssistProps, CFMappingValue>;

/**
 * 辅助属性名称
 */
type CFAssistPropKeys = keyof CFAssistProps;
