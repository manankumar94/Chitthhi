import React from 'react'; 
import styled from 'styled-components';
import Picker from 'emoji-picker-react';
import { IoMdSend } from 'react-icons/io'; 
import { BsEmojiSmileFill } from 'react-icons/bs'; 
import { useState } from 'react';

function ChatInput({handleSendMsg}) {
  const [showEmojiPicker, setEmojiPicker] = useState(false);
  const [msg, setMsg] = useState("");

  const handleEmojiPickerHideShow = () => {
    setEmojiPicker(!showEmojiPicker);
  };

  const handleEmojiClick = (emojiObject) => {
    const message = msg + emojiObject.emoji; 
    setMsg(message);
  };

  const sendChat = (event) => {
    event.preventDefault();
    if(msg.length>0){
        handleSendMsg(msg);
        setMsg("");
    }
  }

  return (
    <Container>
      <div className="buttonContainer">
        <div className="emoji">
          <BsEmojiSmileFill onClick={handleEmojiPickerHideShow} />
          {showEmojiPicker && (
            <div className="emojiPickerContainer">
              <Picker onEmojiClick={handleEmojiClick} />
            </div>
          )}
        </div>
      </div>
      <form className="inputContainer" onSubmit={(e)=> sendChat(e)}>
        <input
          type="text"
          placeholder="Type your Message here"
          value={msg}
          onChange={(e) => setMsg(e.target.value)}
        />
        <button className="submit">
          <IoMdSend />
        </button>
      </form>
    </Container>
  );
}

export default ChatInput;

const Container = styled.div`
  display: flex;
  align-items: center;
  gap: 1rem;
  padding: 1rem;
  background-color: #080420;
  border-radius: 0.5rem;
  position: relative;

  .buttonContainer {
    display: flex;
    align-items: center;
    justify-content: center;
    background-color: #ffffff34;
    padding: 0.5rem;
    border-radius: 0.5rem;
    cursor: pointer;
    position: relative;

    .emoji {
      color: white;
      font-size: 2rem;

      .emojiPickerContainer {
        position: absolute;
        bottom: 3rem;
        left: 0;
        background-color: #ffffff;
        border-radius: 0.5rem;
        box-shadow: 0px 4px 8px rgba(0, 0, 0, 0.2);
        z-index: 1000;

        .emoji-picker-react {
          position: absolute;
          top: -350px;
          background-color: #080420;
          box-shadow: 0 5px 10px #9a86f3;
          border-color: #9a86f3;

          .emoji-scroll-wrapper::-webkit-scrollbar {
            background-color: #080420;
            width: 5px;

            &-thumb {
              background-color: #9a86f3;
            }
          }

          .emoji-categories {
            button {
              filter: contrast(0);
            }
          }

          .emoji-search {
            background-color: transparent;
            border-color: #9a86f3;
          }

          .emoji-group:before {
            background-color: #080420;
          }
        }
      }
    }
  }

  .inputContainer {
    display: flex;
    align-items: center;
    width: 100%;
    background-color: #ffffff34;
    border-radius: 0.5rem;
    padding: 0.5rem;

    input {
      flex: 1;
      background: transparent;
      border: none;
      color: white;
      font-size: 1.2rem;
      outline: none;
      padding: 0.5rem;
    }

    input::placeholder {
      color: #d1d1d1;
    }

    .submit {
      background-color: #9a86f3;
      border: none;
      padding: 0.5rem 1rem;
      border-radius: 0.5rem;
      cursor: pointer;
      display: flex;
      align-items: center;
      justify-content: center;

      svg {
        color: white;
        font-size: 1.5rem;
      }

      &:hover {
        background-color: rgb(37, 33, 232);
      }
    }
  }
`;

