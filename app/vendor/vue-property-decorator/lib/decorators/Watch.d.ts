import { WatchOptions } from 'vue';
import { VueDecorator } from 'vue-class-component';
/**
 * Decorator for watch options
 * @param path the path or the expression to observe
 * @param watchOptions
 */
export declare function Watch(path: string, watchOptions?: WatchOptions): VueDecorator;
