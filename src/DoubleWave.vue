<template>
  <div class="circle" :style="circleStyle">
    <div class="content" :style="contentStyle">
      <slot :rate="rate" />
    </div>
    <!-- eslint-disable-next-line vue/html-self-closing -->
    <div ref="wave1" class="wave first-wave" :style="waveStyle">
      <!-- eslint-disable-next-line vue/html-self-closing -->
      <div :style="waveInnerStyle" class="wave-inner"></div>
    </div>
    <!-- eslint-disable-next-line vue/html-self-closing -->
    <div ref="wave2" class="wave second-wave" :style="wave2Style">
      <!-- eslint-disable-next-line vue/html-self-closing -->
      <div :style="waveInnerStyle" class="wave-inner"></div>
    </div>
  </div>
</template>

<script>
import { 
    formatToPx, 
    px2Number, 
    getWaveColor
} from './util'
import { DEFAULT_WAVE_COLOR } from './const'

let uid = 0

export default {
    name: 'DoubleWave',
    props: {
        waveRadius: {
            type: [Number, String],
            default: '70px'
        },
        rate: {
            type: Number,
            default: 0
        },
        circleHeight: {
            type: [Number, String],
            default: '200px'
        },
        waveColor: {
            type: [String, Function],
            default: DEFAULT_WAVE_COLOR
        },
        initialColor: {
            type: String,
            default: '#fff'
        },
        fullRate: {
            type: Number,
            default: 100
        },
        loopTime: {
            type: Number,
            default: 6
        }
    },
    computed: {
        waveR () {
            return px2Number(this.waveRadius)
        },
        waveWidth () {
            return formatToPx(this.waveR * 8)
        },
        waveHeight () {
            const { step, rate } = this
            return step * rate
        },
        waveStyle () {
            let { circleHeight, waveWidth, waveHeight } = this
            return {
                height: formatToPx(circleHeight),
                width: waveWidth,
                top: formatToPx(px2Number(circleHeight) - waveHeight),
                backgroundColor: this.getWaveColor(),
            }
        },
        waveInnerStyle () {
            let { waveR } = this
            let height = formatToPx(waveR * Math.pow(3, 0.5))
            let doubleWaveR = formatToPx(waveR * 2)
            let backgroundSize = formatToPx(waveR * 2)
            waveR = formatToPx(waveR)
            let waveColor = this.getWaveColor()
            return {
                height,
                backgroundImage: `radial-gradient(${waveR} circle at 0 0px, #fff ${waveR}, transparent), 
                    radial-gradient(${waveR} circle at ${waveR} ${height}, ${waveColor} ${waveR}, transparent), 
                    radial-gradient(${waveR} circle at ${doubleWaveR} 0px, #fff ${waveR}, transparent)`,
                backgroundSize: `${backgroundSize} ${backgroundSize}`,
                top: formatToPx(-1 * px2Number(height) / 2)
            }
        },
        wave2Style () {
            let { circleHeight, waveHeight, waveStyle, } = this
            circleHeight = px2Number(circleHeight)
            return Object.assign({}, waveStyle, {
                top: `${formatToPx(circleHeight - waveHeight + 5)}`,
            })
        },
        circleStyle () {
            let { circleHeight } = this
            let height = formatToPx(circleHeight)
            return {
                height,
                width: height,
                background: this.initialColor
            }
        },
        contentStyle () {
          return {
            height: this.circleStyle.height,
            width: this.circleStyle.width
          }
        },
        step () {
            return px2Number(this.circleHeight) / this.fullRate
        }
    },

    created () {
        this.generateKeyFrames()
    },
    mounted () {
        this.setAnimation()
    },

    beforeDestroy () {
        this.removeKeyframes()
    },

    methods: {
        getWaveColor () {
            let { waveColor, rate } = this
            return getWaveColor(waveColor, rate)
        },
        generateKeyFrames () {
            
            const { waveR } = this
            const translateX = (-4 * waveR) + 'px'
            const style = document.createElement('style')
            this.keyframeID = `mh-wave__keyframes_${uid++}`
            this.firstAnimation = `wave${uid++}`
            this.secondAnimation = `wave${uid++}`
            style.setAttribute('type', 'text/css')
            style.setAttribute('id', this.keyframeID)
            style.innerHTML = `
                @keyframes ${this.firstAnimation} {
                    from { transform: translatex(${translateX}) }
                    to { transform: translatex(0px) }
                }

                @keyframes ${this.secondAnimation} {
                    from { transform: translatex(0px) }
                    to { transform: translatex(${translateX}) }
                }
            `
            document.head.appendChild(style)
        },
        removeKeyframes () {
            let style = document.getElementById(this.keyframeID)
            document.head.removeChild(style)
        },
        setAnimation () {
            const wave1 = this.$refs.wave1
            const wave2 = this.$refs.wave2
            const { loopTime, firstAnimation, secondAnimation } = this
            wave1.style.animation =  `${firstAnimation} linear infinite ${loopTime}s`
            wave2.style.animation = `${secondAnimation} linear infinite ${loopTime}s`
        }
    }
}
</script>

<style lang="stylus" scoped>

    .wave 
        position absolute
    
        & .wave-inner 
            content ''
            position absolute
            width 100%

    .first-wave   
        opacity .75
        z-index 2

    .second-wave 
        z-index 1

    .circle 
        position relative
        border-radius 50%
        overflow hidden
        box-shadow 0 0 10px rgba(0, 0, 0, .1)

    .content 
      border-radius 50%
      display flex
      justify-content center
      align-items center
      position absolute
      z-index 10

</style>