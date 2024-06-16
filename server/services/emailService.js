// emailService.js
import nodemailer from "nodemailer";
import { signupEmail } from "./signupEmail.js";
import { majorGoaladded } from "./majorGoaladded.js";
const transporter = nodemailer.createTransport({
  service: "gmail", // e.g., 'gmail', 'yahoo', 'hotmail'
  auth: {
    user: "gsmfurqan@gmail.com",
    pass: "lutx japc ngrk djbs", // You may need to generate an app-specific password
  },
});

export const sendWelcomeEmail = (to, name) => {
  const mailOptions = {
    from: "gsmfurqan@gmail.com",
    to: to,
    subject: "Welcome to Our Service",
    text: `Hello ${name}, welcome to your Goal Tracker!`,
    html: signupEmail(name),
  };

  transporter.sendMail(mailOptions, (error, info) => {
    if (error) {
      console.log("Error sending email:", error);
    } else {
      console.log("Email sent:", info.response);
    }
  });
};
export const sendGoalAddedEmail = (to, name, title, dueDate, note) => {
  const mailOptions = {
    from: "gsmfurqan@gmail.com",
    to: to,
    subject: "New Goal Added to the List",
    text: `Hello ${name}, welcome to your Goal Tracker!`,
    html: majorGoaladded(name, title, note, dueDate),
  };

  transporter.sendMail(mailOptions, (error, info) => {
    if (error) {
      console.log("Error sending email:", error);
    } else {
      console.log("Email sent:", info.response);
    }
  });
};
