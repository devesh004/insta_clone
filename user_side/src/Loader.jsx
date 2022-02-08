import React from "react";
import { Spinner } from "react-bootstrap";

const Loader = () => {
  return (
    <>
      <Spinner animation="border" variant="primary" />
      <Spinner animation="border" variant="success" />
      <Spinner animation="border" variant="danger" />
    </>
  );
};

export default Loader;
