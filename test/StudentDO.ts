import { Table } from '../src/decorators';

@Table('student')
class StudentDO {
  id?: number;
  name?: string;
  age?: number;
}

export default StudentDO;
