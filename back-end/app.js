const express = require("express");
const admin = require("firebase-admin");
const bodyParser = require("body-parser");
const cors = require("cors");

admin.initializeApp({
  credential: admin.credential.cert({
    type: "service_account",
    project_id: "notify-test-931fc",
    private_key_id: "5d9f27e109adad90f1e587b92b07402841f0bd45",
    private_key:
      "-----BEGIN PRIVATE KEY-----\nMIIEvwIBADANBgkqhkiG9w0BAQEFAASCBKkwggSlAgEAAoIBAQDg+XWwyn3byoe4\naJA3O2k6ghrqkB872a2+CxJkFxWg36sVlVUYQcbSxwLqao5nuxu8rPEA6o0FYe+d\nUdecqRyFRiZMnUN73OqEg4yQXwqJ8lBa9onANEDD49Xdq6U2L0TW8QlpVfjiPzET\nkTqoY2NfHuZnn+iiVeXJKQjcqdtyWK7YszCeJ/keHkyxBVxij3YIrBYHE8m2a3m8\nHrD+fpEeCQyuhFrq8gMGS110fHzMnLxk/TDv0+h591yf6jiWPJoGK/gNWPo0zU39\nn0V5PETQ6E+rotc2d9opQrsd8E1fonOhwyMYJGy3bfBEVkztrOBZF/n1am/Kuaqq\nxBuHGVlxAgMBAAECggEAJmqSrUC2oyx/Zn78eWH8ww/qdrlri/XM1FHhrxO+Dr2C\n4mmgoUbCI8X1+n99l7r8rog9kzF6KTwjBZMvJUI/a4aiDZ0hI+qCZWRtQU3pZ8rn\n69CDjz2c/ZZPM84WpR0HPUjlmYYjvMabo8K96HkoQ9rr7zAAMpBGb8ZBDCU5Itot\n8ctPTh1+I2lQ0gEkWZPYMoPQ7/hJtSIOL3geiw1pvSgeOGOM7canWLBjY6KPIC7L\nnVlOx13IKg4C6rGZNJ35wDSp4MWxOh9dhTJAlmTE+Zk+bPrzcDonF/lQ1GQ/cKn8\nP0qF7hYkEfOGzfUd3HukpSEkvN9l4Y9vPtaMmycs/QKBgQDy2mrq/zqq57yiUazP\nFQjFyaFJsL3/K/tWkYqXIBLJtsgaAj0jj/GRHVKfNJfRoQciuzKgSePD4RUkRWBY\nGEmQW5LY5qEEm6Jy5+s0uU+C3MzZg+KG2m9mGrZh9O4Nv6ZWn+odfSR0u7zrWUWw\nObFbeeqiK79GXXaPz/0489kGjwKBgQDtJ0T5wX8bunRTnwJlBoQb0lZeW0tAwHm3\nBY8XTYdHsvmXLqDP+TfqUaf3x+9nGT1xTrm/pFjJTgIQQnY0zmYAcYOjwC1s2kfN\nL72tl6fe+WLybtEeKqGY/3bCHqrSdwckLw4WitNELe9zvTOGOb89NT1b2/dGOmE2\nqj1ewBef/wKBgQCCSs7cH20Bbm0VBQ7a12UqgH/pAksdUSJ6koExjYKm+EqpMZRN\ntRecjIfcZKIjVOp4JskFmD77w5HNMO98tCMbsRW7CxlOWJWyYl0dn2JaSk4ZURnC\n0gS8Wg6JxZfGhpEenpNDmPVrL6Iu/mlWH83YzzMkKKZpgRFwHN21pZZFXwKBgQDZ\nHQ2B1gsneJENCVMo6ElEK1HU+qGve0czLsysmdbS5mCobxDcth3h0LYFG67qZWoh\n9OALOkvqqBctiZsshxVNLJ9G6CbuM/xuNlnhtikC8rAKoTej9YWSS7cOywK6wivw\njX/JVXlLPv6sqDeml/Gj+Lze/0enrMTZRgv/Vb+LQwKBgQDICPVNHqp/FFQfApvF\nQ4sU2XtOp/+GvWJaRqCnRcVcJY8I6y6mDJ3yAq7s/9P+WebqCk9iMEGcEQChU8K4\n4pwalgPDgwCktX0HcWrqTjr1zdzpap+rWlrC9jZRuRpXhhweaKM85Wv3zGVSxcwl\nA+LDfxSu4paekFgX85G5GQx7vw==\n-----END PRIVATE KEY-----\n",
    client_email:
      "firebase-adminsdk-yez98@notify-test-931fc.iam.gserviceaccount.com",
    client_id: "109928503893014455028",
    auth_uri: "https://accounts.google.com/o/oauth2/auth",
    token_uri: "https://oauth2.googleapis.com/token",
    auth_provider_x509_cert_url: "https://www.googleapis.com/oauth2/v1/certs",
    client_x509_cert_url:
      "https://www.googleapis.com/robot/v1/metadata/x509/firebase-adminsdk-yez98%40notify-test-931fc.iam.gserviceaccount.com",
    universe_domain: "googleapis.com",
  }),
  // Add your Firebase project configuration here
  // Example:
  // databaseURL: "https://your-project-id.firebaseio.com"
});

const app = express();
const port = 3001;

app.use(bodyParser.json());
app.use(cors());
app.use(express.json());

app.post("/registration", (req, res) => {
  const deviceToken = req.body.deviceToken;
  const topic = req.body.topic;
  console.log(deviceToken);
  admin
    .messaging()
    .subscribeToTopic(deviceToken, topic)
    .then((response) => {
      res.status(200).send("subscribing successfully");
    })
    .catch((error) => {
      res.status(400).send("Error subscribing to topic");
      console.log("Error subscribing to topic:", error);
    });
});

app.post("/send-notification", (req, res) => {
  const message = {
    notification: {
      title: req.body.title,
      body: req.body.body,
    },
    token: req.body.token,
  };

  admin
    .messaging()
    .send(message)
    .then((response) => {
      res.status(200).send("Notification sent successfully");
    })
    .catch((error) => {
      console.error("Error sending notification:", error);
      res.status(500).send("Error sending notification");
    });
});

app.post("/send-topic", (req, res) => {
  const { title, body, data, topic } = req.body;
  console.log("topic", topic);
  const message = {
    data,
    notification: {
      title,
      body,
    },
    topic: topic,
  };

  admin
    .messaging()
    .send(message)
    .then((response) => {
      console.log(response);
      res.status(200).send("Sending message successfully");
    })
    .catch((error) => {
      res.status(400).send("Error Sending message to topic");
      console.log("Error subscribing to topic:", error);
    });
});

app.post("/login", (req, res) => {
  if (req.body.username) {
    res.status(200).send("Login successful");
  } else {
    res.status(400).send("Login failed");
  }
});

app.listen(port, () => {
  console.log(`Server is listening at http://localhost:${port}`);
});
