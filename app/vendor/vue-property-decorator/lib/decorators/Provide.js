import { computed } from 'vue';
import { createDecorator } from 'vue-class-component';
/**
 * Decorator for provide options
 */
export function Provide(options) {
    return createDecorator((componentOptions, key) => {
        const originalProvide = componentOptions.provide;
        componentOptions.provide = function () {
            const providedValue = typeof originalProvide === 'function'
                ? originalProvide.call(this)
                : originalProvide;
            return Object.assign(Object.assign({}, providedValue), { [(options === null || options === void 0 ? void 0 : options.to) || key]: (options === null || options === void 0 ? void 0 : options.reactive) ? computed(() => this[key])
                    : this[key] });
        };
    });
}
