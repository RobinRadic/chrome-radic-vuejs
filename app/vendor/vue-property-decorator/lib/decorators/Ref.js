import { createDecorator } from 'vue-class-component';
/**
 * decorator of a ref prop
 * @param refKey the ref key defined in template
 */
export function Ref(refKey) {
    return createDecorator((componentOptions, key) => {
        componentOptions.computed || (componentOptions.computed = Object.create(null));
        componentOptions.computed[key] = {
            cache: false,
            get() {
                return this.$refs[refKey || key];
            },
        };
    });
}
