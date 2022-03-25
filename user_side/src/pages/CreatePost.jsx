import React, { useState } from "react";
import { Modal, Button, Form, Alert, Collapse } from "react-bootstrap";
import { createPost } from "../redux/apiCalls/postCalls";
import { useDispatch, useSelector } from "react-redux";
import {
  getStorage,
  ref,
  uploadBytesResumable,
  getDownloadURL,
} from "firebase/storage";
import app from "../firebase";
import Loader from "../Loader";
import styled from "styled-components";
import { useNavigate } from "react-router-dom";

const LoadCon = styled.div`
  display: flex;
  justify-content: center;
  margin-top: 15px;
`;

const CreatePost = (props) => {
  const navigate = useNavigate();
  const user_id = useSelector((state) => state.user.currUser.id);
  const [files, setFiles] = useState([]);
  const [close, setClose] = useState(false);
  const [load, setLoad] = useState(false);
  const [caption, setCaption] = useState("");
  const dispatch = useDispatch();
  const onFileChange = (e) => {
    for (let i = 0; i < e.target.files.length; i++) {
      const newFile = e.target.files[i];
      newFile["id"] = Math.random();
      setFiles((prevState) => [...prevState, newFile]);
    }
  };

  const myfun = async (e) => {
    let promises = [];
    let url = [];
    files.forEach((file, ind) => {
      const fileName = new Date().getTime() + file.name;
      const storage = getStorage(app);
      const storageRef = ref(storage, fileName);

      const uploadTask = uploadBytesResumable(storageRef, file);
      promises.push(uploadTask);
      uploadTask.on(
        "state_changed",
        (snapshot) => {
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
        (err) => {
          // Handle unsuccessful uploads
        },
        async () => {
          await getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => {
            url.push(`"${downloadURL}"`);
            if (url.length === files.length) {
              console.log(typeof url);
              const post = { url, caption };
              JSON.stringify(post);
              createPost(dispatch, post, user_id);
            }
          });
        }
      );
    });

    Promise.all(promises)
      .then(() => {
        props.onHide();
        setClose(false);
        setFiles([]);
        setLoad(false);
        navigate("/");
        return;
      })
      .catch((err) => console.log(err));
  };
  const uploadFiles = async (e) => {
    e.preventDefault();
    if (files.length === 0) {
      setClose(true);
      return;
    }
    setLoad(true);
    const dUrls = await myfun(e);
  };
  const handleClick = () => {
    props.onHide();
    setClose(false);
    setFiles([]);
  };

  const closeHandler = () => {
    setClose(false);
  };
  return (
    <>
      <Modal
        {...props}
        size="md"
        aria-labelledby="contained-modal-title-vcenter"
        centered
        onHide={handleClick}
      >
        <LoadCon>{load && <Loader />}</LoadCon>
        {close && (
          <Alert variant="danger" onClose={closeHandler} dismissible>
            <h3>Please select a file</h3>
          </Alert>
        )}
        <Modal.Header closeButton>
          <Modal.Title id="contained-modal-title-vcenter">
            Create Post
          </Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <h4 style={{ letterSpacing: "1px" }}>Select from computer</h4>
          <Form.Group controlId="formFileMultiple" className="mb-3">
            <Form.Control
              type="file"
              multiple
              onClick={() => setFiles([])}
              onChange={onFileChange}
              style={{ fontFamily: "Verdana" }}
            />
          </Form.Group>
          <Form.Group controlId="formFileMultiple" className="mb-3">
            <Form.Control
              name="caption"
              type="text"
              placeholder="add caption"
              style={{ fontFamily: "Verdana" }}
              onChange={(e) => setCaption(e.target.value)}
            />
          </Form.Group>
        </Modal.Body>

        <Modal.Footer>
          <Button variant="success" onClick={uploadFiles}>
            Upload
          </Button>
          <Button onClick={handleClick} size="md">
            Cancel
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
};

export default CreatePost;
