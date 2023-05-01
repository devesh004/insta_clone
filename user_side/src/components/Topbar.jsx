import {
  AccountCircle,
  CloseOutlined,
  Search,
  Settings,
} from "@material-ui/icons";
import React, { useEffect, useRef, useState } from "react";
import {
  Navbar,
  Container,
  Nav,
  NavDropdown,
  Form,
  FormControl,
  Button,
  Modal,
} from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import styled from "styled-components";
import { logoutUser, searchUser } from "../redux/apiCalls/userCalls";
import CreatePost from "../pages/CreatePost";
import { blue } from "@material-ui/core/colors";

const Chat = styled.span`
  cursor: pointer;
  margin-right: 8px;
  font-size: 20px;
  font-weight: bolder;
  letter-spacing: 1px;
`;

const Image = styled.img`
  height: 35px;
  width: 35px;
  margin: 0px 20px;
`;

const SearchUsers = styled.div`
  height: 300px;
  width: 312px;
  background-color: #dfd3d3;
  border-radius: 10px;
  margin-top: 15px;
  margin-left: 1058px;
  margin-right: 10px;
  display: flex;
  flex-direction: column;
  overflow: hidden;
  overflow-y: auto;
  position: fixed;

  z-index: 3;
`;

const User = styled.div`
  height: 60px;
  display: flex;
  color: #424141;
  display: flex;
  align-items: center;
  cursor: pointer;
  margin: -40px 0px;
  padding: 5px;
  :nth-child(1) {
    margin-top: 40px;
  }
  :hover {
    background-color: #f3d5df;
  }
`;
const UserName = styled.span`
  color: #6d6969;
  letter-spacing: 1px;
`;

const UserImage = styled.img`
  height: 45px;
  width: 45px;
  border-radius: 50%;
  margin: 0px 15px;
  object-fit: cover;
`;

const Close = styled.div`
  height: 40px;
  width: 100%;
  position: fixed;
  margin-bottom: 10px;
`;
const Names = styled.div`
  height: 28px;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  font-size: 15px;
`;
const FullName = styled.span`
  letter-spacing: 1.2px;
`;

const Topbar = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { currUser } = useSelector((state) => state.user);
  const [modalShow, setModalShow] = useState(false);
  const [show, setShow] = useState(false);
  const [showUsers, setShowUsers] = useState([]);
  const [searchedUser, setSearchedUser] = useState("");

  const logOut = () => {
    logoutUser(dispatch);
    navigate("/");
  };

  // const handleChange = async () => {
  //   const input = searchedUserRef.current.value;
  //   console.log(input);
  //   if (input.length === 0) {
  //     setShowUsers([]);
  //     setShow(false);
  //     return;
  //   }
  //   setShow(true);
  //   const myfun=()=>{
  //     setTimeout(()=>{
  //       const res = await searchUser(input);
  //       setShowUsers(res);
  //     },200)
  //   }
  //   return ()=>clearTimeout(myfun);
  //   // searchedUserRef.current.value = "";
  // };
  useEffect(() => {
    if (searchedUser.length === 0) {
      setShowUsers([]);
      setShow(false);
      return;
    }
    setShow(true);
    const myfun = setTimeout(async () => {
      const res = await searchUser(searchedUser);
      setShowUsers(res);
    }, 200);
    return () => clearTimeout(myfun);
  }, [searchedUser]);

  return (
    <>
      <Navbar
        expand="sm"
        fixed="top"
        className="bg-primary"
        style={{
          height: "60px",
          marginBottom: "10px",
        }}
      >
        <Container fluid>
          <Navbar.Toggle aria-controls="navbarScroll" />
          <Navbar.Collapse id="navbarScroll">
            <Nav className="me-auto my-2 my-lg-0" navbarScroll>
              <Nav.Link href="/">Home</Nav.Link>
              {currUser && (
                <>
                  <Nav.Link href="/trending">Trending</Nav.Link>
                  <NavDropdown title="Account" id="navbarScrollingDropdown">
                    <NavDropdown.Item>
                      <Link
                        to={`/user/${currUser.id}`}
                        style={{
                          textDecoration: "none",
                          letterSpacing: "1.5px",
                          fontWeight: "300",
                        }}
                      >
                        <AccountCircle /> Profile
                      </Link>
                    </NavDropdown.Item>
                    <NavDropdown.Item>
                      <Link
                        to={`/settings/${currUser.id}`}
                        style={{
                          textDecoration: "none",
                          letterSpacing: "1.5px",
                          fontWeight: "300",
                        }}
                      >
                        <Settings /> Settings
                      </Link>
                    </NavDropdown.Item>
                    <NavDropdown.Divider />
                    <NavDropdown.Item onClick={logOut}>Logout</NavDropdown.Item>
                  </NavDropdown>
                </>
              )}
            </Nav>
            {currUser && (
              <>
                <>
                  <i
                    className="far fa-plus-square icon"
                    onClick={() => setModalShow(true)}
                  ></i>
                  <CreatePost
                    show={modalShow}
                    onHide={() => setModalShow(false)}
                  />
                </>
                <Link to="/chat" style={{ margin: "20px" }}>
                  <i className="fas fa-comment icon"></i>
                </Link>
              </>
            )}
            {!currUser && <Nav.Link href="/">Login</Nav.Link>}
            <Form className="d-flex">
              <FormControl
                type="search"
                placeholder="Search"
                className="me-2"
                aria-label="Search"
                style={{ fontWeight: " bolder ", letterSpacing: "0.8px" }}
                onChange={(e) => setSearchedUser(e.target.value)}
                value={searchedUser}
              />
              <Button
                style={{
                  backgroundColor: "#dfd3d3",
                  color: "black",
                  border: "none",
                }}
              >
                <i
                  class="fas fa-search"
                  style={{ color: "#3d3a3d", fontSize: "20px" }}
                ></i>
              </Button>
            </Form>
          </Navbar.Collapse>
        </Container>
      </Navbar>
      {show && (
        <SearchUsers onHide={() => setShow(false)}>
          <Close>
            <CloseOutlined
              style={{
                marginLeft: "270px",
                color: "#dfd3d3",
                cursor: "pointer",
                marginBottom: "-15px",
                backgroundColor: "#fa4783",
                borderRadius: "50%",
              }}
              onClick={() => setShow(false)}
            />
          </Close>
          {showUsers.map((user) => (
            <Link to={`/user/${user.id}`} style={{ textDecoration: "none" }}>
              <User key={user.id}>
                <UserImage
                  src={
                    user.profileImg == null || "null"
                      ? "https://w7.pngwing.com/pngs/340/946/png-transparent-avatar-user-computer-icons-software-developer-avatar-child-face-heroes-thumbnail.png"
                      : user.profileImg
                  }
                />
                <Names>
                  <FullName>{user.fullName}</FullName>
                  <UserName>{user.username}</UserName>
                </Names>
              </User>
            </Link>
          ))}
        </SearchUsers>
      )}
    </>
  );
};

export default Topbar;
// "#3d3a3d"
