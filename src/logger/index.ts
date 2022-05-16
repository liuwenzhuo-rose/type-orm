import fs from 'fs';
import path from 'path';

const ormConfig = require(path.resolve(process.cwd(), 'orm.config.json'));
const logPath = path.resolve(
  ormConfig.log || path.resolve(process.cwd(), 'orm.log')
);
if (!fs.existsSync(path.dirname(logPath))) {
  fs.mkdirSync(path.dirname(logPath));
}

const log = (sql: string, err: any) => {
  const logTime = `--------------------${new Date().toLocaleString()}--------------------\n`;
  const logSql = `SQL: ${sql}\n`;
  const logErr = `${err}\n`;
  const logInfo = `${logTime}${logSql}${logErr}\n`;
  console.log(logInfo);
  fs.appendFile(logPath, logInfo, (err) => {
    console.log(err);
  });
};

export default log;
