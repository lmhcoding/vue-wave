# mh-wave

## install



```bash
npm install mh-wave
yarn add mh-wave
```



## Usage



作为插件使用



```js
import Vue from 'vue'

import VueWave from 'mh-wave'



Vue.use(VueWave)
```



局部注册组件



```HTML
<template>
  <single-wave :rate="rate" />
  <double-wave :rate="rate" />
</template>
```



```js
import { SingleWave, DoubleWave } from 'mh-wave'

new Vue({
    el: '#root',
    components: {
        SingleWave,
        DoubleWave
    },

    data: {
        rate: 50
    }

})
```

## SingleWave

### props

| Name           | Type            | Default | Desctiption                                                  |
| -------------- | --------------- | ------- | ------------------------------------------------------------ |
| rate           | Number          | 0       | 比例值                                                       |
| gap            | Number/String   | 5       | 内外圆间距                                                   |
| width          | Number/String   | 100     | 悬浮球宽度                                                   |
| borderColor    | String          | green   | 边框颜色                                                     |
| borderWidth    | Number/String   | 3       | 边框宽度                                                     |
| waveColor      | String/Function | green   | 波浪颜色，设置为Function时，可接收rate为参数，根据rate设置颜色 |
| justifyContent | String          | center  |                                                              |
| alignItems     | String          | center  |                                                              |
|                |                 |         |                                                              |


## DoubleWave

### props

| Name         | Type            | Default | Description                                                  |
| ------------ | --------------- | ------- | ------------------------------------------------------------ |
| rate         | Number          | 0       | 比例值                                                       |
| waveRadius   | Number/String   | 70px    | 水波半径                                                     |
| circleHeight | Number/String   | 200px   | 圆球高度                                                     |
| waveColor    | String/Function | green   | 波浪颜色，设置为Function时，可接收rate为参数，根据rate设置颜色 |
| initialColor | String          | #fff    | rate为0时的颜色                                              |
| fullRate     | Number          | 100     | 最大rate值                                                   |