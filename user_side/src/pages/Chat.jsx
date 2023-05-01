import { MoodTwoTone } from "@material-ui/icons";
import React, { useEffect, useRef, useState } from "react";
import { useSelector } from "react-redux";
import styled from "styled-components";
import Topbar from "../components/Topbar";
import Picker from "emoji-picker-react";
import {
  getChats,
  getConversations,
  getUser,
  sendMessages,
} from "../redux/apiCalls/chatCalls";
import { mobile } from "../responsive";
import { Link } from "react-router-dom";
import { io } from "socket.io-client";

const Container = styled.div`
  height: 95vh;
  width: 100%;
  display: flex;
  justify-content: center;
  margin-top: 42px;
  position: relative;
`;
const Wrapper = styled.div`
  width: 60%;
  display: flex;
  margin: 30px 0px;
  border: 1px solid #b3b9b9;
  color: black;
  position: sticky;
  ${mobile({ width: "90%" })}
`;
const Left = styled.div`
  flex: 1;
  border-right: 1px solid #bbb8b8;
  overflow: scroll;
  overflow-x: hidden;
  ${mobile({ display: "none" })}
`;

const LeftItem = styled.div`
  display: flex;
  flex-direction: column;
  overflow-y: scroll;
  margin-right: -20px;
`;
const SideItem = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  flex-wrap: wrap;
  height: 60px;
  :nth-child(1) {
    margin-top: 60px;
  }
  cursor: pointer;
  :hover {
    background-color: #e9f3f3;
    border-left: 2.5px solid #41c9c9;
  }
  ${mobile({ justifyContent: "flexStart" })}
`;
const ColName = styled.span`
  flex: 3;
  font-weight: bolder;
  letter-spacing: 1px;
  color: #3d3a3d;
  margin: 10px;
  ${mobile({ marginLeft: "5px" })}
`;
const CurrentUser = styled.div`
  display: flex;
  position: absolute;
  justify-content: center;
  align-items: center;
  height: 60px;
  background-color: #e9f3f3;
  width: 260px;
  margin-bottom: 340px;
  ${mobile({ width: "90px" })}
`;
const Image = styled.img`
  height: 40px;
  width: 40px;
  border-radius: 50%;
  object-fit: cover;
  margin-left: 15px;
`;
const UserImage = styled.img`
  height: 40px;
  width: 40px;
  border-radius: 50%;
  object-fit: cover;
  margin-left: 15px;
`;
const Username = styled.span`
  font-size: 18px;
  letter-spacing: 1px;
  color: #3d3a3d;
  font-weight: bolder;
`;
const Right = styled.div`
  flex: 2;
  display: flex;
  flex-direction: column;
  overflow: hidden;
`;
const ChatUser = styled.div`
  display: flex;
  align-items: center;
  color: #3d3a3d;
  height: 60px;
  background-color: #e9f3f3;
`;
const ChatUsername = styled.span`
  font-size: 18px;
  margin-left: 20px;
  height: 60px;
  font-weight: bolder;
  letter-spacing: 1px;
  color: #3d3a3d;
  margin-top: 30px;
`;
const Chats = styled.div`
  display: flex;
  flex-direction: column;
  margin: 10px;
  color: #3d3a3d;
  overflow: hidden;
  overflow-y: scroll;
  /* margin-right: -320px;
  padding-right: 320px; */
  height: 80%;
  margin-right: -1px;
`;
const ChatBox = styled.div`
  display: flex;
  max-width: 95%;
  flex-wrap: wrap;
  margin: 5px;
  justify-content: flex-end;
`;
const FriendChat = styled.div`
  display: flex;
  max-width: 70%;
  flex-wrap: wrap;
  margin: 5px;
  /* margin-left: 300px; */
  align-items: flex-start;
`;
const ChatIs = styled.span`
  order: 5;
  display: flex;
  flex-wrap: wrap;
  border: 2px solid #e9f3f3;
  padding: 10px;
  border-radius: 10%;
  color: #3d3a3d;
  background-color: #fbfdfd;
  letter-spacing: 0.7px;
  font-size: 14px;
  margin: 5px;
`;

const MessageBox = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  margin: 15px;
  width: 95%;
  height: 50px;
  border: 1px solid #744771;
  border-radius: 10px;
  background-color: green;
  overflow: auto;
`;

const Message = styled.textarea`
  width: 80%;
  border: none;
  letter-spacing: 0.8px;
  overflow: hidden;
  outline: none;
  height: auto;
  padding: 5px;
  resize: none;
  color: black;
`;
const Button = styled.button`
  /* flex: 1; */
  width: 20%;
  border: none;
  background: none;
  color: white;
  letter-spacing: 0.7px;
  background-color: #adaaaa;
`;

const NoChat = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
`;
const Head = styled.h4`
  letter-spacing: 1px;
`;
const Con = styled.p`
  letter-spacing: 0.8px;
