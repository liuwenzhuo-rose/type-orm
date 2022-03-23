import connection from '../connection';
import log from '../logger';
import { transformValue } from '../utils/common';

export default class DAO<T extends new () => any> {
  private tableName: string;
  private sql: string;

  constructor(target: T) {
    this.tableName = (target as any)?.tableName;
  }

  select(...keys: Array<keyof InstanceType<T>>) {
    const keysStr = keys.join(', ');
    this.sql = `SELECT ${keysStr} FROM ${this.tableName}`;
    return this as Pick<this, 'where' | 'over' | 'orderBy'>;
  }

  selectAll() {
    this.sql = `SELECT * FROM ${this.tableName}`;
    return this as Pick<this, 'over' | 'orderBy'>;
  }

  update(instance: Partial<InstanceType<T>>) {
    const keys = Object.keys(instance);
    const assignmentStr = keys
      .map((key) => `${key}=${transformValue(instance[key])}`)
      .join(', ');
    this.sql = `UPDATE ${this.tableName} SET ${assignmentStr}`;
    return this as Pick<this, 'where'>;
  }

  insert(instance: InstanceType<T>) {
    const keys = Object.keys(instance);
    const values = Object.values(instance);
    const keysStr = `(${keys.join(', ')})`;
    const valuesStr = `(${values
      .map((value) => transformValue(value))
      .join(', ')})`;
    this.sql = `INSERT INTO ${this.tableName} ${keysStr} VALUES ${valuesStr}`;
    return this as Pick<this, 'over'>;
  }

  delete() {
    this.sql = `DELETE FROM ${this.tableName}`;
    return this as Pick<this, 'where'>;
  }

  where(instance: Partial<InstanceType<T>>) {
    const keys = Object.keys(instance);
    const assignmentStr = keys
      .map((key) => `${key}=${transformValue(instance[key])}`)
      .join(' AND ');
    this.sql = `${this.sql} WHERE ${assignmentStr}`;
    return this as Pick<this, 'over'>;
  }

  // 排序
  orderBy(key: keyof InstanceType<T>, order: 'ASC' | 'DESC' = 'ASC') {
    this.sql = `${this.sql} ORDER BY ${key} ${order}`;
    return this as Pick<this, 'over'>;
  }

  groupBy(key: keyof InstanceType<T>) {
    this.sql = `${this.sql} GROUP BY ${key}`;
    return this as Pick<this, 'over'>;
  }

  // sql 语句结束
  over() {
    this.sql = this.sql + ';';
    return new Promise((resolve, reject) => {
      connection.query(this.sql, (err, result) => {
        if (err) {
          log(this.sql, err);
          reject(err);
        } else {
          console.log(this.sql);
          this.sql = '';
          resolve(result);
        }
      });
    });
  }

  // 自定义sql语句
  query(sql: string) {
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
