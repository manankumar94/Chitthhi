import React, { useState, useEffect , useRef} from 'react';
import styled from 'styled-components';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { allUsers, host } from '../utils/apiRoutes.js'; // Ensure this path is correct
import Contacts from '../components/Contacts.jsx';
import Welcome from '../components/Welcome.jsx';
import ChatContainer from '../components/ChatContainer.jsx';
import {io} from 'socket.io-client';

function Chat() {

  const socket= useRef();

  const navigate = useNavigate();
  const [contacts, setContacts] = useState([]);
  const [currentUser, setCurrentUser] = useState(undefined);
  const [currentChat, setCurrentChat] = useState(undefined);
  const [isLoaded, setIsLoaded] = useState(false);


  useEffect(() => {
    const fetchData = async () => {
      if (!localStorage.getItem('Chitthi-User')) {
        navigate('/login');
      } else {
        setCurrentUser(await JSON.parse(localStorage.getItem('Chitthi-User')));
        setIsLoaded(true);
      }
    };

    fetchData();
  }, [navigate]);

  useEffect(()=>{
    if(currentUser){
      socket.current= io(host);
      socket.current.emit("add-user", currentUser._id);
    }
  },[currentUser])
  useEffect(() => {
    const getContacts = async () => {
      if (currentUser) {
        if (currentUser.isAvatarImageSet) {
          try {
            const { data } = await axios.get(`${allUsers}/${currentUser._id}`);
            setContacts(data);
          } catch (error) {
            console.error("Error fetching contacts:", error);
          }
        } else {
          navigate("/setAvatar");
        }
      }
    };

    getContacts();
  }, [currentUser, navigate]);

  const handleChatChange = (chat) => {
    setCurrentChat(chat);
  }

  return (
    <Container>
      <div className="container">
        <Contacts contacts={contacts}
         currentUser={currentUser} 
         changeChat={handleChatChange}
         />
        {
          isLoaded && currentChat === undefined ?( 
          <Welcome currentUser={currentUser} />) :
          (
            <ChatContainer 
             currentChat={currentChat}
             currentUser={currentUser}
             socket={socket}
             />
          )
        }
       
      </div>
    </Container>
  );
}

const Container = styled.div`
  height: 100vh;
  width: 100vw;
  display: flex;
  flex-direction: column;
  justify-content: center;
  gap: 1rem;
  align-items: center;
  background-color: #131324;

  .container {
    height: 85vh;
    width: 85vw;
    background-color: #00000076;
    display: grid;
    grid-template-columns: 25% 75%;
    border: 2px solid white;
    border-radius: 15px;
    overflow: hidden;

    @media screen and (min-width: 720px) and (max-width: 1080px) {
      grid-template-columns: 35% 65%;
    }
  }
`;

export default Chat;
