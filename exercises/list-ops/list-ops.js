export class List {
  constructor(start_entries=[]) {
    this._store = [ ...start_entries ];
  }

  get values() {
    return [ ...this._store ];
  }

  append(other_list) {
    this._store.push(...other_list._store);
    return this;
  }

  concat(lists) {
    if (lists instanceof List) {
      lists = lists._store;
    }
    else if (!Array.isArray(lists)) {
      lists = [ lists ];
    }

    lists.forEach(entry => {
      if (entry instanceof List) {
        this._store.push(...entry._store);
      }
      else {
        this._store.push(entry);
      }
    });
    return this;
  }

  filter(predicate) {
    this._store = this._store.filter(predicate);
    return this;
  }

  map(mapper) {
    this._store = this._store.map(mapper);
    return this;
  }

  length() {
    return this._store.length;
  }

  foldl(reducer, start_value) {
    return this._store.reduce(reducer, start_value);
  }

  foldr(reducer, start_value) {
    return this._store.reduceRight(reducer, start_value);
  }

  reverse() {
    this._store.reverse();
    return this;
  }
}
