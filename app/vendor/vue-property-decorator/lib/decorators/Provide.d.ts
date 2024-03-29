import { VueDecorator } from 'vue-class-component';
export declare type ProvideOption = {
    to?: string | symbol;
    reactive?: boolean;
};
/**
 * Decorator for provide options
 */
export declare function Provide(options?: ProvideOption): VueDecorator;
