"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var common_1 = require("./common");
function default_1(allOptions) {
    var _loop_1 = function (settings) {
        if (settings && typeof settings !== 'object') {
            console.error('The options parameter should be of type object, is: ' + typeof settings);
        }
        if (typeof settings.extendWidth !== 'undefined') {
            settings.tableWidth = settings.extendWidth ? 'auto' : 'wrap';
            console.error('Use of deprecated option: extendWidth, use tableWidth instead.');
        }
        if (typeof settings.margins !== 'undefined') {
            if (typeof settings.margin === 'undefined')
                settings.margin = settings.margins;
            console.error('Use of deprecated option: margins, use margin instead.');
        }
        if (settings.startY && typeof settings.startY !== 'number') {
            console.error('Invalid value for startY option', settings.startY);
            delete settings.startY;
        }
        if (!settings.didDrawPage &&
            (settings.afterPageContent ||
                settings.beforePageContent ||
                settings.afterPageAdd)) {
            console.error('The afterPageContent, beforePageContent and afterPageAdd hooks are deprecated. Use didDrawPage instead');
            settings.didDrawPage = function (data) {
                common_1.applyUserStyles();
                if (settings.beforePageContent)
                    settings.beforePageContent(data);
                common_1.applyUserStyles();
                if (settings.afterPageContent)
                    settings.afterPageContent(data);
                common_1.applyUserStyles();
                if (settings.afterPageAdd && data.pageNumber > 1) {
                    data.afterPageAdd(data);
                }
                common_1.applyUserStyles();
            };
        }
        ;
        [
            'createdHeaderCell',
            'drawHeaderRow',
            'drawRow',
            'drawHeaderCell',
        ].forEach(function (name) {
            if (settings[name]) {
                console.error("The \"" + name + "\" hook has changed in version 3.0, check the changelog for how to migrate.");
            }
        });
        [
            ['showFoot', 'showFooter'],
            ['showHead', 'showHeader'],
            ['didDrawPage', 'addPageContent'],
            ['didParseCell', 'createdCell'],
            ['headStyles', 'headerStyles'],
        ].forEach(function (_a) {
            var current = _a[0], deprecated = _a[1];
            if (settings[deprecated]) {
                console.error("Use of deprecated option " + deprecated + ". Use " + current + " instead");
                settings[current] = settings[deprecated];
            }
        });
        [
            ['padding', 'cellPadding'],
            ['lineHeight', 'rowHeight'],
            'fontSize',
            'overflow',
        ].forEach(function (o) {
            var deprecatedOption = typeof o === 'string' ? o : o[0];
            var style = typeof o === 'string' ? o : o[1];
            if (typeof settings[deprecatedOption] !== 'undefined') {
                if (typeof settings.styles[style] === 'undefined') {
                    settings.styles[style] = settings[deprecatedOption];
                }
                console.error('Use of deprecated option: ' +
                    deprecatedOption +
                    ', use the style ' +
                    style +
                    ' instead.');
            }
        });
        for (var _i = 0, _a = [
            'styles',
            'bodyStyles',
            'headStyles',
            'footStyles',
        ]; _i < _a.length; _i++) {
            var styleProp = _a[_i];
            checkStyles(settings[styleProp] || {});
        }
        var columnStyles = settings['columnStyles'] || {};
        for (var _b = 0, _c = Object.keys(columnStyles); _b < _c.length; _b++) {
            var key = _c[_b];
            checkStyles(columnStyles[key] || {});
        }
    };
    for (var _i = 0, allOptions_1 = allOptions; _i < allOptions_1.length; _i++) {
        var settings = allOptions_1[_i];
        _loop_1(settings);
    }
}
exports.default = default_1;
function checkStyles(styles) {
    if (styles.rowHeight) {
        console.error('Use of deprecated style rowHeight. It is renamed to minCellHeight.');
        if (!styles.minCellHeight) {
            styles.minCellHeight = styles.rowHeight;
        }
    }
    else if (styles.columnWidth) {
        console.error('Use of deprecated style columnWidth. It is renamed to cellWidth.');
        if (!styles.cellWidth) {
            styles.cellWidth = styles.columnWidth;
        }
    }
}
//# sourceMappingURL=inputValidator.js.map