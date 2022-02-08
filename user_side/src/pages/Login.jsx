import React from "react";
import { useState } from "react";
import { Form, Button } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import styled from "styled-components";
import Loader from "../Loader";
import { loginUser } from "../redux/apiCalls/userCalls";
import { mobile } from "../responsive";

const Container = styled.div`
  display: flex;
  height: 100vh;
  width: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  letter-spacing: 1px;
`;

const Wrapper = styled.div`
  width: 40%;
  height: 60%;
  ${mobile({ width: "80%" })}
`;
const Buttons = styled.div`
  display: flex;
  justify-content: space-between;
  ${mobile({ flexDirection: "column" })}
`;

const Login = () => {
  const [username, setUsername] = useState("");
  const [userPass, setUserPass] = useState("");
  const fetching = useSelector((state) => state.user.fetching);
  const dispatch = useDispatch();
  const onClickHandler = (e) => {
    e.preventDefault();
    loginUser(dispatch, { userPass, username });
  };
  return (
    <Container>
      <Wrapper>
        {fetching && <Loader />}
        <Form>
          <Form.Group
            className="mb-3"
            controlId="formBasicEmail"
            style={{ fontFamily: "Verdana" }}
          >
            <Form.Label>Username</Form.Label>
            <Form.Control
              type="text"
              name="username"
              placeholder="Enter username"
              onChange={(e) => setUsername(e.target.value)}
            />
          </Form.Group>

          <Form.Group
            className="mb-3"
            controlId="formBasicPassword"
            style={{ fontFamily: "Verdana" }}
          >
            <Form.Label>Password</Form.Label>
            <Form.Control
              type="password"
              placeholder="Password"
              name="userPass"
              onChange={(e) => setUserPass(e.target.value)}
            />
          </Form.Group>
          <Form.Group className="mb-3" controlId="formBasicCheckbox">
            <Form.Check type="checkbox" label="Remember me over a month" />
          </Form.Group>
          <Buttons>
            <Button
              style={{ fontFamily: "Verdana", marginBottom: "10px" }}
              variant="primary"
              type="submit"
              onClick={onClickHandler}
            >
              Login
            </Button>
            <Link to="/register">
              <Button
                style={{ fontFamily: "Verdana", width: "100%" }}
                variant="success"
              >
                Don't have account
              </Button>
            </Link>
          </Buttons>
        </Form>
      </Wrapper>
    </Container>
  );
};

export default Login;
