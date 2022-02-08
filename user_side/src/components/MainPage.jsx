import React from "react";
import styled from "styled-components";
import {
  FavoriteBorder,
  AddComment,
  Comment,
  Send,
  MoodTwoTone,
} from "@material-ui/icons";
import { mobile } from "../responsive";
const Container = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  margin-top: 57px;
  color: black;
  /* background-color: #f0ebeb; */
`;
const Card = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  outline: 1px solid #c4c0c0;
  background-color: #fffdfd;
  margin: 20px;
  width: 50%;
  ${mobile({ width: "90%" })}
`;
const User = styled.div`
  display: flex;
  align-items: center;
  margin: 5px;
  ${mobile({ margin: "3px" })}
`;
const Username = styled.span`
  font-size: 18px;
  cursor: pointer;
  ${mobile({ fontSize: "16px" })}
`;
const UserImage = styled.img`
  height: 50px;
  width: 50px;
  border-radius: 50%;
  object-fit: cover;
  margin-right: 7px;
  cursor: pointer;
  ${mobile({ width: "40px", height: "40px" })}
`;
const Image = styled.img``;
const LikeComSend = styled.div`
  display: flex;
  flex-direction: column;
  height: 85px;
  margin-top: 5px;
`;
const Actions = styled.div`
  display: flex;
  justify-content: space-around;
  align-items: center;
`;
const Like = styled.span`
  display: flex;
  justify-content: space-around;
  align-items: center;
  cursor: pointer;
`;
const CommentTol = styled.span`
  display: flex;
  justify-content: space-around;
  align-items: center;
  cursor: pointer;
`;
const Share = styled.span`
  display: flex;
  justify-content: space-around;
  align-items: center;
  cursor: pointer;
`;

const CommentText = styled.input`
  height: 100%;
  width: 90%;
  margin-left: 10px;
  outline: none;
  border: none;
`;
const Details = styled.div`
  display: flex;
  justify-content: space-around;
  align-items: center;
  margin-top: 20px;
  letter-spacing: 0.8px;
  ${mobile({ margin: "10px", marginBottom: "10px" })}
`;
const LikeNo = styled.span`
  font-weight: 400;
  ${mobile({ marginLeft: "20px" })}
`;
const CommentNo = styled.span`
  font-weight: 400;
  cursor: pointer;
  ${mobile({ marginLeft: "40px" })}
`;
const TimeAgo = styled.span`
  font-weight: 400;
  ${mobile({ marginLeft: "15px" })}
`;

const CommentHere = styled.div`
  display: flex;
  border-top: 1px solid #ebe2e2;
  align-items: center;
  padding: 10px;
`;
const MainPage = () => {
  return (
    <Container>
      <Card>
        <User>
          <UserImage src="https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=870&q=80" />
          <Username>Devesh Shakya</Username>
        </User>
        <Image src="https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=870&q=80" />
        <LikeComSend>
          <Actions>
            <Like>
              <FavoriteBorder style={{ marginRight: "5px" }} /> Like
            </Like>
            <CommentTol>
              <Comment style={{ marginRight: "5px" }} />
              Comment
            </CommentTol>
            <Share>
              Send
              <Send style={{ marginLeft: "5px" }} />
            </Share>
          </Actions>
          <Details>
            <LikeNo>54 likes</LikeNo>
            <CommentNo>View 232 comments</CommentNo>
            <TimeAgo>5 hours ago</TimeAgo>
          </Details>
        </LikeComSend>
        <CommentHere>
          <MoodTwoTone
            style={{ height: "28px", width: "28px", color: "#888484" }}
          />
          <CommentText placeholder="Comment here....." />
          <AddComment
            style={{
              cursor: "pointer",
              marginLeft: "20px",
              color: "teal",
            }}
          />
        </CommentHere>
      </Card>
      <Card>
        <User>
          <UserImage src="https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=870&q=80" />
          <Username>Devesh Shakya</Username>
        </User>
        <Image src="https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=870&q=80" />
        <LikeComSend>
          <Actions>
            <Like>
              <FavoriteBorder style={{ marginRight: "5px" }} /> Like
            </Like>
            <CommentTol>
              <Comment style={{ marginRight: "5px" }} />
              Comment
            </CommentTol>
            <Share>
              Send
              <Send style={{ marginLeft: "5px" }} />
            </Share>
          </Actions>
          <Details>
            <LikeNo>54 likes</LikeNo>
            <CommentNo>View 232 comments</CommentNo>
            <TimeAgo>5 hours ago</TimeAgo>
          </Details>
        </LikeComSend>
        <CommentHere>
          <MoodTwoTone
            style={{ height: "28px", width: "28px", color: "#888484" }}
          />
          <CommentText placeholder="Comment here....." />
          <AddComment
            style={{
              cursor: "pointer",
              marginLeft: "20px",
              color: "teal",
            }}
          />
        </CommentHere>
      </Card>
      <Card>
        <User>
          <UserImage src="https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=870&q=80" />
          <Username>Devesh Shakya</Username>
        </User>
        <Image src="https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=870&q=80" />
        <LikeComSend>
          <Actions>
            <Like>
              <FavoriteBorder style={{ marginRight: "5px" }} /> Like
            </Like>
            <CommentTol>
              <Comment style={{ marginRight: "5px" }} />
              Comment
            </CommentTol>
            <Share>
              Send
              <Send style={{ marginLeft: "5px" }} />
            </Share>
          </Actions>
          <Details>
            <LikeNo>54 likes</LikeNo>
            <CommentNo>View 232 comments</CommentNo>
            <TimeAgo>5 hours ago</TimeAgo>
          </Details>
        </LikeComSend>
        <CommentHere>
          <MoodTwoTone
            style={{ height: "28px", width: "28px", color: "#888484" }}
          />
          <CommentText placeholder="Comment here....." />
          <AddComment
            style={{
              cursor: "pointer",
              marginLeft: "20px",
              color: "teal",
            }}
          />
        </CommentHere>
      </Card>
    </Container>
  );
};

export default MainPage;
