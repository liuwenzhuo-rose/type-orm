import StudentService from './StudentService';

(async () => {
  const studentService = new StudentService();
  for (let index = 0; index < 20; index++) {
    await studentService.insert({ name: 'jack', age: 30 });
  }
})();
