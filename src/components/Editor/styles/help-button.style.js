import React from "react";
import styled from "styled-components";
import { theme } from "../../../_styles";

export const StyledHelpButton = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  position: fixed;
  bottom: 50px;
  width: 40px;
  height: 40px;
  right: 50px;
  border-radius: 50%;
  background-color: white;
  // border: 1px solid black;
  -webkit-transition: color 400ms ease; /* Safari */
  transition: color 400ms ease;
  transform: scale(1.5);
  color: ${props =>
    props.isOpen ? theme.colors.gray : theme.colors.light_gray};
  cursor: default;

  &:hover {
    color: ${theme.colors.gray};
    // transform: scale(1.5);
  }
`;
