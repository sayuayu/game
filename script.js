// ============================================================
// ============================================================
//  共通：ゲーム選択画面
// ============================================================
// ============================================================

const menuScreen =
  document.getElementById('menuScreen');

const game1InputScreen =
  document.getElementById('game1SetupPage');

const game1Screen =
  document.getElementById('game1Page');

const game2InputScreen =
  document.getElementById('game2InputScreen');

const game2Screen =
  document.getElementById('game2Screen');

const game1Button =
  document.getElementById('game1Button');

const game2Button =
  document.getElementById('game2Button');

const game1BackButton =
  document.getElementById('game1BackButton');

const game2BackButton =
  document.getElementById('game2BackButton');


// ============================================================
// 共通：画面切り替え
// ============================================================

function hideAllScreens() {

  if (menuScreen) {
    menuScreen.classList.add('hidden');
  }

  if (game1InputScreen) {
    game1InputScreen.classList.add('hidden');
  }

   if (game1Screen) {
    game1Screen.classList.add('hidden');
  }

  if (game2InputScreen) {
    game2InputScreen.classList.add('hidden');
  }

  if (game2Screen) {
    game2Screen.classList.add('hidden');
  }
}


// ============================================================
// ゲーム1選択
// ============================================================

if (game1Button) {

  game1Button.addEventListener('click', function () {

    hideAllScreens();

    if (game1InputScreen) {
      game1InputScreen.classList.remove('hidden');
    }

   
    window.scrollTo({
      top: 0,
      behavior: 'smooth'
    });

  });

}


// ============================================================
// ゲーム2選択
// ============================================================

if (game2Button) {

  game2Button.addEventListener('click', function () {

    hideAllScreens();

    if (game2InputScreen) {
      game2InputScreen.classList.remove('hidden');
    }

    window.scrollTo({
      top: 0,
      behavior: 'smooth'
    });

  });

}


// ============================================================
// ゲーム1 → ゲーム選択
// ============================================================

if (game1BackButton) {

  game1BackButton.addEventListener('click', function () {

    hideAllScreens();

    if (menuScreen) {
      menuScreen.classList.remove('hidden');
    }

    window.scrollTo({
      top: 0,
      behavior: 'smooth'
    });

  });

}


// ============================================================
// ゲーム2 → ゲーム選択
// ============================================================

if (game2BackButton) {

  game2BackButton.addEventListener('click', function () {

    hideAllScreens();

    if (menuScreen) {
      menuScreen.classList.remove('hidden');
    }

    window.scrollTo({
      top: 0,
      behavior: 'smooth'
    });

  });

}


// ============================================================
// ============================================================
//  ゲーム1
// ============================================================
// ============================================================


// ============================================================
// ゲーム1：最大人数
// ============================================================

const MAX_PLAYERS = 6;


// ============================================================
// ゲーム1：ゲーム状態管理
// ============================================================

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


// ============================================================
// ゲーム1：ページ要素追加取得
// ============================================================


//const gamePage =
//  document.getElementById('game1Page');

const setupForm =
  document.getElementById('setupForm');

const playerCountSelect =
  document.getElementById('playerCount');

const customNumber =
  document.getElementById('customNumber');

const backToSetupBtn =
  document.getElementById('backToSetupBtn');

const leftCol =
  document.getElementById('leftCol');

const rightCol =
  document.getElementById('rightCol');

const timeText =
  document.getElementById('timeText');



// ============================================================
// ゲーム1：ゲーム画面表示
// ============================================================

function showGame1Page() {

  if (game1InputScreen) {
    game1InputScreen.classList.add('hidden');
  }

  if (game1Screen) {
    game1Screen.classList.remove('hidden');
  }
}

// ============================================================
// ゲーム1：ゲーム画面 → 設定画面
// ============================================================

if (backToSetupBtn) {

  backToSetupBtn.addEventListener('click', function () {

    hideAllScreens();

    if (game1InputScreen) {
      game1InputScreen.classList.remove('hidden');
    }

   
    window.scrollTo({
      top: 0,
      behavior: 'smooth'
    });

  });

}



// ============================================================
// ゲーム1：設定画面 → ゲーム画面
// ============================================================

