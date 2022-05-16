import path from 'path';
import mysql, { ConnectionConfig } from 'mysql';

const CONFIG_FILE_NAME = 'orm.config.json';

const ormConfig: ConnectionConfig = require(path.resolve(
  process.cwd(),
  CONFIG_FILE_NAME
));

const connection = mysql.createConnection(ormConfig);

export default connection;