`;

const Chat = () => {
  const [users, setUsers] = useState([]);
  const { currUser } = useSelector((state) => state.user);
  const [chatUser, setChatUser] = useState(undefined);
  const [message, setMessage] = useState("");
  const [messages, setMessages] = useState([]);
  const [chosenEmoji, setChosenEmoji] = useState(null);
  const [emojii, setEmojii] = useState(false);
  const [arrivalMessage, setArrivalMessage] = useState(null);
  const scrollRef = useRef();
  // const socket = useRef(io("http://localhost:3001"));

  const onEmojiClick = (event, emojiObject) => {
    let emoji = emojiObject.emoji;
    setChosenEmoji(emojiObject);
    console.log(emoji);
    setMessage((prev) => prev + `${emoji}`);
  };

  useEffect(() => {
    const myfun = async () => {
      const userId = currUser.id;
      // console.log("USER ID", userId);
      const res = await getConversations(userId);
      // console.log(res);
      let datas = [];
      res.forEach(async (user, ind) => {
        const i = user.receiverId == userId ? user.senderId : user.receiverId;
        const k = await getUser(i);
        let dev = { ...k, conversationId: user.id };
        datas.push(dev);
        if (ind === res.length - 1) {
          setUsers(datas);
        }
      });
    };
    currUser && myfun();
  }, [currUser]);

  // useEffect(() => {
  //   if (currUser) {
  //     socket.current = io("http://localhost:3001");
  //     socket.current.emit("add-user", currUser.id);
  //   }
  // }, [currUser]);

  // useEffect(() => {
  //   socket.current = io("http://localhost:3001");
  //   const callback = (data) => {
  //     setArrivalMessage({
  //       sender: data.senderId,
  //       text: data.text,
  //       createdAt: Date.now(),
  //     });
  //   };
  //   socket.current.on("getMessage", callback);
  //   return () => {
  //     socket.current.off("getMessage", callback);
  //   };
  // }, []);

  // useEffect(() => {
  //   arrivalMessage &&
  //     currentChat?.members.includes(arrivalMessage.sender) &&
  //     setMessages((prev) => [...prev, arrivalMessage]);
  // }, [arrivalMessage, currentChat]);

  // useEffect(() => {
  //   socket.current.emit("addUser", currUser.id);
  //   socket.current.on("getUsers", (users) => {
  //     setOnlineUsers(
  //       user.following.filter((f) => user.some((u) => u.userId === f))
  //     );
  //   });
  // }, [currUser]);

  useEffect(async () => {
    const myfun = async () => {
      const res = await getChats(chatUser.conversationId);
      setMessages(res);
    };
    chatUser.conversationId && myfun();
  }, [chatUser]);

  // console.log(messages);

  useEffect(() => {
    scrollRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  const sendMessage = async () => {
    if (message.length === 0) {
      return;
    }
    const messageDetail = {
      conversationId: chatUser.conversationId,
      sender_id: currUser.id,
      chat: message,
    };
    // socket.current.emit("sendMessage", messageDetail);
    setMessages((prev) => [...prev, messageDetail]);
    setMessage("");
    setEmojii(false);
    await sendMessages(messageDetail);
  };

  // useEffect(() => {
  //   const messageDetail = {
  //     conversationId: chatUser.conversationId,
  //     sender_id: chatUser.id,
  //     chat: message,
  //   };
  //   if (socket.current) {
  //     socket.current.on("msg-recieve", (msg) => {
  //       setArrivalMsg(messageDetail);
  //     });
  //   }
  // }, []);

  // useEffect(() => {
  //   arrivalMsg && setMessages((prev) => [...prev, arrivalMsg]);
  // }, [arrivalMsg]);

  return (
    <Container>
      <Topbar />
      <Wrapper>
        <Left>
          <CurrentUser>
            <Username>{currUser.username}</Username>
          </CurrentUser>
          <LeftItem>
            {users.map((item) => (
              <SideItem onClick={() => setChatUser(item)}>
                <UserImage
                  src={
                    item.profileImg == null || "null"
                      ? "https://w7.pngwing.com/pngs/340/946/png-transparent-avatar-user-computer-icons-software-developer-avatar-child-face-heroes-thumbnail.png"
                      : item.profileImg
                  }
                />
                <ColName>{item.username}</ColName>
              </SideItem>
            ))}
          </LeftItem>
        </Left>
        <Right>
          <Link to={`/user/${chatUser?.id}`} style={{ textDecoration: "none" }}>
            {chatUser && (
              <ChatUser>
                <Image
                  src={
                    chatUser?.profileImg == null || "null"
                      ? "https://w7.pngwing.com/pngs/340/946/png-transparent-avatar-user-computer-icons-software-developer-avatar-child-face-heroes-thumbnail.png"
                      : chatUser?.profileImg
                  }
                />
                <ChatUsername>{chatUser?.username}</ChatUsername>
              </ChatUser>
            )}
          </Link>

          <Chats>
            {messages?.map((message) =>
              message.sender_id === currUser.id ? (
                <ChatBox ref={scrollRef}>
                  <ChatIs>{message.chat}</ChatIs>
                </ChatBox>
              ) : (
                <FriendChat ref={scrollRef}>
                  <ChatIs>{message.chat}</ChatIs>
                </FriendChat>
              )
            )}
          </Chats>
          {/* {emojii && <Picker onEmojiClick={onEmojiClick} />} */}
          {chatUser && (
            <MessageBox>
              <Message
                placeholder="Message"
                onChange={(event) => setMessage(event.target.value)}
                value={message}
              ></Message>
              <Button onClick={sendMessage}>Send</Button>
            </MessageBox>
          )}
          {!chatUser && (
            <NoChat>
              <Head>Start a new conversation</Head>
              <Con>This a world where wants to know about you !</Con>
            </NoChat>
          )}
        </Right>
      </Wrapper>
    </Container>
  );
};

export default Chat;
