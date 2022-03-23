import mysql from 'mysql';
import path from 'path';

const ormConfig = require(path.resolve(process.cwd(), 'orm.config.json'));
const connection = mysql.createConnection(ormConfig);

connection.connect((err) => {
  if (err) {
    return console.log(err.sqlMessage);
  }
  console.log('数据库连接成功');
});

export default connection;
