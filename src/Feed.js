import React, { useState, useEffect } from "react";
import "./Feed.css";
import CreateIcon from "@material-ui/icons/Create";
import InputOption from "./InputOption";
import ImageIcon from "@material-ui/icons/Image";
import YouTubeIcon from "@material-ui/icons/YouTube";
import EventNoteIcon from "@material-ui/icons/EventNote";
import VerticalSplitIcon from "@material-ui/icons/VerticalSplit";
import Post from "./Post";
import { db } from "./firebase";
import firebase from "firebase";
import { useSelector } from "react-redux";
import { selectUser } from "./features/userSlice";
// リスト並び替えのアニメーション
import FlipMove from "react-flip-move";

function Feed() {
  const user = useSelector(selectUser);
  const [input, setInput] = useState("");
  const [posts, setPosts] = useState([]);

  // firebaseのデータベースと連携
  useEffect(() => {
    db.collection("posts")
      // 時間の降順で並べ替え　上順なら"asc""
      .orderBy("timestamp", "desc")
      // リアルタイムアップデートをリッスンする
      .onSnapshot((snapshot) =>
        setPosts(
          snapshot.docs.map((doc) => ({
            id: doc.id,
            data: doc.data(),
          }))
        )
      );
  }, []);

  const sendPosts = (e) => {
    e.preventDefault();
    //  firebaseのデータベースに保存
    db.collection("posts").add({
      name: user.displayName,
      description: user.email,
      message: input,
      photoUrl: user.photoUrl || "",
      timestamp: firebase.firestore.FieldValue.serverTimestamp(),
    });
    setInput("");
  };

  return (
    <div className="feed">
      <div className="feed__inputContainer">
        <div className="feed__input">
          <CreateIcon />
          <form>
            <input
              value={input}
              onChange={(e) => setInput(e.target.value)}
              type="text"
            ></input>
            <button onClick={sendPosts} type="submit">
              Send
            </button>
          </form>
        </div>

        <div className="feed__inputOptions">
          <InputOption Icon={ImageIcon} title="写真" color="#70b5f9" />
          <InputOption Icon={YouTubeIcon} title="動画" color="#7fc15e" />
          <InputOption Icon={EventNoteIcon} title="イベント" color="#e7a33e" />
          <InputOption
            Icon={VerticalSplitIcon}
            title="ブログを書く"
            color="#fc9295"
          />
        </div>
      </div>

      <FlipMove>
        {posts.map(({ id, data: { name, description, message, photoUrl } }) => (
          <Post
            key={id}
            name={name}
            description={description}
            message={message}
            photoUrl={photoUrl}
          />
        ))}
      </FlipMove>
    </div>
  );
}

export default Feed;
