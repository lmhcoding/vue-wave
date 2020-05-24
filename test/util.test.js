import { formatToPx, px2Number } from '../src/util'

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
})
