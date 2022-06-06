import React, { useEffect, useState, useRef } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import loader from "../asset/loader.gif";
import { io } from "socket.io-client";
import styled from "styled-components";
import { allUsersRoute, host, userRoute } from "../utils/APIRoutes";
import ChatContainer from "../components/ChatContainer";
import Contacts from "../components/Contacts";
import Welcome from "../components/Welcome";
import { currentUserRoute } from "../utils/APIRoutes";

const Chat = () => {
  const socket = useRef();
  const [contacts, setContacts] = useState(undefined);
  const [currentChat, setCurrentChat] = useState(undefined);
  const [currentUser, setCurrentUser] = useState(undefined);
  const navigate = useNavigate();

  useEffect(() => {
    (async () => {
      try {
        const { data } = await axios.get(currentUserRoute, {
          withCredentials: true,
        });

        if (data.currentUser == null) {
          return navigate("/login");
        }
        const {
          data: { data: user },
        } = await axios.get(userRoute, { withCredentials: true });

        setCurrentUser(user);
      } catch (error) {
        console.log(error);
      }
    })();
  }, []);

  useEffect(() => {
    if (currentUser) {
      socket.current = io(host);
      socket.current.emit("add-user", currentUser.id);
    }
  }, [currentUser]);

  useEffect(() => {
    (async () => {
      try {
        if (currentUser) {
          if (currentUser.isAvatarSet) {
            const {
              data: { data },
            } = await axios.get(allUsersRoute, {
              withCredentials: true,
            });
            setContacts(data);
          } else {
            navigate("/set-avatar");
          }
        }
      } catch (error) {
        console.log(error);
      }
    })();
  }, [currentUser]);

  const handleChatChange = (chat) => {
    setCurrentChat(chat);
  };
  return (
    <>
      {currentUser === undefined || contacts === undefined ? (
        <Container>
          <img src={loader} alt="loader" className="loader" />
        </Container>
      ) : (
        <Container>
          <div className="container">
            <Contacts
              contacts={contacts}
              currentUser={currentUser}
              changeChat={handleChatChange}
            />
            {currentChat === undefined ? (
              <Welcome currentUser={currentUser} />
            ) : (
              <ChatContainer
                currentChat={currentChat}
                currentUser={currentUser}
                socket={socket}
              />
            )}
          </div>
        </Container>
      )}
    </>
  );
};

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
    @media screen and (min-width: 720px) and (max-width: 1080px) {
      grid-template-columns: 35% 65%;
    }
  }
`;

export default Chat;
