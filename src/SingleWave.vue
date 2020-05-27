<template>
  <div class="container" :style="containerStyle">
    <div class="wave" :style="waveStyle">
      <slot :rate="rate" />
    </div>

    <!-- eslint-disable-next-line vue/html-self-closing -->
    <div class="wave-mask" :style="maskStyle"></div>
  </div>
</template>

<script>

import { formatToPx, px2Number, getWaveColor, validator } from './util'
import { DEFAULT_WAVE_COLOR } from './const'

const DOUBLE = 2;
const FULL = 100;

export default {
  name: 'SingleWave',
  props: {
    rate: {
      type: Number,
      default: 0
    },
    gap: {
      type: [Number, String],
      default: 5,
      validator
    },
    width: {
      type: [Number, String],
      default: 100,
      validator
    },
    borderColor: {
      type: String,
      default: 'green',
    },
    borderWidth: {
      type: [Number, String],
      default: 3,
      validator
    },
    waveColor: {
      type: [Function, String],
      default: DEFAULT_WAVE_COLOR
    },
    justifyContent: {
      type: String,
      default: 'center'
    },
    alignItems: {
      type: String,
      default: 'center'
    }
  },

  computed: {
    toNumberWidth () {
      return px2Number(this.width)
    },

    toNumberBorderWidth () {
      return px2Number(this.borderWidth)
    },

    toNumberGap () {
      return px2Number(this.gap)
    },

    // 去除了padding、border后的宽度
    containerWidth () {
      let { toNumberWidth, toNumberBorderWidth, toNumberGap } = this;
      const DOUBLE = 2;
      return toNumberWidth - DOUBLE * (toNumberBorderWidth + toNumberGap)
    },

    containerStyle () {
      let { width } = this;
      width = formatToPx(width);
      return {
        width,
        height: width,
        padding: formatToPx(this.gap),
        border: `${formatToPx(this.borderWidth)} solid ${this.borderColor}`
      };
    },
    waveStyle () {
      return this.getWaveStyle()
    },
    maskWidth () {
      let { containerWidth } = this;
      return DOUBLE * containerWidth;
    },
    maskStyle () {
      let { maskWidth, step, rate } = this;
      maskWidth = formatToPx(maskWidth)
      return {
        width: maskWidth,
        height: maskWidth,
        top: formatToPx(-this.waveTop - step * rate) 
      }
    },
    // 初始top值
    waveTop () {
      let { 
        toNumberBorderWidth, 
        toNumberGap,
        toNumberWidth,
        maskWidth
      } = this;
      return maskWidth - 
        toNumberWidth + 
        DOUBLE * 
        toNumberBorderWidth + 
        toNumberGap
    },
    // 每递增1%，top新增的px数值
    step () {
      const { waveStyle: {height} } = this;
      return px2Number(height) / FULL;
    }
  },
  methods: {
    getWaveStyle () {
      const { 
        toNumberWidth, 
        toNumberBorderWidth, 
        toNumberGap, 
        waveColor, 
        rate, 
        justifyContent,
        alignItems,
      } = this;
      const w = toNumberWidth - DOUBLE * (toNumberBorderWidth + toNumberGap);
      const waveWidth = formatToPx(w);
      const background = getWaveColor(waveColor, rate)
      return {
        width: waveWidth,
        height: waveWidth,
        background,
        justifyContent,
        alignItems
      }
    }
  }
}
</script>

<style lang="stylus" scoped>
  .container
    box-sizing border-box
    border-radius 50%
    background #fff
    position relative
    overflow hidden
  
  .wave
    border-radius 50%
    display flex
  
  .wave-mask
    position absolute
    top 0
    left 50%
    border-radius 40%
    background-color rgba(255, 255,255, 0.9)
    transform translate(-50%, 0%) rotate(0)
    z-index 20
    animation toRotate 10s linear -5s infinite
    

  @keyframes toRotate {
    50% {
      transform translate(-50%, 0%) rotate(180deg)
    }
    100% {
      transform translate(-50%, 0%) rotate(360deg)

    }
  }

</style>
