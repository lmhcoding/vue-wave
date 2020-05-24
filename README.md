# vue-wave

## install



```bash
npm install vue-wave
yarn add vue-wave
```



## Usage



作为插件使用



```js
import Vue from 'vue'

import VueWave from 'vue-wave'



Vue.use(VueWave)
```



局部注册组件



```HTML
<template>
  <vue-wave :rate="rate" />
</template>
```



```js
import VueWave from 'vue-wave'

new Vue({
    el: '#root',
    components: {
        VueWave
    },

    data: {
        rate: 50
    }

})
```

## props



## props

| Name           | Type            | Default | Desctiption                                                  |
| -------------- | --------------- | ------- | ------------------------------------------------------------ |
| Rate           | Number          | 0       | 比例值                                                       |
| gap            | Number/String   | 5       | 内外圆间距                                                   |
| width          | Number/String   | 100     | 悬浮球宽度                                                   |
| borderColor    | String          | green   | 边框颜色                                                     |
| borderWidth    | Number/String   | 3       | 边框宽度                                                     |
| waveColor      | String/Function | green   | 波浪颜色，设置为Function时，可接收rate为参数，根据rate设置颜色 |
| justifyContent | String          | Center  |                                                              |
| alignItems     | String          | Center  |                                                              |
|                |                 |         |                                                              |

