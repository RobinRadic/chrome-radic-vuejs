(function (global, factory) {
    typeof exports === 'object' && typeof module !== 'undefined' ? factory(exports, require('vue-class-component'), require('vue')) :
    typeof define === 'function' && define.amd ? define(['exports', 'vue-class-component', 'vue'], factory) :
    (global = typeof globalThis !== 'undefined' ? globalThis : global || self, factory(global.VuePropertyDecorator = {}, global.VueClassComponent, global.Vue));
}(this, (function (exports, vueClassComponent, vue) { 'use strict';

    // Code copied from Vue/src/shared/util.js
    const hyphenateRE = /\B([A-Z])/g;
    const hyphenate = (str) => str.replace(hyphenateRE, '-$1').toLowerCase();
    /**
     * Decorator of an event-emitter function
     * @param  event The name of the event
     */
    function Emit(event) {
        return vueClassComponent.createDecorator((componentOptions, propertyKey) => {
            const emitName = event || hyphenate(propertyKey);
            componentOptions.emits || (componentOptions.emits = []);
            componentOptions.emits.push(emitName);
            const original = componentOptions.methods[propertyKey];
            componentOptions.methods[propertyKey] = function emitter(...args) {
                const emit = (returnValue) => {
                    if (returnValue === undefined) {
                        if (args.length === 0) {
                            this.$emit(emitName);
                        }
                        else if (args.length === 1) {
                            this.$emit(emitName, args[0]);
                        }
                        else {
                            this.$emit(emitName, ...args);
                        }
                    }
                    else {
                        args.unshift(returnValue);
                        this.$emit(emitName, ...args);
                    }
                };
                const returnValue = original.apply(this, args);
                if (isPromise(returnValue)) {
                    returnValue.then(emit);
                }
                else {
                    emit(returnValue);
                }
                return returnValue;
            };
        });
    }
    function isPromise(obj) {
        return obj instanceof Promise || (obj && typeof obj.then === 'function');
    }

    /**
     * Decorator for inject options
     * @param options the options for the injected value
     */
    function Inject(options = Object.create(null)) {
        return vueClassComponent.createDecorator((componentOptions, key) => {
            const originalSetup = componentOptions.setup;
            componentOptions.setup = (props, ctx) => {
                const result = originalSetup === null || originalSetup === void 0 ? void 0 : originalSetup(props, ctx);
                const injectedValue = vue.inject(options.from || key, options.default);
                return Object.assign(Object.assign({}, result), { [key]: injectedValue });
            };
        });
    }

    /**
     * Decorator for v-model
     * @param propName e.g. `modelValue`
     * @param propOptions the options for the prop
     */
    function Model(propName, propOptions) {
        return vueClassComponent.createDecorator((componentOptions, key) => {
            const eventName = `update:${propName}`;
            componentOptions.props || (componentOptions.props = Object.create(null));
            componentOptions.props[propName] = propOptions;
            componentOptions.emits || (componentOptions.emits = []);
            componentOptions.emits.push(eventName);
            componentOptions.computed || (componentOptions.computed = Object.create(null));
            componentOptions.computed[key] = {
                get() {
                    return this[propName];
                },
                set(newValue) {
                    this.$emit(eventName, newValue);
                },
            };
        });
    }

    /**
     * Decorator for prop options
     * @param propOptions the options for the prop
     */
    function Prop(propOptions) {
        return vueClassComponent.createDecorator((componentOptions, key) => {
            componentOptions.props || (componentOptions.props = Object.create(null));
            componentOptions.props[key] = propOptions;
        });
    }

    /**
     * Decorator for provide options
     */
    function Provide(options) {
        return vueClassComponent.createDecorator((componentOptions, key) => {
            const originalProvide = componentOptions.provide;
            componentOptions.provide = function () {
                const providedValue = typeof originalProvide === 'function'
                    ? originalProvide.call(this)
                    : originalProvide;
                return Object.assign(Object.assign({}, providedValue), { [(options === null || options === void 0 ? void 0 : options.to) || key]: (options === null || options === void 0 ? void 0 : options.reactive) ? vue.computed(() => this[key])
                        : this[key] });
            };
        });
    }

    /**
     * decorator of a ref prop
     * @param refKey the ref key defined in template
     */
    function Ref(refKey) {
        return vueClassComponent.createDecorator((componentOptions, key) => {
            componentOptions.computed || (componentOptions.computed = Object.create(null));
            componentOptions.computed[key] = {
                cache: false,
                get() {
                    return this.$refs[refKey || key];
                },
            };
        });
    }

    /**
     * Decorator for watch options
     * @param path the path or the expression to observe
     * @param watchOptions
     */
    function Watch(path, watchOptions) {
        return vueClassComponent.createDecorator((componentOptions, handler) => {
            componentOptions.watch || (componentOptions.watch = Object.create(null));
            const watch = componentOptions.watch;
            if (typeof watch[path] === 'object' && !Array.isArray(watch[path])) {
                watch[path] = [watch[path]];
            }
            else if (typeof watch[path] === 'undefined') {
                watch[path] = [];
            }
            watch[path].push(Object.assign({ handler }, watchOptions));
        });
    }

    Object.defineProperty(exports, 'Options', {
        enumerable: true,
        get: function () {
            return vueClassComponent.Options;
        }
    });
    Object.defineProperty(exports, 'Vue', {
        enumerable: true,
        get: function () {
            return vueClassComponent.Vue;
        }
    });
    Object.defineProperty(exports, 'mixins', {
        enumerable: true,
        get: function () {
            return vueClassComponent.mixins;
        }
    });
    exports.Emit = Emit;
    exports.Inject = Inject;
    exports.Model = Model;
    exports.Prop = Prop;
    exports.Provide = Provide;
    exports.Ref = Ref;
    exports.Watch = Watch;

    Object.defineProperty(exports, '__esModule', { value: true });

})));
