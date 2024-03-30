export const NOT_PREFIX = '!';
export const OPTIONAL_PREFIX = '?';

export type LogicalOperator = 'is' | 'not' | 'or' | 'and' | 'nor' | 'nand';

const logicalOperators: LogicalOperator[] = ['is', 'not', 'or', 'and', 'nor', 'nand'];
export const islogicalOperator = (anyOperator: string) => {
  return logicalOperators.includes(anyOperator as LogicalOperator);
};

export const logicalOperation = (operator: LogicalOperator, boolTuple: boolean[]) => {
  switch (operator) {
    case 'is':
      return boolTuple[0];
    case 'not':
      return !boolTuple[0];
    case 'or':
      return boolTuple.some((item) => item);
    case 'and':
      return boolTuple.every((item) => item);
    case 'nor':
      return !boolTuple.some((item) => item);
    case 'nand':
      return !boolTuple.every((item) => item);
    default:
      throw Error(`The operator ${operator} is illegal`);
  }
};
