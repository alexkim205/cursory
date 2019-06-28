import styled from "styled-components";
import posed from "react-pose";
import { theme } from "../../../../_styles";

export const FloatingWidgetWrapper = posed(styled.div`
  background-color: ${theme.colors.dark};
  display: flex;
  flex-direction: row;
  position: fixed;
  left: 20px;
  top: 20px;
  padding: 0 1em;
  border-radius: 5px;
`)({
});

export const FloatingWidgetItemWrapper = posed(styled.div`
  // background-color: blue;
  display: flex;
  justify-content: center;
  align-items: center;
  width: 50px;
  height: 50px;
  cursor: pointer;
  color: white;
`)({
  hoverable: true,
  init: {opacity: 0.5},
  hover: {opacity: 1}
});

export const FloatingWidgetDropdownWrapper = posed(styled.div`
  position: absolute;
  display: flex;
  flex-direction: row;
  flex-wrap: wrap;
  justify-content: left;
  top: 55px;
  padding: 2em 1em;
  left: 0;
  align-items: center;
  width: 430px;
  background-color: ${theme.colors.dark};
  transform-origin: center top;
  transform-style: preserve-3d;
  border-radius: 5px;
  box-shadow: ${theme.shadows.intense};
  // padding: 1em 0;
  // height: 190px;
  z-index: 1000;

  // &:after {
  //   bottom: 100%;
  //   left: 10%;
  //   border: solid transparent;
  //   content: " ";
  //   height: 0;
  //   width: 0;
  //   position: absolute;
  //   pointer-events: none;
  //   border-color: rgba(136, 183, 213, 0);
  //   border-bottom-color: #242e49;
  //   border-width: 15px;
  //   margin-left: -15px;
  // }
`)({
  enter: {
    opacity: 1,
    rotateX: 0,
    delayChildren: 10,
    staggerChildren: 10,
    transition: {
      opacity: { duration: 100 },
      rotateX: { duration: 200 },
    },
  },
  exit: {
    opacity: 0,
    rotateX: -30,
    delayChildren: 50,
    staggerChildren: 10,
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
  padding: 1em 2em;
  box-sizing: border-box;
  color: white;
  justify-content: space-between;
  width: 50%;
  
  .text {}
  .icon {}

  a {
    cursor: pointer;
    color: white;
  }
`)({
  enter: {
    x: 0,
    opacity: 1,
  },
  exit: {
    x: 20,
    opacity: 0,
  },
});
