"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const mysql_1 = __importDefault(require("mysql"));
const path_1 = __importDefault(require("path"));
const ormConfig = require(path_1.default.join(process.cwd(), 'ormconfig.json'));
const connection = mysql_1.default.createConnection(ormConfig);
connection.connect((err) => {
    if (err) {
        return console.log(err.sqlMessage);
    }
    console.log('数据库连接成功');
});
exports.default = connection;
