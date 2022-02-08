import React, { useState } from "react";
import styled from "styled-components";
import Topbar from "../components/Topbar";
import { Modal } from "react-bootstrap";
import { FavoriteBorder } from "@material-ui/icons";
import { mobile } from "../responsive";
const Container = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
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
  display: flex;
`;
const Left = styled.div`
  flex: 1;
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
  :hover {
    color: white;
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
`;
const CurrentUser = styled.div`
  display: flex;
  align-items: center;
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
  :hover {
    color: white;
    background-color: #94268e;
  }
`;
const ModalImage = styled.img`
  width: 100%;
  object-fit: cover;
`;
const User = () => {
  const [src, setSrc] = useState("");
  const [show, setShow] = useState(false);

  const clickPhotoHandler = (e) => {
    setSrc(e.target.src);
    setShow(true);
  };
  return (
    <>
      <Container>
        <Topbar />
        <Wrapper>
          <UserDetails>
            <Left>
              <Image src="https://images.unsplash.com/photo-1568602471122-7832951cc4c5?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=2070&q=80" />
              <Name>Devesh Shakya</Name>
            </Left>
            <Right>
              <Update>
                <Username>devesh_04</Username>
                <Button>Update Profile</Button>
              </Update>
              <AccountDet>
                <Followers>
                  <Number>286</Number> followers
                </Followers>
                <Following>
                  <Number>304</Number> following
                </Following>
                <Posts>
                  <Number>6</Number> posts
                </Posts>
              </AccountDet>
              <Status>Following</Status>
            </Right>
          </UserDetails>

          <UserPosts>
            <Photo
              onClick={clickPhotoHandler}
              src="https://images.unsplash.com/photo-1568602471122-7832951cc4c5?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=2070&q=80"
            />
            <Photo
              onClick={clickPhotoHandler}
              src="https://images.unsplash.com/photo-1516321318423-f06f85e504b3?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=2070&q=80"
            />
            <Photo
              onClick={clickPhotoHandler}
              src="https://images.unsplash.com/photo-1516321318423-f06f85e504b3?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=2070&q=80"
            />
            <Photo
              onClick={clickPhotoHandler}
              src="https://images.unsplash.com/photo-1568602471122-7832951cc4c5?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=2070&q=80"
            />
            <Photo
              onClick={clickPhotoHandler}
              src="https://images.unsplash.com/photo-1568602471122-7832951cc4c5?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=2070&q=80"
            />
          </UserPosts>
        </Wrapper>
        <Modal
          style={{ marginTop: "30px" }}
          show={show}
          onHide={() => setShow(false)}
          dialogClassName="modal-90w"
          aria-labelledby="example-custom-modal-styling-title"
        >
          <Modal.Header closeButton>
            <Modal.Title
              id="example-custom-modal-styling-title"
              style={{ fontWeight: "bolder" }}
            >
              <CurrentUser>
                <ComImage src="https://images.unsplash.com/photo-1568602471122-7832951cc4c5?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=2070&q=80" />
                <ComUserName>devesh_shakya</ComUserName>
              </CurrentUser>
            </Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <ModalImage src={src} />
            <Comments>
              <CommentItem>
                <UserImage src="https://images.unsplash.com/photo-1570295999919-56ceb5ecca61?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1780&q=80" />
                <UserComment>
                  <CommentBody>
                    <CommentUser>Username</CommentUser>
                    This is a commentsfg ass fdbbfdbdrg dfgsdg vvbcvb vvdfv
                    dfsdf dgfbdfdss esrdh
                    <FavoriteBorder
                      style={{
                        height: "20px",
                        cursor: "pointer",
                      }}
                    />
                  </CommentBody>
                </UserComment>
              </CommentItem>
            </Comments>
          </Modal.Body>
        </Modal>
      </Container>
    </>
  );
};

export default User;
