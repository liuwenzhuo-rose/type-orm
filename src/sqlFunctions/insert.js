"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const connection_1 = __importDefault(require("../connection"));
const insert = (tableName, instance) => {
    const keys = Object.keys(instance);
    const fieldsStr = keys.reduce((pre, key) => {
        return `${pre}${pre ? ',' : ''} ${key}`;
    }, '');
    const valuesStr = keys.reduce((pre, key) => {
        return `${pre}${pre ? ',' : ''} ${instance[key]}`;
    }, '');
    let sql = `INSERT INTO ${tableName}(${fieldsStr}) VALUES(${valuesStr});`;
    connection_1.default.query(sql);
};
exports.default = insert;
