"use strict";
/*
 * Include common small polyfills instead of requiring the user to to do it
 */
Object.defineProperty(exports, "__esModule", { value: true });
// https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Object/assign
function assign(target) {
    'use strict';
    var varArgs = [];
    for (var _i = 1; _i < arguments.length; _i++) {
        varArgs[_i - 1] = arguments[_i];
    }
    if (target == null) {
        // TypeError if undefined or null
        throw new TypeError('Cannot convert undefined or null to object');
    }
    var to = Object(target);
    for (var index = 1; index < arguments.length; index++) {
        var nextSource = arguments[index];
        if (nextSource != null) {
            // Skip over if undefined or null
            for (var nextKey in nextSource) {
                // Avoid bugs when hasOwnProperty is shadowed
                if (Object.prototype.hasOwnProperty.call(nextSource, nextKey)) {
                    to[nextKey] = nextSource[nextKey];
                }
            }
        }
    }
    return to;
}
exports.assign = assign;
//# sourceMappingURL=polyfills.js.map