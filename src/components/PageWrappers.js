import styled from 'styled-components';
import {theme} from '../_styles';

export const NarrowWrapper = styled.div`
  width: 23em;
  text-align: center;
  
  .form-links {
    display: flex;
    flex-direction: row;
    justify-content: center;
    margin: 1.5em;
    a {
      transition: 0.2s color;
      color: gray;
      &:hover {
        color: black;
      }
    }
  
    .divider {
      width: 1px;
      background-color: gray;
      margin: 0 2em 0;
    }
  }
  
  button {
    border-radius: 5px;
    border: none;
    padding: 1.2em 1.2em;
    text-decoration: none;
    box-sizing: border-box;
    margin-top: 1.2em;
    width: 100%;
    cursor: pointer;
    color: white;
    margin-bottom: 0.5em;
    background-color: ${theme.colors.light_main};
    transition: 0.2s all;
    &:disabled {
      cursor: not-allowed;
    }
    
    &:hover, &:focus, &:active {
      background-color: ${theme.colors.main};
    }
  }
`
export const FullWrapper = styled.div`
  width: 100%;
  height: 100%;
  box-sizing: border-box;
  display: flex;
  flex-direction: column;
`
