import React from "react";
import styled from "styled-components";
import { TC, Privacy } from "./language";

const LegalWrapper = styled.div`
  margin: 1em;
`;

export class LegalPage extends React.Component {
  render() {
    return (
      <LegalWrapper>
        <h1>Terms & Conditions</h1>
        <p>{TC}</p>
        <h1>Privacy Policy</h1>
        <p>{Privacy}</p>
      </LegalWrapper>
    );
  }
}
