import DAO from '../src/dao';
import table from '../src/decorators/table';
import transaction from '../src/decorators/transaction';
@table('student')
class StudentDO {
  id?: number;
  name?: string;
  age?: number;
}

class StudentDAO {
  @transaction
  async query() {
    const Student = new DAO(StudentDO);
    await Student.update({
      xxx: 'roooooooooooo',
    } as any)
      .where({
        id: 1,
      })
      .over();
  }
}

const studentDAO = new StudentDAO();
studentDAO.query().then((result) => {
  // console.log(result);
});
