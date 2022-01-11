"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const connection_1 = __importDefault(require("../connection"));
const common_1 = require("../utils/common");
const insert = (tableName, instance) => {
    return new Promise((resolve, reject) => {
        const keys = Object.keys(instance);
        const values = Object.values(instance);
        const fieldsStr = keys.reduce((pre, key) => {
            return `${pre}${pre || ', '}${key}`;
        }, '');
        const valuesStr = values.reduce((pre, value) => {
            return `${pre}${pre || ', '}${(0, common_1.transformValue)(value)}`;
        }, '');
        let sql = `INSERT INTO ${tableName}(${fieldsStr}) VALUES(${valuesStr});`;
        connection_1.default.query(sql, (err, result) => {
            if (err) {
                reject(err);
            }
            else {
                resolve(result);
            }
        });
    });
};
exports.default = insert;
