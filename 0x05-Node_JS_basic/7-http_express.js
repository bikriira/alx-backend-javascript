const express = require('express');
const countStudents = require('./3-read_file_async');

const app = express();

app.get('/', (req, res) => {
  res.type('text/plain').send('Hello Holberton School!');
});

app.get('/students', async (req, res) => {
  res.type('text/plain');

  let responseText = 'This is the list of our students\n';
  try {
    const data = await countStudents(process.argv[2]);

    const categories = Object.entries(data.category);
    const { totalStudents } = data;

    responseText += `Number of students: ${totalStudents}\n`;

    for (let i = 0; i < categories.length; i += 1) {
      const [field, students] = categories[i];

      responseText += `Number of students in ${field}: ${
        students.length
      }. List: ${students.join(', ')}`;

      if (i < categories.length - 1) {
        responseText += '\n';
      }
    }
    res.send(responseText);
  } catch (error) {
    res.type('text/plain');
    res.status(500).send(error.message);
  }
});

app.listen(1245);

module.exports = app;
