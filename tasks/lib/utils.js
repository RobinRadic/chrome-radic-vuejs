"use strict";
var __spreadArray = (this && this.__spreadArray) || function (to, from, pack) {
    if (pack || arguments.length === 2) for (var i = 0, l = from.length, ar; i < l; i++) {
        if (ar || !(i in from)) {
            if (!ar) ar = Array.prototype.slice.call(from, 0, i);
            ar[i] = from[i];
        }
    }
    return to.concat(ar || Array.prototype.slice.call(from));
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.addCspHashToManifest = exports.getWebpackAliases = exports.dependencies = exports.pkg = exports.path = void 0;
var path_1 = require("path");
var fs_extra_1 = require("fs-extra");
var gulplog_1 = __importDefault(require("gulplog"));
var path = function () {
    var parts = [];
    for (var _i = 0; _i < arguments.length; _i++) {
        parts[_i] = arguments[_i];
    }
    return path_1.join.apply(void 0, __spreadArray([__dirname, '../..'], parts, false));
};
exports.path = path;
exports.pkg = require((0, exports.path)('package.json'));
exports.dependencies = Object.keys(exports.pkg.dependencies);
function getWebpackAliases(overrides) {
    if (overrides === void 0) { overrides = {}; }
    var aliases = {};
    exports.dependencies.forEach(function (key) { return aliases[key] = (0, exports.path)('dist/chrome/vendor', key); });
    Object.assign(aliases, overrides);
    return aliases;
}
exports.getWebpackAliases = getWebpackAliases;
var sjcl = require('sjcl');
// Generate base64-encoded SHA256 for given string.
function encode(s) {
    var hashed = sjcl.hash.sha256.hash(s);
    return sjcl.codec.base64.fromBits(hashed);
}
function addCspHashToManifest(obj) {
    //"content_security_policy":
    var src = (0, fs_extra_1.readFileSync)((0, exports.path)('node_modules/jquery/dist/jquery.js'), 'utf-8');
    var hash = encode(src);
    hash = 'sha256-7Q420OJSf6mE3z+WlP2AiTyI4szGQrHqJcYMvsEDtZg=';
    obj['content_security_policy'] = "script-src 'self' '" + hash + "'; object-src 'self'";
    gulplog_1.default.info("addCspHashToManifest hash: '" + hash + "'");
    return obj;
}
exports.addCspHashToManifest = addCspHashToManifest;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoidXRpbHMuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyJ1dGlscy50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7Ozs7Ozs7QUFBQSw2QkFBNEI7QUFDNUIscUNBQXdDO0FBQ3hDLG9EQUF5QjtBQUNsQixJQUFNLElBQUksR0FBRztJQUFDLGVBQVE7U0FBUixVQUFRLEVBQVIscUJBQVEsRUFBUixJQUFRO1FBQVIsMEJBQVE7O0lBQUssT0FBQSxXQUFJLDhCQUFDLFNBQVMsRUFBRSxPQUFPLEdBQUssS0FBSztBQUFqQyxDQUFrQyxDQUFDO0FBQXhELFFBQUEsSUFBSSxRQUFvRDtBQUN4RCxRQUFBLEdBQUcsR0FBWSxPQUFPLENBQUMsSUFBQSxZQUFJLEVBQUMsY0FBYyxDQUFDLENBQUMsQ0FBQztBQUM3QyxRQUFBLFlBQVksR0FBRyxNQUFNLENBQUMsSUFBSSxDQUFDLFdBQUcsQ0FBQyxZQUFZLENBQUMsQ0FBQztBQUcxRCxTQUFnQixpQkFBaUIsQ0FBQyxTQUFrQztJQUFsQywwQkFBQSxFQUFBLGNBQWtDO0lBQ2hFLElBQU0sT0FBTyxHQUFDLEVBQUUsQ0FBQTtJQUNoQixvQkFBWSxDQUFDLE9BQU8sQ0FBQyxVQUFBLEdBQUcsSUFBSSxPQUFBLE9BQU8sQ0FBQyxHQUFHLENBQUMsR0FBRyxJQUFBLFlBQUksRUFBQyxvQkFBb0IsRUFBRSxHQUFHLENBQUMsRUFBOUMsQ0FBOEMsQ0FBQyxDQUFBO0lBQzNFLE1BQU0sQ0FBQyxNQUFNLENBQUMsT0FBTyxFQUFFLFNBQVMsQ0FBQyxDQUFBO0lBQ2pDLE9BQU8sT0FBTyxDQUFDO0FBQ25CLENBQUM7QUFMRCw4Q0FLQztBQUNELElBQUksSUFBSSxHQUFHLE9BQU8sQ0FBQyxNQUFNLENBQUMsQ0FBQztBQUMzQixtREFBbUQ7QUFDbkQsU0FBUyxNQUFNLENBQUMsQ0FBQztJQUNiLElBQUksTUFBTSxHQUFHLElBQUksQ0FBQyxJQUFJLENBQUMsTUFBTSxDQUFDLElBQUksQ0FBQyxDQUFDLENBQUMsQ0FBQztJQUN0QyxPQUFPLElBQUksQ0FBQyxLQUFLLENBQUMsTUFBTSxDQUFDLFFBQVEsQ0FBQyxNQUFNLENBQUMsQ0FBQztBQUM5QyxDQUFDO0FBR0QsU0FBZ0Isb0JBQW9CLENBQUMsR0FBRztJQUNwQyw0QkFBNEI7SUFDNUIsSUFBSSxHQUFHLEdBQUcsSUFBQSx1QkFBWSxFQUFDLElBQUEsWUFBSSxFQUFDLG9DQUFvQyxDQUFDLEVBQUUsT0FBTyxDQUFDLENBQUM7SUFDNUUsSUFBSSxJQUFJLEdBQUcsTUFBTSxDQUFDLEdBQUcsQ0FBQyxDQUFDO0lBQ3ZCLElBQUksR0FBRyxxREFBcUQsQ0FBQztJQUM3RCxHQUFHLENBQUMseUJBQXlCLENBQUMsR0FBRyx3QkFBc0IsSUFBSSx5QkFBc0IsQ0FBQztJQUNsRixpQkFBRyxDQUFDLElBQUksQ0FBQyxpQ0FBK0IsSUFBSSxNQUFHLENBQUMsQ0FBQztJQUNqRCxPQUFPLEdBQUcsQ0FBQztBQUNmLENBQUM7QUFSRCxvREFRQyJ9