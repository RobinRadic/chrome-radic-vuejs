import { createDecorator } from 'vue-class-component';
/**
 * Decorator for prop options
 * @param propOptions the options for the prop
 */
export function Prop(propOptions) {
    return createDecorator((componentOptions, key) => {
        componentOptions.props || (componentOptions.props = Object.create(null));
        componentOptions.props[key] = propOptions;
    });
}
