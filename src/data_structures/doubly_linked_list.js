class DLLNode {
  constructor({ element = undefined, next = this, prev = this, isSentinel = false }) {
    this.element = element;
    this.next = next;
    this.prev = prev;
    this._active = !isSentinel;
  }

  remove() {
    if (this._active) {
      this.prev.next = this.next;
      this.next.prev = this.prev;
      this._active = false;
      return this.element;
    }
  }
}

class DoublyLinkedList {
  constructor(Node = DLLNode) {
    this.Node = Node;
    this._sentinel = new this.Node({ isSentinel: true });
  }

  _head() {
    return this._sentinel.next;
  }

  _tail() {
    return this._sentinel.prev;
  }

  insertHead(element) {
    // create a new node
    // set defaults in case there is a head node already
    let node = new this.Node({element, next:this._head(), prev: this._sentinel});
    // before setting the head set its previous to the node which will be the head in the next line.
    this._head().prev = node; // sentinel.next.prev = node setting the previous befor reassignment
    this.head = node; // set the head to the new node
    this._sentinel.next = node; //set sentinel.next to node now that it is the HEAD node

    return node; // return new node/HEAD as it has the pointers to the rest of the list
  }

  insertTail(element) {
    let node = new this.Node({ element, next:this._sentinel, prev:this._tail() });
    this._tail().next = node; // if there is a tail already set its previous to the new node soon to be tail
    this.tail = node; // set tail to new node
    this._sentinel.prev = this.tail;

    return node;
  }

  removeHead() {
    return this._head().remove();
  }

  removeTail() {
   return this._tail().remove();
  }

  remove(node) {
    let targetNode = node;

    let current = this._head();
    while(current != this._sentinel) {
      if (targetNode.element === current.element) {
       return current.remove();
      }
      current = current.next;
    }
    return;
  }

  forEach(callback, container = this) {
    let index = 0;

    for(let node = this._head(); node !== this._sentinel; node = node.next) {
      callback(node.element, index, container);
      index += 1;
    }
  }


  count() {
    let count = 0;
    let current = this._sentinel;

    // while current.next is not the sentinel/isActive
    while(current.next !== this._sentinel) {
      count = count += 1;
      if (current.next != undefined) {
        current = current.next;
      }
    }
    return count;
  }
}

export default DoublyLinkedList;