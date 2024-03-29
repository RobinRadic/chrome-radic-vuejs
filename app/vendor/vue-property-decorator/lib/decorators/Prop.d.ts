import { PropOptions, VueDecorator } from 'vue-class-component';
declare type Constructor = (new () => any) | SymbolConstructor;
/**
 * Decorator for prop options
 * @param propOptions the options for the prop
 */
export declare function Prop(propOptions?: Constructor | Constructor[] | PropOptions): VueDecorator;
export {};
