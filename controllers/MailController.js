const { createTransport } = require("nodemailer");
const MailController = (req, res) => {
  if (req.headers.authorization != process.env.AUTH) {
    return res.status(403).json({
      code: 403,
      message: "Unauthorized access token",
    });
  }

  if (!req.body["message"]) {
    return res.status(400).json({
      code: 400,
      message: "Invalid request body",
    });
  }

  const transporter = createTransport({
    host: process.env.MAIL_HOST,
    port: process.env.SMTP_PORT,
    secure: true,
    tls: {
      servername: process.env.MAIL_HOST,
    },
    auth: {
      user: process.env.MAIL_USER,
      pass: process.env.MAIL_PASSWORD,
    },
  });

  try {
    transporter.sendMail(
      {
        from: process.env.MAIL_USER,
        to: [process.env.MAIL_USER],
        subject: "[Website] New student data",
        html: req.body["message"],
      },
      (err, info) => {
        if (err) {
          return res.status(500).json({
            code: 500,
            message: `[Server Error] ${err}`,
          });
        }

        return res.status(201).json({
          code: 201,
          message: "Successfully sent email!",
        });
      }
    );
  } catch (ex) {
    return res.status(500).json({
      code: 500,
      message: `[Server Error] ${ex}`,
    });
  }
};

module.exports = { MailController };
