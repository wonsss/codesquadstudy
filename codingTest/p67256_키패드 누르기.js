function solution(numbers, hand) {
  let answer = "";
  const keypad = Object.freeze({
    1: [0, 0],
    2: [0, 1],
    3: [0, 2],
    4: [1, 0],
    5: [1, 1],
    6: [1, 2],
    7: [2, 0],
    8: [2, 1],
    9: [2, 2],
    0: [3, 1],



  });

  const handPlace = {
    left: [3, 0],
    right: [3, 2],
  };

  function saveLocation(direction, location) {
    if (direction === "left") {
      answer += "L";
      handPlace.left = location;
    } else if (direction === "right") {
      answer += "R";
      handPlace.right = location;
    }
  }

  function getMidNumber(location) {
    const leftValue =
      Math.abs(location[0] - handPlace.left[0]) + Math.abs(location[1] - handPlace.left[1]);
    const rightValue =
      Math.abs(location[0] - handPlace.right[0]) + Math.abs(location[1] - handPlace.right[1]);

    if (leftValue > rightValue) {
      saveLocation("right", location);
    } else if (leftValue < rightValue) {
      saveLocation("left", location);
    } else if (leftValue === rightValue) {
      if (hand === "left") {
        saveLocation("left", location);
      } else if (hand === "right") {
        saveLocation("right", location);
      }
    }
  }

  numbers.forEach(number => {
    const location = keypad[number];

    if ([1, 4, 7,  ].includes(number)) {
      saveLocation("left", location);
    } else if ([3, 6, 9  ].includes(number)) {
      saveLocation("right", location);
    } else {
      getMidNumber(location);
    }
  });
  return answer;
}

const numbers = [1, 3, 4, 5, 8, 2, 1, 4, 5, 9, 5];
const hand = "right";

// const numbers = [7, 0, 8, 2, 8, 3, 1, 5, 7, 6, 2];
// const hand = 'left';

// const numbers = [1, 2, 3, 4, 5, 6, 7, 8, 9, 0];
// const hand = 'right';

console.log(solution(numbers, hand));
