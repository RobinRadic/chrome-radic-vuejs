import { InjectionKey } from 'vue';
import { VueDecorator } from 'vue-class-component';
export declare type InjectOptions = {
    from?: string | InjectionKey<any>;
    default?: any;
};
/**
 * Decorator for inject options
 * @param options the options for the injected value
 */
export declare function Inject(options?: InjectOptions): VueDecorator;
