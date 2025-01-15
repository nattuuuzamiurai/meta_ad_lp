const functions = require("firebase-functions");
const nodemailer = require("nodemailer");

const transporter = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: "your-email@gmail.com",
    pass: "your-email-password",
  },
});

exports.sendApplication = functions.https.onRequest((req, res) => {
  const { name, email, message } = req.body;

  const mailOptions = {
    from: "your-email@gmail.com",
    to: "target-email@example.com",
    subject: "新しい応募が届きました",
    text: `応募者情報:\n名前: ${name}\nメール: ${email}\nメッセージ: ${message}`,
  };

  transporter.sendMail(mailOptions, (err, info) => {
    if (err) {
      console.error(err);
      return res.status(500).send("メールの送信に失敗しました");
    }
    res.status(200).send("応募が送信されました");
  });
});
