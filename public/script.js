document.addEventListener("DOMContentLoaded", () => {
  // 質問の内容を定義
  const questions = [
    {
      id: 1,
      text: "お住まいの地域を教えてください",
      options: [
        "久留米市",
        "筑紫野市",
        "小郡市",
        "大野城市",
        "太宰府市",
        "その他",
      ],
    },
    {
      id: 2,
      text: "年齢を教えてください",
      options: ["18-24歳", "25-34歳", "35-44歳", "45-54歳", "55歳以上"],
    },
    {
      id: 3,
      text: "電話番号を入力してください",
      inputType: "tel", // 電話番号入力を表示
    },
    {
      id: 4,
      text: "軽バンのレンタルが必要ですか？",
      options: ["必要", "不要"],
    },
  ];

  let currentStep = 0; // 現在のステップ
  const answers = {}; // 回答を記録するオブジェクト
  const container = document.getElementById("question-container");

  // 質問を表示する関数
  function showQuestion(step) {
    container.innerHTML = ""; // コンテナをクリア

    if (step >= questions.length) {
      // 最後の質問が終わったら
      container.innerHTML = `
        <h2>お問い合わせありがとうございます！</h2>
        <p>以下の内容でお問い合わせを受け付けました:</p>
        <ul>
          ${Object.entries(answers)
            .map(([key, value]) => `<li>${key}: ${value}</li>`)
            .join("")}
        </ul>
        <button class="button" onclick="location.reload()">やり直す</button>
      `;
      return;
    }

    // 現在の質問を取得
    const question = questions[step];

    // 質問テキスト
    const questionText = document.createElement("h2");
    questionText.textContent = question.text;
    container.appendChild(questionText);

    // 選択肢または入力フィールドを表示
    if (question.options) {
      // 選択肢を表示
      question.options.forEach((option) => {
        const optionElement = document.createElement("div");
        optionElement.className = "option";
        optionElement.textContent = option;
        optionElement.addEventListener("click", () => {
          answers[question.text] = option; // 回答を記録
          showQuestion(step + 1); // 次の質問へ
        });
        container.appendChild(optionElement);
      });
    } else if (question.inputType === "tel") {
      // 電話番号入力フィールドをリッチなスタイルで表示
      const inputContainer = document.createElement("div");
      inputContainer.className = "input-container";

      const inputField = document.createElement("input");
      inputField.type = "tel";
      inputField.placeholder = "＊ハイフンなしで入力してください。";
      inputField.className = "input-field";

      const submitButton = document.createElement("button");
      submitButton.textContent = "次へ";
      submitButton.className = "button";

      submitButton.addEventListener("click", () => {
        if (inputField.value.trim() === "") {
          alert("電話番号を入力してください。");
          return;
        }
        answers[question.text] = inputField.value; // 入力値を記録
        showQuestion(step + 1); // 次の質問へ
      });

      inputContainer.appendChild(inputField);
      inputContainer.appendChild(submitButton);
      container.appendChild(inputContainer);
    }
  }

  showQuestion(currentStep); // 最初の質問を表示
});
