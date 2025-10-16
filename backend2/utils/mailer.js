const nodemailer = require("nodemailer");

const sendMail = async (to, subject, text) => {
  try {
    const transporter = nodemailer.createTransport({
      service: "gmail",
      auth: {
        user: "mehak28042005@gmail.com",
        pass: "rhxlmmrtfexqfhho", // app password
      },
    });

    const mailOptions = {
      from: "mehak28042005@gmail.com",
      to,
      subject,
      text,
    };

    await transporter.sendMail(mailOptions);
    console.log("✅ Email sent to", to);
  } catch (err) {
    console.error("❌ Email error:", err);
  }
};

module.exports = sendMail;
