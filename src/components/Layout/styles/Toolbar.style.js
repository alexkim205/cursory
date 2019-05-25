import styled from 'styled-components';
import posed from 'react-pose';

export const ToolbarWrapper = posed(styled.div`
    display: flex;
    flex-direction: row;

    background-color: white;
    height: 100%;
    width: 60px;
    z-index: 1000;
    border-right: 1px solid #F3F4F8;
    padding-top: 13px;
    box-sizing: border-box;
    
    .selector-container {
      width: 4px;
    }
    
    .icons-container {
      flex: 1;
      display: flex;
      flex-direction: column;
      align-items: center;
      align-content: flex-start;
      margin-right: 4px; // must be same as selector-container width
    }
`)({
  enter: {
    x: '0%',
    delayChildren: 50,
    // delay: 100,
    staggerChildren: 20,
    transition: {
      default: {duration: 200},
    },
  },
  exit: {
    x: '-100%',
    // delay: 100,
    staggerChildren: 20,
    staggerDirection: -1,
    transition: {
      default: {duration: 200},
    },
  },
});

export const ToolbarItemSelector = posed(styled.div`
  // position: absolute;
  height: 50px;
  width: 4px;
  background-color: #1E90FF;
  margin: 13px auto;
  border-top-right-radius: 5px;
  border-bottom-right-radius: 5px;
`)({
  visible: {
    // delay: 50,
    y: ({i}) => 50 * i + 2 * 13 * i, // height + 2 * margin of toolbaritemwrapper
    transition: {
      y: {ease:'easeInOut', duration: 300}
    }
  },
});

export const ToolbarItemWrapper = posed(styled.button`
    background-color: white;
    /* margin: 1em; */
    width: 50px;
    height: 50px;
    border: none;
    padding: 0;
    margin: 13px auto;
    cursor: pointer;
    z-index: 1001;
    
`)({
  // entering and exiting stagger
  enter: {
    x: '0%',
    // opacity: 1,
    transition: {
      default: {duration: 200},
    },
  },
  exit: {
    x: '-100%',
    // opacity: 0,
    transition: {
      default: {duration: 200},
    },
  },

  // toggling buttons
  active: {
    opacity: 1,
    color: '#1E90FF', // blue
    // x: 5,
    // y: 0,
    transition: {
      default: {duration: 200},
    },
  },
  inactive: {
    opacity: 0.5,
    color: '#A9A9A9', // gray
    transition: {
      default: {duration: 200},
    },
  },
});