if (setupForm) {

  setupForm.addEventListener('submit', function (e) {

    e.preventDefault();

  


    // ------------------------------------------
    // 人数
    // ------------------------------------------

    playerCount =
      parseInt(
        playerCountSelect.value,
        10
      );

    
    // ------------------------------------------
    // 金額
    // ------------------------------------------

    customNumberValue =
      customNumber.value;

   
    // ------------------------------------------
    // ボタン生成
    // ------------------------------------------

    createButtons(playerCount);


    // ------------------------------------------
    // ゲーム画面表示
    // ------------------------------------------
   
    showGame1Page();


    // ------------------------------------------
    // リセット
    // ------------------------------------------

    reset();


    // ------------------------------------------
    // ゲーム開始
    // ------------------------------------------

    startGame();

  });

}





// ============================================================
// ゲーム1：ゲーム開始
// ============================================================

function startGame() {

  waitingForStart = true;


  for (
    let i = 0;
    i < playerCount;
    i++
  ) {

    if (btns[i]) {

      btns[i].removeAttribute(
        'disabled'
      );

    }

  }


  if (timeText) {

    timeText.style.visibility =
      'hidden';

  }


  // ------------------------------------------
  // 3～18秒後にスタート
  // ------------------------------------------

  const delay =
    Math.random() * 15000 + 3000;


  setTimeout(function () {

    if (waitingForStart) {

      waitingForStart = false;

      timerStarted = true;

      if (timeText) {

        timeText.style.visibility =
          'visible';

      }


      startTime =
        performance.now();


      for (
        let i = 0;
        i < playerCount;
        i++
      ) {

        if (!btns[i]) {
          continue;
        }


        if (
          flyingOrder.indexOf(i) === -1
        ) {

          btns[i].removeAttribute(
            'disabled'
          );

        } else {

          btns[i].setAttribute(
            'disabled',
            'disabled'
          );

        }

      }

    }

  }, delay);

}


// ============================================================
// ゲーム1：プレイヤーボタン生成
// ============================================================

function createButtons(count) {

  if (!leftCol || !rightCol) {
    return;
  }


  leftCol.innerHTML = '';

  rightCol.innerHTML = '';


  btns = [];

  ranks = [];

  results = [];

  digitsDivs = [];


  pressedFlags =
    Array(count).fill(false);

  times =
    Array(count).fill(null);


  flyingOrder = [];

  normalOrder = [];


  const leftCount =
    Math.ceil(count / 2);

  const rightCount =
    count - leftCount;


  // ==================================================
  // 左側
  // ==================================================

  for (
    let i = 0;
    i < leftCount;
    i++
  ) {

    const idx = i;


    const btnCol =
      createPlayerButton(idx);


    leftCol.appendChild(btnCol);

    btns.push(btnCol);

  }


  // ==================================================
  // 右側
  // ==================================================

  for (
    let i = 0;
    i < rightCount;
    i++
  ) {

    const idx =
      leftCount + i;


    const btnCol =
      createPlayerButton(idx);


    rightCol.appendChild(btnCol);

    btns.push(btnCol);

  }

}


// ============================================================
// ゲーム1：プレイヤーボタン1個を作成
// ============================================================

function createPlayerButton(idx) {

  const btnCol =
    document.createElement('div');


  btnCol.className =
    'btn-col';


  if (
    idx <
    Math.ceil(playerCount / 2)
  ) {

    btnCol.id =
      'btn-left';

  } else {

    btnCol.id =
      'btn-right';

  }


  // ------------------------------------------
  // 順位
  // ------------------------------------------

  const rankDiv =
    document.createElement('div');

  rankDiv.className =
    'rank';

  rankDiv.id =
    `rank${idx + 1}`;


  btnCol.appendChild(
    rankDiv
  );


  ranks.push(
    rankDiv
  );


  // ------------------------------------------
  // プレイヤーボタン
  // ------------------------------------------

  const playerText =
    document.createElement('div');

  playerText.className =
    'btn';

  playerText.textContent =
    `Player${idx + 1}`;


  btnCol.appendChild(
    playerText
  );


  // ------------------------------------------
  // 結果
  // ------------------------------------------

  const resultDiv =
    document.createElement('div');

  resultDiv.className =
    'result';

  resultDiv.id =
    `result${idx + 1}`;


  btnCol.appendChild(
    resultDiv
  );


  results.push(
    resultDiv
  );


  // ------------------------------------------
  // 桁
  // ------------------------------------------

  const digitsDiv =
    document.createElement('div');

  digitsDiv.className =
    'digits';

  digitsDiv.id =
    `digits${idx + 1}`;


  btnCol.appendChild(
    digitsDiv
  );


  digitsDivs.push(
    digitsDiv
  );


  // ------------------------------------------
  // マウス操作
  // ------------------------------------------

  btnCol.addEventListener(
    'mousedown',
    function () {

      onBtnClick(idx);

    }
  );


  // ------------------------------------------
  // タッチ操作
  // ------------------------------------------

  btnCol.addEventListener(
    'touchstart',
    function () {

      onBtnClick(idx);

    }
  );


  return btnCol;

}


