class Node {
  constructor(state = {}, previous = null, next = null) {
    this.state = state;
    this.previous = previous;
    this.next = next;
  }
}

export class History {
  constructor(capacity = 15, initialState = {}) {
    this.current = this.head = this.tail = new Node(initialState, null, null);
    this.size = 0;
    this.capacity = capacity * 2;
  }

  getCurrent = () => this.current.state;

  add = state => {
    let node = new Node(state, this.current, null);

    this.current.next = node;
    this.current = node;
    this.tail = this.current;

    if (this.size === this.capacity) {
      this.head = this.head.next;
    } else {
      this.size += 1;
    }
  };

  traverse = () => {
    let node = this.head;
    while (node) {
      node = node.next;
    }
  };

  undo = () => {
    if (this.current === this.head) throw "Undo limit reached!";
    this.current = this.current.previous;
    return this.current.state;
  };

  redo = () => {
    if (this.current === this.tail) throw "Redo limit reached!";
    this.current = this.current.next;
    return this.current.state;
  };

  size = () => {
    return this.size;
  };
}
