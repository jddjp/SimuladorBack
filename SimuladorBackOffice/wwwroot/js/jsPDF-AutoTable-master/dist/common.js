"use strict";
var __spreadArrays = (this && this.__spreadArrays) || function () {
    for (var s = 0, i = 0, il = arguments.length; i < il; i++) s += arguments[i].length;
    for (var r = Array(s), k = 0, i = 0; i < il; i++)
        for (var a = arguments[i], j = 0, jl = a.length; j < jl; j++, k++)
            r[k] = a[j];
    return r;
};
Object.defineProperty(exports, "__esModule", { value: true });
var config_1 = require("./config");
var state_1 = require("./state");
var polyfills_1 = require("./polyfills");
function getStringWidth(text, styles) {
    applyStyles(styles);
    var textArr = Array.isArray(text) ? text : [text];
    var widestLineWidth = textArr
        .map(function (text) { return state_1.default().doc.getTextWidth(text); })
        // Shave off a few digits for potential improvement in width calculation
        .map(function (val) { return Math.floor(val * 10000) / 10000; })
        .reduce(function (a, b) { return Math.max(a, b); }, 0);
    var fontSize = styles.fontSize / state_1.default().scaleFactor();
    return widestLineWidth;
}
exports.getStringWidth = getStringWidth;
/**
 * Ellipsize the text to fit in the width
 */
function ellipsize(text, width, styles, ellipsizeStr) {
    if (ellipsizeStr === void 0) { ellipsizeStr = '...'; }
    if (Array.isArray(text)) {
        var value_1 = [];
        text.forEach(function (str, i) {
            value_1[i] = ellipsize(str, width, styles, ellipsizeStr);
        });
        return value_1;
    }
    var precision = 10000 * state_1.default().scaleFactor();
    width = Math.ceil(width * precision) / precision;
    if (width >= getStringWidth(text, styles)) {
        return text;
    }
    while (width < getStringWidth(text + ellipsizeStr, styles)) {
        if (text.length <= 1) {
            break;
        }
        text = text.substring(0, text.length - 1);
    }
    return text.trim() + ellipsizeStr;
}
exports.ellipsize = ellipsize;
function addTableBorder() {
    var table = state_1.default().table;
    var styles = {
        lineWidth: table.settings.tableLineWidth,
        lineColor: table.settings.tableLineColor,
    };
    applyStyles(styles);
    var fs = getFillStyle(styles);
    if (fs) {
        state_1.default().doc.rect(table.pageStartX, table.pageStartY, table.width, table.cursor.y - table.pageStartY, fs);
    }
}
exports.addTableBorder = addTableBorder;
function getFillStyle(styles) {
    var drawLine = styles.lineWidth > 0;
    var drawBackground = styles.fillColor || styles.fillColor === 0;
    if (drawLine && drawBackground) {
        return 'DF'; // Fill then stroke
    }
    else if (drawLine) {
        return 'S'; // Only stroke (transparent background)
    }
    else if (drawBackground) {
        return 'F'; // Only fill, no stroke
    }
    else {
        return false;
    }
}
exports.getFillStyle = getFillStyle;
function applyUserStyles() {
    applyStyles(state_1.default().table.userStyles);
}
exports.applyUserStyles = applyUserStyles;
function applyStyles(styles) {
    var doc = state_1.default().doc;
    var styleModifiers = {
        fillColor: doc.setFillColor,
        textColor: doc.setTextColor,
        fontStyle: doc.setFontStyle,
        lineColor: doc.setDrawColor,
        lineWidth: doc.setLineWidth,
        font: doc.setFont,
        fontSize: doc.setFontSize,
    };
    Object.keys(styleModifiers).forEach(function (name) {
        var style = styles[name];
        var modifier = styleModifiers[name];
        if (typeof style !== 'undefined') {
            if (Array.isArray(style)) {
                modifier.apply(this, style);
            }
            else {
                modifier(style);
            }
        }
    });
}
exports.applyStyles = applyStyles;
// This is messy, only keep array and number format the next major version
function marginOrPadding(value, defaultValue) {
    var newValue = {};
    if (Array.isArray(value)) {
        if (value.length >= 4) {
            newValue = {
                top: value[0],
                right: value[1],
                bottom: value[2],
                left: value[3],
            };
        }
        else if (value.length === 3) {
            newValue = {
                top: value[0],
                right: value[1],
                bottom: value[2],
                left: value[1],
            };
        }
        else if (value.length === 2) {
            newValue = {
                top: value[0],
                right: value[1],
                bottom: value[0],
                left: value[1],
            };
        }
        else if (value.length === 1) {
            value = value[0];
        }
        else {
            value = defaultValue;
        }
    }
    else if (typeof value === 'object') {
        if (value['vertical']) {
            value['top'] = value['vertical'];
            value['bottom'] = value['vertical'];
        }
        if (value['horizontal']) {
            value['right'] = value['horizontal'];
            value['left'] = value['horizontal'];
        }
        for (var _i = 0, _a = ['top', 'right', 'bottom', 'left']; _i < _a.length; _i++) {
            var side = _a[_i];
            newValue[side] =
                value[side] || value[side] === 0 ? value[side] : defaultValue;
        }
    }
    if (typeof value === 'number') {
        newValue = { top: value, right: value, bottom: value, left: value };
    }
    return newValue;
}
exports.marginOrPadding = marginOrPadding;
function styles(styles) {
    styles = Array.isArray(styles) ? styles : [styles];
    return polyfills_1.assign.apply(void 0, __spreadArrays([config_1.defaultStyles()], styles));
}
exports.styles = styles;
// core-js etc increases jspdf-autotable bundle size by 50%
// even though only the Object.entries method is imported
// Until better solution we can use this polyfill:
// https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Object/entries#Polyfill
function entries(obj) {
    var ownProps = Object.keys(obj), i = ownProps.length, resArray = new Array(i);
    while (i--)
        resArray[i] = [ownProps[i], obj[ownProps[i]]];
    return resArray;
}
exports.entries = entries;
//# sourceMappingURL=common.js.map