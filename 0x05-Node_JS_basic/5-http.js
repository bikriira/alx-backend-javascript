const http = require('http');
const countStudents = require('./3-read_file_async');

const app = http.createServer(async (req, res) => {
  res.setHeader('Content-Type', 'text/plain');
  if (req.url === '/') {
    res.write('Hello Holberton School!');
    res.end();
  }
  if (req.url === '/students') {
    res.write('This is the list of our students\n');
    try {
      const data = await countStudents('database.csv');
      const categories = Object.entries(data.category);
      const { totalStudents } = data;

      res.write(`Number of students: ${totalStudents}\n`);

      for (let i = 0; i < categories.length; i += 1) {
        const [field, students] = categories[i];

        res.write(
          `Number of students in ${field}: ${
            students.length
          }. List: ${students.join(', ')}`,
        );

        // if (i < categories.length - 1) {
        //   res.write('\n');
        // }
      }
    } catch (error) {
      res.statusCode = 501;
      // res.write(error);
    }
  }
  res.end();
});
app.listen(1245);

module.exports = app;
