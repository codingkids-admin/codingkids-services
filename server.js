const app = require("express")();
const cors = require("cors");
const nodemailer = require("nodemailer");
const bodyParser = require("body-parser");

const dotenv = require("dotenv");
dotenv.config();
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

const PORT = process.env.PORT || 3001;
app.use(cors());

app.get("/", (req, res) => {
  res.status(200).json({
    code: 200,
    message: "Success running server",
  });
});

app.post("/mail", (req, res) => {
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

  const transporter = nodemailer.createTransport({
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
});

app.listen(PORT, () => {
  console.log(`Server running: http://localhost:${PORT}`);
});
