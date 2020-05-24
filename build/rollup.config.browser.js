import base from './rollup.config.base'
import pkg from '../package.json'
import { terser } from 'rollup-plugin-terser'


const config = Object.assign({}, base, {
    output: {
        exports: 'named',
        name: 'VueWave',
        file: pkg.unpkg,
        format: 'iife'
    }
})

config.plugins.push(terser())

export default config