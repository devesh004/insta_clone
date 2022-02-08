import React from "react";
import styled from "styled-components";
import Topbar from "../components/Topbar";

const Container = styled.div`
  height: 100vh;
  width: 100%;
  display: flex;
  justify-content: center;
  flex-direction: column;
  align-items: center;
`;

const Sticker = styled.img`
  height: 100%;
  width: 100%;
  object-fit: cover;
`;
const PageNotFound = () => {
  let currUser = true;
  return (
    <Container>
      {currUser && <Topbar />}
      <Sticker src="https://drudesk.com/sites/default/files/styles/blog_page_header_1088x520/public/2018-02/404-error-page-not-found.jpg?itok=YW-iShwf" />
    </Container>
  );
};

export default PageNotFound;
