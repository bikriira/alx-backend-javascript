export default function createIteratorObject(report) {
  const info = report.allEmployees;
  return {
    * [Symbol.iterator]() {
      for (const department of Object.keys(info)) {
        for (const employeeName of info[department]) {
          yield employeeName;
        }
      }
    },
  };
}
