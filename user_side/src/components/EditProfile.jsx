import React, { useState } from "react";
import { Form, Button } from "react-bootstrap";
import styled from "styled-components";
import { editUser, registerUser } from "../redux/apiCalls/userCalls";
import { useDispatch, useSelector } from "react-redux";
import { mobile } from "../responsive";
import {
  getStorage,
  ref,
  uploadBytesResumable,
  getDownloadURL,
} from "firebase/storage";
import app from "../firebase";
import LoaderSec from "../loaders/LoaderSec";
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

const EditProfile = () => {
  const { currUser, fetching } = useSelector((state) => state.user);
  const [inputs, setInputs] = useState({
    ...currUser,
    pWeb: currUser.websites !== null ? currUser.websites.pWeb || null : null,
  });
  const [file, setFile] = useState(null);
  const [validated, setValidated] = useState(false);
  const dispatch = useDispatch();

  const handleChanges = (e) => {
    setInputs((prev) => {
      return { ...prev, [e.target.name]: e.target.value };
    });
  };

  // console.log(inputs);

  const submitHandler = (e) => {
    const form = e.currentTarget;
    e.preventDefault();
    if (form.checkValidity() === false) {
      e.stopPropagation();
    }
    setValidated(true);
    if (file === null) {
      console.log("No Profile Image");
      const { pWeb, ...others } = inputs;
      const websites = { ...currUser.websites, pWeb };
      console.log(websites);
      const user = {
        ...others,
        profileImg:
          currUser.profileImg ||
          "https://w7.pngwing.com/pngs/340/946/png-transparent-avatar-user-computer-icons-software-developer-avatar-child-face-heroes-thumbnail.png",
        type: "edit",
        websites,
      };
      editUser(dispatch, currUser.id, user);
      return;
    }

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
          console.log(downloadURL);
          const { pWeb, ...others } = inputs;
          let webs = { ...JSON.parse(currUser.websites), pWeb };
          let websites = JSON.stringify(websites);
          console.log(websites);
          const user = {
            ...others,
            profileImg: downloadURL,
            type: "edit",
            websites,
          };
          editUser(dispatch, currUser.id, user);
        });
      }
    );
  };

  return (
    <>
      {fetching ? (
        <LoaderSec />
      ) : (
        <Container>
          <Wrapper>
            <Sec>
              <ProfileImage
                src={
                  currUser.profileImg == null || "null"
                    ? "https://w7.pngwing.com/pngs/340/946/png-transparent-avatar-user-computer-icons-software-developer-avatar-child-face-heroes-thumbnail.png"
                    : currUser.profileImg
                }
              />
              <Username>{currUser.username}</Username>
            </Sec>
            <Form onSubmit={submitHandler} noValidate validated={validated}>
              <Form.Group
                className="mb-3"
                controlId="formBasicName"
                style={{ fontFamily: "Verdana" }}
              >
                <Form.Label>Name</Form.Label>
                <Form.Control
                  required
                  type="text"
                  placeholder="Enter name"
                  name="fullName"
                  value={inputs.fullName}
                  onChange={handleChanges}
                />
              </Form.Group>
              {currUser.username !== "guest" && (
                <Form.Group
                  className="mb-3"
                  controlId="formBasicName"
                  style={{ fontFamily: "Verdana" }}
                >
                  <Form.Label>Username</Form.Label>
                  <Form.Control
                    required
                    type="text"
                    placeholder="Enter username"
                    name="username"
                    value={inputs.username}
                    onChange={handleChanges}
                  />
                </Form.Group>
              )}

              <Form.Group
                className="mb-3"
                controlId="formBasicEmail"
                style={{ fontFamily: "Verdana" }}
              >
                <Form.Label>Personal Website</Form.Label>
                <Form.Control
                  type="text"
                  placeholder="change or add your website"
                  name="pWeb"
                  value={inputs.pWeb}
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
                  value={inputs.phoneNo}
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
                  required
                  type="email"
                  placeholder="email"
                  name="email"
                  value={inputs.email}
                  onChange={handleChanges}
                />
              </Form.Group>
              <Form.Group
                className="mb-3"
                controlId="exampleForm.ControlTextarea1"
              >
                <Form.Label>Bio</Form.Label>
                <Form.Control
                  placeholder="say something"
                  as="textarea"
                  name="bio"
                  value={inputs.bio !== null ? inputs.bio : ""}
                  onChange={handleChanges}
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
              >
                Update
              </Button>
            </Form>
          </Wrapper>
        </Container>
      )}
    </>
  );
};

export default EditProfile;
