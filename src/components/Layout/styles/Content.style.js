import posed from 'react-pose';
import styled from 'styled-components';

export const ContentWrapper = posed(styled.div`
    display: flex;
    flex-direction: column;
    height: 100%;
    width: 100%;
    padding: 50px;
    // background-color: pink;
`)({
  // Enter exit with route transition
  // enter: {
  //   x: "0%",
  // },
  // exit: {
  //   x: "-100%",
  // },


  enter: {
    y: 0,
    opacity: 1,
    // delayChildren: 100,
    // staggerChildren: 100,
    // transition: {
    //   default: { duration: 800 },
    // }
  },
  exit: {
    opacity: 0,
    // staggerChildren: 100,
    y: -20,
    // transition: {
    //   default: { duration: 800 },
    // }
  }
});
