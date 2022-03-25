import React from "react";
import { useState } from "react";
import styled from "styled-components";
import { mobile } from "../responsive";
import { Modal, Button } from "react-bootstrap";

const Container = styled.div`
  flex: 2;
  width: 100%;
  margin: 20px;
  letter-spacing: 1px;
  overflow: hidden;
  ${mobile({
    overflowY: "scroll",
    margin: "10px",
    marginRight: "0px",
  })};
`;

const Item = styled.div`
  width: 100%;
`;
const Title = styled.span`
  font-size: 22px;
  letter-spacing: 1.5px;
  ${mobile({ fontSize: "17px" })}
`;
const Check = styled.div`
  margin: 10px;
  display: flex;
  align-items: center;
`;
const CheckBox = styled.input`
  margin-right: 5px;
  height: 15px;
  width: 15px;
`;
const Head = styled.label`
  font-size: 15px;
  ${mobile({ fontSize: "14px" })}
`;
const Details = styled.p`
  color: #3d3a3a;
  font-size: 14px;
  ${mobile({ fontSize: "13px" })}
`;

const PrivacyAndSecurity = () => {
  const [show, setShow] = useState(false);
  const [message, setMessage] = useState("");
  const handleClick = (msg) => {
    setShow(true);
    console.log(msg);
    setMessage(msg);
  };
  return (
    <>
      {show && (
        <Modal
          show
          size="md"
          aria-labelledby="contained-modal-title-vcenter"
          centered
          onHide={() => setShow(false)}
        >
          <Modal.Header closeButton>
            <Modal.Title id="contained-modal-title-vcenter">
              Create Post
            </Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <h5 style={{ letterSpacing: "1px" }}>{message}</h5>
          </Modal.Body>
          <Modal.Footer>
            <Button variant="success" onClick={() => setShow(false)}>
              Confirm
            </Button>
            <Button size="md" onClick={() => setShow(false)}>
              Not Now
            </Button>
          </Modal.Footer>
        </Modal>
      )}
      <Container>
        <Item>
          <Title>Account Privacy</Title>
          <Check>
            <CheckBox
              type="checkbox"
              onClick={() =>
                handleClick("Do you want to change your accout privacy ?")
              }
              id="id1"
            />
            <Head htmlFor="id1">Private Account</Head>
          </Check>
          <Details>
            When your account is private, only people you approve can see your
            photos and videos on Instagram. Your existing followers won't be
            affected.
          </Details>
          <hr />
        </Item>
        <Item>
          <Title>Activity Status</Title>
          <Check>
            <CheckBox
              type="checkbox"
              onClick={() =>
                handleClick("You are changing your activity status !")
              }
              id="id2"
            />
            <Head htmlFor="id2">Show Activity Status</Head>
          </Check>
          <Details>
            Allow accounts you follow and anyone you message to see when you
            were last active on Instagram apps. When this is turned off, you
            won't be able to see the activity status of other accounts.
          </Details>
          <hr />
        </Item>
        <Item>
          <Title>Story Sharing</Title>
          <Check>
            <CheckBox
              type="checkbox"
              onClick={() =>
                handleClick("You are changing privacy of your story !")
              }
              id="id3"
            />
            <Head htmlFor="id3">Allow Sharing</Head>
          </Check>
          <Details>Let people share your story as messages</Details>
        </Item>
      </Container>
    </>
  );
};

export default PrivacyAndSecurity;
