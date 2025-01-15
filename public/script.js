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
    {
      id: 5,
      text: "お名前を入力してください",
      inputType: "text", // 名前入力を表示
    },
    {
      id: 6,
      text: "質問や要望があればご記入ください（任意）",
      inputType: "textarea", // 質問・要望の自由記入
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
        <p>近日中にお電話を差し上げますので、今しばらくお待ちください。</p>
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
    } else if (question.inputType) {
      // 入力フィールド（リッチなスタイル）
      const inputContainer = document.createElement("div");
      inputContainer.className = "input-container";

      const inputField = document.createElement(
        question.inputType === "textarea" ? "textarea" : "input"
      );
      if (question.inputType === "textarea") {
        inputField.rows = 4; // テキストエリアの行数
      } else {
        inputField.type = question.inputType;
        inputField.placeholder =
          question.inputType === "tel"
            ? "＊ハイフンなしで入力してください。"
            : "入力してください";
      }
      inputField.className = "input-field";

      const submitButton = document.createElement("button");
      submitButton.textContent = "次へ";
      submitButton.className = "button";

      submitButton.addEventListener("click", () => {
        const value = inputField.value.trim();

        // 必須チェック（質問や要望は空欄OK）
        if (question.inputType !== "textarea" && value === "") {
          alert(`${question.text}を入力してください。`);
          return;
        }

        // 電話番号の場合の桁数検証
        if (question.inputType === "tel") {
          const isValidPhoneNumber = /^\d{10,11}$/.test(value);
          if (!isValidPhoneNumber) {
            alert("電話番号は10桁または11桁の数字で入力してください。");
            return;
          }
        }

        answers[question.text] = value || "なし"; // 空の場合は「なし」と記録
        showQuestion(step + 1); // 次の質問へ
      });

      inputContainer.appendChild(inputField);
      inputContainer.appendChild(submitButton);
      container.appendChild(inputContainer);
    }
  }

  showQuestion(currentStep); // 最初の質問を表示
});
