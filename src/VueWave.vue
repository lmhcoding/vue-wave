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

import { formatToPx, px2Number } from './util'

function validator (v) {
  return typeof v === 'number' || /\d+(px)?/.test(v)
}

const DOUBLE = 2;
const FULL = 100;
const DEFAULT_WAVE_COLOR = 'green';

export default {
  name: 'VueWave',
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
    // 去除了padding、border后的宽度
    containerWidth () {
      let { width, borderWidth, gap } = this;

      const DOUBLE = 2;
      let w = px2Number(width) - DOUBLE * (px2Number(borderWidth) + px2Number(gap));
      return w;
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
      let { 
        width, 
        borderWidth, 
        gap, 
        waveColor, 
        rate, 
        justifyContent,
        alignItems,
      } = this;
      let w = px2Number(width) - DOUBLE * (px2Number(borderWidth) + px2Number(gap));
      let waveWidth = formatToPx(w);
      let waveBackground = typeof waveColor=== 'function' ? waveColor(rate) : waveColor;
      return {
        width: waveWidth,
        height: waveWidth,
        background: typeof waveBackground === 'string' ? waveBackground : DEFAULT_WAVE_COLOR,
        justifyContent,
        alignItems
      }
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
        borderWidth, 
        gap,
        width,
        maskWidth
      } = this;
      return maskWidth - 
        px2Number(width) + 
        DOUBLE * 
        px2Number(borderWidth) + 
        px2Number(gap)
    },
    // 每递增1%，top新增的px数值
    step () {
      let { waveStyle: {height} } = this;
      return px2Number(height) / FULL;
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
