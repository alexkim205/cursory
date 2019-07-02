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
  top: 53px;
  padding: 2em 1em;
  align-items: center;
  background-color: ${theme.colors.dark};
  transform-origin: center top;
  transform-style: preserve-3d;
  border-radius: 5px;
  box-shadow: ${theme.shadows.intense};
  padding: 1em 0;
  z-index: 1000;
`)({
  open: {
    opacity: 1,
    rotateX: 0,
    delayChildren: 10,
    staggerChildren: 10,
    transition: {
      opacity: { duration: 100 },
      rotateX: { duration: 200 },
    },
  },
  closed: {
    opacity: 0,
    rotateX: -30,
    delayChildren: 50,
    staggerChildren: 10,
    transition: {
      opacity: { duration: 200 },
      rotateX: { duration: 200 },
    },
  },
});

export const AddableDropdownWrapper = styled(FloatingWidgetDropdownWrapper)`
    width: 430px;
    left: 0;
`;

export const SettingsDropdownWrapper = styled(FloatingWidgetDropdownWrapper)`
    width: 100%;
    left: 0;
`;

export const FloatingWidgetDropdownItemWrapper = posed(styled.div`
  display: flex;
  align-items: center;
  height: 40px;
  padding: 1em 2em;
  box-sizing: border-box;
  color: white;
  justify-content: space-between;
  width: 50%;
  cursor: pointer;
  
  .text {}
  .icon {}

`)({
  hoverable: true,
  init: { scale: 1 },
  hover: { scale: 1.1 },
  enter: {
    x: 0,
    opacity: 1,
  },
  exit: {
    x: 20,
    opacity: 0,
  },
});

export const AddableDropdownItemWrapper = styled(FloatingWidgetDropdownItemWrapper)`
  width: 50%;
`


export const SettingsDropdownItemWrapper = styled(FloatingWidgetDropdownItemWrapper)`
  width: 100%;
`
