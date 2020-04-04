"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var common_1 = require("./common");
var state_1 = require("./state");
/**
 * Calculate the column widths
 */
function calculateWidths(table) {
    var columnMinWidth = 10 / state_1.default().scaleFactor();
    if (columnMinWidth * table.columns.length > table.width) {
        console.error('Columns could not fit on page');
    }
    else if (table.minWidth > table.width) {
        // Would be nice to improve the user experience of this
        console.error("Column widths too wide and can't fit page");
    }
    var copy = table.columns.slice(0);
    distributeWidth(copy, table.width, table.wrappedWidth);
    applyColSpans(table);
    fitContent(table);
    applyRowSpans(table);
}
exports.calculateWidths = calculateWidths;
function applyRowSpans(table) {
    var rowSpanCells = {};
    var colRowSpansLeft = 1;
    var all = table.allRows();
    for (var rowIndex = 0; rowIndex < all.length; rowIndex++) {
        var row = all[rowIndex];
        for (var _i = 0, _a = table.columns; _i < _a.length; _i++) {
            var column = _a[_i];
            var data = rowSpanCells[column.index];
            if (colRowSpansLeft > 1) {
                colRowSpansLeft--;
                delete row.cells[column.index];
            }
            else if (data) {
                data.cell.height += row.height;
                if (data.cell.height > row.maxCellHeight) {
                    data.row.maxCellHeight = data.cell.height;
                }
                colRowSpansLeft = data.cell.colSpan;
                delete row.cells[column.index];
                data.left--;
                if (data.left <= 1) {
                    delete rowSpanCells[column.index];
                }
            }
            else {
                var cell = row.cells[column.index];
                if (!cell) {
                    continue;
                }
                cell.height = row.height;
                if (cell.rowSpan > 1) {
                    var remaining = all.length - rowIndex;
                    var left = cell.rowSpan > remaining ? remaining : cell.rowSpan;
                    rowSpanCells[column.index] = { cell: cell, left: left, row: row };
                }
            }
        }
        if (row.section === 'head') {
            table.headHeight += row.maxCellHeight;
        }
        if (row.section === 'foot') {
            table.footHeight += row.maxCellHeight;
        }
        table.height += row.height;
    }
}
function applyColSpans(table) {
    var all = table.allRows();
    for (var rowIndex = 0; rowIndex < all.length; rowIndex++) {
        var row = all[rowIndex];
        var colSpanCell = null;
        var combinedColSpanWidth = 0;
        var colSpansLeft = 0;
        for (var columnIndex = 0; columnIndex < table.columns.length; columnIndex++) {
            var column = table.columns[columnIndex];
            var cell = null;
            // Width and colspan
            colSpansLeft -= 1;
            if (colSpansLeft > 1 && table.columns[columnIndex + 1]) {
                combinedColSpanWidth += column.width;
                delete row.cells[column.index];
                continue;
            }
            else if (colSpanCell) {
                cell = colSpanCell;
                delete row.cells[column.index];
                colSpanCell = null;
            }
            else {
                cell = row.cells[column.index];
                if (!cell)
                    continue;
                colSpansLeft = cell.colSpan;
                combinedColSpanWidth = 0;
                if (cell.colSpan > 1) {
                    colSpanCell = cell;
                    combinedColSpanWidth += column.width;
                    continue;
                }
            }
            cell.width = column.width + combinedColSpanWidth;
        }
    }
}
function fitContent(table) {
    var rowSpanHeight = { count: 0, height: 0 };
    for (var _i = 0, _a = table.allRows(); _i < _a.length; _i++) {
        var row = _a[_i];
        for (var _b = 0, _c = table.columns; _b < _c.length; _b++) {
            var column = _c[_b];
            var cell = row.cells[column.index];
            if (!cell)
                continue;
            common_1.applyStyles(cell.styles);
            var textSpace = cell.width - cell.padding('horizontal');
            if (cell.styles.overflow === 'linebreak') {
                // Add one pt to textSpace to fix rounding error
                cell.text = state_1.default().doc.splitTextToSize(cell.text, textSpace + 1 / (state_1.default().scaleFactor() || 1), { fontSize: cell.styles.fontSize });
            }
            else if (cell.styles.overflow === 'ellipsize') {
                cell.text = common_1.ellipsize(cell.text, textSpace, cell.styles);
            }
            else if (cell.styles.overflow === 'hidden') {
                cell.text = common_1.ellipsize(cell.text, textSpace, cell.styles, '');
            }
            else if (typeof cell.styles.overflow === 'function') {
                cell.text = cell.styles.overflow(cell.text, textSpace);
            }
            cell.contentHeight = cell.getContentHeight();
            if (cell.styles.minCellHeight > cell.contentHeight) {
                cell.contentHeight = cell.styles.minCellHeight;
            }
            var realContentHeight = cell.contentHeight / cell.rowSpan;
            if (cell.rowSpan > 1 &&
                rowSpanHeight.count * rowSpanHeight.height <
                    realContentHeight * cell.rowSpan) {
                rowSpanHeight = { height: realContentHeight, count: cell.rowSpan };
            }
            else if (rowSpanHeight && rowSpanHeight.count > 0) {
                if (rowSpanHeight.height > realContentHeight) {
                    realContentHeight = rowSpanHeight.height;
                }
            }
            if (realContentHeight > row.height) {
                row.height = realContentHeight;
                row.maxCellHeight = realContentHeight;
            }
        }
        rowSpanHeight.count--;
    }
}
function distributeWidth(autoColumns, availableSpace, optimalTableWidth) {
    var diffWidth = availableSpace - optimalTableWidth;
    for (var _i = 0, _a = common_1.entries(autoColumns); _i < _a.length; _i++) {
        var _b = _a[_i], i = _b[0], column = _b[1];
        var ratio = column.wrappedWidth / optimalTableWidth;
        var suggestedChange = diffWidth * ratio;
        var suggestedWidth = column.wrappedWidth + suggestedChange;
        if (suggestedWidth < column.minWidth || column.hasCustomWidth()) {
            // Add 1 to minWidth as linebreaks calc otherwise sometimes made two rows
            column.width = column.minWidth + 1 / state_1.default().scaleFactor();
            optimalTableWidth -= column.wrappedWidth;
            availableSpace -= column.width;
            autoColumns.splice(i, 1);
            distributeWidth(autoColumns, availableSpace, optimalTableWidth);
            break;
        }
        column.width = suggestedWidth;
    }
}
//# sourceMappingURL=widthCalculator.js.map