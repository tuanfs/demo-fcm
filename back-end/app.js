const express = require("express");
const admin = require("firebase-admin");
const bodyParser = require("body-parser");
const cors = require("cors");

admin.initializeApp({
  credential: admin.credential.cert({
    type: "service_account",
    project_id: "careful-voyage-403108",
    private_key_id: "2167e0f371a8883a064681cd8dd31ae8ef0e093f",
    private_key:
      "-----BEGIN PRIVATE KEY-----\nMIIEvgIBADANBgkqhkiG9w0BAQEFAASCBKgwggSkAgEAAoIBAQDDa+X6bkssJ6i6\nZd08L624JOlsnCgTcDspvWC6l+/oxvRdKD36aGXQ4mRtkczcxcDGGfKJ1qxNFGwv\nRzVoSada22i7Y0rM90NiVM3MGPjeCAHYLyv7faR/a2csWvJ1XHeZhEmS47sJ/EU9\nTgco0EPYW8RASBSA8nEg2j9wtRb/WnfBYVu5b6iJkVHbxyraKTmwI3BQ4XOPGakU\nKLV+uv9OOwFO1TFXAjlNnPdRtm8Poh6WIP5zbvMz1Hr+k28s1I811IC1xqa2kVwj\ncyBtwGcLDaxXbLIxyETLw3TglfhBPOcKzdiS3AYjEiHgLUUJXiM268YaSqKEBys+\n0IJ5T+QFAgMBAAECggEAGZn2WlFeOEXm0SqcqfCeG9h8Gx43EtraaVy1wiQ7Ch4c\nb+LggcBxDEVIfmFCOy8OEvXdxCiTUJLLHIOB7+xsSBcj+J6os0L2eTiecG1aFy5p\n3XJKmwsqBIZj0RgGGRF42qwNvnhmrcd2o7In9nUYWk0lX/2BcCYy42isNH4I6gFr\nfv2tDJ/0vHQ9hLDe7sR3NdQVYJn1OlLPORRNyGo8c3rblH16nQ+Gwl8T2UQxrrKn\nmc88dp+n9Bm7yESlZxLGlWU91ELQcdWgcdVwku50czEm8RDO6tY6iSwVBf2nmiXo\nKeFkPwNaQIernN+YG0/2eXrpJBxQBNl8jlQUmzpq4QKBgQD1wgGUKgQHEl8C4phN\nZBxPpN/njq9TyNCCJH/LhbUH1KiiY4uVwZsRXUSOo6KhxuLsasTHP6PklWt/KOzd\nxwcIXCqYUXiVN/W9fu3B92oX6FrE49kn1hy79JIs9/rI8Jq0P9DbkR5eV2j1u+zr\ngkreZpAxrnceHwLuB1J4vzEfIQKBgQDLkNpVQX5zBWa2YVgVS+hI708oGgxw0sFq\nvjUxAT6nC4Ixf2alccCzjUTR8/lmja5J0pmusKe24ey9jBCXcaZT7OiCTmpE2YKH\nJ9Z7JHd4D+79D+vE3ov4QRN5HoCV3lKut9RKv+b9FStL3YyouVZCOp72VOYB2Boa\n6wIPvaccZQKBgQCU3Sm7qB+8cOJgiwWai3OiwspmJ0YIyHGVA6rti1Z3IdfsVcQt\nuJLH1+k5ReGzgRfgAWSlFOWgBuqQoieox3B5HesnTOJv8O/IE2TNw6LeTH7/GM1n\nlgjdyW3qE2Qz55quaKGI/sSYfPY1M9p1Zf0X7qSVk4rQEhTiPkk0nwuQQQKBgQCH\nG1/dn/d2DcqrF5ano9bKuZJW8lr5ctgOqamSGdpkcj357i3JduNICGX51yzbhQN9\nWbrId9UIi5BeCZ1ldnfHUgDLo5Himl6Ip8cxufVVCXY8HZoE8xQBM+fhxn3fekx0\nS+wppI6BwNAYrTXTMhdvI4snwRdbd/tzjDC1E9HbBQKBgFVsA8rw+Jp9AeaY8mDc\nP2vQjbKCIrlm2h0OGegWxwKlvTneCx9YGH8jwaLF4yZZE6CMfPtTtrNQ8opHicyw\nD0BXLPjSgLXLssmGfdJ+wIbOYs/HkLlUQBrLcHsY2UJPrU7d8OST1wbua+1GmHab\nW3uh4gT4LjYXzhJqtZBpRRqJ\n-----END PRIVATE KEY-----\n",
    client_email:
      "firebase-adminsdk-22gbc@careful-voyage-403108.iam.gserviceaccount.com",
    client_id: "107196506973560046813",
    auth_uri: "https://accounts.google.com/o/oauth2/auth",
    token_uri: "https://oauth2.googleapis.com/token",
    auth_provider_x509_cert_url: "https://www.googleapis.com/oauth2/v1/certs",
    client_x509_cert_url:
      "https://www.googleapis.com/robot/v1/metadata/x509/firebase-adminsdk-22gbc%40careful-voyage-403108.iam.gserviceaccount.com",
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

app.post("/unsubcribe", (req, res) => {
  const deviceToken = req.body.deviceToken;
  const topic = req.body.topic;
  console.log(deviceToken);
  admin
    .messaging()
    .unsubscribeFromTopic(deviceToken, topic)
    .then((response) => {
      res.status(200).send("Unsubscribing successfully");
    })
    .catch((error) => {
      res.status(400).send("Error unsubscribing to topic");
      console.log("Error subscribing to topic:", error);
    });
});

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
