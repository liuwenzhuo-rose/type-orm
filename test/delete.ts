import StudentService from './StudentService';

(async () => {
  const studentService = new StudentService();
  const res = await studentService.delete(1);
  console.log(res);
})();
