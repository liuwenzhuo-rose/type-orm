"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.isArray = exports.isBoolean = exports.isString = exports.isNumber = void 0;
const isNumber = (value) => {
    return Object.prototype.toString.call(value) === '[object Number]';
};
exports.isNumber = isNumber;
const isString = (value) => {
    return Object.prototype.toString.call(value) === '[object String]';
};
exports.isString = isString;
const isBoolean = (value) => {
    return Object.prototype.toString.call(value) === '[object Boolean]';
};
exports.isBoolean = isBoolean;
const isArray = (value) => {
    return Array.isArray(value);
};
exports.isArray = isArray;