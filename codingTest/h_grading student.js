function gradingStudents(grades) {
  // Write your code here
  const result = [];
  grades.forEach((grade) => {
    const x = Math.floor(grade / 5) * 5 + 5;
    if (grade < 38) {
      result.push(grade);
    } else if (x - grade < 3) {
      result.push(x);
    } else if (x - grade >= 3) {
      result.push(grade);
    }
  });
  return result;
}
