///<reference path="../../node_modules/@types/chrome/index.d.ts"/>
import 'chromereload/devonly'
import { LoDashStatic } from 'lodash';

declare const $0: { __vue__: any, _vue_directives: any }
declare const _: LoDashStatic

console.log(`'Allo 'Allo! Devtools Extension`);


const page_getProperties = function () {


    const getCopyOf = function (data) {
        const props = Object.getOwnPropertyNames(data);
        const copy  = { __proto__: null };
        for ( let i = 0; i < props.length; ++ i )
            copy[ props[ i ] ] = data[ props[ i ] ];

        const proto1 = Object.getPrototypeOf(data);
        Object.keys(proto1).forEach(function (key) {
            if ( typeof copy[ key ] === 'undefined' ) {
                copy[ key ] = data[ key ];
            }
        });

        const proto2 = Object.getPrototypeOf(proto1);
        Object.keys(proto2).forEach(function (key) {
            if ( typeof copy[ key ] === 'undefined' ) {
                copy[ key ] = data[ key ];
            }
        })

        return copy;
    };

    var data: any = { what: 'No VueJS data on this element' };
    let type      = 'n';

    if ( $0 && $0.__vue__ ) {
        data = {};

        data.component = getCopyOf($0.__vue__);

        try {
            data.store = typeof $0.__vue__.$store === 'undefined' ? 'Store does not exists' : _.cloneDeep($0.__vue__.$store);
        } catch ( e ) {
            data.store = typeof $0.__vue__.$store === 'undefined' ? 'Store does not exists' : _.clone($0.__vue__.$store);
        }
        try {
            data.router = typeof $0.__vue__.$router === 'undefined' ? 'Store does not exists' : _.cloneDeep($0.__vue__.$router);
        } catch ( e ) {
            data.router = typeof $0.__vue__.$router === 'undefined' ? 'Store does not exists' : _.clone($0.__vue__.$router);
        }
        try {
            data.route = typeof $0.__vue__.$route === 'undefined' ? 'Store does not exists' : _.cloneDeep($0.__vue__.$route);
        } catch ( e ) {
            data.route = typeof $0.__vue__.$route === 'undefined' ? 'Store does not exists' : _.clone($0.__vue__.$route);
        }
        return data;

    } else if ( $0 && $0._vue_directives ) {
        data = $0._vue_directives
        type = 'd';
    }


    // Make a shallow copy with a null prototype, so that sidebar does not
    // expose prototype.
    //var props = Object.getOwnPropertyNames(data);
    //var copy = {__proto__: null};
    //for (var i = 0; i < props.length; ++ i)
    //  copy[props[i]] = data[props[i]];
    return data;
};

function pane(sidebar) {

    function updateElementProperties() {
        sidebar.setExpression('(' + page_getProperties.toString() + ')()');
        //sidebar.setObject(page_getProperties());
    }

    updateElementProperties();

    chrome.devtools.panels.elements.onSelectionChanged.addListener(updateElementProperties);

}

chrome.devtools.panels.elements.createSidebarPane('Vue.js', pane);
