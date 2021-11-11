class Node {
  constructor(element) {
    this.element = element;
    this.next = null;
  }
}

class LList {
  constructor() {
    this.head = new Node('head');
  }
  find(item) {
    let currentNode = this.head;
    while (currentNode.element !== item) {
      currentNode = currentNode.next;
    }
    return currentNode;
  }
  insert(newElement, item) {
    let newNode = new Node(newElement);
    let current = this.find(item);
    newNode.next = current.next;
    current.next = newNode;
  }
  display() {
    let currentNode = this.head;
    while (currentNode.next !== null) {
      console.log(currentNode.next.element);
      currentNode = currentNode.next;
    }
  }

  findPrevious(item) {
    let currentNode = this.head;
    while (currentNode.next !== null && currentNode.next.element !== item) {
      currentNode = currentNode.next;
    }
    return currentNode;
  }

  remove(item) {
    let previousNode = this.findPrevious(item);
    if (previousNode.next !== null) {
      previousNode.next = previousNode.next.next;
    }
  }
}

//테스트
let cities = new LList();
//insert(새 요소, 기존 요소)
cities.insert('Seoul', 'head');
cities.insert('Pusan', 'Seoul');
cities.insert('Gwangju', 'Pusan');
cities.insert('Daegu', 'Gwangju');
cities.display();
// console.log(cities);
console.log('-------삭제 후------');
cities.remove('Pusan');
cities.display();
console.log(cities);
