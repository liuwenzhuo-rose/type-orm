"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
// 指定class对应的数据表
const table = (tableName) => {
    const specifyTableName = (targetClass) => {
        targetClass.tableName = tableName;
    };
    return specifyTableName;
};
exports.default = table;
