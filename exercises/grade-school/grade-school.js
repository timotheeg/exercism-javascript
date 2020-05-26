export class GradeSchool {
  constructor() {
  	this.db = new Map();
  }

  roster() {
  	const res = {};

  	for (const [key, value] of this.db.entries()) {
  		res[key] = [ ...value ];
  	}

  	return res;
  }

  add(student, level) {
  	let list = this.db.get(level) || [];

  	list.push(student);

  	this.db.set(level, list.sort());
  }

  grade(level) {
    return [ ...(this.db.get(level) || []) ];
  }
}
