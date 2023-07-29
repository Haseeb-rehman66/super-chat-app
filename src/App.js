import { useEffect, useState } from "react";
import "./App.css";
import { getDatabase, ref, push, set, onChildAdded } from "firebase/database";
import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
} from "firebase/auth";
import ReactScrollableFeed from "react-scrollable-feed";
import { auth } from "./firebase-config";

function App() {
  const [name, setName] = useState("");
  const [chats, setChats] = useState([]);
  const [msg, setMsg] = useState("");
  const [registeremail, setRegisteremail] = useState("");
  const [registerpassword, setRegisterpassword] = useState("");
  const [loginemail, setLoginemail] = useState("");
  const [loginpassword, setLoginpassword] = useState("");

  // onAuthStateChanged(auth, (currentUser) => {
  //   setUser(currentUser);

  // });

  const register = (e) => {
    createUserWithEmailAndPassword(auth, registeremail, registerpassword)
      .then((res) => {
        console.log(registeremail);
        alert("Successfully Registered")
      })
      .catch((error) => {
        const errorRegisterMessage = error.code;
        alert(errorRegisterMessage)
      });
    setRegisteremail("");
    setRegisterpassword("");
  };
  const login = (e) => {
    signInWithEmailAndPassword(auth, loginemail, loginpassword)
      .then((res) => {
        setName(loginemail);
      })
      .catch((error) => {
        const errorMessage = error.message;
        alert(errorMessage)
      });
  };

  const db = getDatabase();
  const chatListRef = ref(db, "chats");

  useEffect(() => {
    onChildAdded(chatListRef, (data) => {
      setChats((chats) => [...chats, data.val()]);
    });
  }, []);

  const sendChat = () => {
    const chatRef = push(chatListRef);
    set(chatRef, {
      name,
      message: msg,
    });
    // const c = [...chats];
    // c.push({ name, message: msg });
    // setChats(c);
    setMsg("");
  };
  const Logout = () => {
    setName(null);
  };
  return (
    <div>
      {name ? null : (
        <>
          <div className="main">
            <div className="sub-main">
              <h3 className="h3">Register User</h3>
              <div className="email">
                <input
                  placeholder="Email"
                  onChange={(event) => {
                    setRegisteremail(event.target.value);
                  }}
                  value={registeremail}
                />
              </div>

              <div className="pass">
                <input
                  placeholder="Password"
                  onChange={(event) => {
                    setRegisterpassword(event.target.value);
                  }}
                  value={registerpassword}
                />
              </div>

              <button className="button" onClick={register}>
                Create User
              </button>

              <h3 className="h3">Login User</h3>
              <div className="email">
                <input
                  placeholder="Email"
                  onChange={(event) => {
                    setLoginemail(event.target.value);
                  }}
                />
              </div>
              <div className="pass">
                <input
                  placeholder="Password"
                  onChange={(event) => {
                    setLoginpassword(event.target.value);
                  }}
                />
              </div>

              <button className="button" onClick={login}>
                Login
              </button>
            </div>
          </div>
        </>
      )}

      {name ? (
        <div>
          <button className="logout" onClick={Logout}>
            Logout
          </button>

          <h3>User: {name}</h3>
          <hr />
          <div id="chat" className="chat-container">
            <ReactScrollableFeed>
              {chats.map((c, i) => (
                <div
                  key={i}
                  className={`container ${c.name === name ? "me" : ""}`}
                >
                  <p className="chatbox">
                    <strong>{c.name}:</strong>
                    <span>{c.message}</span>
                  </p>
                </div>
              ))}
            </ReactScrollableFeed>
          </div>
          <hr />

          <div className="btn">
            <input
              type="text"
              onInput={(e) => setMsg(e.target.value)}
              value={msg}
              placeholder="enter your chat"
            ></input>
            <div className="send">
              <button className="button" onClick={(e) => sendChat()}>
                Send
              </button>
            </div>
          </div>
        </div>
      ) : null}
    </div>
  );
}

export default App;
