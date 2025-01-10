import "./Chat.scss";
import ChatHeader from "./ChatHeader";
import GifIcon from "@mui/icons-material/Gif";
import AddCircleIcon from "@mui/icons-material/AddCircle";
import CardGiftcardIcon from "@mui/icons-material/CardGiftcard";
import EmojiEmotionsIcon from "@mui/icons-material/EmojiEmotions";

function Chat() {
  return (
    <div className="chat">
      <ChatHeader />
      <div className="chat__message"></div>
      <div className="chat__input">
        <AddCircleIcon />
        <form>
          <input type="text" placeholder="add message" />
          <button type="submit">Send</button>
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
