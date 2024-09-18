import fs from 'fs/promises';

export default function readDatabase(filePath) {
  return fs.readFile(filePath, 'utf-8')
    .then((data) => {
      const lines = data
        .trim()
        .split('\n')
        .filter((line) => line); // Remove empty lines
      const students = lines.slice(1); // Remove header

      const fields = {};
      students.forEach((student) => {
        const [firstName, , , field] = student.split(',');
        if (!fields[field]) {
          fields[field] = [];
        }
        fields[field].push(firstName);
      });
      return fields;
    })
    .catch((error) => {
      throw error;
    });
}
