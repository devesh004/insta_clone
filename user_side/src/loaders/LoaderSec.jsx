import React from "react";
import { Spinner } from "react-bootstrap";
import styled from "styled-components";
const Container = styled.div`
  display: flex;
  justify-content: center;
  margin-bottom: 12px;
`;
const LoaderSec = () => {
  return (
    <Container>
      <Spinner size="sm" animation="grow" variant="danger" />
      <Spinner
        size="sm"
        style={{ margin: "0px 7px" }}
        animation="grow"
        variant="success"
      />
      <Spinner size="sm" animation="grow" variant="primary" />
    </Container>
  );
};

export default LoaderSec;
