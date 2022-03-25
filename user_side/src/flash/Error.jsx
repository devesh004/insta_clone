import React, { useState } from "react";
import { Alert } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { closeError } from "../redux/userReducers";

const Error = () => {
  const [show, setShow] = useState(true);
  const { error } = useSelector((state) => state.user);
  const dispatch = useDispatch();
  const closeHandler = () => {
    setShow(false);
    dispatch(closeError());
  };
  console.log(error);
  return (
    <>
      {error && show && (
        <Alert variant="danger" onClose={closeHandler} dismissible>
          {/* <Alert.Heading>{err}</Alert.Heading> */}
          <p>{error}</p>
        </Alert>
      )}
    </>
  );
};

export default Error;
