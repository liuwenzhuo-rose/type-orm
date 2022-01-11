"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const insert_1 = __importDefault(require("../sql/insert"));
const selectAll_1 = __importDefault(require("../sql/selectAll"));
function enhance(target) {
    const tableName = target.name.toLowerCase();
    Object.setPrototypeOf(target, {
        selectAll: () => {
            return (0, selectAll_1.default)(tableName);
        },
        insert: (instance) => {
            return (0, insert_1.default)(tableName, instance);
        },
    });
    return target;
}
exports.default = enhance;
