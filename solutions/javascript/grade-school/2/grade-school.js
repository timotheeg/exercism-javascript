export class GradeSchool {
  constructor() {
    this.studentsByGrade = new Map();
    this.studentsByStudent = new Map();
  }

  roster() {
    const res = {};

    for (const [key, value] of this.studentsByGrade.entries()) {
      res[key] = [...value].sort();
    }

    return res;
  }

  add(student, level) {
    // protect against duplicates
    let cohort = this.studentsByStudent.get(student);

    if (cohort) {
      cohort.delete(student);
    }

    cohort = this.studentsByGrade.get(level) || new Set();

    cohort.add(student);

    this.studentsByGrade.set(level, cohort);
    this.studentsByStudent.set(student, cohort);
  }

  grade(level) {
    return [...(this.studentsByGrade.get(level) || [])].sort();
  }
}
