import { createLocalVue } from '@vue/test-utils'
import VueWave, { SingleWave, DoubleWave } from '../src/index'


describe('Component name', () => {
    test('is VueWave', () => {
        expect(SingleWave.name).toEqual('SingleWave')
        expect(DoubleWave.name).toEqual('DoubleWave')
    })
})

describe('Plugin', () => {
    test('can install', () => {
        const Vue = createLocalVue()
        Vue.use(VueWave)
    })
})