import React, { useState } from "react";
import { login } from "./features/userSlice";
import { useDispatch } from "react-redux";
import { auth } from "./firebase";
import "./Login.css";

function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [name, setName] = useState("");
  const [profilePic, setProfilePic] = useState("");
  const dispatch = useDispatch();

  // ログインイベント
  const loginToApp = (e) => {
    e.preventDefault();
    auth
      .signInWithEmailAndPassword(email, password)
      .then((userAuth) => {
        dispatch(
          login({
            email: userAuth.user.email,
            uid: userAuth.user.uid,
            displayName: userAuth.user.displayName,
            profileUrl: userAuth.user.photoUrl,
          })
        );
      })
      .catch((error) => alert(error));
  };

  // 新規ユーザー登録;
  const register = () => {
    if (!name) {
      return alert("Please enter a full name");
    }
    auth
      .createUserWithEmailAndPassword(email, password)
      .then((userAuth) => {
        userAuth.user
          .updateProfile({
            displayName: name,
            photoURL: profilePic,
          })
          .then(() => {
            dispatch(
              login({
                email: userAuth.user.email,
                uid: userAuth.user.uid,
                displayName: name,
                photoUrl: profilePic,
              })
            );
          });
      })
      .catch((error) => alert(error));
  };

  return (
    <div className="login">
      <img
        src="https://genylabs.io/wp-content/uploads/2019/10/Social-Listening-to-LinkedIn.png"
        alt="Linked in"
      />
      <form>
        <input
          value={name}
          onChange={(e) => setName(e.target.value)}
          placeholder="Full name"
          type="text"
        />

        <input
          value={profilePic}
          onChange={(e) => setProfilePic(e.target.value)}
          placeholder="Profile pic url"
          type="text"
        />

        <input
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder="Email"
          type="email"
        />

        <input
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          placeholder="Password"
          type="password"
        />

        <button type="submit" onClick={loginToApp}>
          ログイン
        </button>
      </form>
      　
      <p>
        初めてご利用ですか?
        <span className="login__register" onClick={register}>
          ユーザー登録
        </span>
      </p>
    </div>
  );
}

export default Login;
