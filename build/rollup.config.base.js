import vue from 'rollup-plugin-vue'
import babel from '@rollup/plugin-babel'
import resolve from '@rollup/plugin-node-resolve'
import commonjs from 'rollup-plugin-commonjs'
import { eslint } from 'rollup-plugin-eslint'

const config = {
    input: 'src/index.js',
    external: ['vue'],
    plugins: [
        resolve({
            browser: true,
            mainFields: ['jsnext', 'main', 'browser']
        }),
        commonjs(),
        eslint(),
        vue({
            css: true,
            style: {
                postcssPlugins: [require('autoprefixer')]
            }
        }),
        babel({
            babelHelpers: 'bundled',
            exclude: 'node_modules/**',
            extensions: ['.js', '.jsx', '.es6', '.es', '.mjs', '.vue']
        })
    ]
}

export default config