import { inject } from 'vue';
import { createDecorator } from 'vue-class-component';
/**
 * Decorator for inject options
 * @param options the options for the injected value
 */
export function Inject(options = Object.create(null)) {
    return createDecorator((componentOptions, key) => {
        const originalSetup = componentOptions.setup;
        componentOptions.setup = (props, ctx) => {
            const result = originalSetup === null || originalSetup === void 0 ? void 0 : originalSetup(props, ctx);
            const injectedValue = inject(options.from || key, options.default);
            return Object.assign(Object.assign({}, result), { [key]: injectedValue });
        };
    });
}
