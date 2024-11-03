var nodemailer = require("nodemailer");

interface ISendCodeAuthentication {
  email: string;
  code: string;
}

export default class UserNodemailer {
  private constructor() {}

  public static build() {
    return new UserNodemailer();
  }

  public async sendCodeAuthentication({
    email,
    code,
  }: ISendCodeAuthentication) {
    const transporter = nodemailer.createTransport({
      host: "smtp.gmail.com",
      port: 587,
      secure: false,
      auth: {
        user: process.env["USER_NODEMAILER"],
        pass: process.env["PASS_NODEMAILER"],
      },
    });

    const mailOptions = {
      from: process.env["USER_NODEMAILER"],
      to: email,
      subject: "Autenticação de conta",
      text: `Código: ${code}`,
    };

    const info = await transporter.sendMail(mailOptions);

    if (info) {
      console.log("Email sent: " + info.response);
    } else {
      console.log("Error:", info);
    }
  }
}
