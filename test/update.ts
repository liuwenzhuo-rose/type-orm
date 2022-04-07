import StudentService from './StudentService';

(async () => {
  const studentService = new StudentService();
  const res = await studentService.update({ id: 1, name: 'jack', age: 30 });
  console.log(res);
})();
