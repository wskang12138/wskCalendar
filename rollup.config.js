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
import RollPostcssInject2Css from './copy-rollup-postcss-inject-to-css.js';
// import pxtransform from 'postcss-pxtransform';
// import Uglifyjs from 'uglify-js';
// import { terser } from 'rollup-plugin-terser'
// import RollupFont from 'rollup-plugin-font'
// import RollupReplace from '@rollup/plugin-replace'
// import constparse from 'postcss-plugin-constparse';
// import postImport from 'postcss-import';
// import postPxToVw from 'postcss-px-to-viewport';
// import RollupCopy from 'rollup-plugin-copy'


const externalPackages = [
  /node_modules/
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
      // RollupCopy({
      //   targets: [
      //     {
      //       src: [
      //         './src/components/**/*.scss',
      //         './src/components/**/*.css',
      //         './src/images/**/*'
      //       ],
      //       dest: './dist/wskCan/style/',
      //       rename: (_, __, fullPath) =>
      //         `${fullPath.includes('src/components') ?
      //           fullPath.replace('src/components', '') :
      //           fullPath.replace('src/images', 'iconfont')
      //         }`
      //     }
      //   ],
      // }),
      // RollupPostCss({ // 可选：处理sass
      //   extract: false, // 非导出模式
      //   inject: true,  // 内联模式
      //   plugins: [
      //     autoprefixer(),
      //     cssnano(),
      //     postImport(),
      //     postUrl({
      //       url: "inline",
      //       maxSize: 70
      //     }),
      //     postPxToVw({
      //       unitToConvert: 'px',
      //       viewportWidth: 750,
      //       unitPrecision: 5,
      //       viewportUnit: 'vw',
      //       fontViewportUnit: 'vw',
      //       minPixelValue: 1,
      //       exclude: [/node_modules/]
      //     })
      //     // pxtransform({
      //     //   platform: 'h5'
      //     // }),
      //     // constparse()
      //   ]
      // }),
      // {
      //   name: 'rollup-my-terser',
      //   generateBundle(_, bundle) {
      //     const bundleIdList = Object.keys(bundle)
      //     bundleIdList.forEach((bundleId) => {
      //       const bundleItem = bundle[bundleId];
      //       const code = bundleItem.code;
      //       // 压缩代码
      //       if (/.*\.js/.test(bundleId) && !/.*\.scss.*/.test(bundleId) && !/.*\.css.*/.test(bundleId) && typeof code === 'string') {
      //         bundleItem.code = Uglifyjs.minify(code).code;
      //         // 删除console.log
      //         bundleItem.code = bundleItem.code.replaceAll(/console.log\(.*\);/g, '');
      //         bundleItem.code = bundleItem.code.replaceAll(/console.log\(.*\),/g, '');
      //       }
      //     })
      //   },
      // }
      // terser()   // 压缩代码
      // RollupReplace({
      //   public: './public', //替换字符用
      //   include: 'src/mta/taroMta.js', //必定要指定include 不是仅仅引用会替换，所有都会
      // }),
      // RollupFont({
      //   include: [/images\/public.*/],
      //   svg: 'src/images/public/fonts/icomoon.svg'
      // }),
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