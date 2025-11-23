class FamilyDB {
  constructor(familyTree) {
    this.db = new Map();

    for (const [name, children] of Object.entries(familyTree)) {
      const parent = this.get(name);
      parent.addChildren(...children);
    }
  }
  
  get(name) {
    let node = this.db.get(name);
    if (!node) {
      node = new Node(this, name);
      this.db.set(name, node);
    }
    return node;
  }

  has(name) {
    return this.db.has(name);
  }
}

class Node {
  constructor(db, name) {
    this.db = db;
    this.name = name;

    this.parents = new Map();
    this.children = new Map();
    this.siblings = new Map();
  }

  addParent(name) {
    this.parents.set(name, this.db.get(name));
  }
  
  addChildren(...children) {
    children.forEach(name => {
      const child = this.db.get(name);
      this.children.set(name, child);
      child.addParent(this.name);
    });

    // cross reference all siblings
    const allChildrenNames = [...this.children.keys()];
    for (const [childName, childNode] of this.children) {
      const otherChildren = allChildrenNames.filter(name => name !== childName);
      childNode.addSibling(...otherChildren);
    }
  }

  addSibling(...names) {
    names.forEach(name => this.siblings.set(name, this.db.get(name)));
  }

  hasChild(name) {
    return this.children.has(name);
  }

  hasSibling(name) {
    return this.siblings.has(name);
  }

  hasParent(name) {
    return this.parents.has(name);
  }

  toString() {
    return `${this.name}:\n  parents: [${this.parents.keys()}]\n  children: [${this.children.keys()}]\n  siblings: [${this.siblings.keys()}]`
  }
}

function descend(db, node, target, distance = 0) {
  if (node.hasChild(target)) return distance + 1;

  for (const [childName, childNode] of node.children) {
    const res = descend(db, childNode, target, distance + 1);
    if (res !== -1) return res;
  }

  return -1;
}

function checkSiblings(db, node, target, distance = 0) {
  if (node.hasSibling(target)) return distance + 1;

  for (const [siblingName, siblingNode] of node.siblings) {
    if (siblingName === node.name) continue;
    const res = descend(db, siblingNode, target, distance + 1);
    if (res !== -1) return res;
  }

  return -1;
}

function ascend(db, node, target, distance = 0) {
  if (node.hasParent(target)) return distance + 1;

  for (const [_, parentNode] of node.parents) {
    const res = descend(db, parentNode, target, distance + 1);
    if (res !== -1) return res;
  }

  for (const [_, parentNode] of node.parents) {
    const res = checkSiblings(db, parentNode, target, distance + 1);
    if (res !== -1) return res;
  }

  for (const [_, parentNode] of node.parents) {
    const res = ascend(db, parentNode, target, distance + 1);
    if (res !== -1) return res;
  }

  return -1;
}

export const degreesOfSeparation = (familyTree, personA, personB) => {
  const db = new FamilyDB(familyTree);

  if (!db.has(personA) || !db.has(personB)) {
    return -1;
  }

  const nodeA = db.get(personA);

  // first try descent
  let distance = descend(db, nodeA, personB);
  if (distance !== -1) return distance;

  // then siblings
  distance = checkSiblings(db, nodeA, personB);
  if (distance !== -1) return distance;

  // then ascent
  distance = ascend(db, nodeA, personB);
  if (distance !== -1) return distance;

  return -1;
};

