import { createLocalVue } from '@vue/test-utils'

import VueWave from '../dist/vue-wave.esm'

describe('Component name', () => {
    test('is VueWave', () => {
        expect(VueWave.name).toEqual('VueWave')
    })
})

describe('Plugin', () => {
    test('can install', () => {
        const Vue = createLocalVue()
        Vue.use(VueWave)
    })
})