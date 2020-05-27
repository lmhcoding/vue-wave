import { createLocalVue } from '@vue/test-utils'
import VueWave from '../src/index'


describe('Component name', () => {
    test('is VueWave', () => {
        const { SingleWave, DoubleWave } = VueWave
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