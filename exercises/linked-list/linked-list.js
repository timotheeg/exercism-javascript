class Node {
  constructor(value, prev=null, next=null) {
    this.value = value;
    this.prev = prev;
    this.next = next;
  }
}

export class LinkedList {
  constructor() {
    this.head = null;
    this.tail = null;
   }

  push(value) {
    const node = new Node(value, this.tail);

    if (this.tail) this.tail.next = node;

    this.tail = node;

    if (!this.head) this.head = node;
  }

  pop() {
    let value = null;

    if (this.tail) {
      value = this.tail.value;
      this.tail = this.tail.prev;
    }

    if (this.tail) {
      this.tail.next = null;
    }
    else {
      this.head = null;
    }

    return value;
  }

  shift() {
    let value = null;

    if (this.head) {
      value = this.head.value;
      this.head = this.head.next;
    }

    if (this.head) {
      this.head.prev = null;
    }
    else {
      this.tail = null;
    }

    return value;
  }

  unshift(value) {
    const node = new Node(value, null, this.head);

    if (this.head) this.head.prev = node;

    this.head = node;

    if (!this.tail) this.tail = node;
  }

  delete(value) {
    let node = this.head

    while(node) {
      if (node.value === value) {
        if (node.next) {
          node.next.prev = node.prev
        }
        else {
          this.tail = node.prev;
        }

        if (node.prev) {
          node.prev.next = node.next;
        }
        else {
          this.head = node.next;
        }

        return;
      }

      node = node.next;
    }
  }

  count() {
    let count = 0;
    let node = this.head

    while(node) {
      count++;
      node = node.next;
    }

    return count;
  }
}
