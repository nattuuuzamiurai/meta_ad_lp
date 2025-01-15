document.addEventListener("DOMContentLoaded", () => {
  const questions = [
    {
      id: 1,
      text: "お住まいの地域を教えてください",
      options: ["久留米市", "筑紫野市", "福岡市", "その他"],
    },
    { id: 2, text: "運転免許をお持ちですか？", options: ["はい", "いいえ"] },
    {
      id: 3,
      text: "お問い合わせ内容を教えてください",
      options: ["仕事内容について", "収入について", "その他"],
    },
  ];

  let currentStep = 0;
  const answers = [];
  const container = document.getElementById("question-container");

  function showQuestion(step) {
    container.innerHTML = ""; // 現在の質問をクリア

    if (step >= questions.length) {
      // 最後の質問が終わったら
      container.innerHTML = `
        <h2>お問い合わせありがとうございます！</h2>
        <p>以下の内容でお問い合わせを受け付けました:</p>
        <ul>
          ${answers
            .map(
              (answer, index) => `<li>${questions[index].text}: ${answer}</li>`
            )
            .join("")}
        </ul>
        <button class="button" onclick="location.reload()">やり直す</button>
      `;
      return;
    }

    // 質問テキスト
    const questionText = document.createElement("h2");
    questionText.textContent = questions[step].text;
    container.appendChild(questionText);

    // 選択肢を表示（カード形式）
    questions[step].options.forEach((option) => {
      const optionElement = document.createElement("div");
      optionElement.className = "option";
      optionElement.textContent = option;
      optionElement.addEventListener("click", () => {
        answers[step] = option; // 回答を記録
        showQuestion(step + 1); // 次の質問へ
      });
      container.appendChild(optionElement);
    });
  }

  showQuestion(currentStep); // 最初の質問を表示
});
