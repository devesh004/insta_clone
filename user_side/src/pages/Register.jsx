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
import { Link } from "react-router-dom";
const Container = styled.div`
  display: flex;
  height: 100vh;
  width: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  letter-spacing: 1px;
  ${mobile({ height: "auto !important", minHeight: "100%" })}
`;

const Wrapper = styled.div`
  width: 70%;
  margin: 5px;
  margin-top: 60px;
  display: flex;
  justify-content: center;
  ${mobile({ flexDirection: "column", marginTop: "10px", width: "85%" })}
`;

const Div1 = styled.div`
  flex: 1;
  margin: 10px;
`;
const Div2 = styled.div`
  flex: 1;
  margin: 10px;
`;

const Buttons = styled.div`
  display: flex;
  justify-content: space-between;
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
      <Form
        style={{
          width: "100%",
          display: "flex",
          justifyContent: "center",
          height: "100%",
        }}
      >
        <Wrapper>
          <Div1>
            <Form.Group
              className="mb-3"
              controlId="formBasicName"
              style={{ fontFamily: "Verdana" }}
            >
              <Form.Label>Full Name</Form.Label>
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
              <Form.Label>Email address</Form.Label>
              <Form.Control
                type="email"
                placeholder="Enter email"
                name="email"
                onChange={handleChanges}
              />
              <Form.Text className="text-muted">
                We'll never share your email with anyone else.
              </Form.Text>
            </Form.Group>
            <Form.Group
              className="mb-3"
              controlId="formBasicphone"
              style={{ fontFamily: "Verdana" }}
            >
              <Form.Label>Mobile Nunber</Form.Label>
              <Form.Control
                type="text"
                placeholder="Enter phone number"
                name="phoneNo"
                onChange={handleChanges}
              />
            </Form.Group>
          </Div1>
          <Div2>
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
                onChange={handleChanges}
              />
            </Form.Group>
            <Form.Group
              className="mb-3"
              controlId="formBasicPassword"
              style={{ fontFamily: "Verdana" }}
            >
              <Form.Label>Confirm Password</Form.Label>
              <Form.Control
                type="password"
                placeholder="Password"
                name="conPassword"
                onChange={handleChanges}
              />
            </Form.Group>
            <Form.Group
              className="mb-3"
              controlId="formBasicImg"
              style={{ fontFamily: "Verdana" }}
            >
              <Form.Label>Upload Profile Photo</Form.Label>
              <Form.Control
                type="file"
                style={{ border: "none" }}
                onChange={(e) => setFile(e.target.files[0])}
              />
            </Form.Group>
            <Buttons>
              <Button
                variant="success"
                type="submit"
                style={{ fontFamily: "Verdana" }}
                onClick={submitHandler}
              >
                Register
              </Button>
              <Link to="/">
                <Button style={{ fontFamily: "Verdana" }} variant="primary">
                  Have Account
                </Button>
              </Link>
            </Buttons>
          </Div2>
        </Wrapper>
      </Form>
    </Container>
  );
};

export default Register;
