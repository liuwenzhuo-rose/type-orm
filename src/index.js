"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.DAO = void 0;
const connection_1 = __importDefault(require("./connection"));
const common_1 = require("./utils/common");
class DAO {
    constructor(target) {
        this.tableName = target.name.toLowerCase();
    }
    select(keys) {
        const keysStr = keys.reduce((pre, key) => {
            return `${pre}${pre && ', '}${key}`;
        }, '');
        this.sql = `SELECT ${keysStr} FROM ${this.tableName}`;
        return this;
    }
    update(instance) {
        const keys = Object.keys(instance);
        const assignmentStr = keys.reduce((pre, key) => {
            return `${pre}${pre && ', '}${key}=${(0, common_1.transformValue)(instance[key])}`;
        }, '');
        this.sql = `UPDATE ${this.tableName} SET ${assignmentStr}`;
        return this;
    }
    insert(instance) {
        const keys = Object.keys(instance);
        const values = Object.values(instance);
        const keysStr = keys.reduce((pre, key) => {
            return `${pre}${pre && ', '}${key}`;
        }, '');
        const valuesStr = values.reduce((pre, value) => {
            return `${pre}${pre && ', '}${(0, common_1.transformValue)(value)}`;
        }, '');
        this.sql = `INSERT INTO ${this.tableName}(${keysStr}) VALUES(${valuesStr})`;
        return this;
    }
    delete() {
        this.sql = `DELETE FROM ${this.tableName}`;
        return this;
    }
    where(instance) {
        const keys = Object.keys(instance);
        const assignmentStr = keys.reduce((pre, key) => {
            return `${pre}${pre && ' AND '}${key}=${(0, common_1.transformValue)(instance[key])}`;
        }, '');
        this.sql = `${this.sql} WHERE ${assignmentStr}`;
        return this;
    }
    over() {
        this.sql = this.sql + ';';
        const sql = this.sql;
        return new Promise((resolve, reject) => {
            connection_1.default.query(sql, (err, result) => {
                if (err) {
                    reject(err);
                }
                else {
                    console.log(sql);
                    resolve(result);
                }
            });
        });
    }
}
exports.DAO = DAO;
