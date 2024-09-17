const http = require('http');
const countStudents = require('./3-read_file_async');

const app = http.createServer(async (req, res) => {
  res.setHeader('Content-Type', 'text/plain');
  if (req.url === '/') res.write('Hello Holberton School!');
  if (req.url === '/students') {
    try {
      const data = await countStudents('database.csv');
      for (const [field, students] of Object.entries(data)) {
        res.write(
          `Number of students in ${field}: ${
            students.length
          }. List: ${students.join(', ')}\n`,
        );
      }
    } catch (error) {
      res.statusCode = 501;
      res.end('Not found');
    }
  }
  res.end();
});
app.listen(1245);

module.exports = app;
