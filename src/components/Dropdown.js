import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import posed from 'react-pose';
import {theme} from '../_styles';

export const DropdownMenuWrapper = props =>
    <Perspective>
      <DropdownMenu {...props}/>
    </Perspective>;

const Perspective = styled.div`
  perspective: 1000px;
`;

const DropdownMenu = posed(styled.div`
  position: absolute;
  display: flex;
  flex-direction: column;
  justify-content: center;
  right:  0px;
  top: 40px;
  align-items: center;
  width: 250px;
  background-color: ${theme.colors.dark};
  transform-origin: center top;
  transform-style: preserve-3d;
  border-radius: 5px;
  box-shadow: ${theme.shadow};
  // padding: 1em 0;
  height: 160px;
  
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
    border-bottom-color: #242E49;
    border-width: 15px;
    margin-left: -15px;
  }

`)({
  enter: {
    opacity: 1,
    rotateX: 0,
    transition: {
      opacity: {duration: 100},
      rotateX: {duration: 200}
    }
  },
  exit: {
    opacity: 0,
    rotateX: -30,
    transition: {
      opacity: {duration: 100},
      rotateX: {duration: 200}
    }
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
  enter: {
    // x: 0,
    // opacity: 1,
  },
  exit: {
    // x: 20,
    // opacity: 0,
  },
});
