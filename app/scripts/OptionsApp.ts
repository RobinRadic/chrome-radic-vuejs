// Enable chromereload by uncommenting this line:
// import 'chromereload/devonly';
import { App, ComponentOptionsBase, ComponentPublicInstance, createApp } from 'vue';
import $ from 'jquery';
import { get, has, kebabCase, set, unset } from 'lodash';
import * as components from './components';
import COptions from './Options.vue';

console.log(`'Allo 'Allo! Options`);

const store = chrome.storage.sync;

const storeGet = <T>(keys?: string | string[]): Promise<T> => {
    return new Promise((resolve, reject) => {
        const cb = data => {resolve(data);};
        if ( keys === undefined ) {
            return store.get(cb);
        }
        store.get(keys, cb);
    });
};

export class OptionsApp {
    app: App;
    root: ComponentPublicInstance<{}, {}, {}, {}, {}, {}, {}, {}, false, ComponentOptionsBase<any, any, any, any, any, any, any, any, any, {}>>;
    protected items: any = {};

    async init() {
        this.items = await storeGet();
        await $.ready;

        this.app                                  = createApp(COptions);
        this.app.config.globalProperties.$options = this;
        Object.entries(components).forEach(([ key, component ]) => {
            this.app.component(kebabCase(`C${key}`), component);
        });

        return this;
    }

    async mount(selector: string) {
        this.root = this.app.mount(document.querySelector(selector));
    }

    get<T>(path: string, defaultValue: any): T {
        return get(this.items, path, defaultValue);
    }

    has(path: string): boolean {
        return has(this.items, path);
    }

    async set(path: string, value: any): Promise<this> {
        set(this.items, path, value);
        await this.save();
        return this;
    }

    async unset(path: string): Promise<this> {
        unset(this.items, path);
        await this.save();
        return this;
    }

    protected async save() {
        await store.set(this.items);
    }
}


declare module '@vue/runtime-core' {
    export interface ComponentCustomProperties {
        $options: OptionsApp;
    }
}
