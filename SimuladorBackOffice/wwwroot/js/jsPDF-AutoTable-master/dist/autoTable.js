"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var state_1 = require("./state");
var inputParser_1 = require("./inputParser");
var widthCalculator_1 = require("./widthCalculator");
var tableDrawer_1 = require("./tableDrawer");
var common_1 = require("./common");
function autoTable() {
    var args = [];
    for (var _i = 0; _i < arguments.length; _i++) {
        args[_i] = arguments[_i];
    }
    state_1.setupState(this);
    // 1. Parse and unify user input
    var table = inputParser_1.parseInput(args);
    // 2. Calculate preliminary table, column, row and cell dimensions
    widthCalculator_1.calculateWidths(table);
    // 3. Output table to pdf
    tableDrawer_1.drawTable(table);
    table.finalY = table.cursor.y;
    this.previousAutoTable = table;
    this.lastAutoTable = table;
    this.autoTable.previous = table; // Deprecated
    common_1.applyUserStyles();
    state_1.resetState();
    return this;
}
exports.default = autoTable;
//# sourceMappingURL=autoTable.js.map