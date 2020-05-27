import { mount } from '@vue/test-utils'
import VueWave from '../src/SingleWave.vue'

describe('VueWave default props', () => {
    const wrapper = mount(VueWave)
    const vm = wrapper.vm
    test('container width', () => {
        expect(vm.containerWidth).toEqual(84)
    })
    test('container style', () => {
        const style = vm.containerStyle
        expect(style).toMatchObject({
            width: '100px',
            height: '100px',
            padding: '5px',
            border: '3px solid green'
        })
    })
    test('wave style', () => {
        expect(vm.waveStyle).toMatchObject({
            width: '84px',
            height: '84px',
            background: 'green',
            justifyContent: 'center',
            alignItems: 'center'
        })
    })
    test('mask width', () => {
        expect(vm.maskWidth).toEqual(168)
    })
    test('mask style', () => {
        expect(vm.maskStyle).toMatchObject({
            width: '168px',
            height: '168px',
            top: '-79px'
        })
    })
    test('mask top', () => {
        expect(vm.waveTop).toEqual(79)
    })
    test('step', () => {
        expect(vm.step).toEqual(0.84)
    })
})

describe('set rate props', () => {
    const wrapper = mount(VueWave, {
        propsData: {
            rate: 50
        }
    })
    const vm = wrapper.vm
    test('mask top', () => {
        expect(vm.maskStyle).toMatchObject({
            width: '168px',
            height: '168px',
            top: '-121px'
        })
    })
})