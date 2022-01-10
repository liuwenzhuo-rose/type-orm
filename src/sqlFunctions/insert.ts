import connection from '../connection';

const insert = (tableName: string, instance: Record<string, any>) => {
  const keys = Object.keys(instance);
  const fieldsStr = keys.reduce((pre, key) => {
    return `${pre}${pre ? ',' : ''} ${key}`;
  }, '');

  const valuesStr = keys.reduce((pre, key) => {
    return `${pre}${pre ? ',' : ''} ${instance[key]}`;
  }, '');
  let sql = `INSERT INTO ${tableName}(${fieldsStr}) VALUES(${valuesStr});`;
  connection.query(sql);
};

export default insert;
