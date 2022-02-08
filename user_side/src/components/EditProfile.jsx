import React, { useState } from "react";
import { Form, Button } from "react-bootstrap";
import styled from "styled-components";
import { registerUser } from "../redux/apiCalls/userCalls";
import { useDispatch } from "react-redux";
import { mobile } from "../responsive";
import {
  getStorage,
  ref,
  uploadBytesResumable,
  getDownloadURL,
} from "firebase/storage";
import app from "../firebase";
const Container = styled.div`
  flex: 2;
  display: flex;
  width: 100%;
  letter-spacing: 1px;
  overflow: hidden;
  overflow-y: scroll;
  margin-right: -320px;
  padding-right: 320px;
  margin-bottom: 10px;
  ${mobile({ height: "auto !important", minHeight: "100%" })};
`;

const Wrapper = styled.div`
  width: 70%;
  margin: 20px;
  display: flex;
  flex-direction: column;
  ${mobile({ flexDirection: "column", marginTop: "10px", width: "85%" })}
`;
const Sec = styled.div`
  display: flex;
  margin-bottom: 20px;
  justify-content: center;
  align-items: center;
`;
const ProfileImage = styled.img`
  height: 50px;
  width: 50px;
  border-radius: 50%;
  object-fit: cover;
  margin-right: 20px;
`;

const Username = styled.span`
  font-size: 19px;
  letter-spacing: 1.5px;
`;

const Register = () => {
  const [inputs, setInputs] = useState({});
  const [file, setFile] = useState();
  const dispatch = useDispatch();
  const handleChanges = (e) => {
    setInputs((prev) => {
      return { ...prev, [e.target.name]: e.target.value };
    });
  };
  console.log(inputs);
  const submitHandler = (e) => {
    e.preventDefault();
    const fileName = new Date().getTime() + file.name;
    const storage = getStorage(app);
    const storageRef = ref(storage, fileName);

    const uploadTask = uploadBytesResumable(storageRef, file);

    // Register three observers:
    // 1. 'state_changed' observer, called any time the state changes
    // 2. Error observer, called on failure
    // 3. Completion observer, called on successful completion
    uploadTask.on(
      "state_changed",
      (snapshot) => {
        // Observe state change events such as progress, pause, and resume
        // Get task progress, including the number of bytes uploaded and the total number of bytes to be uploaded
        console.log("Total Size of Image ", snapshot.totalBytes);
        const progress =
          (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
        console.log("Upload is " + progress + "% done");
        switch (snapshot.state) {
          case "paused":
            console.log("Upload is paused");
            break;
          case "running":
            console.log("Upload is running");
            break;
          default:
        }
      },
      (error) => {
        // Handle unsuccessful uploads
      },
      () => {
        // Handle successful uploads on complete
        // For instance, get the download URL: https://firebasestorage.googleapis.com/...
        getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => {
          const user = { ...inputs, profileImg: downloadURL };
          registerUser(dispatch, user);
        });
      }
    );
  };

  return (
    <Container>
      <Wrapper>
        <Sec>
          <ProfileImage src="https://images.unsplash.com/photo-1441786485319-5e0f0c092803?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1887&q=80" />
          <Username>Devesh Shakya</Username>
        </Sec>
        <Form>
          <Form.Group
            className="mb-3"
            controlId="formBasicName"
            style={{ fontFamily: "Verdana" }}
          >
            <Form.Label>Name</Form.Label>
            <Form.Control
              type="text"
              placeholder="Enter name"
              name="fullName"
              onChange={handleChanges}
            />
          </Form.Group>
          <Form.Group
            className="mb-3"
            controlId="formBasicName"
            style={{ fontFamily: "Verdana" }}
          >
            <Form.Label>Username</Form.Label>
            <Form.Control
              type="text"
              placeholder="Enter username"
              name="username"
              onChange={handleChanges}
            />
          </Form.Group>
          <Form.Group
            className="mb-3"
            controlId="formBasicEmail"
            style={{ fontFamily: "Verdana" }}
          >
            <Form.Label>Personal Website</Form.Label>
            <Form.Control
              type="text"
              placeholder="change or add your website"
              name="website"
              onChange={handleChanges}
            />
          </Form.Group>
          <Form.Group
            className="mb-3"
            controlId="formBasicphone"
            style={{ fontFamily: "Verdana" }}
          >
            <Form.Label>Mobile Number</Form.Label>
            <Form.Control
              type="text"
              placeholder="Enter phone number"
              name="phoneNo"
              onChange={handleChanges}
            />
          </Form.Group>
          <Form.Group
            className="mb-3"
            controlId="formBasicPassword"
            style={{ fontFamily: "Verdana" }}
          >
            <Form.Label>Email</Form.Label>
            <Form.Control
              type="email"
              placeholder="email"
              name="email"
              onChange={handleChanges}
            />
          </Form.Group>
          <Form.Group className="mb-3" controlId="exampleForm.ControlTextarea1">
            <Form.Label>Bio</Form.Label>
            <Form.Control
              placeholder="say something"
              as="textarea"
              name="bio"
              style={{ fontFamily: "Verdana" }}
              rows={3}
            />
          </Form.Group>

          <Form.Group
            className="mb-3"
            controlId="formBasicImg"
            style={{ fontFamily: "Verdana" }}
          >
            <Form.Label>Change Profile Photo</Form.Label>
            <Form.Control
              type="file"
              style={{ border: "none" }}
              onChange={(e) => setFile(e.target.files[0])}
            />
          </Form.Group>
          <Button
            variant="primary"
            type="submit"
            style={{ letterSpacing: "1px" }}
            onClick={submitHandler}
          >
            Update
          </Button>
        </Form>
      </Wrapper>
    </Container>
  );
};

export default Register;
