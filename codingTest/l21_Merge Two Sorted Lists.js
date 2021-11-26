class ListNode {
  constructor(val, next = null) {
    this.val = val;
    this.next = next;
  }
}

const list1_3 = new ListNode(4, null);
const list1_2 = new ListNode(2, list1_3);
const list1_1 = new ListNode(1, list1_2);
const list1 = list1_1;

const list2_3 = new ListNode(4, null);
const list2_2 = new ListNode(3, list2_3);
const list2_1 = new ListNode(1, list2_2);
const list2 = list2_1;

console.log(list1);
console.log(list2);

const mergeTwoLists = function (list1, list2) {
  const dummyHead = new ListNode(null);
  let currentNode = dummyHead;

  while (list1 !== null && list2 !== null) {
    if (list1.val < list2.val) {
      currentNode.next = list1;
      list1 = list1.next; // list 변화
    } else {
      currentNode.next = list2;
      list2 = list2.next; // list 변화
    }
    console.log('before', currentNode);
    currentNode = currentNode.next;
    console.log('after', currentNode);
  }

  if (list1 !== null) {
    currentNode.next = list1;
  } else if (list2 !== null) {
    currentNode.next = list2;
  }
  return dummyHead.next;
};

console.log(JSON.stringify(mergeTwoLists(list1, list2), null, 2));
