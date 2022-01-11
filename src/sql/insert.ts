import connection from '../connection';
import { transformValue } from '../utils/common';

export interface Insert<T extends new () => any> {
  (param: InstanceType<T>): Promise<any>;
}

const insert = (tableName: string, instance: Record<string, any>) => {
  return new Promise((resolve, reject) => {
    const keys = Object.keys(instance);
    const values = Object.values(instance);

    const fieldsStr = keys.reduce((pre, key) => {
      return `${pre}${pre || ', '}${key}`;
    }, '');

    const valuesStr = values.reduce((pre, value) => {
      return `${pre}${pre || ', '}${transformValue(value)}`;
    }, '');

    let sql = `INSERT INTO ${tableName}(${fieldsStr}) VALUES(${valuesStr});`;

    connection.query(sql, (err, result) => {
      if (err) {
        reject(err);
      } else {
        resolve(result);
      }
    });
  });
};

export default insert;
