import { AccountCircle, Search, Settings } from "@material-ui/icons";
import React from "react";
import {
  Navbar,
  Container,
  Nav,
  NavDropdown,
  Form,
  FormControl,
  Button,
} from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import styled from "styled-components";
import { logoutUser } from "../redux/apiCalls/userCalls";

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
const Topbar = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { currUser } = useSelector((state) => state.user);
  const logOut = () => {
    logoutUser(dispatch);
    navigate("/");
  };
  return (
    <Navbar
      expand="sm"
      fixed="top"
      className="bg-primary"
      style={{ height: "60px", marginBottom: "10px" }}
    >
      <Container fluid>
        <Navbar.Toggle aria-controls="navbarScroll" />
        <Navbar.Collapse id="navbarScroll">
          <Nav className="me-auto my-2 my-lg-0" navbarScroll>
            <Nav.Link href="/">Home</Nav.Link>
            <Nav.Link href="#action2">Trending</Nav.Link>

            <NavDropdown title="Account" id="navbarScrollingDropdown">
              <NavDropdown.Item href="/user/sgsdgsfdgsfdv">
                <AccountCircle /> Profile
              </NavDropdown.Item>
              <NavDropdown.Item href="/settings/3454354">
                <Settings /> Settings
              </NavDropdown.Item>
              <NavDropdown.Divider />
              <NavDropdown.Item onClick={logOut}>Logout</NavDropdown.Item>
            </NavDropdown>
          </Nav>
          <Link to="/chat">
            <Image src="https://purepng.com/public/uploads/large/black-plus-symbol-4oz.png" />
            <Image src="https://www.pinclipart.com/picdir/big/371-3715212_live-chat-clipart-chat-box-purple-chat-box.png" />
            <Image src="https://twemoji.maxcdn.com/2/svg/1f5f3.svg" />
          </Link>
          <Form className="d-flex">
            <FormControl
              type="search"
              placeholder="Search"
              className="me-2"
              aria-label="Search"
              style={{ fontWeight: " bolder ", letterSpacing: "0.8px" }}
            />
            <Button
              variant="dark"
              style={{
                backgroundColor: "#94268e",
                color: "white",
                border: "none",
              }}
            >
              <Search />
            </Button>
          </Form>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
};

export default Topbar;
