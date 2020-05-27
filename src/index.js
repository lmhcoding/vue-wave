import SingleWave from './SingleWave.vue'
import DoubleWave from './DoubleWave.vue'

function install (Vue) {
  Vue.component(SingleWave.name, SingleWave)
  Vue.component(DoubleWave.name, DoubleWave)
}


let GlobalVue = null
if (typeof window !== 'undefined') {
  GlobalVue = window.Vue
} else if (typeof global !== 'undefined') {
  GlobalVue = global.Vue
}
if (GlobalVue) {
  GlobalVue.use(install)
}

export default {
  install,
  SingleWave,
  DoubleWave
}