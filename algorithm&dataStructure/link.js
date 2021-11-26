const node = new ListNode();
let testnode = node;
node === testnode; // true라는 당연한 결과를 확인할 수 있습니다.

// 그래서 할당한 testnode에 next를 추가하면 주소참조이기 때문에
testnode.next = new ListNode(1);
testnode; // ListNode {val: 0, next: ListNode}
// 기존의 node역시 next가 추가되는 사실을 확인 할 수 있습니다.
node; // ListNode {val: 0, next: ListNode}

// 그러나 오늘 작성한 위의 코드에서는
// change = change.next;을 통해 change라는 값을 계속 next로 바꾸었는데요,
// 마지막 return 값으로 change.next로 하면 제출 실패하고 mergedlist.next로 하면 제출이 성공합니다.
// 이는 어찌됐는 종국에는 change와 mergedlist값이 다르다는 뜻인데요...?
// 그 이유는 아래와 같습니다. 위 코드와 마찬가지로 아래와 같이 콘솔을 확인하면
testnode = testnode.next;
node === testnode; // false로 다른 값을 가지게됩니다. 대신...

// testnode는 원래 node의 주소참조를 하고 있었는데,
// testnode = testnode.next로 인해서 node.next의 주소참조로 바뀌게 되는 것 입니다.
node.next === testnode; // true

// 그래서 testnode.next를 추가하면 node.next.next에 참조를 하고 있기 때문에 node.next.next에도 역시 추가가 되는 것 입니다...!
testnode.next = new ListNode(2);
testnode.next; // ListNode {val: 2, next: null}
node.next.next; // ListNode {val: 2, next: null}
node.next.next === testnode.next; // true

// 변경해도 적용 됩니다
testnode.next = new ListNode(4);
testnode.next; // ListNode {val: 4, next: null}
node.next.next === testnode.next; // true
