import {forwardRef} from 'react';
import styled from 'styled-components';
import posed from 'react-pose';
import {Link} from 'react-router-dom';

export const ToolbarWrapper = posed(styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
    align-content: flex-start;

    // background-color: chartreuse;
    height: 100%;
    width: 50px;
    z-index: 1000;
    border-right: 1px solid rgba(0,0,0,0.3);
`)({
  enter: {
    x: "0%",
    delayChildren: 50,
    // delay: 100,
    staggerChildren: 20,
    transition: {
      default: { duration: 200 }
    }
  },
  exit: {
    x: "-100%",
    // delay: 100,
    staggerChildren: 20,
    staggerDirection: -1,
    transition: {
      default: { duration: 200 }
    }
  }
});

export const ToolbarItemWrapper = posed(styled.button`
    background-color: white;
    /* margin: 1em; */
    width: 50px;
    height: 50px;
    border: none;
    padding: 0;
    margin: 5px auto;
    cursor: pointer;
    z-index: 1001;
    
`)({
  // entering and exiting stagger
  enter: {
    x: "0%",
    // opacity: 1,
    transition: {
      default: { duration: 200 }
    }
  },
  exit: {
    x: "-100%",
    // opacity: 0,
    transition: {
      default: { duration: 200 }
    }
  },

  // toggling buttons
  active: {
    opacity: 1,
    x: 5,
    // y: 0,
    // transition: ({i}) => ({delay: i*50})
  },
  inactive: {
    opacity: 0.5,
    x: 0,
  },
});
