import RollupJson from '@rollup/plugin-json'
import RollupNodeResolve from '@rollup/plugin-node-resolve'
import RollupCommonjs from '@rollup/plugin-commonjs'
import RollupTypescript from 'rollup-plugin-typescript2'
import RollupBabel from 'rollup-plugin-babel'
import RollupDts from 'rollup-plugin-dts'
import RollupImage from '@rollup/plugin-image'
import RollupClear from 'rollup-plugin-clear'
import RollupPostCss from 'rollup-plugin-postcss'
import postUrl from 'postcss-url';
import autoprefixer from 'autoprefixer';
import cssnano from 'cssnano';
import postImport from 'postcss-import';
import RollPostcssInject2Css from './copy-rollup-postcss-inject-to-css.mjs';
import pxtransform from 'postcss-pxtransform';
import postPxToVw from 'postcss-px-to-viewport';
import RollupCopy from 'rollup-plugin-copy'


const externalPackages = [
  /node_modules/,
  /echarts/,
  /dayjs/,
]


export default [
  {
    input: './src/index.ts',
    output: [
      {
        format: 'esm',
        dir: './dist/wskCalendar',
        exports: 'named', // 指定导出模式（自动、默认、命名、无）
        preserveModules: true, // 保留模块结构
        preserveModulesRoot: 'src', // 将保留的模块放在根级别的此路径下
        // sourcemap: true,
      }
    ],
    external: externalPackages,
    plugins: [
      RollupClear({
        targets: ['dist'], // 每次打包清空dist目录，从新生成
        watch: true,
      }),
      RollupPostCss({
        extract: false, // 非导出模式
        inject: true,  // 内联模式
        // extract: true, // 导出模式
        plugins: [
          autoprefixer(),
          cssnano(),
          postUrl({
            url: "inline",
            maxSize: 70
          }),
         postPxToVw({
            unitToConvert: 'px',
            viewportWidth: 750,
            unitPrecision: 5,
            viewportUnit: 'vw',
            fontViewportUnit: 'vw',
            minPixelValue: 1,
            exclude: [/node_modules/]
          }),
          pxtransform({
            platform: 'h5'
          }),
          postImport()
        ]
      }),
      RollPostcssInject2Css(),
      RollupNodeResolve({
        customResolveOptions: {
          moduleDirectory: 'node_modules',
        },
      }),
      RollupCommonjs({
        include: [/\/node_modules\//],
      }),
      RollupJson(),
      RollupBabel({
        runtimeHelpers: true,
        "presets": [
          [
            "taro", {
              framework: 'react'
            }
          ]
        ],
        "plugins": ["@babel/plugin-transform-runtime"]
      }),
      RollupTypescript({
        tsconfig: './tsconfig.json'
      }),
      RollupImage({
        include: ['**/*.png', '**/*.jpg', '**/*.svg']
      }),
      RollupCopy({
        targets: [
          {
            src: [
              './README.md',
            ],
            dest: './dist/wskCalendar/',
          }
        ],
      }),

    ]
  },
  {
    input: './src/index.ts',
    output: [
      {
        format: 'esm',
        dir: './dist/wskCalendar',
        exports: 'named', // 指定导出模式（自动、默认、命名、无）
        preserveModules: true, // 保留模块结构
        preserveModulesRoot: 'src', // 将保留的模块放在根级别的此路径下
      }
    ],
    external: id => /(node_modules|.*\.scss|.*\.css)/.test(id),
    plugins: [
      RollupNodeResolve({
        customResolveOptions: {
          moduleDirectory: 'node_modules',
        },
      }),
      RollupCommonjs({
        include: [/\/node_modules\//],
      }),
      RollupJson(),
      RollupBabel({
        runtimeHelpers: true,
        "presets": [
          [
            "taro", {
              framework: 'react'
            }
          ]
        ],
        "plugins": ["@babel/plugin-transform-runtime"]
      }),
      RollupTypescript({
        tsconfig: './tsconfig.json'
      }),
      RollupDts()
    ]
  }
]
