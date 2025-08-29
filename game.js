// 最大人数
const MAX_PLAYERS = 6;
// ゲーム状態管理用変数
let playerCount = 2;
let customNumberValue = '';
let waitingForStart = false;
let timerStarted = false;
let startTime = 0;
let pressedFlags = [];
let times = [];
let btns = [];
let ranks = [];
let results = [];
let flyingOrder = [];
let normalOrder = [];
let digitsDivs = [];

// ページ要素取得
const setupPage = document.getElementById('setupPage');
const gamePage = document.getElementById('gamePage');
const setupForm = document.getElementById('setupForm');
const playerCountSelect = document.getElementById('playerCount');
const customNumber = document.getElementById('customNumber');
const backToSetupBtn = document.getElementById('backToSetupBtn');
const leftCol = document.getElementById('leftCol');
const rightCol = document.getElementById('rightCol');
const timeText = document.getElementById('timeText');

// ページ切り替え関数
function showSetupPage() {
  setupPage.classList.remove('hidden');
  gamePage.classList.add('hidden');
}
function showGamePage() {
  setupPage.classList.add('hidden');
  gamePage.classList.remove('hidden');
}

// 設定画面からゲーム画面へ
setupForm.addEventListener('submit', function(e) {
  e.preventDefault();
  playerCount = parseInt(playerCountSelect.value, 10);
  customNumberValue = customNumber.value;
  createButtons(playerCount);
  showGamePage();
  reset();
  startGame(); // ゲーム開始
});

// ゲーム画面から設定画面へ
backToSetupBtn.addEventListener('click', function() {
  showSetupPage();
});

// ゲーム開始処理
function startGame() {
  waitingForStart = true;
  for (let i = 0; i < playerCount; i++) {
    btns[i].removeAttribute('disabled');
  }
  timeText.style.visibility = 'hidden';
  // 1～10秒のランダム遅延後にスタート
  const delay = Math.random() * 15000 + 3000;
  setTimeout(() => {
    if (waitingForStart) {
      waitingForStart = false;
      timerStarted = true;
      timeText.style.visibility = 'visible';
      startTime = performance.now();
      for (let i = 0; i < playerCount; i++) {
        if (flyingOrder.indexOf(i) === -1) {
          btns[i].removeAttribute('disabled');
        } else {
          btns[i].setAttribute('disabled', 'disabled');
        }
      }
    }
  }, delay);
}

// ボタン生成時にクリックイベントを付与
function createButtons(count) {
  leftCol.innerHTML = '';
  rightCol.innerHTML = '';
  btns = [];
  ranks = [];
  results = [];
  digitsDivs = [];
  pressedFlags = Array(count).fill(false);
  times = Array(count).fill(null);
  flyingOrder = [];
  normalOrder = [];

  const leftCount = Math.ceil(count / 2);
  const rightCount = count - leftCount;

  for (let i = 0; i < leftCount; i++) {
    const idx = i;
    const btnCol = document.createElement('div');
    btnCol.className = 'btn-col';
    btnCol.id = 'btn-left';

    const rankDiv = document.createElement('div');
    rankDiv.className = 'rank';
    rankDiv.id = `rank${idx+1}`;
    btnCol.appendChild(rankDiv);
    ranks.push(rankDiv);

    const playerText = document.createElement('div');
    playerText.className = 'btn';
    playerText.textContent = `Player${idx+1}`;
    btnCol.appendChild(playerText);

    const resultDiv = document.createElement('div');
    resultDiv.className = 'result';
    resultDiv.id = `result${idx+1}`;
    btnCol.appendChild(resultDiv);
    results.push(resultDiv);

    const digitsDiv = document.createElement('div');
    digitsDiv.className = 'digits';
    digitsDiv.id = `digits${idx+1}`;
    btnCol.appendChild(digitsDiv);
    digitsDivs.push(digitsDiv);

    btnCol.onclick = () => onBtnClick(idx);
    leftCol.appendChild(btnCol);
    btns.push(btnCol);

    // ここからイベント追加

    btnCol.addEventListener('mousedown', () => onBtnClick(idx));
    btnCol.addEventListener('touchstart', (e) => {
      e.preventDefault(); // スクロール防止
      onBtnClick(idx);
    });
    leftCol.appendChild(btnCol);
    btns.push(btnCol);
  }

  for (let i = 0; i < rightCount; i++) {
    const idx = leftCount + i;
    const btnCol = document.createElement('div');
    btnCol.className = 'btn-col';
    btnCol.id = 'btn-right';

    const rankDiv = document.createElement('div');
    rankDiv.className = 'rank';
    rankDiv.id = `rank${idx+1}`;
    btnCol.appendChild(rankDiv);
    ranks.push(rankDiv);

    const playerText = document.createElement('div');
    playerText.className = 'btn';
    playerText.textContent = `Player${idx+1}`;
    btnCol.appendChild(playerText);

    const resultDiv = document.createElement('div');
    resultDiv.className = 'result';
    resultDiv.id = `result${idx+1}`;
    btnCol.appendChild(resultDiv);
    results.push(resultDiv);

    const digitsDiv = document.createElement('div');
    digitsDiv.className = 'digits';
    digitsDiv.id = `digits${idx+1}`;
    btnCol.appendChild(digitsDiv);
    digitsDivs.push(digitsDiv);

    btnCol.onclick = () => onBtnClick(idx);
    rightCol.appendChild(btnCol);
    btns.push(btnCol);

    // ここからイベント追加

    btnCol.addEventListener('mousedown', () => onBtnClick(idx));
    btnCol.addEventListener('touchstart', (e) => {
      e.preventDefault(); // スクロール防止
      onBtnClick(idx);
    });
    leftCol.appendChild(btnCol);
    btns.push(btnCol);
    
  }
}

