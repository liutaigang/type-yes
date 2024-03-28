import { LogicalOperator, NOT_PREFIX, islogicalOperator, logicalOperation } from './logical-operator';
import { BuildInType, ConciseType, matchBuildInType } from './type-build-in';
import { SpecialType, matchSpecialType } from './type-special';

export type TypeFlag = ConciseType | SpecialType | BuildInType;

export type TypeMatcher<T extends string> = (parameter: any, typeFlag: T) => boolean;

type TyResultFull<T extends string> = {
  [key in LogicalOperator]: boolean;
} & {
  [key in T]: TyResultFull<T>;
} & {
  [key in string]: TyResultFull<T>;
};

type TyResult<T extends string> = {
  [key in T]: TyResultFull<T>;
} & {
  [key in string]: TyResultFull<T>;
};

type ProxyTarget = { parameters: any[]; typeFlags?: TypeFlag[]; typeMatcher?: TypeMatcher<TypeFlag> };

interface TyConstructor {
  new <T extends string = TypeFlag>(match: TypeMatcher<T>): (obj: any, ...rest: any[]) => TyResult<T>;
  <T extends string = TypeFlag>(obj: any, ...rest: any[]): TyResult<T>;
}

export const buildinTypeMatcher: TypeMatcher<TypeFlag | string> = (parameter, typeFlag) => {
  const isNot = typeFlag.startsWith(NOT_PREFIX);
  const pureFlog = isNot ? typeFlag.slice(1).toLowerCase() : typeFlag.toLowerCase();

  const isBuildInType = matchBuildInType(parameter, pureFlog as BuildInType | ConciseType);
  const isSpecialType = matchSpecialType(parameter, pureFlog as SpecialType);
  const isMatch = isBuildInType || isSpecialType;
  return isNot ? !isMatch : isMatch;
};

const proxyHandler: ProxyHandler<object> = {
  get: function (target: ProxyTarget, prop: TypeFlag | LogicalOperator) {
    if (islogicalOperator(prop)) {
      const typeFlags: TypeFlag[] = target.typeFlags ?? [];
      const parameters: any[] = target.parameters ?? [];
      const typeMatcher = typeof target.typeMatcher === 'function' ? target.typeMatcher : buildinTypeMatcher;

      if (typeFlags.length === 0) {
        throw Error('At least one operator is required.');
      }

      if (['is', 'not'].includes(prop) && (typeFlags.length > 1 || parameters.length > 1)) {
        throw Error('When the logical operator is: "is" or "not", both the parameter and the type-flags can only be one.');
      }

      const maxLen = Math.max(typeFlags.length, parameters.length);
      const padTypeFlags = padEnd(typeFlags, maxLen);
      const padParameters = padEnd(parameters, maxLen);

      const judgeArr = padTypeFlags.map((flag, index) => {
        const parameter = padParameters[index];
        return typeMatcher(parameter, flag);
      });

      return logicalOperation(prop as LogicalOperator, judgeArr);
    } else {
      if (target.typeFlags) {
        target.typeFlags.push(prop as TypeFlag);
      } else {
        target.typeFlags = [prop as TypeFlag];
      }
      return new Proxy(target, proxyHandler);
    }
  },
};

export const Ty = new Proxy(
  function <T>(action: 'construct' | 'apply', ...args: any[]) {
    if (action === 'construct') {
      return (...objs: any[]) => {
        return new Proxy({ parameters: objs, typeMatcher: args[0] }, proxyHandler) as any;
      };
    }
    if (action === 'apply') {
      return new Proxy({ parameters: args }, proxyHandler) as any;
    }
  },
  {
    construct(target, args) {
      return Reflect.construct(target, ['construct', ...args]);
    },
    apply(target, thisArg, argumentsList) {
      return Reflect.apply(target, thisArg, ['apply', ...argumentsList]);
    },
  },
) as TyConstructor;

function padEnd<T>(arr: T[], len: number) {
  let arrLen = arr.length;
  for (let i = arrLen; i < len; i++) {
    arr.push(arr[arrLen - 1]);
  }
  return arr;
}
