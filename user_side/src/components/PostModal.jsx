import {
  AddComment,
  Favorite,
  FavoriteBorder,
  MoodTwoTone,
} from "@material-ui/icons";
import React from "react";
import { useEffect } from "react";
import { useState } from "react";
import { Carousel, Modal } from "react-bootstrap";
import styled from "styled-components";
import { addComment } from "../redux/apiCalls/postCalls";
import { userRequest } from "../requestMethod";
import { useDispatch, useSelector } from "react-redux";

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
const ComUserName = styled.span`
  letter-spacing: 1.7px;
`;
const ModalBody = styled.div`
  height: 70vh;
`;
const ModalImage = styled.img`
  width: 100%;
  height: 450px;
  object-fit: cover;
`;
const CommentHere = styled.form`
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
  &::placeholder {
    color: #dfd3d3;
  }
`;
const CommentDet = styled.div`
  width: 42%;
  display: flex;
  flex-direction: column;
  position: relative;
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
  height: 40px;
  width: 40px;
  margin: 5px;
  border-radius: 50%;
  margin-right: 13px;
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
const CommentItem = styled.div`
  width: 100%;
  display: flex;
  align-items: center;
`;

const CommentUser = styled.span`
  font-weight: bolder;
  font-size: 16px;
  margin-right: 5px;
  width: 100%;
  color: white;
  letter-spacing: 1.5px;
`;

const Images = styled.div`
  width: 58%;
`;
const CommentIs = styled.span`
  font-size: 16px;
  font-weight: 400;
  letter-spacing: 1px;
`;
const Button = styled.button`
  border: none;
  text-decoration: none;
  background-color: transparent;
`;

const LikeComment = styled.span``;

const PostModal = (props) => {
  const [show, setShow] = useState(true);
  const [comments, setComments] = useState([]);
  const [comment, setComment] = useState("");
  const dispatch = useDispatch();
  const { currUser } = useSelector((state) => state.user);
  const post = props.post;
  // console.log("PHOTO_MODEl ", post);

  const handleHide = () => {
    setShow(false);
    props.handleClose();
  };

  const likeComment = (commentId, isLiked) => {
    const user_id = currUser.id;
    const res = userRequest.post("/posts/likeComment", {
      user_id,
      comment_id: commentId,
    });

    const index = comments.findIndex(
      (comment) => comment.comment_id === commentId
    );
    const newArr = [...comments];
    if (newArr[index].isLiked === 1) {
      newArr[index].isLiked = null;
    } else {
      newArr[index].isLiked = 1;
    }
    setComments(newArr);
  };

  useEffect(() => {
    const id = post.post_Id;
    // console.log(id);
    const user_id = currUser.id;
    const fetchComments = async () => {
      const res = await userRequest.get(
        `/posts/post/${id}/comments/${user_id}`
      );
      console.log(res.data);
      setComments(res.data);
    };
    fetchComments();
  }, []);

  const handleComment = (e, id) => {
    e.preventDefault();
    if (comment.length === 0) {
      return;
    }
    const username = currUser.username;
    const profileImg =
      currUser.profileImg ||
      "https://jpcprinting.co.uk/wp-content/uploads/2015/08/blank-profile.png";
    const body = { username, comment };
    addComment(dispatch, body, id);
    comments.push({ comment, username, profileImg });
    setComment("");
  };

  return (
    <Modal
      show={show}
      size="xl"
      style={{ marginTop: "10px" }}
      onHide={handleHide}
      dialogClassName="modal-90w"
      aria-labelledby="example-custom-modal-styling-title"
    >
      <Modal.Header closeButton>
        <Modal.Title
          id="example-custom-modal-styling-title"
          style={{ fontWeight: "bolder" }}
        >
          <CurrentUser>
            <ComImage
              src={
                post.profileImg === "null" || null
                  ? "https://jpcprinting.co.uk/wp-content/uploads/2015/08/blank-profile.png"
                  : post.profileImg
              }
            />
            <ComUserName>{post.username}</ComUserName>
          </CurrentUser>
        </Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <ModalBody style={{ display: "flex" }}>
          <Images>
            {JSON.parse(post.image_urls).length > 1 ? (
              <Carousel>
                {JSON.parse(post.image_urls).map((image, ind) => (
                  <Carousel.Item key={ind}>
                    <ModalImage src={JSON.parse(image)} />
                  </Carousel.Item>
                ))}
              </Carousel>
            ) : (
              <ModalImage src={JSON.parse(JSON.parse(post.image_urls)[0])} />
            )}
          </Images>
          <CommentDet>
            <Comments>
              {comments.map((comment) => (
                <CommentItem key={comment.comment_id}>
                  <UserImage
                    src={
                      comment.profileImg === "null" || null
                        ? "https://w7.pngwing.com/pngs/340/946/png-transparent-avatar-user-computer-icons-software-developer-avatar-child-face-heroes-thumbnail.png"
                        : comment.profileImg
                    }
                  />
                  <UserComment
                    style={{ display: "flex", flexDirection: "column" }}
                  >
                    <CommentBody>
                      <CommentUser>{comment.username}</CommentUser>
                      <CommentIs>{comment.comment}</CommentIs>
                      <LikeComment
                        onClick={() =>
                          likeComment(comment.comment_id, comment.isLiked)
                        }
                      >
                        {comment.isLiked === 1 ? (
                          <Favorite
                            style={{
                              height: "20px",
                              cursor: "pointer",
                              color: "red",
                            }}
                          />
                        ) : (
                          <FavoriteBorder
                            style={{
                              height: "20px",
                              cursor: "pointer",
                            }}
                          />
                        )}
                      </LikeComment>
                    </CommentBody>
                  </UserComment>
                </CommentItem>
              ))}
            </Comments>
            <CommentHere onSubmit={(e) => handleComment(e, post.post_Id)}>
              <MoodTwoTone style={{ height: "28px", width: "28px" }} />
              <CommentText
                placeholder="Comment here....."
                onChange={(e) => setComment(e.target.value)}
                value={comment}
              />
              <Button>
                <AddComment
                  style={{
                    cursor: "pointer",
                    marginLeft: "20px",
                    color: "#dfd3d3",
                  }}
                />
              </Button>
            </CommentHere>
          </CommentDet>
        </ModalBody>
      </Modal.Body>
    </Modal>
  );
};

export default PostModal;
