"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var state_1 = require("./state");
require("./autoTableText");
var htmlParser_1 = require("./htmlParser");
var autoTableText_1 = require("./autoTableText");
var autoTable_1 = require("./autoTable");
function default_1(jsPDF) {
    jsPDF.API.autoTable = autoTable_1.default;
    // Assign false to enable `doc.lastAutoTable.finalY || 40` sugar
    jsPDF.API.lastAutoTable = false;
    jsPDF.API.previousAutoTable = false; // deprecated in v3
    jsPDF.API.autoTable.previous = false; // deprecated in v3
    jsPDF.API.autoTableText = function (text, x, y, styles) {
        autoTableText_1.default(text, x, y, styles, this);
    };
    jsPDF.API.autoTableSetDefaults = function (defaults) {
        state_1.setDefaults(defaults, this);
        return this;
    };
    jsPDF.autoTableSetDefaults = function (defaults, doc) {
        state_1.setDefaults(defaults, doc);
        return this;
    };
    jsPDF.API.autoTableHtmlToJson = function (tableElem, includeHiddenElements) {
        includeHiddenElements = includeHiddenElements || false;
        if (!tableElem || !(tableElem instanceof HTMLTableElement)) {
            console.error('An HTMLTableElement has to be sent to autoTableHtmlToJson');
            return null;
        }
        var _a = htmlParser_1.parseHtml(tableElem, includeHiddenElements, false), head = _a.head, body = _a.body, foot = _a.foot;
        var firstRow = head[0] || body[0] || foot[0];
        return { columns: firstRow, rows: body, data: body };
    };
    /**
     * @deprecated
     */
    jsPDF.API.autoTableEndPosY = function () {
        console.error('Use of deprecated function: autoTableEndPosY. Use doc.previousAutoTable.finalY instead.');
        var prev = this.previousAutoTable;
        if (prev.cursor && typeof prev.cursor.y === 'number') {
            return prev.cursor.y;
        }
        else {
            return 0;
        }
    };
    /**
     * @deprecated
     */
    jsPDF.API.autoTableAddPageContent = function (hook) {
        console.error('Use of deprecated function: autoTableAddPageContent. Use jsPDF.autoTableSetDefaults({didDrawPage: () => {}}) instead.');
        if (!jsPDF.API.autoTable.globalDefaults) {
            jsPDF.API.autoTable.globalDefaults = {};
        }
        jsPDF.API.autoTable.globalDefaults.addPageContent = hook;
        return this;
    };
    /**
     * @deprecated
     */
    jsPDF.API.autoTableAddPage = function () {
        console.error('Use of deprecated function: autoTableAddPage. Use doc.addPage()');
        this.addPage();
        return this;
    };
}
exports.default = default_1;
//# sourceMappingURL=applyPlugin.js.map