import React, { useState } from "react";
import styled from "styled-components";
import Topbar from "../components/Topbar";
import { Modal } from "react-bootstrap";
import { AddComment, FavoriteBorder, MoodTwoTone } from "@material-ui/icons";
import { mobile } from "../responsive";
import { useSelector } from "react-redux";
import { useLocation } from "react-router-dom";
import { useEffect } from "react";
import { userRequest } from "../requestMethod";
import PostModal from "../components/PostModal";
import { handleFollows } from "../redux/apiCalls/userCalls";
const Container = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  color: #dfd3d3;
  letter-spacing: 1px;
`;
const Wrapper = styled.div`
  width: 70%;
  display: flex;
  justify-content: center;
  flex-direction: column;
  align-items: center;
  ${mobile({ marginTop: "-30px", width: "100%" })}
`;
const UserDetails = styled.div`
  margin-top: 100px;
  width: 60%;
  display: flex;
`;
const Left = styled.div`
  flex: 2;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  margin-right: 40px;
  ${mobile({ marginTop: "-5px", marginLeft: "10px" })}
`;
const Image = styled.img`
  height: 150px;
  width: 150px;
  border-radius: 50%;
  object-fit: cover;
  ${mobile({ height: "50px", width: "50px" })}
`;
const Name = styled.span`
  font-size: 20px;
  font-weight: bold;
  ${mobile({ fontSize: "18px", marginLeft: "15px" })}
`;
const Right = styled.div`
  flex: 3;
  display: flex;
  justify-content: center;
  flex-direction: column;
  align-items: center;
`;
const Update = styled.div`
  display: flex;
  justify-content: space-around;
`;
const Username = styled.span`
  font-weight: bolder;
  font-size: 22px;
  margin-right: 10px;
  ${mobile({ fontSize: "18px" })}
`;
const AccountDet = styled.div`
  display: flex;
  justify-content: space-around;
  font-weight: 600;
  letter-spacing: 1px;
`;
const Followers = styled.span`
  margin: 10px;
  ${mobile({ fontSize: "14px" })}
`;
const Following = styled.span`
  margin: 10px;
  ${mobile({ fontSize: "14px" })}
`;
const Posts = styled.span`
  margin: 10px;
  ${mobile({ fontSize: "14px" })}
`;
const Number = styled.span`
  font-weight: bolder;
`;
const UserPosts = styled.div`
  display: flex;
  justify-content: space-around;
  flex-wrap: wrap;
  margin: 5px;
  ${mobile({ marginTop: "30px" })}
`;
const Photo = styled.img`
  width: 25%;
  margin: 5px;
  flex: 1;
  height: 300px;
  object-fit: cover;
  cursor: pointer;
  ${mobile({ height: "120px" })}
`;
const Status = styled.button`
  display: block;
  letter-spacing: 0.8px;
  color: #3d3a3d;
  :hover {
    color: #dfd3d3;
    background-color: #94268e;
  }
  ${mobile({ width: "80%", marginTop: "-3px" })}
`;
const CommentBody = styled.span`
  font-weight: 600;
  font-size: 14px;
  letter-spacing: 0.8px;
`;
const UserComment = styled.div`
  display: flex;
`;
const UserImage = styled.img`
  height: 50px;
  width: 50px;
  margin: 8px;
  border-radius: 50%;
`;
const CommentItem = styled.div`
  width: 100%;
  display: flex;
  align-items: center;
`;
const CommentUser = styled.span`
  font-weight: bolder;
  font-size: 18px;
  margin-right: 5px;
  width: 100%;
`;
const Comments = styled.div`
  display: flex;
  flex-direction: column;
  overflow: scroll;
  overflow-x: hidden;
  height: 89%;
  margin-right: -320px;
  padding-right: 320px;
`;
const CurrentUser = styled.div`
  display: flex;
  align-items: center;
  height: 10px;
