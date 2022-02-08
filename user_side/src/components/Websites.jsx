import React from "react";
import { Form, Button } from "react-bootstrap";
import styled from "styled-components";
import { mobile } from "../responsive";
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
  return (
    <Container>
      <User>
        <ProfileImage src="https://images.unsplash.com/photo-1441786485319-5e0f0c092803?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1887&q=80" />
        <Username>Devesh Shakya</Username>
      </User>
      <Form>
        <Form.Group className="mb-3" controlId="formBasicEmail">
          <Form.Label>LinkedIn Profile</Form.Label>
          <Form.Control
            style={{ fontFamily: "Verdana" }}
            type="string"
            placeholder="add linkedIn profile"
          />
        </Form.Group>

        <Form.Group className="mb-3" controlId="formBasicPassword">
          <Form.Label>Github</Form.Label>
          <Form.Control
            style={{ fontFamily: "Verdana" }}
            type="string"
            placeholder="add github account"
          />
        </Form.Group>
        <Form.Group className="mb-3" controlId="formBasicPassword">
          <Form.Label>Facebook</Form.Label>
          <Form.Control
            style={{ fontFamily: "Verdana" }}
            type="string"
            placeholder="add facebook account"
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
