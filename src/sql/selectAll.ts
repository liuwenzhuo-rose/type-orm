import connection from '../connection';

export interface SelectAll<T extends new () => any> {
  (): Promise<InstanceType<T>[]>;
}

const selectAll = (tableName: string) => {
  return new Promise((resolve, reject) => {
    let sql = `SELECT * FROM ${tableName};`;

    connection.query(sql, (err, result) => {
      if (err) {
        reject(err);
      } else {
        resolve(result);
      }
    });
  });
};

export default selectAll;
