import { formatToPx, px2Number, validator, getWaveColor } from '../src/util'

describe('util test', () => {
    test('convert to px', () => {
        expect(formatToPx(0)).toEqual(0)
        expect(formatToPx(1)).toEqual('1px')
        expect(formatToPx('1px')).toEqual('1px')
        expect(formatToPx(void 0)).toEqual('')
        expect(formatToPx('1 px')).toEqual('1px')
    })
    test('convert px to number', () => {
        expect(px2Number('1px')).toEqual(1)
        expect(px2Number(1)).toEqual(1)
        expect(px2Number('1 px')).toEqual(1)
        expect(px2Number(void 0)).toEqual(0)
    })
    test('validator', () => {
        expect(validator(1)).toEqual(true)
        expect(validator(void 0)).toEqual(false)
        expect(validator('1px')).toEqual(true)
        expect(validator('1')).toEqual(true)
        expect(validator('')).toEqual(false)
    })
    test('function getWaveColor', () => {
        function colorMap (rate) {
            return rate > 50 ? 'red' : 'green'
        }
        expect(getWaveColor('green')).toEqual('green')
        expect(getWaveColor(colorMap, 10)).toEqual('green')
        expect(getWaveColor(colorMap, 60)).toEqual('red')
    })
})
