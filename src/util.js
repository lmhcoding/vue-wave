export function formatToPx (n) {
    return typeof n === 'number' ? 
    n === 0 ?
    n :
    `${n}px` :
    n;
}


export function px2Number (val) {
    return typeof val === 'number' ? 
    val :
    +val.replace(/px/, '')
}

