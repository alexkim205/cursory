import React from "react";
import PropTypes from "prop-types";
import styled from "styled-components";
import posed from "react-pose";
import { theme } from "../../_styles/index";

export const DropdownMenuWrapper = props => (
  <Perspective>
    <DropdownMenu {...props} />
  </Perspective>
);

const Perspective = styled.div`
  perspective: 1000px;
`;

const DropdownMenu = posed(styled.div`
  position: absolute;
  display: flex;
  flex-direction: column;
  justify-content: center;
  right: 0px;
  top: 40px;
  align-items: center;
  width: 250px;
  background-color: ${theme.colors.dark};
  transform-origin: center top;
  transform-style: preserve-3d;
  border-radius: 5px;
  box-shadow: ${theme.shadows.intense};
  // padding: 1em 0;
  height: 190px;
  z-index: 1000;

  &:after {
    bottom: 100%;
    right: 20%;
    border: solid transparent;
    content: " ";
    height: 0;
    width: 0;
    position: absolute;
    pointer-events: none;
    border-color: rgba(136, 183, 213, 0);
    border-bottom-color: #242e49;
    border-width: 15px;
    margin-left: -15px;
  }
`)({
  enter: {
    opacity: 1,
    rotateX: 0,
    transition: {
      opacity: { duration: 100 },
      rotateX: { duration: 200 },
    },
  },
  exit: {
    opacity: 0,
    rotateX: -30,
    transition: {
      opacity: { duration: 100 },
      rotateX: { duration: 200 },
    },
  },
});

export const DropdownMenuItemWrapper = posed(styled.div`
  display: flex;
  align-items: center;
  height: 40px;
  width: 100%;
  padding: 0.5em 2em;
  box-sizing: border-box;

  a {
    cursor: pointer;
    color: white;
  }
`)({
  hoverable: true,
  init: {
    backgroundColor: theme.colors.dark,
    transition: { duration: 100 },
  },
  hover: {
    backgroundColor: theme.colors.light_dark,
    transition: { duration: 100 },
  },
  enter: {
    y: 0,
    opacity: 1,
  },
  exit: {
    y: 20,
    opacity: 0,
  },
});
