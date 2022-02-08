import React from "react";
import styled from "styled-components";
import { mobile } from "../responsive";

const Container = styled.div`
  flex: 2;
  margin: 20px;
  letter-spacing: 1px;
  ${mobile({ margin: "10px" })}
`;
const Item = styled.div``;
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
const Head = styled.span`
  font-size: 15px;
  ${mobile({ fontSize: "14px" })}
`;
const Details = styled.p`
  color: #3d3a3a;
  font-size: 14px;
  ${mobile({ fontSize: "13px" })}
`;

const PrivacyAndSecurity = () => {
  return (
    <Container>
      <Item>
        <Title>Account Privacy</Title>
        <Check>
          <CheckBox type="checkbox" />
          <Head>Private Account</Head>
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
          <CheckBox type="checkbox" />
          <Head>Show Activity Status</Head>
        </Check>
        <Details>
          Allow accounts you follow and anyone you message to see when you were
          last active on Instagram apps. When this is turned off, you won't be
          able to see the activity status of other accounts.
        </Details>
        <hr />
      </Item>
      <Item>
        <Title>Story Sharing</Title>
        <Check>
          <CheckBox type="checkbox" />
          <Head>Allow Sharing</Head>
        </Check>
        <Details>Let people share your story as messages</Details>
      </Item>
    </Container>
  );
};

export default PrivacyAndSecurity;
