import StudentService from './StudentService';

(async () => {
  const studentService = new StudentService();
  const res = await studentService.selectAll();
  console.log(JSON.stringify(res, null, 2));
})();
