import StudentService from './StudentService';

(async () => {
  const studentService = new StudentService();
  const res = await studentService.selectPage({
    current: 1,
    pageSize: 10,
  });
  console.log(JSON.stringify(res, null, 2));
})();