`;
const ComImage = styled.img`
  height: 50px;
  width: 50px;
  border-radius: 50%;
  margin-right: 7px;
  object-fit: cover;
`;
const ComUserName = styled.span``;
const Button = styled.button`
  color: #3d3a3d;
  :hover {
    color: #dfd3d3;
    background-color: #94268e;
  }
`;
const ModalImage = styled.img`
  width: 58%;
  object-fit: cover;
`;

const ModalBody = styled.div`
  height: 70vh;
`;
const Wrapper2 = styled.div``;

const CommentHere = styled.div`
  width: 37.2%;
  margin: 6px;
  margin-right: 15px;
  display: flex;
  border-top: 1px solid #888181;
  align-items: center;
  padding: 10px;
  position: fixed;
  bottom: 0px;
  /* background-color: #dfd3d3; */
  margin-bottom: 32px;
`;

const CommentText = styled.input`
  height: 100%;
  width: 90%;
  margin-left: 10px;
  background: none;
  color: white;
  outline: none;
  border: none;
  letter-spacing: 1px;
`;

const CommentDet = styled.div`
  display: flex;
  flex-direction: column;
  position: relative;
`;

const User = () => {
  const [pos, setPos] = useState(null);
  const userId = useLocation().pathname.split("/")[2];
  const { currUser } = useSelector((state) => state.user);
  const [user, setUser] = useState(null);
  const [stat, setStat] = useState(null);
  const currentId = currUser.id;

  useEffect(() => {
    console.log(currentId);
    const findData = async () => {
      try {
        const res = await userRequest.post(`/users/user/${userId}`, {
          currentId,
        });
        console.log("RES DATA ", res.data);
        setUser(res.data);
      } catch (err) {
        console.log(err);
      }
    };
    findData();
  }, []);

  const handleHide = () => {
    setPos(null);
  };

  const handleFollow = async () => {
    if (userId == currentId) {
      return;
    }
    console.log("Moved ");
    const res = handleFollows(userId, currentId);
    const f = user.followers;
    if (user.status === 1) {
      setUser((prev) => ({ ...prev, status: 0, followers: f - 1 }));
    } else {
      setUser((prev) => ({ ...prev, status: 1, followers: f + 1 }));
    }
  };

  console.log(user?.user.profileImg);
  return (
    <>
      <Container>
        <Topbar />
        {user !== null && (
          <Wrapper>
            <UserDetails>
              <Left>
                <Image
                  src={
                    user.user.profileImg === "null" || null
                      ? "https://w7.pngwing.com/pngs/340/946/png-transparent-avatar-user-computer-icons-software-developer-avatar-child-face-heroes-thumbnail.png"
                      : user.user.profileImg
                  }
                />
                <Name>{user.user.fullName}</Name>
              </Left>
              <Right>
                <Update>
                  <Username>{user.user.username}</Username>
                  <Button>Update Profile</Button>
                </Update>
                <AccountDet>
                  <Followers>
                    <Number>{user.followers}</Number> followers
                  </Followers>
                  <Following>
                    <Number>{user.following}</Number> following
                  </Following>
                  <Posts>
                    <Number>{user.posts.length}</Number> posts
                  </Posts>
                </AccountDet>
                {userId == currentId ? null : (
                  <Status onClick={handleFollow}>
                    {user.status === 1 ? "Following" : "Follow"}
                  </Status>
                )}
              </Right>
            </UserDetails>
            <UserPosts>
              {user.posts.map((post) => (
                <Photo
                  key={post.id}
                  src={JSON.parse(JSON.parse(post.image_urls)[0])}
                  onClick={() =>
                    setPos({ post_Id: post.id, ...post, ...user.user })
                  }
                />
              ))}
            </UserPosts>
            {pos && <PostModal post={pos} handleClose={handleHide} />}
          </Wrapper>
        )}
      </Container>
    </>
  );
};

export default User;
