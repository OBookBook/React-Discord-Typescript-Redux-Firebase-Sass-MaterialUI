import "./Chat.scss";
import {
  addDoc,
  Timestamp,
  collection,
  onSnapshot,
  DocumentData,
  serverTimestamp,
  CollectionReference,
  query,
  orderBy,
} from "firebase/firestore";
import { useEffect, useState } from "react";
import { db } from "../../firebase";
import ChatHeader from "./ChatHeader";
import ChatMessage from "./ChatMessage";
import GifIcon from "@mui/icons-material/Gif";
import { useAppSelector } from "../../app/hooks";
import AddCircleIcon from "@mui/icons-material/AddCircle";
import CardGiftcardIcon from "@mui/icons-material/CardGiftcard";
import EmojiEmotionsIcon from "@mui/icons-material/EmojiEmotions";

interface Messages {
  timestamp: Timestamp;
  message: string;
  user: {
    uid: string;
    photo: string;
    email: string;
    displayName: string;
  };
}

function Chat() {
  const [inputText, setInputText] = useState<string>("");
  const [messages, setMessages] = useState<Messages[]>([]);
  const user = useAppSelector((state) => state.user.user);
  const channelId = useAppSelector((state) => state.channel.channelId);
  const channelName = useAppSelector((state) => state.channel.channelName);

  useEffect(() => {
    let colletionRef = collection(
      db,
      "channels",
      String(channelId),
      "messages"
    );

    const collectionRefOrderBy = query(
      colletionRef,
      orderBy("timestamp", "desc")
    );

    onSnapshot(collectionRefOrderBy, (snapshot) => {
      let results: Messages[] = [];
      snapshot.docs.forEach((doc) => {
        const data = doc.data();
        if (data.timestamp) {
          results.push({
            timestamp: data.timestamp,
            message: data.message,
            user: data.user,
          });
        }
      });
      setMessages(results);
    });
  }, [channelId]);

  const sendMessage = async (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    const collectionRef: CollectionReference<DocumentData> = collection(
      db,
      "channels",
      String(channelId),
      "messages"
    );

    await addDoc(collectionRef, {
      message: inputText,
      timestamp: serverTimestamp(),
      user: user,
    });

    setInputText("");
  };

  return (
    <div className="chat">
      <ChatHeader channelName={channelName} />
      <div className="chat__message">
        {messages.map((message, index) => (
          <ChatMessage
            key={index}
            message={message.message}
            timestamp={message.timestamp}
            user={message.user}
          />
        ))}
      </div>
      <div className="chat__input">
        <AddCircleIcon />
        <form>
          <input
            type="text"
            placeholder="add message"
            onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
              setInputText(e.target.value)
            }
            value={inputText}
          />
          <button
            type="submit"
            onClick={(e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
              sendMessage(e);
            }}
          >
            Send
          </button>
        </form>

        <div className="chat_icons">
          <CardGiftcardIcon />
          <GifIcon />
          <EmojiEmotionsIcon />
        </div>
      </div>
    </div>
  );
}

export default Chat;
