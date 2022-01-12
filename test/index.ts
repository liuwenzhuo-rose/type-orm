import DAO from '../src/dao';
import table from '../src/decorators/table';

@table('student')
class Student {
  id?: number;
  name: string;
  age: number;
}

(async function () {
  const StudentDAO = new DAO(Student);
  const result = await StudentDAO.select('age', 'name')
    .where({
      id: 9,
      name: 'xiaomei',
    })
    .over();
  console.log('------', result);
})();
