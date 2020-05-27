import { mount } from '@vue/test-utils'
import DoubleWave from '../src/DoubleWave.vue'

describe('DoubleWave default props', () => {
    const wrapper = mount(DoubleWave)
    const vm = wrapper.vm
    test('default wave radius', () => {
        expect(vm.waveRadius).toEqual('70px')
        expect(vm.waveR).toEqual(70)
    })
    test('default rate', () => {
        expect(vm.rate).toEqual(0)
    })
    test('default circle height', () => {
        expect(vm.circleHeight).toEqual('200px')
    })
    test('default wave width', () => {
        expect(vm.waveWidth).toEqual('560px')
    })
    test('default wave height', () => {
        expect(vm.waveHeight).toEqual(0)
    })
    test('default wave style', () => {
        expect(vm.waveStyle).toMatchObject({
            height: '200px',
            width: '560px',
            top: '200px',
            backgroundColor: 'green'
        })
    })
})