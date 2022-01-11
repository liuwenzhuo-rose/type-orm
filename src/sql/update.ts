import connection from '../connection';
import { transformValue } from '../utils/common';

export interface update<T extends new () => any> {
  (param: InstanceType<T>): Promise<any>;
  where: (param: InstanceType<T>) => {};
}
const update = (tableName: string, instance: Record<string, any>) => {
  return new Promise((resolve, reject) => {
    const keys = Object.keys(instance);
    const assignmentStr = keys.reduce((pre, key) => {
      return `${pre}${pre || ', '}${key}=${transformValue(instance[key])}`;
    }, '');

    let sql = `UPDATE ${tableName} SET ${assignmentStr};`;

    connection.query(sql, (err, result) => {
      if (err) {
        reject(err);
      } else {
        resolve(result);
      }
    });
  });
};

export default update;
