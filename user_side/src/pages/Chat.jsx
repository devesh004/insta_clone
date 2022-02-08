import React, { useState } from "react";
import styled from "styled-components";
import Topbar from "../components/Topbar";
import { mobile } from "../responsive";
const Container = styled.div`
  height: 100vh;
  width: 100%;
  display: flex;
  justify-content: center;
  margin-top: 57px;
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
`;

const LeftItem = styled.div`
  display: flex;
  flex-direction: column;
`;
const SideItem = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  flex-wrap: wrap;
  height: 60px;
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
  ${mobile({ marginLeft: "5px" })}
`;
const CurrentUser = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  height: 60px;
  background-color: #e9f3f3;
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
  font-weight: bolder;
`;
const Right = styled.div`
  flex: 2;
  display: flex;
  flex-direction: column;
`;
const ChatUser = styled.div`
  display: flex;
  align-items: center;
  height: 60px;
  background-color: #e9f3f3;
`;
const ChatUsername = styled.span`
  font-size: 18px;
  margin-left: 20px;
  font-weight: bolder;
  letter-spacing: 1px;
`;
const Chats = styled.div`
  display: flex;
  flex-direction: column;
  margin: 10px;
`;
const ChatBox = styled.span`
  height: 40px;
  margin: 5px;
`;
const ChatIs = styled.span`
  border: 2px solid #e9f3f3;
  padding: 10px;
  border-radius: 30%;
  background-color: #fbfdfd;
  font-size: 14px;
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
          </LeftItem>
        </Left>
        <Right>
          <ChatUser>
            <Image src="https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=870&q=80" />
            <ChatUsername>User</ChatUsername>
          </ChatUser>
          <Chats>
            <ChatBox>
              <ChatIs>Hey David</ChatIs>
            </ChatBox>
            <ChatBox>
              <ChatIs>Hey David</ChatIs>
            </ChatBox>
            <ChatBox>
              <ChatIs>Hey David</ChatIs>
            </ChatBox>
            <ChatBox>
              <ChatIs>Hey David</ChatIs>
            </ChatBox>
          </Chats>
        </Right>
      </Wrapper>
    </Container>
  );
};

export default Chat;
