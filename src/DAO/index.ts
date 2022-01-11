import connection from '../connection';
import { transformValue } from '../utils/common';

export class DAO<T extends new () => any> {
  private tableName: string;
  private sql: string;

  constructor(target: T) {
    this.tableName = target.name.toLowerCase();
  }

  select(keys: Array<keyof InstanceType<T>>) {
    const keysStr = keys.reduce((pre, key) => {
      return `${pre}${pre && ', '}${key}`;
    }, '');
    this.sql = `SELECT ${keysStr} FROM ${this.tableName}`;
    return this as Pick<this, 'where' | 'over'>;
  }

  update(instance: Partial<InstanceType<T>>) {
    const keys = Object.keys(instance);
    const assignmentStr = keys.reduce((pre, key) => {
      return `${pre}${pre && ', '}${key}=${transformValue(instance[key])}`;
    }, '');
    this.sql = `UPDATE ${this.tableName} SET ${assignmentStr}`;
    return this as Omit<this, 'update' | 'select' | 'delete' | 'insert'>;
  }

  insert(instance: InstanceType<T>) {
    const keys = Object.keys(instance);
    const values = Object.values(instance);
    const keysStr = keys.reduce((pre, key) => {
      return `${pre}${pre && ', '}${key}`;
    }, '');
    const valuesStr = values.reduce((pre, value) => {
      return `${pre}${pre && ', '}${transformValue(value)}`;
    }, '');
    this.sql = `INSERT INTO ${this.tableName}(${keysStr}) VALUES(${valuesStr})`;
    return this as Pick<this, 'over'>;
  }

  delete() {
    this.sql = `DELETE FROM ${this.tableName}`;
    return this as Pick<this, 'where'>;
  }

  where(instance: Partial<InstanceType<T>>) {
    const keys = Object.keys(instance);
    const assignmentStr = keys.reduce((pre, key) => {
      return `${pre}${pre && ' AND '}${key}=${transformValue(instance[key])}`;
    }, '');
    this.sql = `${this.sql} WHERE ${assignmentStr}`;
    return this as Omit<
      this,
      'where' | 'update' | 'select' | 'delete' | 'insert'
    >;
  }

  over() {
    this.sql = this.sql + ';';
    const sql = this.sql;
    return new Promise((resolve, reject) => {
      connection.query(sql, (err, result) => {
        if (err) {
          reject(err);
        } else {
          console.log(sql);
          resolve(result);
        }
      });
    });
  }
}
