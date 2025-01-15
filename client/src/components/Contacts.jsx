import React, { useState, useEffect } from "react";
import styled from "styled-components";
import Logo from "../assets/logo.jpg";

function Contacts({ contacts, currentUser, changeChat }) {
  const [currentUserName, setCurrentUserName] = useState(undefined);
  const [currentUserImage, setCurrentUserImage] = useState(undefined);
  const [currentSelected, setCurrentSelected] = useState(undefined);

  useEffect(() => {
    console.log();
    if (currentUser) {
      setCurrentUserImage(currentUser.avatarImage);
      setCurrentUserName(currentUser.username);
    }
  }, [currentUser]);

  const changeCurrentChat = (index, contact) => {
    setCurrentSelected(index);
    changeChat(contact);
  };

  return (
    <>
      {currentUserImage && currentUserName && (
        <Container>
          <div className="brand">
            <div className="logo">
              <img src={Logo} alt="logo" />
            </div>
            <h3>ChiTThi</h3>
          </div>
          <div className="contacts">
            {contacts.map((contact, index) => (
              <div
                key={index}
                className={`contact ${
                  index === currentSelected ? "selected" : ""
                }`}
                onClick={() => changeCurrentChat(index, contact)}
              >
                <div className="avatar">
                  <img
                    src={`data:image/svg+xml;base64,${contact.avatarImage}`}
                    alt="avatar"
                  />
                </div>
                <div className="username">
                  <h3>{contact.username}</h3>
                </div>
              </div>
            ))}
          </div>
          <div className="current-user">
            <div className="avatar">
              <img
                src={`data:image/svg+xml;base64,${currentUserImage}`}
                alt="avatar"
              />
            </div>
            <div className="username">
              <h2>{currentUserName}</h2>
            </div>
          </div>
        </Container>
      )}
    </>
  );
}

const Container = styled.div`
  display: grid;
  grid-template-rows: 15% 70% 15%; /* Adjusted for better spacing */
  overflow: hidden;
  background-color: #080420;

  .brand {
    display: flex;
    align-items: center;
    gap: 1rem;
    justify-content: center;
    margin-top: 1rem; /* Added to push the brand section downward */

    .logo {
      width: 4rem;
      height: 4rem;
      overflow: hidden;
      border-radius: 50%;
      display: flex;
      align-items: center;
      justify-content: center;
      transition: 0.3s ease-in-out;
      background-color: #ffffff34; /* Hover effect background color */

      img {
        width: 100%;
        height: 100%;
        object-fit: cover; /* Ensures no part of the image is cut */
        border-radius: 50%; /* Ensures the image itself is circular */
        transition: 0.3s ease-in-out;
      }

      &:hover {
        background-color: #4e0eff; /* Restored hover effect */
        transform: scale(1.1); /* Slight zoom effect on hover */
        box-shadow: 0 0 0 3px #4e0eff, 0 0 10px #4e0eff; /* Blue outline effect */
      }
    }

    h3 {
      color: white;
      font-size: 1.5rem;
    }
  }

  .contacts {
     display: flex;
    flex-direction: column;
    align-items: center;
    overflow: auto;
    gap: 0.8rem;
    padding: 0.5rem 0;
    height: 100%;
    
    /* Scrollbar Style */
    &::-webkit-scrollbar {
      width: 0.1rem; /* Very thin scrollbar */
    }
    &::-webkit-scrollbar-track {
      background-color: transparent; /* Make track transparent */
    }
    &::-webkit-scrollbar-thumb {
      background-color: #ffffff39; /* Slightly transparent white thumb */
      border-radius: 1rem;
    }
    &::-webkit-scrollbar-thumb:hover {
      background-color: #9a86f3; /* Hover effect color */
    }


    .contact {
      background-color: #ffffff34;
      min-height: 4rem; /* Reduced height for a smaller box */
      cursor: pointer;
      width: 85%; /* Reduced width to make the box narrower */
      border-radius: 0.5rem;
      padding: 0.5rem;
      display: flex;
      align-items: center;
      gap: 1rem;
      transition: 0.3s ease-in-out;

      .avatar img {
        height: 2.5rem; /* Reduced avatar size */
        border-radius: 50%;
      }

      .username h3 {
        color: white;
      }

      &:hover {
        background-color: #4e0eff;
      }
    }

    .selected {
      background-color: #9a86f3;
    }
  }

  .current-user {
    background-color: #0d0d30;
    display: flex;
    justify-content: center;
    align-items: center;
    gap: 2rem;
    padding: 1rem;

    .avatar img {
      height: 4rem;
      border-radius: 50%;
    }

    .username h2 {
      color: white;
    }
  }

  @media screen and (min-width: 720px) and (max-width: 1080px) {
    grid-template-rows: 20% 65% 15%; /* Adjusted for better layout on smaller screens */
    gap: 0.5rem;

    .brand {
      .logo {
        width: 3rem; /* Adjusted for smaller screens */
        height: 3rem; /* Adjusted for smaller screens */
      }

      h3 {
        font-size: 1rem;
      }
    }

    .current-user {
      gap: 1rem;

      .username h2 {
        font-size: 1rem;
      }
    }
  }
`;

export default Contacts;
