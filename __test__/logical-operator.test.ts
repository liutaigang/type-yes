import { islogicalOperator, logicalOperation } from '../src/logical-operator';
import { describe, it } from 'vitest';

describe('islogicalOperator', () => {
  it('islogicalOperator is', ({ expect }) => expect(islogicalOperator('is')).toBeTruthy());
  it('islogicalOperator not', ({ expect }) => expect(islogicalOperator('not')).toBeTruthy());
  it('islogicalOperator or', ({ expect }) => expect(islogicalOperator('or')).toBeTruthy());
  it('islogicalOperator and', ({ expect }) => expect(islogicalOperator('and')).toBeTruthy());
  it('islogicalOperator nor', ({ expect }) => expect(islogicalOperator('nor')).toBeTruthy());
  it('islogicalOperator nand', ({ expect }) => expect(islogicalOperator('nand')).toBeTruthy());
  it('islogicalOperator error', ({ expect }) => expect(islogicalOperator('xxx')).toBeFalsy());
});
