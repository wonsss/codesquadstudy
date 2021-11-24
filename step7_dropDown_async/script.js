const $listBox = document.getElementById('listBox');
const $layerContainer = document.getElementById('layerContainer');
const $layer1 = document.getElementById('layer1');
const $layer2 = document.getElementById('layer2');
const $layer3 = document.getElementById('layer3');
const $layer4 = document.getElementById('layer4');
const $layer5 = document.getElementById('layer5');
const $layer6 = document.getElementById('layer6');
const $outputUl = document.getElementById('outputUl');

const RecorderOfDisplayedFruits = {};

let scheduled = false;

function showLayers() {
  const timer = setTimeout(() => {
    $layerContainer.classList.add('show');
  }, 1000);
  $listBox.addEventListener('mouseleave', () => {
    clearTimeout(timer);
  });
}

function waitMousemove(e) {
  if (!scheduled) {
    scheduled = true;
    setTimeout(() => {
      recordNumberOfMousemove(e);
    }, 500);
  }
}

function createOutputLi(fruitName) {
  const $outputLi = document.createElement('li');
  $outputLi.className = 'outputLi';
  $outputLi.id = fruitName;
  return $outputLi;
}

function createFruitSpan(e) {
  const fruitName = e.target.innerText;
  const $fruitName = document.createElement('span');
  $fruitName.innerHTML = `${fruitName}: ${RecorderOfDisplayedFruits[
    fruitName
  ]++}`;
  $fruitName.className = 'outputSpan';
  return $fruitName;
}

function combineElement(e, fruitName) {
  const $fruitName = createFruitSpan(e);
  const $outputLi = createOutputLi(fruitName);
  $outputLi.appendChild($fruitName);
  return $outputLi;
}

function recordNumberOfMousemove(e) {
  scheduled = false;
  const fruitName = e.target.innerText;
  if (Object.keys(RecorderOfDisplayedFruits).includes(fruitName)) {
    const $outputLi = combineElement(e, fruitName);
    document.getElementById(fruitName).replaceWith($outputLi);
  } else {
    RecorderOfDisplayedFruits[fruitName] = 1;
    const $outputLi = combineElement(e, fruitName);
    $outputUl.append($outputLi);
  }
}

$listBox.addEventListener('mouseenter', showLayers);
$layer1.addEventListener('mousemove', waitMousemove);
$layer2.addEventListener('mousemove', waitMousemove);
$layer3.addEventListener('mousemove', waitMousemove);
$layer4.addEventListener('mousemove', waitMousemove);
$layer5.addEventListener('mousemove', waitMousemove);
$layer6.addEventListener('mousemove', waitMousemove);
