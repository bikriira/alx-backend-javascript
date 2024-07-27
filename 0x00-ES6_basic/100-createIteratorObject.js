export default function createIteratorObject(report) {
  const { allEmployees } = report;

  return {
    * [Symbol.iterator]() {
      for (const department in allEmployees) {
        for (const employee of allEmployees[department]) {
          yield employee;
        }
      }
    },
  };
}
