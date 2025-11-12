export class GradeSchool {
  constructor() {
    this.studentsByGrade = new Map();
    this.studentsByStudent = new Map();
  }

  roster() {
    const tuples = [...this.studentsByGrade.entries()].map(([level, cohort]) => [level, [...cohort].sort()]);

    return tuples
      .sort((a, b) => a[0] - b[0])
      .reduce((acc, [_level, students]) => {
        acc.push(...students);
        return acc;
      }, []);

    return tuples;
  }

  add(student, level) {
    // protect against duplicates
    const cohortFromStudent = this.studentsByStudent.get(student);

    if (cohortFromStudent) {
      // student is already registered, ignore
      return false;
    }

    const cohortFromGrade = this.studentsByGrade.get(level) || new Set();

    cohortFromGrade.add(student);

    this.studentsByGrade.set(level, cohortFromGrade);
    this.studentsByStudent.set(student, cohortFromGrade);

    return true;
  }

  grade(level) {
    return [...(this.studentsByGrade.get(level) || [])].sort();
  }
}
