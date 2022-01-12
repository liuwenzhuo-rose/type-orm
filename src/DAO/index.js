"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const connection_1 = __importDefault(require("../connection"));
const common_1 = require("../utils/common");
class DAO {
    constructor(target) {
        this.tableName = target.tableName;
    }
    select(...keys) {
        const keysStr = keys.join(', ');
        this.sql = `SELECT ${keysStr} FROM ${this.tableName}`;
        return this;
    }
    selectAll() {
        this.sql = `SELECT * FROM ${this.tableName}`;
        return this;
    }
    update(instance) {
        const keys = Object.keys(instance);
        const assignmentStr = keys
            .map((key) => `${key}=${(0, common_1.transformValue)(instance[key])}`)
            .join(', ');
        this.sql = `UPDATE ${this.tableName} SET ${assignmentStr}`;
        return this;
    }
    insert(instance) {
        const keys = Object.keys(instance);
        const values = Object.values(instance);
        const keysStr = `(${keys.join(', ')})`;
        const valuesStr = `(${values
            .map((value) => (0, common_1.transformValue)(value))
            .join(', ')})`;
        this.sql = `INSERT INTO ${this.tableName} ${keysStr} VALUES ${valuesStr}`;
        return this;
    }
    delete() {
        this.sql = `DELETE FROM ${this.tableName}`;
        return this;
    }
    where(instance) {
        const keys = Object.keys(instance);
        const assignmentStr = keys
            .map((key) => `${key}=${(0, common_1.transformValue)(instance[key])}`)
            .join(' AND ');
        this.sql = `${this.sql} WHERE ${assignmentStr}`;
        return this;
    }
    orderBy(key, order = 'ASC') {
        this.sql = `${this.sql} ORDER BY ${key} ${order}`;
        return this;
    }
    over() {
        this.sql = this.sql + ';';
        return new Promise((resolve, reject) => {
            connection_1.default.query(this.sql, (err, result) => {
                if (err) {
                    reject(err);
                }
                else {
                    console.log(this.sql);
                    this.sql = '';
                    resolve(result);
                }
            });
        }).catch((err) => {
            return err;
        });
    }
    // 自定义sql语句
    query(sql) {
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
exports.default = DAO;
