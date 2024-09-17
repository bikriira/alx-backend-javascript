const http = require('http');
const countStudents = require('./3-read_file_async');

const app = http.createServer(async (req, res) => {
  res.setHeader('Content-Type', 'text/plain');
  if (req.url === '/') {
    res.write('Hello Holberton School!');
    res.end();
  }
  if (req.url === '/students') {
    try {
      const data = await countStudents('database.csv');
      const entries = Object.entries(data);
      for (let i = 0; i < entries.length; i += 1) {
        const [field, students] = entries[i];
        res.write(
          `Number of students in ${field}: ${
            students.length
          }. List: ${students.join(', ')}`
        );
        if (i < entries.length - 1) {
          res.write('\n');
        }
      }
      res.end();
    } catch (error) {
      res.statusCode = 501;
      res.end('Not found');
    }
  }
});
app.listen(1245);

module.exports = app;
