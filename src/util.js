import { DEFAULT_WAVE_COLOR } from './const'
const pxReg = /\d+\s*px/

export function formatToPx (n) {
    return typeof n === 'number' ? 
    n === 0 ?
    n :
    `${n}px` :
    typeof n === 'string' && pxReg.test(n) ?
    n.replace(/\s/g, '') :
    ''
}


export function px2Number (val) {
    return typeof val === 'number' ? 
    val :
    typeof val === 'string' && pxReg.test(val) ? 
    +val.replace(/px/, '') :
    0
}

export function validator (v) {
  return isNumber(v) || isString(v) && /\d+(px)?/.test(v)
}

export function isNumber (v) {
  return typeof v === 'number'
}

export function isString (val) {
  return typeof val === 'string'
}

export function isFunction (val) {
  return typeof val === 'function'
}

export function getWaveColor (color, rate) {
  return isFunction(color) ? 
      color(rate) :
      isString(color) ?
      color :
      DEFAULT_WAVE_COLOR;
}

