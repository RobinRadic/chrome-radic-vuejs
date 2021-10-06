import { join } from 'path';
import { readFileSync } from 'fs-extra';
import log from 'gulplog'
export const path = (...parts) => join(__dirname, '../..', ...parts);
export const pkg          = require(path('package.json'));
export const dependencies = Object.keys(pkg.dependencies);


export function getWebpackAliases(overrides:Record<string,string>={}){
    const aliases={}
    dependencies.forEach(key => aliases[key] = path('dist/chrome/vendor', key))
    Object.assign(aliases, overrides)
    return aliases;
}
var sjcl = require('sjcl');
// Generate base64-encoded SHA256 for given string.
function encode(s) {
    var hashed = sjcl.hash.sha256.hash(s);
    return sjcl.codec.base64.fromBits(hashed);
}


export function addCspHashToManifest(obj){
    //"content_security_policy":
    let src = readFileSync(path('node_modules/jquery/dist/jquery.js'), 'utf-8');
    let hash = encode(src);
    hash = 'sha256-7Q420OJSf6mE3z+WlP2AiTyI4szGQrHqJcYMvsEDtZg=';
    obj['content_security_policy'] = `script-src 'self' '${hash}'; object-src 'self'`;
    log.info(`addCspHashToManifest hash: '${hash}'`);
    return obj;
}
