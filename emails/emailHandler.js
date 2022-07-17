const sgMail = require("@sendgrid/mail");

const sendGridAPIKey =
  "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";

sgMail.setApiKey(sendGridAPIKey);

exports.sendWelcomeEmail = (userEmail, userName) => {
  sgMail.send({
    to: userEmail,
    from: "ahmedibrahim9629@gmail.com",
    subject: "Thanks for joining in!",
    text: `Welcome to the app, ${userName}!\n\tLet me show you how to use the App:`,
  });
};
