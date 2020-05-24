import vue from 'rollup-plugin-vue'
import babel from '@rollup/plugin-babel'
import resolve from '@rollup/plugin-node-resolve'
import commonjs from 'rollup-plugin-commonjs'
import { eslint } from 'rollup-plugin-eslint'
import replace from 'rollup-plugin-replace'
import css from 'rollup-plugin-css-only' // 提取css

const config = {
    input: 'src/index.js',
    external: ['vue'],
    plugins: [
        css(),
        resolve({
            browser: true,
            mainFields: ['jsnext', 'main', 'browser']
        }),
        commonjs(),
        eslint(),
        vue({
            css: false,
            style: {
                postcssPlugins: [require('autoprefixer')]
            },
            htmlMinifier: {
                customAttrSurround: [[/@/, new RegExp('')], [/:/, new RegExp('')]],
                collapseWhitespace: true,
                removeComments: true
            }
        }),
        babel({
            babelHelpers: 'bundled',
            exclude: 'node_modules/**',
            extensions: ['.js', '.jsx', '.es6', '.es', '.mjs', '.vue']
        }),
        replace({
            'process.env.NODE_ENV': JSON.stringify( 'production' )
        })
    ]
}

export default config