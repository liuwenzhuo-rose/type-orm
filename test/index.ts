import { DAO } from '../src/DAO';
class Student {
  id?: number;
  name: string;
  age: number;
}

(async function () {
  const StudentDAO = new DAO(Student);
  const result = await StudentDAO.delete()
    .where({
      name: 'lucy',
    })
    .over();
  console.log(result);
})();
