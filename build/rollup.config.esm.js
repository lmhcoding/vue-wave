import base from './rollup.config.base'
import pkg from '../package.json'

const config = Object.assign({}, base, {
    output: {
        file: pkg.module,
        format: 'es',
        name: 'vue-wave'
    }
})

export default config