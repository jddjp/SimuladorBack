'use strict';
Object.defineProperty(exports, "__esModule", { value: true });
var applyPlugin_1 = require("./applyPlugin");
exports.applyPlugin = applyPlugin_1.default;
try {
    var jsPDF = require('jspdf');
    applyPlugin_1.default(jsPDF);
}
catch (error) {
    // Importing jspdf in nodejs environments does not work as of jspdf
    // 1.5.3 so we need to silence any errors to support using for example
    // the nodejs jspdf dist files with the exported applyPlugin
}
//# sourceMappingURL=main.js.map