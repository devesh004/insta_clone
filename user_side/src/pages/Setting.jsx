import React, { useState } from "react";
import styled from "styled-components";
import Topbar from "../components/Topbar";
import EditProfile from "../components/EditProfile";
import ChangePass from "../components/ChangePass";
import PrivacyAndSecurity from "../components/PrivacyAndSecurity";
import Websites from "../components/Websites";
import { mobile } from "../responsive";
import { useSelector } from "react-redux";
const Container = styled.div`
  width: 100%;
  display: flex;
  justify-content: center;
  color: black;
  margin-top: 57px;
  overflow-x: hidden;
  height: auto !important;
  min-height: 100%;
`;
const Wrapper = styled.div`
  width: 60%;
  display: flex;
  margin: 30px 0px;
  border: 1px solid #b3b9b9;
  position: sticky;
  height: 80vh;
  ${mobile({ width: "90%" })}
`;
const Left = styled.div`
  flex: 1;
  border-right: 1px solid #bbb8b8;
`;

const LeftItem = styled.div`
  display: flex;
  flex-direction: column;
`;
const SideItem = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  flex-wrap: wrap;
  height: 60px;
  cursor: pointer;
  :hover {
    background-color: #e9f3f3;
    border-left: 2.5px solid #41c9c9;
  }
  ${mobile({ justifyContent: "flexStart" })}
`;
const ColName = styled.span`
  color: #3d3a3d;
  font-weight: bolder;
  letter-spacing: 1px;
  ${mobile({ marginLeft: "5px" })}
`;

const Setting = () => {
  const [compo, setCompo] = useState("edit");
  const { currUser } = useSelector((state) => state.user);

  const render = (prop) => {
    setCompo(prop);
  };
  return (
    <Container>
      <Topbar />
      <Wrapper>
        <Left>
          <LeftItem>
            <SideItem onClick={() => render("edit")}>
              <ColName>Edit Profile</ColName>
            </SideItem>
            {currUser.username !== "guest" && (
              <SideItem onClick={() => render("pass")}>
                <ColName>Change Password</ColName>
              </SideItem>
            )}

            <SideItem onClick={() => render("web")}>
              <ColName>Your Websites</ColName>
            </SideItem>
            <SideItem>
              <ColName>Email and SMS</ColName>
            </SideItem>
            <SideItem>
              <ColName>Manage Contacts</ColName>
            </SideItem>
            <SideItem onClick={() => render("privacy")}>
              <ColName>Privacy and Security</ColName>
            </SideItem>
            <SideItem>
              <ColName>Login Activity</ColName>
            </SideItem>
            <SideItem>
              <ColName>Help</ColName>
            </SideItem>
          </LeftItem>
        </Left>
        {compo === "edit" && <EditProfile />}
        {compo === "pass" && <ChangePass />}
        {compo === "privacy" && <PrivacyAndSecurity />}
        {compo === "web" && <Websites />}
      </Wrapper>
    </Container>
  );
};

export default Setting;
