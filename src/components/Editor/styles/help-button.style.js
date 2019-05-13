import React from 'react';
import styled from 'styled-components';
import {theme} from '../../../_styles';

export const StyledHelpButton = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  position: fixed;
  top: 70px;
  width: 40px;
  height: 40px;
  right: 50px;
  border-radius: 50%;
  background-color: white;
  // border: 1px solid black;
  -webkit-transition: transform 100ms ease-in; /* Safari */
  transition: transform 100ms ease-in;
  
  &:hover {
    transform: scale(1.5);
  }
`