// ============================================================
// ゲーム1：リセット
// ============================================================

function reset() {

  if (timeText) {

    timeText.style.visibility =
      'hidden';

  }


  waitingForStart =
    false;

  timerStarted =
    false;

  startTime =
    0;


  pressedFlags =
    Array(playerCount).fill(false);

  times =
    Array(playerCount).fill(null);


  flyingOrder = [];

  normalOrder = [];


  for (
    let i = 0;
    i < playerCount;
    i++
  ) {

    if (btns[i]) {

      btns[i].setAttribute(
        'disabled',
        'disabled'
      );

    }


    if (ranks[i]) {

      ranks[i].textContent =
        '';

    }


    if (results[i]) {

      results[i].textContent =
        '';

    }


    if (digitsDivs[i]) {

      digitsDivs[i].textContent =
        '';

    }

  }

}


// ============================================================
// ゲーム1：プレイヤーボタン押下
// ============================================================

function onBtnClick(idx) {

  if (!btns[idx]) {
    return;
  }


  if (
    btns[idx].hasAttribute(
      'disabled'
    )
  ) {

    return;

  }


  // ==================================================
  // フライング
  // ==================================================

  if (waitingForStart) {

    if (
      !pressedFlags[idx] &&
      flyingOrder.indexOf(idx) === -1
    ) {

      flyingOrder.push(idx);

      pressedFlags[idx] =
        true;


      btns[idx].setAttribute(
        'disabled',
        'disabled'
      );


      const flyingRank =
        flyingOrder.length;


      ranks[idx].textContent =
        `フライング(${flyingRank})`;


      results[idx].textContent =
        'お手つき';


      checkAllPressed();

    }

  }


  // ==================================================
  // 通常
  // ==================================================

  else if (timerStarted) {

    if (
      !pressedFlags[idx] &&
      flyingOrder.indexOf(idx) === -1
    ) {

      normalOrder.push(idx);


      times[idx] =
        (
          performance.now() -
          startTime
        ) / 1000;


      pressedFlags[idx] =
        true;


      btns[idx].setAttribute(
        'disabled',
        'disabled'
      );


      results[idx].textContent =
        times[idx].toFixed(3) +
        '秒';


      const normalRank =
        normalOrder.length;


      ranks[idx].textContent =
        `${normalRank}位`;


      checkAllPressed();

    }

  }

}


// ============================================================
// ゲーム1：全員押したか確認
// ============================================================

function checkAllPressed() {

  if (
    pressedFlags.every(
      function (f) {
        return f;
      }
    )
  ) {

    waitingForStart =
      false;

    timerStarted =
      false;


    assignDigitsToPlayers();

  }

}


// ============================================================
// ゲーム1：数字入力制限
// ============================================================

if (customNumber) {

  customNumber.addEventListener(
    'input',
    function () {

      let value =
        this.value;


      if (value.length > 5) {

        this.value =
          value.slice(0, 5);

      }


      if (
        parseInt(
          this.value,
          10
        ) > 99999
      ) {

        this.value =
          99999;

      }

    }
  );

}


// ============================================================
// ゲーム1：桁割り振り
// ============================================================

