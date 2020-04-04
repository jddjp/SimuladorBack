"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var cssParser_1 = require("./cssParser");
var state_1 = require("./state");
function parseHtml(input, includeHiddenHtml, useCss) {
    if (includeHiddenHtml === void 0) { includeHiddenHtml = false; }
    if (useCss === void 0) { useCss = false; }
    var tableElement;
    if (typeof input === 'string') {
        tableElement = window.document.querySelector(input);
    }
    else {
        tableElement = input;
    }
    if (!tableElement) {
        console.error('Html table could not be found with input: ', input);
        return;
    }
    var head = [], body = [], foot = [];
    for (var _i = 0, _a = tableElement.rows; _i < _a.length; _i++) {
        var rowNode = _a[_i];
        var tagName = rowNode.parentNode.tagName.toLowerCase();
        var row = parseRowContent(window, rowNode, includeHiddenHtml, useCss);
        if (!row)
            continue;
        if (tagName === 'thead') {
            head.push(row);
        }
        else if (tagName === 'tfoot') {
            foot.push(row);
        }
        else {
            // Add to body both if parent is tbody or table
            // (not contained in any section)
            body.push(row);
        }
    }
    return { head: head, body: body, foot: foot };
}
exports.parseHtml = parseHtml;
function parseRowContent(window, row, includeHidden, useCss) {
    var resultRow = [];
    var rowStyles = useCss
        ? cssParser_1.parseCss(row, state_1.default().scaleFactor(), [
            'cellPadding',
            'lineWidth',
            'lineColor',
        ])
        : {};
    for (var i = 0; i < row.cells.length; i++) {
        var cell = row.cells[i];
        var style = window.getComputedStyle(cell);
        if (includeHidden || style.display !== 'none') {
            var cellStyles = useCss ? cssParser_1.parseCss(cell, state_1.default().scaleFactor()) : {};
            resultRow.push({
                rowSpan: cell.rowSpan,
                colSpan: cell.colSpan,
                styles: useCss ? cellStyles : null,
                _element: cell,
                content: parseCellContent(cell),
            });
        }
    }
    if (resultRow.length > 0 && (includeHidden || rowStyles.display !== 'none')) {
        resultRow._element = row;
        return resultRow;
    }
}
function parseCellContent(orgCell) {
    // Work on cloned node to make sure no changes are applied to html table
    var cell = orgCell.cloneNode(true);
    // Remove extra space and line breaks in markup to make it more similar to
    // what would be shown in html
    cell.innerHTML = cell.innerHTML.replace(/\n/g, '').replace(/ +/g, ' ');
    // Preserve <br> tags as line breaks in the pdf
    cell.innerHTML = cell.innerHTML
        .split('<br>')
        .map(function (part) { return part.trim(); })
        .join('\n');
    // innerText for ie
    return cell.innerText || cell.textContent || '';
}
//# sourceMappingURL=htmlParser.js.map