import logo from "./logo.svg";
import "./App.css";
import {useEffect} from "react";
import {getMessagingToken, onMessageListener} from "./firebase";

function App() {
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
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <p>
          Edit <code>src/App.js</code> and save to reload.
        </p>
        <a
          className="App-link"
          href="https://reactjs.org"
          target="_blank"
          rel="noopener noreferrer"
        >
          Learn React
        </a>
      </header>
    </div>
  );
}

export default App;
