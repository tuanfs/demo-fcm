import logo from "./logo.svg";
import "./App.css";
import { useState, useEffect } from "react";
import { getMessagingToken, onMessageListener } from "./firebase";
import axios from "axios";

function App() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [isSuccess, setIsSuccess] = useState(false);
  useEffect(() => {
    getMessagingToken().then((token) => {
      console.log("Token", token);
    });
  }, []);
  useEffect(() => {
    onMessageListener().then((data) => {
      console.log("Receive foreground: ", data);
    });
  });
  return (
    <div className="App">
      <button
        onClick={async () => {
          const token =
            "fb3HKv6SGqL-9rTPv7KAAM:APA91bGtiQTpRkW_yvTkoG0oHtwqBv2Bh_9PjCkgTguGBeArAn9HvxK1wpvrg8-O3LpPODvR8mj6Loxe2s0RrEF6H3iSmPz9d_Qiflxl3BP8AFPyrPzYtIgeouhjhMme3RRHELpNzFuc";
          const topic = "MessagingTopicManagementResponse2";
          const response = await axios.post(
            `https://iid.googleapis.com/iid/v1/${token}/rel/topics/${topic}`,
            {},
            {
              headers: {
                Authorization: `key=AAAAEChKDcU:APA91bG8AswDvX8YmKgqymkiJj3VBcSywICmeNAHuh3GbU6gnLfv-zWzu-1Jkeam9c8e1e6Dl1xvJcbGJtLhZp4spuh3q3mKbgYr-UC4PxcIHsn9MK7Nv7DLUWV2nXQwHxKQoNvT20qw`,
                "Content-Type": "application/json",
              },
            }
          );
          console.log(response);
        }}
      >
        Subcribe Topic
      </button>
      <form hidden={isSuccess}>
        <input
          value={username}
          placeholder="username"
          onChange={(event) => setUsername(event.target.value)}
        />
        <br />
        <input
          value={password}
          placeholder="password"
          type="password"
          onChange={(event) => setPassword(event.target.value)}
        />
        <br />
        <input
          type="submit"
          onClick={(event) => {
            event.preventDefault();
            axios
              .post("http://localhost:3001/login", {
                username,
                password,
              })
              .then((response) => {
                console.log(response);
                if (response.status === 200) {
                  setIsSuccess(true);
                }
              });
          }}
        />
      </form>
      {isSuccess && <div>Login Successfully</div>}
    </div>
  );
}

export default App;
