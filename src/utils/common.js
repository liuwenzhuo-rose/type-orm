"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.transformValue = void 0;
const typeCheck_1 = require("./typeCheck");
const transformValue = (value) => {
    if ((0, typeCheck_1.isNumber)(value)) {
        return value;
    }
    else if ((0, typeCheck_1.isString)(value)) {
        return `'${value}'`;
    }
};
exports.transformValue = transformValue;
