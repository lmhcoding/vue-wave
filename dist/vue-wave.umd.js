(function (global, factory) {
  typeof exports === 'object' && typeof module !== 'undefined' ? factory(exports) :
  typeof define === 'function' && define.amd ? define(['exports'], factory) :
  (global = global || self, factory(global['vue-easy-slider'] = {}));
}(this, (function (exports) { 'use strict';

  var DEFAULT_WAVE_COLOR = 'green';

  var pxReg = /\d+\s*px/;
  function formatToPx(n) {
    return typeof n === 'number' ? n === 0 ? n : "".concat(n, "px") : typeof n === 'string' && pxReg.test(n) ? n.replace(/\s/g, '') : '';
  }
  function px2Number(val) {
    return typeof val === 'number' ? val : typeof val === 'string' && pxReg.test(val) ? +val.replace(/px/, '') : 0;
  }
  function validator(v) {
    return isNumber(v) || isString(v) && /\d+(px)?/.test(v);
  }
  function isNumber(v) {
    return typeof v === 'number';
  }
  function isString(val) {
    return typeof val === 'string';
  }
  function isFunction(val) {
    return typeof val === 'function';
  }
  function getWaveColor(color, rate) {
    return isFunction(color) ? color(rate) : isString(color) ? color : DEFAULT_WAVE_COLOR;
  }

  //
  var DOUBLE = 2;
  var FULL = 100;
  var script = {
    name: 'SingleWave',
    props: {
      rate: {
        type: Number,
        default: 0
      },
      gap: {
        type: [Number, String],
        default: 5,
        validator: validator
      },
      width: {
        type: [Number, String],
        default: 100,
        validator: validator
      },
      borderColor: {
        type: String,
        default: 'green'
      },
      borderWidth: {
        type: [Number, String],
        default: 3,
        validator: validator
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
      toNumberWidth: function toNumberWidth() {
        return px2Number(this.width);
      },
      toNumberBorderWidth: function toNumberBorderWidth() {
        return px2Number(this.borderWidth);
      },
      toNumberGap: function toNumberGap() {
        return px2Number(this.gap);
      },
      // 去除了padding、border后的宽度
      containerWidth: function containerWidth() {
        var toNumberWidth = this.toNumberWidth,
            toNumberBorderWidth = this.toNumberBorderWidth,
            toNumberGap = this.toNumberGap;
        var DOUBLE = 2;
        return toNumberWidth - DOUBLE * (toNumberBorderWidth + toNumberGap);
      },
      containerStyle: function containerStyle() {
        var width = this.width;
        width = formatToPx(width);
        return {
          width: width,
          height: width,
          padding: formatToPx(this.gap),
          border: "".concat(formatToPx(this.borderWidth), " solid ").concat(this.borderColor)
        };
      },
      waveStyle: function waveStyle() {
        return this.getWaveStyle();
      },
      maskWidth: function maskWidth() {
        var containerWidth = this.containerWidth;
        return DOUBLE * containerWidth;
      },
      maskStyle: function maskStyle() {
        var maskWidth = this.maskWidth,
            step = this.step,
            rate = this.rate;
        maskWidth = formatToPx(maskWidth);
        return {
          width: maskWidth,
          height: maskWidth,
          top: formatToPx(-this.waveTop - step * rate)
        };
      },
      // 初始top值
      waveTop: function waveTop() {
        var toNumberBorderWidth = this.toNumberBorderWidth,
            toNumberGap = this.toNumberGap,
            toNumberWidth = this.toNumberWidth,
            maskWidth = this.maskWidth;
        return maskWidth - toNumberWidth + DOUBLE * toNumberBorderWidth + toNumberGap;
      },
      // 每递增1%，top新增的px数值
      step: function step() {
        var height = this.waveStyle.height;
        return px2Number(height) / FULL;
      }
    },
    methods: {
      getWaveStyle: function getWaveStyle() {
        var toNumberWidth = this.toNumberWidth,
            toNumberBorderWidth = this.toNumberBorderWidth,
            toNumberGap = this.toNumberGap,
            waveColor = this.waveColor,
            rate = this.rate,
            justifyContent = this.justifyContent,
            alignItems = this.alignItems;
        var w = toNumberWidth - DOUBLE * (toNumberBorderWidth + toNumberGap);
        var waveWidth = formatToPx(w);
        var background = getWaveColor(waveColor, rate);
        return {
          width: waveWidth,
          height: waveWidth,
          background: background,
          justifyContent: justifyContent,
          alignItems: alignItems
        };
      }
    }
  };

  function normalizeComponent(template, style, script, scopeId, isFunctionalTemplate, moduleIdentifier /* server only */, shadowMode, createInjector, createInjectorSSR, createInjectorShadow) {
      if (typeof shadowMode !== 'boolean') {
          createInjectorSSR = createInjector;
          createInjector = shadowMode;
          shadowMode = false;
      }
      // Vue.extend constructor export interop.
      const options = typeof script === 'function' ? script.options : script;
      // render functions
      if (template && template.render) {
          options.render = template.render;
          options.staticRenderFns = template.staticRenderFns;
          options._compiled = true;
          // functional template
          if (isFunctionalTemplate) {
              options.functional = true;
          }
      }
      // scopedId
      if (scopeId) {
          options._scopeId = scopeId;
      }
      let hook;
      if (moduleIdentifier) {
          // server build
          hook = function (context) {
              // 2.3 injection
              context =
                  context || // cached call
                      (this.$vnode && this.$vnode.ssrContext) || // stateful
                      (this.parent && this.parent.$vnode && this.parent.$vnode.ssrContext); // functional
              // 2.2 with runInNewContext: true
              if (!context && typeof __VUE_SSR_CONTEXT__ !== 'undefined') {
                  context = __VUE_SSR_CONTEXT__;
              }
              // inject component styles
              if (style) {
                  style.call(this, createInjectorSSR(context));
              }
              // register component module identifier for async chunk inference
              if (context && context._registeredComponents) {
                  context._registeredComponents.add(moduleIdentifier);
              }
          };
          // used by ssr in case component is cached and beforeCreate
          // never gets called
          options._ssrRegister = hook;
      }
      else if (style) {
          hook = shadowMode
              ? function (context) {
                  style.call(this, createInjectorShadow(context, this.$root.$options.shadowRoot));
              }
              : function (context) {
                  style.call(this, createInjector(context));
              };
      }
      if (hook) {
          if (options.functional) {
              // register for functional component in vue file
              const originalRender = options.render;
              options.render = function renderWithStyleInjection(h, context) {
                  hook.call(context);
                  return originalRender(h, context);
              };
          }
          else {
              // inject component registration as beforeCreate hook
              const existing = options.beforeCreate;
              options.beforeCreate = existing ? [].concat(existing, hook) : [hook];
          }
      }
      return script;
  }

  /* script */
  var __vue_script__ = script;
  /* template */

  var __vue_render__ = function __vue_render__() {
    var _vm = this;

    var _h = _vm.$createElement;

    var _c = _vm._self._c || _h;

    return _c('div', {
      staticClass: "container",
      style: _vm.containerStyle
    }, [_c('div', {
      staticClass: "wave",
      style: _vm.waveStyle
    }, [_vm._t("default", null, {
      "rate": _vm.rate
    })], 2), _vm._v(" "), _c('div', {
      staticClass: "wave-mask",
      style: _vm.maskStyle
    })]);
  };

  var __vue_staticRenderFns__ = [];
  /* style */

  var __vue_inject_styles__ = undefined;
  /* scoped */

  var __vue_scope_id__ = "data-v-220d6688";
  /* module identifier */

  var __vue_module_identifier__ = undefined;
  /* functional template */

  var __vue_is_functional_template__ = false;
  /* style inject */

  /* style inject SSR */

  /* style inject shadow dom */

  var __vue_component__ = /*#__PURE__*/normalizeComponent({
    render: __vue_render__,
    staticRenderFns: __vue_staticRenderFns__
  }, __vue_inject_styles__, __vue_script__, __vue_scope_id__, __vue_is_functional_template__, __vue_module_identifier__, false, undefined, undefined, undefined);

  //
  var uid = 0;
  var script$1 = {
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
      waveR: function waveR() {
        return px2Number(this.waveRadius);
      },
      waveWidth: function waveWidth() {
        return formatToPx(this.waveR * 8);
      },
      waveHeight: function waveHeight() {
        var step = this.step,
            rate = this.rate;
        return step * rate;
      },
      waveStyle: function waveStyle() {
        var circleHeight = this.circleHeight,
            waveWidth = this.waveWidth,
            waveHeight = this.waveHeight;
        return {
          height: formatToPx(circleHeight),
          width: waveWidth,
          top: formatToPx(px2Number(circleHeight) - waveHeight),
          backgroundColor: this.getWaveColor()
        };
      },
      waveInnerStyle: function waveInnerStyle() {
        var waveR = this.waveR;
        var height = formatToPx(waveR * Math.pow(3, 0.5));
        var doubleWaveR = formatToPx(waveR * 2);
        var backgroundSize = formatToPx(waveR * 2);
        waveR = formatToPx(waveR);
        var waveColor = this.getWaveColor();
        return {
          height: height,
          backgroundImage: "radial-gradient(".concat(waveR, " circle at 0 0px, #fff ").concat(waveR, ", transparent), \n                    radial-gradient(").concat(waveR, " circle at ").concat(waveR, " ").concat(height, ", ").concat(waveColor, " ").concat(waveR, ", transparent), \n                    radial-gradient(").concat(waveR, " circle at ").concat(doubleWaveR, " 0px, #fff ").concat(waveR, ", transparent)"),
          backgroundSize: "".concat(backgroundSize, " ").concat(backgroundSize),
          top: formatToPx(-1 * px2Number(height) / 2)
        };
      },
      wave2Style: function wave2Style() {
        var circleHeight = this.circleHeight,
            waveHeight = this.waveHeight,
            waveStyle = this.waveStyle;
        circleHeight = px2Number(circleHeight);
        return Object.assign({}, waveStyle, {
          top: "".concat(formatToPx(circleHeight - waveHeight + 5))
        });
      },
      circleStyle: function circleStyle() {
        var circleHeight = this.circleHeight;
        var height = formatToPx(circleHeight);
        return {
          height: height,
          width: height,
          background: this.initialColor
        };
      },
      contentStyle: function contentStyle() {
        return {
          height: this.circleStyle.height,
          width: this.circleStyle.width
        };
      },
      step: function step() {
        return px2Number(this.circleHeight) / this.fullRate;
      }
    },
    created: function created() {
      this.generateKeyFrames();
    },
    mounted: function mounted() {
      this.setAnimation();
    },
    beforeDestroy: function beforeDestroy() {
      this.removeKeyframes();
    },
    methods: {
      getWaveColor: function getWaveColor$1() {
        var waveColor = this.waveColor,
            rate = this.rate;
        return getWaveColor(waveColor, rate);
      },
      generateKeyFrames: function generateKeyFrames() {
        var waveR = this.waveR;
        var translateX = -4 * waveR + 'px';
        var style = document.createElement('style');
        this.keyframeID = "mh-wave__keyframes_".concat(uid++);
        this.firstAnimation = "wave".concat(uid++);
        this.secondAnimation = "wave".concat(uid++);
        style.setAttribute('type', 'text/css');
        style.setAttribute('id', this.keyframeID);
        style.innerHTML = "\n                @keyframes ".concat(this.firstAnimation, " {\n                    from { transform: translatex(").concat(translateX, ") }\n                    to { transform: translatex(0px) }\n                }\n\n                @keyframes ").concat(this.secondAnimation, " {\n                    from { transform: translatex(0px) }\n                    to { transform: translatex(").concat(translateX, ") }\n                }\n            ");
        document.head.appendChild(style);
      },
      removeKeyframes: function removeKeyframes() {
        var style = document.getElementById(this.keyframeID);
        document.head.removeChild(style);
      },
      setAnimation: function setAnimation() {
        var wave1 = this.$refs.wave1;
        var wave2 = this.$refs.wave2;
        var loopTime = this.loopTime,
            firstAnimation = this.firstAnimation,
            secondAnimation = this.secondAnimation;
        wave1.style.animation = "".concat(firstAnimation, " linear infinite ").concat(loopTime, "s");
        wave2.style.animation = "".concat(secondAnimation, " linear infinite ").concat(loopTime, "s");
      }
    }
  };

  /* script */
  var __vue_script__$1 = script$1;
  /* template */

  var __vue_render__$1 = function __vue_render__() {
    var _vm = this;

    var _h = _vm.$createElement;

    var _c = _vm._self._c || _h;

    return _c('div', {
      staticClass: "circle",
      style: _vm.circleStyle
    }, [_c('div', {
      staticClass: "content",
      style: _vm.contentStyle
    }, [_vm._t("default", null, {
      "rate": _vm.rate
    })], 2), _vm._v(" "), _c('div', {
      ref: "wave1",
      staticClass: "wave first-wave",
      style: _vm.waveStyle
    }, [_c('div', {
      staticClass: "wave-inner",
      style: _vm.waveInnerStyle
    })]), _vm._v(" "), _c('div', {
      ref: "wave2",
      staticClass: "wave second-wave",
      style: _vm.wave2Style
    }, [_c('div', {
      staticClass: "wave-inner",
      style: _vm.waveInnerStyle
    })])]);
  };

  var __vue_staticRenderFns__$1 = [];
  /* style */

  var __vue_inject_styles__$1 = undefined;
  /* scoped */

  var __vue_scope_id__$1 = "data-v-53d2d9dc";
  /* module identifier */

  var __vue_module_identifier__$1 = undefined;
  /* functional template */

  var __vue_is_functional_template__$1 = false;
  /* style inject */

  /* style inject SSR */

  /* style inject shadow dom */

  var __vue_component__$1 = /*#__PURE__*/normalizeComponent({
    render: __vue_render__$1,
    staticRenderFns: __vue_staticRenderFns__$1
  }, __vue_inject_styles__$1, __vue_script__$1, __vue_scope_id__$1, __vue_is_functional_template__$1, __vue_module_identifier__$1, false, undefined, undefined, undefined);

  function install(Vue) {
    Vue.component(__vue_component__.name, __vue_component__);
    Vue.component(__vue_component__$1.name, __vue_component__$1);
  }

  var GlobalVue = null;

  if (typeof window !== 'undefined') {
    GlobalVue = window.Vue;
  } else if (typeof global !== 'undefined') {
    GlobalVue = global.Vue;
  }

  if (GlobalVue) {
    GlobalVue.use(install);
  }

  exports.DoubleWave = __vue_component__$1;
  exports.SingleWave = __vue_component__;
  exports.default = install;

  Object.defineProperty(exports, '__esModule', { value: true });

})));
