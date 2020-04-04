"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var defaultsDocument = null;
var previousTableState;
var tableState = null;
exports.globalDefaults = {};
exports.documentDefaults = {};
function default_1() {
    return tableState;
}
exports.default = default_1;
function getGlobalOptions() {
    return exports.globalDefaults;
}
exports.getGlobalOptions = getGlobalOptions;
function getDocumentOptions() {
    return exports.documentDefaults;
}
exports.getDocumentOptions = getDocumentOptions;
var TableState = /** @class */ (function () {
    function TableState(doc) {
        this.doc = doc;
    }
    TableState.prototype.pageHeight = function () {
        return this.pageSize().height;
    };
    TableState.prototype.pageWidth = function () {
        return this.pageSize().width;
    };
    TableState.prototype.pageSize = function () {
        var pageSize = this.doc.internal.pageSize;
        // JSPDF 1.4 uses get functions instead of properties on pageSize
        if (pageSize.width == null) {
            pageSize = {
                width: pageSize.getWidth(),
                height: pageSize.getHeight(),
            };
        }
        return pageSize;
    };
    TableState.prototype.scaleFactor = function () {
        return this.doc.internal.scaleFactor;
    };
    TableState.prototype.pageNumber = function () {
        var pageInfo = this.doc.internal.getCurrentPageInfo();
        if (!pageInfo) {
            // Only recent versions of jspdf has pageInfo
            return this.doc.internal.getNumberOfPages();
        }
        return pageInfo.pageNumber;
    };
    return TableState;
}());
function setupState(doc) {
    previousTableState = tableState;
    tableState = new TableState(doc);
    if (doc !== defaultsDocument) {
        defaultsDocument = doc;
        exports.documentDefaults = {};
    }
}
exports.setupState = setupState;
function resetState() {
    tableState = previousTableState;
}
exports.resetState = resetState;
function setDefaults(defaults, doc) {
    if (doc === void 0) { doc = null; }
    if (doc) {
        exports.documentDefaults = defaults || {};
        defaultsDocument = doc;
    }
    else {
        exports.globalDefaults = defaults || {};
    }
}
exports.setDefaults = setDefaults;
//# sourceMappingURL=state.js.map