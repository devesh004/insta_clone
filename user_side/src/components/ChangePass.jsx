import React from "react";
import { useState } from "react";
import { Form, Button, Alert } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import styled from "styled-components";
import { editUser } from "../redux/apiCalls/userCalls";
import { mobile } from "../responsive";
const Container = styled.div`
  flex: 2;
  margin: 20px 40px;
  letter-spacing: 1px;
  overflow: hidden;
  overflow-y: scroll;
  margin-right: -320px;
  padding-right: 320px;
  ${mobile({ margin: "10px 10px" })}
`;
const User = styled.div`
  display: flex;
  align-items: center;
  margin: 20px;
`;
const ProfileImage = styled.img`
  height: 50px;
  width: 50px;
  border-radius: 50%;
  margin-right: 30px;
  object-fit: cover;
`;
const Username = styled.span``;

const ChangePass = () => {
  const [inputs, setInputs] = useState({});
  const [validated, setValidated] = useState(false);
  const dispatch = useDispatch();
  const [show, setShow] = useState(false);
  const { currUser, fetching } = useSelector((state) => state.user);
  const handleChanges = (e) => {
    setInputs((prev) => {
      return { ...prev, [e.target.name]: e.target.value };
    });
  };
  console.log(inputs);

  const submitHandler = (e) => {
    const form = e.currentTarget;
    e.preventDefault();
    if (form.checkValidity() === false) {
      e.stopPropagation();
    }
    setValidated(true);
    if (inputs.newPass !== inputs.confirmPass) {
      setShow(true);
    } else {
      const pass = {
        oldPass: inputs.oldPass,
        newPass: inputs.newPass,
        username: currUser.username,
        type: "changePass",
      };
      const id = currUser.id;
      editUser(dispatch, id, pass);
    }
  };
  return (
    <>
      <Container>
        {show && (
          <Alert
            variant="danger"
            onClose={() => setShow(false)}
            dismissible
            style={{ height: "80px", marginRight: "20px" }}
          >
            <p>Passwords does not match</p>
          </Alert>
        )}
        <User>
          <ProfileImage
            src={
              currUser.profileImg == null || "null"
                ? "https://w7.pngwing.com/pngs/340/946/png-transparent-avatar-user-computer-icons-software-developer-avatar-child-face-heroes-thumbnail.png"
                : currUser.profileImg
            }
          />
          <Username>{currUser.username}</Username>
        </User>
        <Form onSubmit={submitHandler} noValidate validated={validated}>
          <Form.Group className="mb-3" controlId="formBasicEmail">
            <Form.Label>Old Password</Form.Label>
            <Form.Control
              required
              style={{ fontFamily: "Verdana" }}
              type="password"
              name="oldPass"
              placeholder="Old Password"
              onChange={handleChanges}
            />
          </Form.Group>

          <Form.Group className="mb-3" controlId="formBasicPassword">
            <Form.Label>New Password</Form.Label>
            <Form.Control
              required
              style={{ fontFamily: "Verdana" }}
              type="password"
              name="newPass"
              placeholder="Password"
              onChange={handleChanges}
            />
          </Form.Group>
          <Form.Group className="mb-3" controlId="formBasicPassword">
            <Form.Label>Confirm New Password</Form.Label>
            <Form.Control
              required
              type="password"
              style={{ fontFamily: "Verdana" }}
              name="confirmPass"
              placeholder="Password"
              onChange={handleChanges}
            />
          </Form.Group>
          <Button
            variant="primary"
            type="submit"
            style={{ letterSpacing: "1px" }}
          >
            Submit
          </Button>
        </Form>
      </Container>
    </>
  );
};

export default ChangePass;
