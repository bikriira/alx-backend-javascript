import readDatabase from '../utils';

class StudentsController {
  static async getAllStudents(request, response) {
    try {
      const data = await readDatabase(process.argv[2]);
      let responseText = 'This is the list of our students\n';
      const categories = Object.entries(data).sort((a, b) => a[0].localeCompare(b[0]));

      categories.forEach(([field, students], index) => {
        responseText += `Number of students in ${field}: ${students.length}. List: ${students.join(', ')}`;
        if (index < categories.length - 1) {
          responseText += '\n';
        }
      });

      response.status(200).send(responseText);
    } catch (error) {
      console.log(error);
      response.status(500).send('Cannot load the database');
    }
  }

  static async getAllStudentsByMajor(request, response) {
    const { major } = request.params;
    if (!['CS', 'SWE'].includes(major)) {
      return response.status(500).send('Major parameter must be CS or SWE');
    }

    try {
      const data = await readDatabase(process.argv[2]);
      const students = data[major] || [];
      const list = `List: ${students.join(', ')}`;
      response.status(200).send(list);
    } catch (error) {
      response.status(500).send('Cannot load the database');
    }
  }
}

export default StudentsController;
