import React, { useState } from "react";
import { Form, Button } from "react-bootstrap";
import styled from "styled-components";
import { mobile } from "../responsive";
import { useSelector } from "react-redux";
const Container = styled.div`
  flex: 2;
  margin: 20px 40px;
  letter-spacing: 1px;
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
const Websites = () => {
  const [inputs, setInputs] = useState({});
  const { currUser } = useSelector((state) => state.user);
  const handleChanges = (e) => {
    setInputs((prev) => {
      return { ...prev, [e.target.name]: e.target.value };
    });
  };
  console.log(inputs);

  const submitHandler = (e) => {
    e.preventDefault();
    if (!inputs) {
      return;
    }
    //HANDLE BACK END
  };
  return (
    <Container>
      <User>
        <ProfileImage
          src={
            currUser.profileImg == null || "null"
              ? "https://w7.pngwing.com/pngs/340/946/png-transparent-avatar-user-computer-icons-software-developer-avatar-child-face-heroes-thumbnail.png"
              : currUser.profileImg
          }
        />
        <Username>Devesh Shakya</Username>
      </User>
      <Form onSubmit={submitHandler}>
        <Form.Group className="mb-3" controlId="formBasicEmail">
          <Form.Label>LinkedIn Profile</Form.Label>
          <Form.Control
            name="linkedIn"
            style={{ fontFamily: "Verdana" }}
            type="string"
            placeholder="add linkedIn profile"
            onChange={handleChanges}
          />
        </Form.Group>

        <Form.Group className="mb-3" controlId="formBasicPassword">
          <Form.Label>Github</Form.Label>
          <Form.Control
            name="github"
            style={{ fontFamily: "Verdana" }}
            type="string"
            placeholder="add github account"
            onChange={handleChanges}
          />
        </Form.Group>
        <Form.Group className="mb-3" controlId="formBasicPassword">
          <Form.Label>Facebook</Form.Label>
          <Form.Control
            name="facebook"
            style={{ fontFamily: "Verdana" }}
            type="string"
            placeholder="add facebook account"
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
  );
};

export default Websites;