function assignDigitsToPlayers() {

  const numStr =
    (
      customNumberValue || ''
    ).replace(
      /\D/g,
      ''
    );


  if (numStr.length === 0) {

    digitsDivs.forEach(
      function (div) {

        div.textContent =
          '';

      }
    );

    return;

  }


  const digits =
    numStr.split('');


  const m =
    digits.length;

  const n =
    playerCount;


  // ------------------------------------------
  // 順位リスト
  //
  // 通常押し
  // ↓
  // フライング逆順
  // ------------------------------------------

  const flyingRankList =
    flyingOrder
      .slice()
      .reverse();


  const rankList =
    [
      ...normalOrder,
      ...flyingRankList
    ];


  // ------------------------------------------
  // 桁数の割り振り
  // ------------------------------------------

  const base =
    Math.floor(
      m / n
    );


  const extra =
    m % n;


  let pos = 0;


  for (
    let i = 0;
    i < n;
    i++
  ) {

    const playerIdx =
      rankList[i];


    if (
      playerIdx === undefined
    ) {

      continue;

    }


    const take =
      base +
      (
        i < extra
          ? 1
          : 0
      );


    // ----------------------------------------
    // 割り振る桁のインデックス
    // ----------------------------------------

    const indices = [];


    for (
      let k = pos;
      k < pos + take;
      k++
    ) {

      if (k < m) {

        indices.push(
          m - 1 - k
        );

      }

    }


    // ----------------------------------------
    // 数値計算
    // ----------------------------------------

    let playerNum = 0;


    for (
      const idx of indices
    ) {

      const digit =
        parseInt(
          digits[idx],
          10
        );


      const place =
        Math.pow(
          10,
          m - 1 - idx
        );


      playerNum +=
        digit * place;

    }


    if (digitsDivs[playerIdx]) {

      digitsDivs[playerIdx].textContent =
        (
          take === 0 ||
          isNaN(playerNum)
        )
          ? '0'
          : playerNum.toString();

    }


    pos += take;

  }

}


// ============================================================
// ============================================================
//  ゲーム2：会計計算ゲーム
// ============================================================
// ============================================================


// ============================================================
// ゲーム2：入力画面要素
// ============================================================

const participantCountInput =
  document.getElementById(
    'participantCount'
  );

const participantsContainer =
  document.getElementById(
    'participants'
  );

const totalAmountInput =
  document.getElementById(
    'totalAmount'
  );

const startButton =
  document.getElementById(
    'startButton'
  );

const errorMessage =
  document.getElementById(
    'errorMessage'
  );


// ============================================================
// ゲーム2：ゲーム画面要素
// ============================================================

const digitContainer =
  document.getElementById(
    'digitContainer'
  );

const actionButton =
  document.getElementById(
    'actionButton'
  );

const resultScreen =
  document.getElementById(
    'resultScreen'
  );

const resultList =
  document.getElementById(
    'resultList'
  );


// ============================================================
// ゲーム2：ゲームデータ
// ============================================================

let game2Data = null;


// 現在抽選中の桁

let currentDigitIndex = 0;


// 桁データ

let digitData = [];


// ============================================================
// ゲーム2：参加人数変更
// ============================================================

if (participantCountInput) {

  participantCountInput.addEventListener(
    'input',
    createParticipantInputs
  );

}


// ============================================================
// ゲーム2：参加者入力欄作成
// ============================================================

function createParticipantInputs() {

  if (!participantCountInput ||
      !participantsContainer) {

    return;

  }


  const count =
    Number(
      participantCountInput.value
    );


  participantsContainer.innerHTML =
    '';


  if (count < 1) {
    return;
  }


  for (
    let i = 1;
    i <= count;
    i++
  ) {

    const wrapper =
      document.createElement(
        'div'
      );


    wrapper.className =
      'participant-item';


    // ------------------------------------------
    // 人数表示
    // ------------------------------------------

    const label =
      document.createElement(
        'span'
      );


    label.className =
      'participant-label';


    label.textContent =
      `${i}人目`;


    // ------------------------------------------
    // 名前入力
    // ------------------------------------------

    const input =
      document.createElement(
        'input'
      );


    input.type =
      'text';


    input.className =
      'participant-name';


    input.placeholder =
      `参加者${i}の名前`;


    wrapper.appendChild(
      label
    );


    wrapper.appendChild(
      input
    );


    participantsContainer.appendChild(
      wrapper
    );

  }

}


// ============================================================
// ゲーム2：開始ボタン
// ============================================================

if (startButton) {

  startButton.addEventListener(
    'click',
    startGame2
  );

}


// ============================================================
// ゲーム2：ゲーム開始
// ============================================================

