import StudentService from './StudentService';

(async () => {
  const studentService = new StudentService();
  const res = await studentService.select(8);
  console.log(JSON.stringify(res, null, 2));
})();
