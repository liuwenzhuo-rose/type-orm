import DaoFactory, { Pagination } from '../src/DaoFactory';
import { Transaction } from '../src/decorators';
import StudentDO from './StudentDO';

class StudentService {
  studentDao = new DaoFactory(StudentDO);

  insert(student: StudentDO) {
    return this.studentDao.insert(student).over();
  }

  delete(id: number) {
    return this.studentDao.delete().where({ id }).over();
  }

  update(student: StudentDO) {
    return this.studentDao.update(student).where({ id: student.id }).over();
  }

  selectAll() {
    return this.studentDao.selectAll().over();
  }

  selectPage(pagination: Pagination) {
    return this.studentDao.selectPage(pagination).over();
  }

  @Transaction
  async deleteThenUpdate() {
    const res1 = await this.studentDao.delete().where({ id: 2 }).over();
    console.log(res1);
    const res2 = await this.studentDao
      .update({ fieldNotExist: 'age' } as any)
      .where({ id: 1 })
      .over();
    console.log(res2);
  }
}

export default StudentService;
