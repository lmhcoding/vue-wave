(function (global, factory) {
    typeof exports === 'object' && typeof module !== 'undefined' ? factory(exports) :
    typeof define === 'function' && define.amd ? define(['exports'], factory) :
    (global = global || self, factory(global['vue-easy-slider'] = {}));
}(this, (function (exports) { 'use strict';

    function formatToPx(n) {
      return typeof n === 'number' ? n === 0 ? n : "".concat(n, "px") : n;
    }
    function px2Number(val) {
      return typeof val === 'number' ? val : +val.replace(/px/, '');
    }

    //

    function validator(v) {
      return typeof v === 'number' || /\d+(px)?/.test(v);
    }

    var DOUBLE = 2;
    var FULL = 100;
    var DEFAULT_WAVE_COLOR = 'green';
    var script = {
      name: 'VueWave',
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
        // 去除了padding、border后的宽度
        containerWidth: function containerWidth() {
          var width = this.width,
              borderWidth = this.borderWidth,
              gap = this.gap;
          var DOUBLE = 2;
          var w = px2Number(width) - DOUBLE * (px2Number(borderWidth) + px2Number(gap));
          return w;
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
        wavesStyle: function wavesStyle() {
          var width = this.width,
              borderWidth = this.borderWidth,
              gap = this.gap,
              waveColor = this.waveColor,
              rate = this.rate,
              justifyContent = this.justifyContent,
              alignItems = this.alignItems;
          var w = px2Number(width) - DOUBLE * (px2Number(borderWidth) + px2Number(gap));
          var waveWidth = formatToPx(w);
          var waveBackground = typeof waveColor === 'function' ? waveColor(rate) : waveColor;
          return {
            width: waveWidth,
            height: waveWidth,
            background: typeof waveBackground === 'string' ? waveBackground : DEFAULT_WAVE_COLOR,
            justifyContent: justifyContent,
            alignItems: alignItems
          };
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
          var borderWidth = this.borderWidth,
              gap = this.gap,
              width = this.width,
              maskWidth = this.maskWidth;
          return maskWidth - px2Number(width) + DOUBLE * px2Number(borderWidth) + px2Number(gap);
        },
        // 每递增1%，top新增的px数值
        step: function step() {
          var height = this.wavesStyle.height;
          return px2Number(height) / FULL;
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

    const isOldIE = typeof navigator !== 'undefined' &&
        /msie [6-9]\\b/.test(navigator.userAgent.toLowerCase());
    function createInjector(context) {
        return (id, style) => addStyle(id, style);
    }
    let HEAD;
    const styles = {};
    function addStyle(id, css) {
        const group = isOldIE ? css.media || 'default' : id;
        const style = styles[group] || (styles[group] = { ids: new Set(), styles: [] });
        if (!style.ids.has(id)) {
            style.ids.add(id);
            let code = css.source;
            if (css.map) {
                // https://developer.chrome.com/devtools/docs/javascript-debugging
                // this makes source maps inside style tags work properly in Chrome
                code += '\n/*# sourceURL=' + css.map.sources[0] + ' */';
                // http://stackoverflow.com/a/26603875
                code +=
                    '\n/*# sourceMappingURL=data:application/json;base64,' +
                        btoa(unescape(encodeURIComponent(JSON.stringify(css.map)))) +
                        ' */';
            }
            if (!style.element) {
                style.element = document.createElement('style');
                style.element.type = 'text/css';
                if (css.media)
                    style.element.setAttribute('media', css.media);
                if (HEAD === undefined) {
                    HEAD = document.head || document.getElementsByTagName('head')[0];
                }
                HEAD.appendChild(style.element);
            }
            if ('styleSheet' in style.element) {
                style.styles.push(code);
                style.element.styleSheet.cssText = style.styles
                    .filter(Boolean)
                    .join('\n');
            }
            else {
                const index = style.ids.size - 1;
                const textNode = document.createTextNode(code);
                const nodes = style.element.childNodes;
                if (nodes[index])
                    style.element.removeChild(nodes[index]);
                if (nodes.length)
                    style.element.insertBefore(textNode, nodes[index]);
                else
                    style.element.appendChild(textNode);
            }
        }
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
        style: _vm.wavesStyle
      }, [_vm._t("default", null, {
        "rate": _vm.rate
      })], 2), _vm._v(" "), _c('div', {
        staticClass: "wave-mask",
        style: _vm.maskStyle
      })]);
    };

    var __vue_staticRenderFns__ = [];
    /* style */

    var __vue_inject_styles__ = function __vue_inject_styles__(inject) {
      if (!inject) return;
      inject("data-v-4180a12b_0", {
        source: ".container[data-v-4180a12b]{-webkit-box-sizing:border-box;box-sizing:border-box;border-radius:50%;background:#fff;position:relative;overflow:hidden}.wave[data-v-4180a12b]{border-radius:50%;display:-webkit-box;display:-ms-flexbox;display:flex}.wave-mask[data-v-4180a12b]{position:absolute;top:0;left:50%;border-radius:40%;background-color:rgba(255,255,255,.9);-webkit-transform:translate(-50%,0) rotate(0);transform:translate(-50%,0) rotate(0);z-index:20;-webkit-animation:toRotate-data-v-4180a12b 10s linear -5s infinite;animation:toRotate-data-v-4180a12b 10s linear -5s infinite}@-webkit-keyframes toRotate-data-v-4180a12b{50%{-webkit-transform:translate(-50%,0) rotate(180deg);transform:translate(-50%,0) rotate(180deg)}100%{-webkit-transform:translate(-50%,0) rotate(360deg);transform:translate(-50%,0) rotate(360deg)}}@keyframes toRotate-data-v-4180a12b{50%{-webkit-transform:translate(-50%,0) rotate(180deg);transform:translate(-50%,0) rotate(180deg)}100%{-webkit-transform:translate(-50%,0) rotate(360deg);transform:translate(-50%,0) rotate(360deg)}}",
        map: undefined,
        media: undefined
      });
    };
    /* scoped */


    var __vue_scope_id__ = "data-v-4180a12b";
    /* module identifier */

    var __vue_module_identifier__ = undefined;
    /* functional template */

    var __vue_is_functional_template__ = false;
    /* style inject SSR */

    /* style inject shadow dom */

    var __vue_component__ = /*#__PURE__*/normalizeComponent({
      render: __vue_render__,
      staticRenderFns: __vue_staticRenderFns__
    }, __vue_inject_styles__, __vue_script__, __vue_scope_id__, __vue_is_functional_template__, __vue_module_identifier__, false, createInjector, undefined, undefined);

    __vue_component__.install = function (Vue) {
      Vue.component(__vue_component__.name, __vue_component__);
    };

    var GlobalVue = null;

    if (typeof window !== 'undefined') {
      GlobalVue = window.Vue;
    } else if (typeof global !== 'undefined') {
      GlobalVue = global.Vue;
    }

    if (GlobalVue) {
      GlobalVue.use(__vue_component__);
    }

    exports.default = __vue_component__;

    Object.defineProperty(exports, '__esModule', { value: true });

})));
