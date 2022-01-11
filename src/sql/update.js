"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const connection_1 = __importDefault(require("../connection"));
const common_1 = require("../utils/common");
const update = (tableName, instance) => {
    return new Promise((resolve, reject) => {
        const keys = Object.keys(instance);
        const assignmentStr = keys.reduce((pre, key) => {
            return `${pre}${pre || ', '}${key}=${(0, common_1.transformValue)(instance[key])}`;
        }, '');
        let sql = `UPDATE ${tableName} SET ${assignmentStr};`;
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
exports.default = update;
