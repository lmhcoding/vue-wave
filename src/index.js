import VueWave from './VueWave.vue'

VueWave.install = Vue => {
  Vue.component(VueWave.name, VueWave)
}

let GlobalVue = null
if (typeof window !== 'undefined') {
  GlobalVue = window.Vue
} else if (typeof global !== 'undefined') {
  GlobalVue = global.Vue
}
if (GlobalVue) {
  GlobalVue.use(VueWave)
}

export default VueWave