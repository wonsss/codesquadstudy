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
  $layerContainer.classList.add('show');
}
$listBox.addEventListener('mouseover', showLayers);
function waitMousemove(e) {
  const fruitName = e.target.innerText;
  if (!Object.keys(RecorderOfDisplayedFruits).includes(fruitName)) {
    recordNumberOfMousemove(e);
  }
  if (!scheduled) {
    scheduled = true;
    console.log('before', scheduled);
    setTimeout(() => {
      recordNumberOfMousemove(e);
    }, 500);
    console.log('after', scheduled);
  }
}

function recordNumberOfMousemove(e) {
  scheduled = false;
  const fruitName = e.target.innerText;
  if (Object.keys(RecorderOfDisplayedFruits).includes(fruitName)) {
    const $fruitName = document.createElement('span');
    $fruitName.innerHTML = `${fruitName}: ${RecorderOfDisplayedFruits[
      fruitName
    ]++}`;
    $fruitName.className = 'outputSpan';
    const $outputLi = document.createElement('li');
    $outputLi.className = 'outputLi';
    $outputLi.id = fruitName;
    $outputLi.appendChild($fruitName);

    document.getElementById(fruitName).replaceWith($outputLi);
  } else {
    RecorderOfDisplayedFruits[fruitName] = 0;
    const $outputLi = document.createElement('li');
    $outputLi.className = 'outputLi';
    $outputLi.id = fruitName;
    const $fruitName = document.createElement('span');
    $fruitName.innerHTML = `${fruitName}: ${RecorderOfDisplayedFruits[fruitName]}`;
    $fruitName.className = 'outputSpan';
    $outputLi.appendChild($fruitName);

    $outputUl.append($outputLi);
  }
}

$layer1.addEventListener('mousemove', waitMousemove);
$layer2.addEventListener('mousemove', waitMousemove);
$layer3.addEventListener('mousemove', waitMousemove);
$layer4.addEventListener('mousemove', waitMousemove);
$layer5.addEventListener('mousemove', waitMousemove);
$layer6.addEventListener('mousemove', waitMousemove);
