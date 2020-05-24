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

