import StudentService from './StudentService';

(async () => {
  const studentService = new StudentService();
  await studentService.deleteThenUpdate();
})();