function startGame2() {

  clearGame2Error();


  if (
    !participantCountInput ||
    !totalAmountInput
  ) {

    return;

  }


  // ------------------------------------------
  // 参加人数
  // ------------------------------------------

  const participantCount =
    Number(
      participantCountInput.value
    );


  // ------------------------------------------
  // 合計金額
  // ------------------------------------------

  const totalAmount =
    Number(
      totalAmountInput.value
    );


  // ==================================================
  // 入力チェック
  // ==================================================

  if (
    participantCount < 2 ||
    participantCount > 20
  ) {

    showGame2Error(
      '参加人数は2〜20人で入力してください。'
    );

    return;

  }


  if (
    !Number.isInteger(totalAmount) ||
    totalAmount <= 0
  ) {

    showGame2Error(
      '合計金額を正しく入力してください。'
    );

    return;

  }


  // ==================================================
  // 名前取得
  // ==================================================

  const nameInputs =
    document.querySelectorAll(
      '.participant-name'
    );


  const participants = [];


  for (
    const input of nameInputs
  ) {

    const name =
      input.value.trim();


    if (!name) {

      showGame2Error(
        '参加者全員の名前を入力してください。'
      );

      return;

    }


    participants.push(
      name
    );

  }


  // ==================================================
  // 同名チェック
  // ==================================================

  //const uniqueNames =
  //  new Set(
  //    participants
  //  );


  //if (
  //  uniqueNames.size !==
  //  participants.length
  //) {

  //  showGame2Error(
  //    '参加者名は重複しないようにしてください。'
  //  );

  //  return;

  //}


  // ==================================================
  // ゲームデータ保存
  // ==================================================

  game2Data = {

    totalAmount:
      totalAmount,

    participants:
      participants

  };


  // ==================================================
  // 状態リセット
  // ==================================================

  currentDigitIndex =
    0;


  digitData =
    [];


  if (digitContainer) {

    digitContainer.innerHTML =
      '';

  }


  if (resultList) {

    resultList.innerHTML =
      '';

  }


  if (resultScreen) {

    resultScreen.classList.add(
      'hidden'
    );

  }


  if (actionButton) {

    actionButton.disabled =
      false;

    actionButton.textContent =
      'スタート';

  }


  // ==================================================
  // 金額を1桁ずつ生成
  // ==================================================

  const amountString =
    String(
      totalAmount
    );


  for (
    let i = 0;
    i < amountString.length;
    i++
  ) {

    const digit =
      Number(
        amountString[i]
      );


    // ------------------------------------------
    // 桁の重み
    //
    // 1234
    //
    // 1 → 1000
    // 2 → 100
    // 3 → 10
    // 4 → 1
    // ------------------------------------------

    const position =
      amountString.length -
      i -
      1;


    const placeValue =
      Math.pow(
        10,
        position
      );


    // ------------------------------------------
    // 桁のボックス
    // ------------------------------------------

    const digitBox =
      document.createElement(
        'div'
      );


    digitBox.className =
      'digit-box';


    // ------------------------------------------
    // 数字
    // ------------------------------------------

    const numberElement =
      document.createElement(
        'div'
      );


    numberElement.className =
      'digit-number';


    numberElement.textContent =
      digit;


    // ------------------------------------------
    // 参加者名
    // ------------------------------------------

    const nameElement =
      document.createElement(
        'div'
      );


    nameElement.className =
      'digit-name';


    //nameElement.textContent =
    //  '？';


    digitBox.appendChild(
      numberElement
    );


    digitBox.appendChild(
      nameElement
    );


    if (digitContainer) {

      digitContainer.appendChild(
        digitBox
      );


    }


    // ------------------------------------------
    // データ保存
    // ------------------------------------------

    digitData.push({

      digit:
        digit,

      placeValue:
        placeValue,

      element:
        nameElement,

      selectedParticipant:
        null

    });

  }


  // ==================================================
  // 抽選順を反転
  //
  // 表示：
  //
  // 1 2 3 4
  //
  // 抽選：
  //
  // 4 → 3 → 2 → 1
  //
  // 一の位から抽選
  // ==================================================

  digitData.reverse();


  // ==================================================
  // ゲーム2入力画面 → ゲーム画面
  // ==================================================

  if (game2InputScreen) {

    game2InputScreen.classList.add(
      'hidden'
    );

  }


  if (game2Screen) {

    game2Screen.classList.remove(
      'hidden'
    );

  }


  window.scrollTo({
    top: 0,
    behavior: 'smooth'
  });

}


// ============================================================
// ゲーム2：アクションボタン
// ============================================================

if (actionButton) {

  actionButton.addEventListener(
    'mouseup',
    executeGame2Action
  );

}


// ============================================================
// ゲーム2：アクション処理
// ============================================================

function executeGame2Action() {

  // ------------------------------------------
  // まだ抽選が残っている
  // ------------------------------------------

  if (
    currentDigitIndex <
    digitData.length
  ) {

    drawGame2Participant();

    return;

  }


  // ------------------------------------------
  // 全桁抽選済み
  // ------------------------------------------

  showGame2Result();

}


