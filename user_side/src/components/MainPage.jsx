import React from "react";
import styled from "styled-components";
import {
  FavoriteBorder,
  AddComment,
  Comment,
  Send,
  MoodTwoTone,
  Favorite,
} from "@material-ui/icons";
import { mobile } from "../responsive";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { addComment, addLike, allPosts } from "../redux/apiCalls/postCalls";
import { format } from "timeago.js";
import { useState } from "react";
import InfiniteScroll from "react-infinite-scroll-component";
import { cleanUp } from "../redux/postReducers";
import LoaderSec from "../loaders/LoaderSec";
import { Carousel } from "react-bootstrap";
import PostModal from "./PostModal";
import { Link } from "react-router-dom";
// import InfiniteScroll from "redux-infinite-scroll";

// const Container = styled.div`
//   display: flex;
//   flex-direction: column;
//   justify-content: center;
//   align-items: center;
//   margin-top: 57px;
//   color: black;
//   /* background-color: #f0ebeb; */
// `;
const Card = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  outline: 1px solid #c4c0c0;
  background-color: #dfd3d3;
  /* background-color: #2ba5dd; */
  border-radius: 3px;
  color: #555;
  box-shadow: rgba(119, 41, 90, 0.4) 5px 5px, rgba(240, 46, 170, 0.3) 10px 10px,
    rgba(240, 46, 170, 0.2) 15px 15px, rgba(240, 46, 170, 0.1) 20px 20px,
    rgba(240, 46, 170, 0.05) 25px 25px;
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
  height: 40px;
  width: 40px;
  border-radius: 50%;
  object-fit: cover;
  margin-right: 7px;
  cursor: pointer;
  ${mobile({ width: "40px", height: "40px" })}
`;
const Image = styled.img`
  width: 100%;
  height: 600px;
  object-fit: cover;
  ${mobile({ height: "400px" })}
`;
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
  background: none;
  letter-spacing: 1px;
  outline: none;
  border: none;
  color: #444343;
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
  ${mobile({ marginLeft: "20px" })}
`;
const CommentNo = styled.span`
  cursor: pointer;
  ${mobile({ marginLeft: "40px" })}
`;
const TimeAgo = styled.span`
  ${mobile({ marginLeft: "15px" })}
`;
const Button = styled.button`
  border: none;
  text-decoration: none;
  background-color: transparent;
`;
const CommentHere = styled.form`
  display: flex;
  border-top: 1px solid #888181;
  align-items: center;
  padding: 10px;
`;

const MainPage = () => {
  const dispatch = useDispatch();
  const { posts } = useSelector((state) => state.post);
  const { currUser } = useSelector((state) => state.user);
  const [page, setPage] = useState(1);
  const [pos, setPos] = useState(null);
  const [comment, setComment] = useState("");
  const token = currUser.accessToken;

  useEffect(() => {
    dispatch(cleanUp());
  }, []);

  useEffect(() => {
    const id = currUser.id;
    // console.log("ID IS ", id);
    // console.log("TK  ", token);
    allPosts(dispatch, page, id);
  }, [dispatch, page, currUser]);

  // if (posts[0]) {
  // console.log(JSON.parse(posts[0].image_urls));
  // console.log(posts[0]);
  // for (let post of posts) {
  //   console.log(JSON.parse(JSON.parse(post.image_urls)[0]));
  // }
  // }

  const handleHide = () => {
    setPos(null);
  };

  const handleComment = (e, id) => {
    e.preventDefault();
    if (comment.length === 0) {
      return;
    }
    const username = currUser.username;
    const body = { username, comment };
    addComment(dispatch, body, id);
    setComment("");
  };
  const handleLike = (post, e) => {
    // console.log("CLICKED");

    const user_id = currUser.id;
    const id = post.post_Id;
    const l = post.isLiked;
    let like = -1;
    if (l === null) {
      like = 1;
    }
    addLike(dispatch, { user_id }, id, like);
  };
  return (
    <>
      <InfiniteScroll
        dataLength={posts.length}
        next={() => setPage((page) => page + 1)}
        hasMore={true}
        loader={<LoaderSec />}
        style={{
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          alignItems: "center",
          marginTop: "57px",
          color: "black",
          overflow: "hidden",
        }}
      >
        {posts.map((post) => (
          <>
            <Card key={post.post_Id}>
              <Link
                to={`/user/${post.user_id}`}
                style={{ textDecoration: "none", color: "#585656" }}
              >
                <User>
                  <UserImage
                    src={
                      post.profileImg === "null" || null
                        ? "https://w7.pngwing.com/pngs/340/946/png-transparent-avatar-user-computer-icons-software-developer-avatar-child-face-heroes-thumbnail.png"
                        : post.profileImg
                    }
                  />
                  <Username>{post.username}</Username>
                </User>
              </Link>
              {JSON.parse(post.image_urls).length > 1 ? (
                <Carousel>
                  {JSON.parse(post.image_urls).map((image, ind) => (
                    <Carousel.Item key={ind}>
                      <Image src={JSON.parse(image)} />
                    </Carousel.Item>
                  ))}
                </Carousel>
              ) : (
                <Image src={JSON.parse(JSON.parse(post.image_urls)[0])} />
              )}

              <LikeComSend>
                <Actions>
                  <Like onClick={(e) => handleLike(post, e)}>
                    {post.isLiked ? (
                      <Favorite style={{ marginRight: "5px" }} />
                    ) : (
                      <FavoriteBorder style={{ marginRight: "5px" }} />
                    )}
                    Like
                  </Like>
                  <CommentTol
                    onClick={() => {
                      setPos(post);
                    }}
                  >
                    <Comment style={{ marginRight: "5px" }} />
                    Comment
                  </CommentTol>
                  <Share>
                    Send
                    <Send style={{ marginLeft: "5px" }} />
                  </Share>
                </Actions>
                <Details>
                  <LikeNo>{post.likes} likes</LikeNo>
                  <CommentNo
                    onClick={() => {
                      setPos(post);
                    }}
                  >
                    {post.comments === 0
                      ? "No comment yet"
                      : `View all ${post.comments} comments`}
                  </CommentNo>
                  <TimeAgo>{format(post.created_at)}</TimeAgo>
                </Details>
              </LikeComSend>
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
                      // color: "#dfd3d3",
                    }}
                  />
                </Button>
              </CommentHere>
            </Card>
          </>
        ))}
      </InfiniteScroll>
      {pos && <PostModal handleClose={handleHide} post={pos} />}
    </>
  );
};

export default MainPage;