// ゲームリセット
function reset() {
  timeText.style.visibility = 'hidden';
  waitingForStart = false;
  timerStarted = false;
  startTime = 0;
  pressedFlags = Array(playerCount).fill(false);
  times = Array(playerCount).fill(null);
  flyingOrder = [];
  normalOrder = [];
  for (let i = 0; i < playerCount; i++) {
    btns[i].setAttribute('disabled', 'disabled');
    ranks[i].textContent = '';
    results[i].textContent = '';
    if (digitsDivs[i]) digitsDivs[i].textContent = '';
  }
}

// プレイヤーボタン押下時
function onBtnClick(idx) {
  if (btns[idx].hasAttribute('disabled')) return;

  if (waitingForStart) {
    // フライング
    if (!pressedFlags[idx] && flyingOrder.indexOf(idx) === -1) {
      flyingOrder.push(idx);
      pressedFlags[idx] = true;
      btns[idx].setAttribute('disabled', 'disabled');
      const flyingRank = flyingOrder.length;
      ranks[idx].textContent = `お手つき${flyingRank}番目`;
      results[idx].textContent = "お手つき";
      checkAllPressed();
    }
  } else if (timerStarted) {
    // 通常
    if (!pressedFlags[idx] && flyingOrder.indexOf(idx) === -1) {
      normalOrder.push(idx);
      times[idx] = (performance.now() - startTime) / 1000;
      pressedFlags[idx] = true;
      btns[idx].setAttribute('disabled', 'disabled');
      results[idx].textContent = times[idx].toFixed(3) + "秒";
      const normalRank = normalOrder.length;
      ranks[idx].textContent = `${normalRank}位`;
      checkAllPressed();
    }
  }
}

// 全員押したら桁割り振り
function checkAllPressed() {
  if (pressedFlags.every(f => f)) {
    waitingForStart = false;
    timerStarted = false;
    assignDigitsToPlayers();
  }
}

// 数字入力制限
customNumber.addEventListener('input', function() {
  let value = this.value;
  if (value.length > 5) {
    this.value = value.slice(0, 5);
  }
  if (parseInt(this.value, 10) > 99999) {
    this.value = 99999;
  }
});

// 桁割り振りロジック
function assignDigitsToPlayers() {
  const numStr = (customNumberValue || "").replace(/\D/g, "");
  if (numStr.length === 0) {
    digitsDivs.forEach(div => div.textContent = '');
    return;
  }
  const digits = numStr.split(''); // 元の並び
  const m = digits.length;
  const n = playerCount;

  // 順位リスト: normalOrder（通常押し）→ flyingOrder（お手付き逆順）
  const flyingranklist = flyingOrder.slice().reverse();
  const rankList = [...normalOrder, ...flyingranklist];

  // 桁数の割り振り計算（余りは上位から多く持つ）
  const base = Math.floor(m / n);
  const extra = m % n;

  let pos = 0;
  for (let i = 0; i < n; i++) {
    const playerIdx = rankList[i];
    const take = base + (i < extra ? 1 : 0);

    // 割り振り対象の元のインデックスを取得（逆順割り振りなので）
    const indices = [];
    for (let k = pos; k < pos + take; k++) {
      if (k < m) indices.push(m - 1 - k); // 0始まり
    }

    // 桁ごとに合成（元の位の重みで計算）
    let playerNum = 0;
    for (const idx of indices) {
      const digit = parseInt(digits[idx], 10);
      const place = Math.pow(10, m - 1 - idx);
      playerNum += digit * place;
    }

    digitsDivs[playerIdx].textContent = (take === 0 || isNaN(playerNum)) ? '0' : playerNum.toString();
    pos += take;
  }
}