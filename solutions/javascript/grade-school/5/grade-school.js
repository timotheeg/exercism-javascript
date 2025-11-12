export class GradeSchool {
  constructor() {
    this.studentsByGrade = new Map();
    this.studentsByStudent = new Map();
  }

  roster() {
    return [...this.studentsByGrade.entries()]
      .sort((a, b) => a[0] - b[0])
      .reduce((acc, [_level, students]) => {
        acc.push(...students);
        return acc;
      }, []);
  }

  add(student, level) {
    // protect against duplicates
    const cohortFromStudent = this.studentsByStudent.get(student);

    if (cohortFromStudent) {
      // student is already registered, ignore
      return false;
    }

    const cohortFromGrade = (this.studentsByGrade.get(level) || []).concat(student).sort();

    this.studentsByGrade.set(level, cohortFromGrade);
    this.studentsByStudent.set(student, cohortFromGrade);

    return true;
  }

  grade(level) {
    // always return a copy
    return [...(this.studentsByGrade.get(level) || [])];
  }
}
