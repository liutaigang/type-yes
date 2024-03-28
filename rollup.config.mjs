import resolve from '@rollup/plugin-node-resolve';
import commonjs from '@rollup/plugin-commonjs';
import typescript from 'rollup-plugin-typescript2';
import dts from 'rollup-plugin-dts';
import merge from 'rollup-merge-config';
import { readFileSync } from 'fs';

const pkg = JSON.parse(readFileSync('./package.json'));

// 打包任务的个性化配置
const jobs = {
  cjs: {
    output: { format: 'cjs', file: pkg.main },
  },
  esm: {
    output: { format: 'esm', file: pkg.module },
  },
  dts: {
    output: { file: pkg.typings, format: 'es' },
    plugins: [dts()],
  },
};

export default merge(
  {
    input: './index.ts',
    plugins: [
      resolve({
        extensions: ['.ts', '.js'],
      }),
      commonjs(),
      typescript({
        useTsconfigDeclarationDir: true,
        tsconfig: './tsconfig.json',
      }),
    ],
  },
  jobs[process.env.NODE_ENV || 'cjs'],
);
