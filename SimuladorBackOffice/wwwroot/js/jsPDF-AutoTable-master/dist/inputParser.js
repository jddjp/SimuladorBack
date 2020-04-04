"use strict";
var __spreadArrays = (this && this.__spreadArrays) || function () {
    for (var s = 0, i = 0, il = arguments.length; i < il; i++) s += arguments[i].length;
    for (var r = Array(s), k = 0, i = 0; i < il; i++)
        for (var a = arguments[i], j = 0, jl = a.length; j < jl; j++, k++)
            r[k] = a[j];
    return r;
};
Object.defineProperty(exports, "__esModule", { value: true });
var models_1 = require("./models");
var config_1 = require("./config");
var htmlParser_1 = require("./htmlParser");
var polyfills_1 = require("./polyfills");
var common_1 = require("./common");
var state_1 = require("./state");
var inputValidator_1 = require("./inputValidator");
/**
 * Create models from the user input
 */
function parseInput(args) {
    var tableOptions = parseUserArguments(args);
    var globalOptions = state_1.getGlobalOptions();
    var documentOptions = state_1.getDocumentOptions();
    var allOptions = [globalOptions, documentOptions, tableOptions];
    inputValidator_1.default(allOptions);
    var table = new models_1.Table();
    state_1.default().table = table;
    table.id = tableOptions.tableId;
    var doc = state_1.default().doc;
    table.userStyles = {
        // Setting to black for versions of jspdf without getTextColor
        textColor: doc.getTextColor ? doc.getTextColor() : 0,
        fontSize: doc.internal.getFontSize(),
        fontStyle: doc.internal.getFont().fontStyle,
        font: doc.internal.getFont().fontName,
    };
    var _loop_1 = function (styleProp) {
        var styles = allOptions.map(function (opts) { return opts[styleProp] || {}; });
        table.styles[styleProp] = polyfills_1.assign.apply(void 0, __spreadArrays([{}], styles));
    };
    // Merge styles one level deeper
    for (var _i = 0, _a = Object.keys(table.styles); _i < _a.length; _i++) {
        var styleProp = _a[_i];
        _loop_1(styleProp);
    }
    // Append hooks
    for (var _b = 0, allOptions_1 = allOptions; _b < allOptions_1.length; _b++) {
        var opts = allOptions_1[_b];
        for (var _c = 0, _d = Object.keys(table.cellHooks); _c < _d.length; _c++) {
            var hookName = _d[_c];
            if (opts && typeof opts[hookName] === 'function') {
                table.cellHooks[hookName].push(opts[hookName]);
            }
        }
    }
    table.settings = polyfills_1.assign.apply(void 0, __spreadArrays([{}, config_1.defaultConfig()], allOptions));
    table.settings.margin = common_1.marginOrPadding(table.settings.margin, config_1.defaultConfig().margin);
    if (table.settings.theme === 'auto') {
        table.settings.theme = table.settings.useCss ? 'plain' : 'striped';
    }
    if (table.settings.startY === false) {
        delete table.settings.startY;
    }
    var previous = state_1.default().doc.previousAutoTable;
    var isSamePageAsPrevious = previous &&
        previous.startPageNumber + previous.pageNumber - 1 === state_1.default().pageNumber();
    if (table.settings.startY == null && isSamePageAsPrevious) {
        table.settings.startY = previous.finalY + 20 / state_1.default().scaleFactor();
    }
    var htmlContent = {};
    if (table.settings.html) {
        htmlContent =
            htmlParser_1.parseHtml(table.settings.html, table.settings.includeHiddenHtml, table.settings.useCss) || {};
    }
    table.settings.head = htmlContent.head || table.settings.head || [];
    table.settings.body = htmlContent.body || table.settings.body || [];
    table.settings.foot = htmlContent.foot || table.settings.foot || [];
    parseContent(table);
    table.minWidth = table.columns.reduce(function (total, col) { return total + col.minWidth; }, 0);
    table.wrappedWidth = table.columns.reduce(function (total, col) { return total + col.wrappedWidth; }, 0);
    if (typeof table.settings.tableWidth === 'number') {
        table.width = table.settings.tableWidth;
    }
    else if (table.settings.tableWidth === 'wrap') {
        table.width = table.wrappedWidth;
    }
    else {
        table.width =
            state_1.default().pageWidth() - table.margin('left') - table.margin('right');
    }
    return table;
}
exports.parseInput = parseInput;
function parseUserArguments(args) {
    // Normal initialization on format doc.autoTable(options)
    if (args.length === 1) {
        return args[0];
    }
    else {
        // Deprecated initialization on format doc.autoTable(columns, body, [options])
        var opts = args[2] || {};
        opts.body = args[1];
        opts.columns = args[0];
        opts.columns.forEach(function (col) {
            // Support v2 title prop in v3
            if (typeof col === 'object' && col.header == null) {
                col.header = col.title;
            }
        });
        return opts;
    }
}
function parseContent(table) {
    var settings = table.settings;
    table.columns = getTableColumns(settings);
    var _loop_2 = function (sectionName) {
        var rowSpansLeftForColumn = {};
        var sectionRows = settings[sectionName];
        if (sectionRows.length === 0 &&
            settings.columns &&
            sectionName !== 'body') {
            // If no head or foot is set, try generating one with content in columns
            var sectionRow = generateSectionRowFromColumnData(table, sectionName);
            if (sectionRow) {
                sectionRows.push(sectionRow);
            }
        }
        sectionRows.forEach(function (rawRow, rowIndex) {
            var skippedRowForRowSpans = 0;
            var row = new models_1.Row(rawRow, rowIndex, sectionName);
            table[sectionName].push(row);
            var colSpansAdded = 0;
            var columnSpansLeft = 0;
            for (var _i = 0, _a = table.columns; _i < _a.length; _i++) {
                var column = _a[_i];
                if (rowSpansLeftForColumn[column.index] == null ||
                    rowSpansLeftForColumn[column.index].left === 0) {
                    if (columnSpansLeft === 0) {
                        var rawCell = void 0;
                        if (Array.isArray(rawRow)) {
                            rawCell =
                                rawRow[column.index - colSpansAdded - skippedRowForRowSpans];
                        }
                        else {
                            rawCell = rawRow[column.dataKey];
                        }
                        var styles = cellStyles(sectionName, column, rowIndex);
                        var cell = new models_1.Cell(rawCell, styles, sectionName);
                        // dataKey is not used internally anymore but keep for backwards compat in hooks
                        row.cells[column.dataKey] = cell;
                        row.cells[column.index] = cell;
                        columnSpansLeft = cell.colSpan - 1;
                        rowSpansLeftForColumn[column.index] = {
                            left: cell.rowSpan - 1,
                            times: columnSpansLeft,
                        };
                    }
                    else {
                        columnSpansLeft--;
                        colSpansAdded++;
                    }
                }
                else {
                    rowSpansLeftForColumn[column.index].left--;
                    columnSpansLeft = rowSpansLeftForColumn[column.index].times;
                    skippedRowForRowSpans++;
                }
            }
        });
    };
    for (var _i = 0, _a = ['head', 'body', 'foot']; _i < _a.length; _i++) {
        var sectionName = _a[_i];
        _loop_2(sectionName);
    }
    table.allRows().forEach(function (row) {
        var _loop_3 = function (column) {
            var cell = row.cells[column.index];
            if (!cell)
                return "continue";
            table.callCellHooks(table.cellHooks.didParseCell, cell, row, column);
            cell.text = Array.isArray(cell.text) ? cell.text : [cell.text];
            var text = cell.text.join(' ');
            var wordWidths = ("" + text)
                .trim()
                .split(/\s+/)
                .map(function (word) { return common_1.getStringWidth(word, cell.styles); });
            wordWidths.sort();
            cell.longestWordWidth = wordWidths[wordWidths.length - 1] + cell.padding('horizontal');
            cell.contentWidth =
                cell.padding('horizontal') + common_1.getStringWidth(cell.text, cell.styles);
            if (typeof cell.styles.cellWidth === 'number') {
                cell.minWidth = cell.styles.cellWidth;
                cell.wrappedWidth = cell.styles.cellWidth;
            }
            else if (cell.styles.cellWidth === 'wrap') {
                cell.minWidth = cell.contentWidth;
                cell.wrappedWidth = cell.contentWidth;
            }
            else {
                // auto
                var defaultMinWidth = 10 / state_1.default().scaleFactor();
                cell.minWidth = cell.styles.minCellWidth || defaultMinWidth;
                cell.wrappedWidth = cell.contentWidth;
                if (cell.minWidth > cell.wrappedWidth) {
                    cell.wrappedWidth = cell.minWidth;
                }
            }
        };
        for (var _i = 0, _a = table.columns; _i < _a.length; _i++) {
            var column = _a[_i];
            _loop_3(column);
        }
    });
    table.allRows().forEach(function (row) {
        for (var _i = 0, _a = table.columns; _i < _a.length; _i++) {
            var column = _a[_i];
            var cell = row.cells[column.index];
            // For now we ignore the minWidth and wrappedWidth of colspan cells when calculating colspan widths.
            // Could probably be improved upon however.
            if (cell && cell.colSpan === 1) {
                column.wrappedWidth = Math.max(column.wrappedWidth, cell.wrappedWidth);
                column.minWidth = Math.max(column.minWidth, cell.minWidth);
                column.longestWordWidth = Math.max(column.longestWordWidth, cell.longestWordWidth);
            }
            else {
                // Respect cellWidth set in columnStyles even if there is no cells for this column
                // or of it the column only have colspan cells. Since the width of colspan cells
                // does not affect the width of columns, setting columnStyles cellWidth enables the
                // user to at least do it manually.
                // Note that this is not perfect for now since for example row and table styles are
                // not accounted for
                var columnStyles = table.styles.columnStyles[column.dataKey] ||
                    table.styles.columnStyles[column.index] ||
                    {};
                var cellWidth = columnStyles.cellWidth;
                if (cellWidth && typeof cellWidth === 'number') {
                    column.minWidth = cellWidth;
                    column.wrappedWidth = cellWidth;
                }
            }
            if (cell) {
                // Make sure all columns get at least min width even though width calculations are not based on them
                if (cell.colSpan > 1 && !column.minWidth) {
                    column.minWidth = cell.minWidth;
                }
                if (cell.colSpan > 1 && !column.wrappedWidth) {
                    column.wrappedWidth = cell.minWidth;
                }
                table.callCellHooks(table.cellHooks.didParseCell, cell, row, column);
            }
        }
    });
}
function generateSectionRowFromColumnData(table, sectionName) {
    var sectionRow = {};
    table.columns.forEach(function (col) {
        var columnData = col.raw;
        if (sectionName === 'head') {
            var val = columnData && columnData.header ? columnData.header : columnData;
            if (val) {
                sectionRow[col.dataKey] = val;
            }
        }
        else if (sectionName === 'foot' && columnData.footer) {
            sectionRow[col.dataKey] = columnData.footer;
        }
    });
    return Object.keys(sectionRow).length > 0 ? sectionRow : null;
}
function getTableColumns(settings) {
    if (settings.columns) {
        var cols = settings.columns.map(function (input, index) {
            var key = input.dataKey || input.key || index;
            return new models_1.Column(key, input, index);
        });
        return cols;
    }
    else {
        var firstRow_1 = settings.head[0] || settings.body[0] || settings.foot[0] || [];
        var columns_1 = [];
        Object.keys(firstRow_1)
            .filter(function (key) { return key !== '_element'; })
            .forEach(function (key) {
            var colSpan = firstRow_1[key] && firstRow_1[key].colSpan ? firstRow_1[key].colSpan : 1;
            for (var i = 0; i < colSpan; i++) {
                var id = void 0;
                if (Array.isArray(firstRow_1)) {
                    id = columns_1.length;
                }
                else {
                    id = key + (i > 0 ? "_" + i : '');
                }
                columns_1.push(new models_1.Column(id, id, columns_1.length));
            }
        });
        return columns_1;
    }
}
function cellStyles(sectionName, column, rowIndex) {
    var table = state_1.default().table;
    var theme = config_1.getTheme(table.settings.theme);
    var otherStyles = [
        theme.table,
        theme[sectionName],
        table.styles.styles,
        table.styles[sectionName + "Styles"],
    ];
    var columnStyles = table.styles.columnStyles[column.dataKey] ||
        table.styles.columnStyles[column.index] ||
        {};
    var colStyles = sectionName === 'body' ? columnStyles : {};
    var rowStyles = sectionName === 'body' && rowIndex % 2 === 0
        ? polyfills_1.assign({}, theme.alternateRow, table.styles.alternateRowStyles)
        : {};
    return polyfills_1.assign.apply(void 0, __spreadArrays([config_1.defaultStyles()], __spreadArrays(otherStyles, [rowStyles, colStyles])));
}
//# sourceMappingURL=inputParser.js.map