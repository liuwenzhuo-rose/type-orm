import connection from './connection';

connection.query('select * from student', (err, result) => {
  console.log(result);
});
