import { createDecorator } from 'vue-class-component';
/**
 * Decorator for watch options
 * @param path the path or the expression to observe
 * @param watchOptions
 */
export function Watch(path, watchOptions) {
    return createDecorator((componentOptions, handler) => {
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