// ============================================================
// ゲーム2：参加者抽選
// ============================================================

function drawGame2Participant() {

  const currentDigit =
    digitData[
      currentDigitIndex
    ];


  if (!currentDigit) {
    return;
  }


  // ==================================================
  // ランダム選出
  //
  // 重複あり
  // ==================================================

  const randomIndex =
    Math.floor(
      Math.random() *
      game2Data.participants.length
    );


  const selectedParticipant =
    game2Data.participants[
      randomIndex
    ];


  // ==================================================
  // 保存
  // ==================================================

  currentDigit.selectedParticipant =
    selectedParticipant;


  // ==================================================
  // 画面表示
  //
  // CSSの
  //
  // writing-mode:
  // vertical-rl;
  //
  // によって縦書きになる
  // ==================================================

  currentDigit.element.textContent =
    "↑"+selectedParticipant;


  // ==================================================
  // 次の桁
  // ==================================================

  currentDigitIndex++;


  // ==================================================
  // 全桁終了
  // ==================================================

  if (
    currentDigitIndex >=
    digitData.length
  ) {

    actionButton.textContent =
      '結果を見る';

  }

}


// ============================================================
// ゲーム2：リザルト
// ============================================================

function showGame2Result() {

  if (
    !game2Data ||
    !resultList
  ) {

    return;

  }


  const results = {};


  // ==================================================
  // 全員0円
  // ==================================================

  game2Data.participants.forEach(
    function (participant) {

      results[participant] =
        0;

    }
  );


  // ==================================================
  // 各桁を集計
  // ==================================================

  digitData.forEach(
    function (digit) {

      const participant =
        digit.selectedParticipant;


      if (!participant) {
        return;
      }


      const amount =
        digit.digit *
        digit.placeValue;


      results[participant] +=
        amount;

    }
  );


  // ==================================================
  // リザルト画面作成
  // ==================================================

  resultList.innerHTML =
    '';


  game2Data.participants.forEach(
    function (participant) {

      const resultItem =
        document.createElement(
          'div'
        );


      resultItem.className =
        'result-item';


      // ----------------------------------------
      // 名前
      // ----------------------------------------

      const name =
        document.createElement(
          'span'
        );


      name.textContent =
        participant;


      // ----------------------------------------
      // 金額
      // ----------------------------------------

      const amount =
        document.createElement(
          'strong'
        );


      amount.textContent =
        formatGame2Currency(
          results[participant]
        );


      resultItem.appendChild(
        name
      );


      resultItem.appendChild(
        amount
      );


      resultList.appendChild(
        resultItem
      );

    }
  );


  // ==================================================
  // リザルト表示
  // ==================================================

  if (resultScreen) {

    resultScreen.classList.remove(
      'hidden'
    );

  }


  // ==================================================
  // ボタン無効化
  // ==================================================

  if (actionButton) {

    actionButton.disabled =
      true;

    actionButton.textContent =
      'ゲーム終了';

  }

}


// ============================================================
// ゲーム2：金額フォーマット
// ============================================================

function formatGame2Currency(amount) {

  return new Intl.NumberFormat(
    'ja-JP',
    {
      style: 'currency',
      currency: 'JPY',
      maximumFractionDigits: 0
    }
  ).format(amount);

}


// ============================================================
// ゲーム2：エラー
// ============================================================

function showGame2Error(message) {

  if (errorMessage) {

    errorMessage.textContent =
      message;

  }

}


function clearGame2Error() {

  if (errorMessage) {

    errorMessage.textContent =
      '';

  }

}


// ============================================================
// ============================================================
//  初期化
// ============================================================
// ============================================================


// ------------------------------------------------------------
// ゲーム2の参加者入力欄
// ------------------------------------------------------------

createParticipantInputs();


// ------------------------------------------------------------
// 初期状態
//
// ゲーム選択画面を表示
// ------------------------------------------------------------

if (menuScreen) {

  menuScreen.classList.remove(
    'hidden'
  );

}


if (game1InputScreen) {

  game1InputScreen.classList.add(
    'hidden'
  );

}


if (game2InputScreen) {

  game2InputScreen.classList.add(
    'hidden'
  );

}


if (game2Screen) {

  game2Screen.classList.add(
    'hidden'
  );

}
