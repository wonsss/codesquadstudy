/*5. 배열 결과 출력
type이 sk인, name으로 구성된 배열만 출력한다.*/
const data2 = [
  {
    id: 1,
    name: 'Yong',
    phone: '010-0000-0000',
    type: 'sk',
    childnode: [
      {
        id: 11,
        name: 'echo',
        phone: '010-0000-1111',
        type: 'kt',
        childnode: [
          {
            id: 115,
            name: 'hary',
            phone: '211-1111-0000',
            type: 'sk',
            childnode: [
              {
                id: 1159,
                name: 'pobi',
                phone: '010-444-000',
                type: 'kt',
                childnode: [
                  {
                    id: 11592,
                    name: 'cherry',
                    phone: '111-222-0000',
                    type: 'lg',
                    childnode: [],
                  },
                  {
                    id: 11595,
                    name: 'solvin',
                    phone: '010-000-3333',
                    type: 'sk',
                    childnode: [],
                  },
                ],
              },
            ],
          },
          {
            id: 116,
            name: 'kim',
            phone: '444-111-0200',
            type: 'kt',
            childnode: [
              {
                id: 1168,
                name: 'hani',
                phone: '010-222-0000',
                type: 'sk',
                childnode: [
                  {
                    id: 11689,
                    name: 'ho',
                    phone: '010-000-0000',
                    type: 'kt',
                    childnode: [
                      {
                        id: 116890,
                        name: 'wonsuk',
                        phone: '010-000-0000',
                        type: 'kt',
                        childnode: [],
                      },
                      {
                        id: 1168901,
                        name: 'chulsu',
                        phone: '010-0000-0000',
                        type: 'sk',
                        childnode: [],
                      },
                    ],
                  },
                ],
              },
            ],
          },
          {
            id: 117,
            name: 'hong',
            phone: '010-0000-0000',
            type: 'lg',
            childnode: [],
          },
        ],
      },
    ],
  },
];

const result = [];
const digJsonTree = (data, target) => {
  data.forEach((object) => {
    for (const key in object) {
      if (object[key] === target) {
        result.push(object['name']);
      }
      //'위에서 object 안으로 파고들어 sk랑 같은지 확인하고 name을 푸시하는 작업'을 계속 재귀하려고 한다.
      // object안에 또 object가 계속 중첩되어 있으므로, object 중첩 안으로 들어갈 때마다 object[key]가 string이 아니고 object이다.
      // 그래서 object[key]타입이 object이면, 위에서 했던 '작업'을 재귀하려고 한다.
      // 재귀하면, 알아서 중첩의 끝까지 위 코드의 작업을 반복하여 값을 추가한다.
      if (typeof object[key] === 'object') {
        digJsonTree(object[key], target);
      }
    }
  });
  return result;
};

console.log(digJsonTree(data2, 'sk'));
