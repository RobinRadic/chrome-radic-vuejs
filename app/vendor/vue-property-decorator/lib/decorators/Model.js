import { createDecorator, } from 'vue-class-component';
/**
 * Decorator for v-model
 * @param propName e.g. `modelValue`
 * @param propOptions the options for the prop
 */
export function Model(propName, propOptions) {
    return createDecorator((componentOptions, key) => {
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
