import resolve from 'rollup-plugin-node-resolve';
import babel from 'rollup-plugin-babel';
import commonjs from 'rollup-plugin-commonjs';
import del from 'rollup-plugin-delete'
import postcss from 'rollup-plugin-postcss'
import nesting from 'postcss-nesting'
import path from 'path'
import pkg from './package.json'
import peerDepsExternal from 'rollup-plugin-peer-deps-external'

export default {
  input: 'src/index.tsx',
  output: [{
    dir: path.resolve(__dirname, 'dist'),
    format: 'esm',
    preserveModules: true,
    preserveModulesRoot: 'src'
  },
  {
    file: pkg.main,
    format: 'cjs'
  }
  ],
  external: [
    'react',
    'react-dom'
  ],
  plugins: [
    peerDepsExternal(),
    del({ targets: 'dist' }),
    resolve({ extensions: ['.jsx', '.js', '.tsx'] }),
    commonjs(),
    babel({
      extensions: ['.jsx', '.js', '.tsx'],
      exclude: 'node_modules/**'
    }),
    postcss({
      extensions: ['.css'],
      extract: true,
      modules: true,
      minimize: true,
      modules: {
        globalModulePaths: [/node_modules/],
        generateScopedName: '[name]__[local]__[hash:base64:5]',
      },
      autoModules: false,
      plugins: [
        nesting()
      ]
    }),
  ]
};