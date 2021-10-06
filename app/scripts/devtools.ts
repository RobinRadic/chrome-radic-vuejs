// Enable chromereload by uncommenting this line:
// import 'chromereload/devonly';
import '../styles/devtools.scss';
import { App, VNode } from 'vue';
import { ComponentInternalInstance } from '@vue/runtime-core';

declare const $0: any;

console.log(`Devtools Exp`);


function getPanelContents() {
    return () => {
        if ( !$0 ) return { what: 'No valid element selected' };

        console.log(`'getPanelContents`);

        const callbacks: Array<<T>(data: T) => T> = [];

        const props: Array<{ name: string, key: string, cb?: (obj: any, data?: any) => any }> = [
            { name: 'VueApp', key: '__vue_app__', cb: (e: App) => null },
            {
                name: 'VueComponent', key: '__vueParentComponent',
                cb  : (e: ComponentInternalInstance & any, data: any) => {
                    let name = e?.type?.name;
                    if ( name ) {
                        name = `VueComponent[${name}]`;
                    }
                    if ( e.__vrl_route ) {
                        data[ 'RouterLink(__vrl_route)' ] = e.__vrl_route;
                    }
                    name = name || 'VueComponent';
                    if ( e.ctx ) {
                        data[ `${name}.ctx` ] = e.ctx;
                    }
                    if ( e.vnode ) {
                        data[ `${name}.vnode` ] = e.vnode;
                    }
                    return { name }
                },
            },
            { name: 'VNode', key: '__vnode', cb: (e: VNode) => null },
            { name: 'Vnode', key: '_vnode', cb: (e: VNode) => null },
            { name: 'VueEventEvokers', key: '_vei', cb: (e: any) => null },
            { name: 'TippyInstance', key: '$tippy', cb: (e: any) => null },
            { name: 'QuasarRippleDirective', key: '__qripple', cb: (e: any) => null },
            { name: 'QuasarClosePopupDirective', key: '__qclosepopup', cb: (e: any) => null },
            { name: 'QuasarIntersectionDirective', key: '__qvisible', cb: (e: any) => null },
            { name: 'QuasarMorphDirective', key: '__qmorph', cb: (e: any) => null },
            { name: 'QuasarMutationDirective', key: '__qmutation', cb: (e: any) => null },
            { name: 'QuasarScrollDirective', key: '__qscroll', cb: (e: any) => null },
            { name: 'QuasarScrollFireDirective', key: '__qscrollfire', cb: (e: any) => null },
            { name: 'QuasarTouchHoldDirective', key: '__qtouchhold', cb: (e: any) => null },
        ];

        try {

            var data: any = {};

            props.forEach(prop => {
                try {
                    if ( $0 && $0[ prop.key ] ) {
                        let name= `${prop.name}(${prop.key})`;
                        if ( prop.cb ) {
                            let result = prop.cb($0[ prop.key ], data);
                            if ( result !== null ) {
                                name = result?.name || name;
                            }
                        }

                        data[name ] = $0[ prop.key ];
                    }
                } catch (e) {
                    console.warn('getPanelContents', e);
                    return { what: `Error ${e}` };
                }
            });

            return data;
        } catch (e) {
            console.warn('getPanelContents', e);
            return { what: `Error ${e}` };
        }
    };
};

const elements = chrome.devtools.panels.elements;
elements.createSidebarPane('Vue3', sidebar => {
    function updatePanelContents() {
        sidebar.setExpression(serializeAsIIFE(getPanelContents()), 'VUE RELATED PROPERTIES');
    }

    let visible = true;

    elements.onSelectionChanged.addListener(function () {
        if ( visible ) updatePanelContents();
    });

    elements.onSelectionChanged.addListener(() => {
        console.log('elements.onSelectionChanged');
    });
    // Don't update the sidebar if it's not visible
    sidebar.onShown.addListener(function (window) {
        console.log('sidebar.onShown', window);
        visible = true;
        updatePanelContents();
    });
    sidebar.onHidden.addListener(function () {
        visible = false;
    });

    console.log(`'createSidebarPane`);
    sidebar.onShown.addListener(window => {
        console.log('sidebar.onShown', window);
    });
    sidebar.onHidden.addListener(() => {
        console.log('sidebar.onHidden');
    });

});


function serializeAsIIFE(fn) {
    var params = Array.prototype.slice
                      .call(arguments, 1)
                      .map(function (arg) {
                          return JSON.stringify(arg);
                      }).join(',');
    return [ '(', fn.toString(), ')(', params, ')' ].join('');
}
