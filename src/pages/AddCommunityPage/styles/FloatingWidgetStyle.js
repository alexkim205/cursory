import styled from "styled-components";
import posed from "react-pose";
import { theme } from "../../../_styles";

export const FloatingWidgetWrapper = posed(styled.div`
  background-color: red;
  display: flex;
  flex-direction: row;
  position: fixed;
  right: 100px;
  top: 100px;
  padding: 0 1em;
  border-radius: 5px;
`)({});

export const FloatingWidgetItemWrapper = posed(styled.div`
  // background-color: blue;
  display: flex;
  justify-content: center;
  align-items: center;
  width: 50px;
  height: 50px;
`)({});

export const FloatingWidgetDropdownWrapper = posed(styled.div`
  background-color: green;
  position: absolute;
  display: flex;
  flex-direction: column;
  flex-wrap: wrap;
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
  // height: 190px;
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

export const FloatingWidgetDropdownItemWrapper = posed(styled.div`
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
  enter: {
    // x: 0,
    // opacity: 1,
  },
  exit: {
    // x: 20,
    // opacity: 0,
  },
});
