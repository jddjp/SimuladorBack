"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var config_1 = require("./config");
var state_1 = require("./state");
var HookData_1 = require("./HookData");
var common_1 = require("./common");
var assign = require('object-assign');
var CellHooks = /** @class */ (function () {
    function CellHooks() {
        this.didParseCell = [];
        this.willDrawCell = [];
        this.didDrawCell = [];
        this.didDrawPage = [];
    }
    return CellHooks;
}());
var Table = /** @class */ (function () {
    function Table() {
        this.columns = [];
        this.head = [];
        this.body = [];
        this.foot = [];
        this.height = 0;
        this.width = 0;
        this.preferredWidth = 0;
        this.wrappedWidth = 0;
        this.minWidth = 0;
        this.headHeight = 0;
        this.footHeight = 0;
        this.startPageNumber = 1;
        this.pageNumber = 1;
        // Deprecated, use pageNumber instead
        // Not using getter since:
        // https://github.com/simonbengtsson/jsPDF-AutoTable/issues/596
        this.pageCount = 1;
        this.styles = {
            styles: {},
            headStyles: {},
            bodyStyles: {},
            footStyles: {},
            alternateRowStyles: {},
            columnStyles: {},
        };
        this.cellHooks = new CellHooks();
    }
    Table.prototype.allRows = function () {
        return this.head.concat(this.body).concat(this.foot);
    };
    Table.prototype.callCellHooks = function (handlers, cell, row, column) {
        for (var _i = 0, handlers_1 = handlers; _i < handlers_1.length; _i++) {
            var handler = handlers_1[_i];
            if (handler(new HookData_1.CellHookData(cell, row, column)) === false) {
                return false;
            }
        }
        return true;
    };
    Table.prototype.callEndPageHooks = function () {
        common_1.applyUserStyles();
        for (var _i = 0, _a = this.cellHooks.didDrawPage; _i < _a.length; _i++) {
            var handler = _a[_i];
            handler(new HookData_1.HookData());
        }
    };
    Table.prototype.margin = function (side) {
        return common_1.marginOrPadding(this.settings.margin, config_1.defaultConfig().margin)[side];
    };
    return Table;
}());
exports.Table = Table;
var Row = /** @class */ (function () {
    function Row(raw, index, section) {
        this.cells = {};
        this.height = 0;
        this.maxCellHeight = 0;
        this.spansMultiplePages = false;
        this.raw = raw;
        if (raw._element) {
            this.raw = raw._element;
        }
        this.index = index;
        this.section = section;
    }
    Row.prototype.hasRowSpan = function () {
        var _this = this;
        return state_1.default().table.columns.filter(function (column) {
            var cell = _this.cells[column.index];
            if (!cell)
                return false;
            return cell.rowSpan > 1;
        }).length > 0;
    };
    Row.prototype.canEntireRowFit = function (height) {
        return this.maxCellHeight <= height;
    };
    Row.prototype.getMinimumRowHeight = function () {
        var _this = this;
        return state_1.default().table.columns.reduce(function (acc, column) {
            var cell = _this.cells[column.index];
            if (!cell)
                return 0;
            var fontHeight = (cell.styles.fontSize / state_1.default().scaleFactor()) * config_1.FONT_ROW_RATIO;
            var vPadding = cell.padding('vertical');
            var oneRowHeight = vPadding + fontHeight;
            return oneRowHeight > acc ? oneRowHeight : acc;
        }, 0);
    };
    return Row;
}());
exports.Row = Row;
var Cell = /** @class */ (function () {
    function Cell(raw, themeStyles, section) {
        this.contentHeight = 0;
        this.contentWidth = 0;
        this.longestWordWidth = 0;
        this.wrappedWidth = 0;
        this.minWidth = 0;
        this.textPos = {};
        this.height = 0;
        this.width = 0;
        this.rowSpan = (raw && raw.rowSpan) || 1;
        this.colSpan = (raw && raw.colSpan) || 1;
        this.styles = assign(themeStyles, (raw && raw.styles) || {});
        this.section = section;
        var text;
        var content = raw && raw.content != null ? raw.content : raw;
        content = content && content.title != null ? content.title : content;
        this.raw = raw && raw._element ? raw._element : raw;
        // Stringify 0 and false, but not undefined or null
        text = content != null ? '' + content : '';
        var splitRegex = /\r\n|\r|\n/g;
        this.text = text.split(splitRegex);
    }
    Cell.prototype.getContentHeight = function () {
        var lineCount = Array.isArray(this.text) ? this.text.length : 1;
        var fontHeight = (this.styles.fontSize / state_1.default().scaleFactor()) * config_1.FONT_ROW_RATIO;
        return lineCount * fontHeight + this.padding('vertical');
    };
    Cell.prototype.padding = function (name) {
        var padding = common_1.marginOrPadding(this.styles.cellPadding, common_1.styles([]).cellPadding);
        if (name === 'vertical') {
            return padding.top + padding.bottom;
        }
        else if (name === 'horizontal') {
            return padding.left + padding.right;
        }
        else {
            return padding[name];
        }
    };
    return Cell;
}());
exports.Cell = Cell;
var Column = /** @class */ (function () {
    function Column(dataKey, raw, index) {
        this.preferredWidth = 0;
        this.minWidth = 0;
        this.longestWordWidth = 0;
        this.wrappedWidth = 0;
        this.width = 0;
        this.dataKey = dataKey;
        this.raw = raw;
        this.index = index;
    }
    Column.prototype.hasCustomWidth = function () {
        for (var _i = 0, _a = state_1.default().table.allRows(); _i < _a.length; _i++) {
            var row = _a[_i];
            var cell = row.cells[this.index];
            if (cell && typeof cell.styles.cellWidth === 'number') {
                return true;
            }
        }
        return false;
    };
    return Column;
}());
exports.Column = Column;
//# sourceMappingURL=models.js.map