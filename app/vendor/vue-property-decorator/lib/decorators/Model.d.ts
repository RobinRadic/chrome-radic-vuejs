import { PropOptions, VueDecorator } from 'vue-class-component';
declare type Constructor = (new () => any) | SymbolConstructor;
/**
 * Decorator for v-model
 * @param propName e.g. `modelValue`
 * @param propOptions the options for the prop
 */
export declare function Model(propName: string, propOptions?: Constructor | Constructor[] | PropOptions): VueDecorator;
export {};
