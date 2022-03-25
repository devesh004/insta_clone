import { MoodTwoTone } from "@material-ui/icons";
import React, { useState } from "react";
import styled from "styled-components";
import Topbar from "../components/Topbar";
import { mobile } from "../responsive";
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
  font-weight: bolder;
  letter-spacing: 1px;
  color: #3d3a3d;
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
  margin-right: -1px;
`;
const ChatBox = styled.span`
  display: flex;
  max-width: 70%;
  flex-wrap: wrap;
  margin: 5px;
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
  justify-content: space-between;
  margin: 15px;
  width: 95%;
  border: 1px solid #888585;
  border-radius: 10px;
  height: 37px;
`;

const Message = styled.textarea`
  border: none;
  background: none;
  width: auto;
  letter-spacing: 0.5px;
  width: 80%;
  overflow: hidden;
  outline: none;
  height: auto;
  padding: 5px;
  resize: none;
`;
const Button = styled.button`
  border: none;
  background: none;
  color: white;
  letter-spacing: 0.7px;
`;

const Chat = () => {
  const [compo, setCompo] = useState("edit");
  const render = (prop) => {
    setCompo(prop);
  };
  return (
    <Container>
      <Topbar />
      <Wrapper>
        <Left>
          <CurrentUser>
            <Username>devesh_shakya</Username>
          </CurrentUser>
          <LeftItem>
            <SideItem onClick={() => render("edit")}>
              <ColName>User1</ColName>
            </SideItem>
            <SideItem onClick={() => render("web")}>
              <ColName>User2</ColName>
            </SideItem>
            <SideItem>
              <ColName>User3</ColName>
            </SideItem>
            <SideItem>
              <ColName>User4</ColName>
            </SideItem>
            <SideItem onClick={() => render("privacy")}>
              <ColName>User5</ColName>
            </SideItem>
            <SideItem>
              <ColName>User6</ColName>
            </SideItem>
            <SideItem>
              <ColName>User7</ColName>
            </SideItem>
            <SideItem>
              <ColName>User7</ColName>
            </SideItem>
            <SideItem>
              <ColName>User7</ColName>
            </SideItem>
            <SideItem>
              <ColName>User7</ColName>
            </SideItem>
            <SideItem>
              <ColName>User7</ColName>
            </SideItem>
            <SideItem>
              <ColName>User7</ColName>
            </SideItem>
            <SideItem>
              <ColName>User7</ColName>
            </SideItem>
            <SideItem>
              <ColName>User7</ColName>
            </SideItem>
            <SideItem>
              <ColName>User7</ColName>
            </SideItem>
          </LeftItem>
        </Left>
        <Right>
          <ChatUser>
            <Image src="https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=870&q=80" />
            <ChatUsername>User</ChatUsername>
          </ChatUser>
          <Chats>
            <ChatBox>
              <ChatIs>Lorem ipsum dolor sit</ChatIs>
            </ChatBox>
            <ChatBox>
              <ChatIs>Hey David</ChatIs>
            </ChatBox>
            <ChatBox>
              <ChatIs>Hey David</ChatIs>
            </ChatBox>
            <ChatBox>
              <ChatIs>tum log batao yr kya krna h</ChatIs>
            </ChatBox>
            <ChatBox>
              <ChatIs>tum log batao yr kya krna h</ChatIs>
            </ChatBox>
            <ChatBox>
              <ChatIs>tum log batao yr kya krna h</ChatIs>
            </ChatBox>
            <ChatBox>
              <ChatIs>tum log batao yr kya krna h</ChatIs>
            </ChatBox>
            <ChatBox>
              <ChatIs>tum log batao yr kya krna h</ChatIs>
            </ChatBox>
            <ChatBox>
              <ChatIs>tum log batao yr kya krna h</ChatIs>
            </ChatBox>
            <ChatBox>
              <ChatIs>tum log batao yr kya krna h</ChatIs>
            </ChatBox>
            <ChatBox>
              <ChatIs>tum log batao yr kya krna h</ChatIs>
            </ChatBox>
            <ChatBox>
              <ChatIs>tum log batao yr kya krna h</ChatIs>
            </ChatBox>
            <ChatBox>
              <ChatIs>tum log batao yr kya krna h</ChatIs>
            </ChatBox>
          </Chats>
          <MessageBox>
            <MoodTwoTone
              style={{
                height: "28px",
                width: "28px",
                color: "#dacece",
                marginTop: "2px",
                marginLeft: "4px",
              }}
            />
            <Message placeholder="Message"></Message>
            <Button>Send</Button>
          </MessageBox>
        </Right>
      </Wrapper>
    </Container>
  );
};

export default Chat;
