import posed from "react-pose";
import styled from "styled-components";

export const ContentWrapper = posed(styled.div`
  display: flex;
  justify-content: center;
  align-items: center;

  flex-direction: column;
  height: 100%;
  width: 100%;
  box-sizing: border-box;
  padding: 50px;
  // background-color: pink;
`)({
  enter: {
    y: 0,
    opacity: 1,
    // delayChildren: 100,
    // staggerChildren: 100,
    transition: {
      default: { duration: 100 },
    },
  },
  exit: {
    opacity: 0,
    // staggerChildren: 100,
    y: -20,
    transition: {
      default: { duration: 80 },
    },
  },
});
