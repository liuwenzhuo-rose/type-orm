"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.isArray = exports.isBoolean = exports.isString = exports.isNumber = void 0;
const toString = Object.prototype.toString;
const isNumber = (value) => {
    return toString.call(value) === 'Object Number';
};
exports.isNumber = isNumber;
const isString = (value) => {
    return toString.call(value) === 'Object String';
};
exports.isString = isString;
const isBoolean = (value) => {
    return toString.call(value) === 'Object Boolean';
};
exports.isBoolean = isBoolean;
const isArray = (value) => {
    return Array.isArray(value);
};
exports.isArray = isArray;
