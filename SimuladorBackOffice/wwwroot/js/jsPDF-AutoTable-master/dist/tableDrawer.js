"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var config_1 = require("./config");
var common_1 = require("./common");
var models_1 = require("./models");
var state_1 = require("./state");
var assign = require('object-assign');
function drawTable(table) {
    var settings = table.settings;
    table.cursor = {
        x: table.margin('left'),
        y: settings.startY == null ? table.margin('top') : settings.startY,
    };
    var minTableBottomPos = settings.startY +
        table.margin('bottom') +
        table.headHeight +
        table.footHeight;
    if (settings.pageBreak === 'avoid') {
        minTableBottomPos += table.height;
    }
    if (settings.pageBreak === 'always' ||
        (settings.startY != null &&
            settings.startY !== false &&
            minTableBottomPos > state_1.default().pageHeight())) {
        nextPage(state_1.default().doc);
        table.cursor.y = table.margin('top');
    }
    table.pageStartX = table.cursor.x;
    table.pageStartY = table.cursor.y;
    table.startPageNumber = state_1.default().pageNumber();
    // An empty row used to cached cells those break through page
    common_1.applyUserStyles();
    if (settings.showHead === true ||
        settings.showHead === 'firstPage' ||
        settings.showHead === 'everyPage') {
        table.head.forEach(function (row) { return printRow(row); });
    }
    common_1.applyUserStyles();
    table.body.forEach(function (row, index) {
        printFullRow(row, index === table.body.length - 1);
    });
    common_1.applyUserStyles();
    if (settings.showFoot === true ||
        settings.showFoot === 'lastPage' ||
        settings.showFoot === 'everyPage') {
        table.foot.forEach(function (row) { return printRow(row); });
    }
    common_1.addTableBorder();
    table.callEndPageHooks();
}
exports.drawTable = drawTable;
function getRemainingLineCount(cell, remainingPageSpace) {
    var fontHeight = (cell.styles.fontSize / state_1.default().scaleFactor()) * config_1.FONT_ROW_RATIO;
    var vPadding = cell.padding('vertical');
    var remainingLines = Math.floor((remainingPageSpace - vPadding) / fontHeight);
    return Math.max(0, remainingLines);
}
function modifyRowToFit(row, remainingPageSpace, table) {
    var remainderRow = new models_1.Row(row.raw, -1, row.section);
    remainderRow.spansMultiplePages = true;
    row.spansMultiplePages = true;
    row.height = 0;
    row.maxCellHeight = 0;
    for (var _i = 0, _a = table.columns; _i < _a.length; _i++) {
        var column = _a[_i];
        var cell = row.cells[column.index];
        if (!cell)
            continue;
        if (!Array.isArray(cell.text)) {
            cell.text = [cell.text];
        }
        var remainderCell = new models_1.Cell(cell.raw, {}, cell.section);
        remainderCell = assign(remainderCell, cell);
        remainderCell.textPos = assign({}, cell.textPos);
        remainderCell.text = [];
        var remainingLineCount = getRemainingLineCount(cell, remainingPageSpace);
        if (cell.text.length > remainingLineCount) {
            remainderCell.text = cell.text.splice(remainingLineCount, cell.text.length);
        }
        cell.contentHeight = cell.getContentHeight();
        if (cell.contentHeight > row.height) {
            row.height = cell.contentHeight;
            row.maxCellHeight = cell.contentHeight;
        }
        remainderCell.contentHeight = remainderCell.getContentHeight();
        if (remainderCell.contentHeight > remainderRow.height) {
            remainderRow.height = remainderCell.contentHeight;
            remainderRow.maxCellHeight = remainderCell.contentHeight;
        }
        remainderRow.cells[column.index] = remainderCell;
    }
    for (var _b = 0, _c = table.columns; _b < _c.length; _b++) {
        var column = _c[_b];
        var remainderCell = remainderRow.cells[column.index];
        if (remainderCell) {
            remainderCell.height = remainderRow.height;
        }
        var cell = row.cells[column.index];
        if (cell) {
            cell.height = row.height;
        }
    }
    return remainderRow;
}
function shouldPrintOnCurrentPage(row, remainingPageSpace, table) {
    var pageHeight = state_1.default().pageHeight();
    var marginHeight = table.margin('top') + table.margin('bottom');
    var maxRowHeight = pageHeight - marginHeight;
    if (row.section === 'body') {
        // Should also take into account that head and foot is not
        // on every page with some settings
        maxRowHeight -= table.headHeight + table.footHeight;
    }
    var minRowFits = row.getMinimumRowHeight() < remainingPageSpace;
    if (row.getMinimumRowHeight() > maxRowHeight) {
        console.error("Will not be able to print row " + row.index + " correctly since it's minimum height is larger than page height");
        return true;
    }
    var rowHasRowSpanCell = row.hasRowSpan();
    if (!minRowFits) {
        return false;
    }
    var rowHigherThanPage = row.maxCellHeight > maxRowHeight;
    if (rowHigherThanPage) {
        if (rowHasRowSpanCell) {
            console.error("The content of row " + row.index + " will not be drawn correctly since drawing rows with a height larger than the page height and has cells with rowspans is not supported.");
        }
        return true;
    }
    if (rowHasRowSpanCell) {
        // Currently a new page is required whenever a rowspan row don't fit a page.
        return false;
    }
    if (table.settings.rowPageBreak === 'avoid') {
        return false;
    }
    // In all other cases print the row on current page
    return true;
}
function printFullRow(row, isLastRow) {
    var table = state_1.default().table;
    var remainingPageSpace = getRemainingPageSpace(isLastRow);
    if (row.canEntireRowFit(remainingPageSpace)) {
        printRow(row);
    }
    else {
        if (shouldPrintOnCurrentPage(row, remainingPageSpace, table)) {
            var remainderRow = modifyRowToFit(row, remainingPageSpace, table);
            printRow(row);
            addPage();
            printFullRow(remainderRow, isLastRow);
        }
        else {
            addPage();
            printFullRow(row, isLastRow);
        }
    }
}
function printRow(row) {
    var table = state_1.default().table;
    table.cursor.x = table.margin('left');
    row.y = table.cursor.y;
    row.x = table.cursor.x;
    for (var _i = 0, _a = table.columns; _i < _a.length; _i++) {
        var column = _a[_i];
        var cell = row.cells[column.index];
        if (!cell) {
            table.cursor.x += column.width;
            continue;
        }
        common_1.applyStyles(cell.styles);
        cell.x = table.cursor.x;
        cell.y = row.y;
        if (cell.styles.valign === 'top') {
            cell.textPos.y = table.cursor.y + cell.padding('top');
        }
        else if (cell.styles.valign === 'bottom') {
            cell.textPos.y = table.cursor.y + cell.height - cell.padding('bottom');
        }
        else {
            cell.textPos.y = table.cursor.y + cell.height / 2;
        }
        if (cell.styles.halign === 'right') {
            cell.textPos.x = cell.x + cell.width - cell.padding('right');
        }
        else if (cell.styles.halign === 'center') {
            cell.textPos.x = cell.x + cell.width / 2;
        }
        else {
            cell.textPos.x = cell.x + cell.padding('left');
        }
        if (table.callCellHooks(table.cellHooks.willDrawCell, cell, row, column) ===
            false) {
            table.cursor.x += column.width;
            continue;
        }
        var fillStyle = common_1.getFillStyle(cell.styles);
        if (fillStyle) {
            state_1.default().doc.rect(cell.x, table.cursor.y, cell.width, cell.height, fillStyle);
        }
        state_1.default().doc.autoTableText(cell.text, cell.textPos.x, cell.textPos.y, {
            halign: cell.styles.halign,
            valign: cell.styles.valign,
            maxWidth: Math.ceil(cell.width - cell.padding('left') - cell.padding('right')),
        });
        table.callCellHooks(table.cellHooks.didDrawCell, cell, row, column);
        table.cursor.x += column.width;
    }
    table.cursor.y += row.height;
}
function getRemainingPageSpace(isLastRow) {
    var table = state_1.default().table;
    var bottomContentHeight = table.margin('bottom');
    var showFoot = table.settings.showFoot;
    if (showFoot === true ||
        showFoot === 'everyPage' ||
        (showFoot === 'lastPage' && isLastRow)) {
        bottomContentHeight += table.footHeight;
    }
    return state_1.default().pageHeight() - table.cursor.y - bottomContentHeight;
}
function addPage() {
    var table = state_1.default().table;
    common_1.applyUserStyles();
    if (table.settings.showFoot === true ||
        table.settings.showFoot === 'everyPage') {
        table.foot.forEach(function (row) { return printRow(row); });
    }
    table.finalY = table.cursor.y;
    // Add user content just before adding new page ensure it will
    // be drawn above other things on the page
    table.callEndPageHooks();
    common_1.addTableBorder();
    nextPage(state_1.default().doc);
    table.pageNumber++;
    table.pageCount++;
    table.cursor = { x: table.margin('left'), y: table.margin('top') };
    table.pageStartX = table.cursor.x;
    table.pageStartY = table.cursor.y;
    if (table.settings.showHead === true ||
        table.settings.showHead === 'everyPage') {
        table.head.forEach(function (row) { return printRow(row); });
    }
}
exports.addPage = addPage;
function nextPage(doc) {
    var current = state_1.default().pageNumber();
    doc.setPage(current + 1);
    var newCurrent = state_1.default().pageNumber();
    if (newCurrent === current) {
        doc.addPage();
    }
}
//# sourceMappingURL=tableDrawer.js.map