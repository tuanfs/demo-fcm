import logo from "./logo.svg";
import "./App.css";
import { useState, useEffect } from "react";
import { getMessagingToken, onMessageListener } from "./firebase";
import axios from "axios";

function App() {
  const [token, setToken] = useState("");
  const [topic, setTopic] = useState("");
  const [isSuccess, setIsSuccess] = useState(false);

  useEffect(() => {
    getMessagingToken().then((token) => {
      setToken(token);
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
          if (token && topic) {
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
            if (response.status === 200) {
              setIsSuccess(true);
            }
            console.log(response);
          }
        }}
      >
        Subcribe Topic
      </button>
      <br />
      <br />
      <input
        type="text"
        placeholder="Topic"
        required
        value={topic}
        onChange={(event) => {
          setTopic(event.target.value);
        }}
      />
      <br />
      <br />
      {isSuccess && (
        <div style={{ color: "#299529" }}>Registration successfully</div>
      )}
    </div>
  );
}

export default App;
