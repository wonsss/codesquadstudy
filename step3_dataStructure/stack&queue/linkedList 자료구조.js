class Node {
  constructor(element) {
    this.element = element;
    this.next = null;
    this.previous = null; //양방향 연결 리스트 위해 이전 노드의 링크 저장하는 프로퍼티 추가
  }
}

class LList {
  constructor() {
    this.head = new Node('head');
    this.head.next = this.head; //순환형 연결리스트
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
    newNode.previous = current; //양방향 연결 리스트 위해 연결
    current.next = newNode;
  }
  display() {
    let currentNode = this.head;
    while (currentNode.next !== null) {
      console.log(currentNode.next.element);
      currentNode = currentNode.next;
    }
  }

  /*   //단방향 연결시 사용
  findPrevious(item) {
    let currentNode = this.head;
    while (currentNode.next !== null && currentNode.next.element !== item) {
      currentNode = currentNode.next;
    }
    return currentNode;
  } */

  remove(item) {
    let currentNode = this.find(item);
    if (currentNode.next !== null) {
      //이전 노드의 링크가 삭제하려는 노드의 다음 노드를 가리키도록 설정
      currentNode.previous.next = currentNode.next;
      //삭제하려는 노드 다음 노드의 previous 프로퍼티를 삭제하려는 노드의 previous 값으로 설정
      currentNode.next.previous = currentNode.previous;
      currentNode.next = null;
      currentNode.previous = null;
    }
  }

  // 유틸리티 함수 - 양방향 연결리스트의 마지막 노드로 이동
  findLast() {
    let currentNode = this.head;
    while (currentNode.next !== null) {
      currentNode = currentNode.next;
    }
    return currentNode;
  }

  //역순으로 양방향 연결리스트의 요소 출력 (findLast 이용)
  displayReverse() {
    let currentNode = this.head;
    currentNode = this.findLast();
    while (currentNode.previous !== null) {
      console.log(currentNode.element);
      currentNode = currentNode.previous;
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
console.log('-------삭제 후------');
cities.remove('Pusan');
cities.display();

console.log('-----역순으로 요소 출력------');
cities.displayReverse();
