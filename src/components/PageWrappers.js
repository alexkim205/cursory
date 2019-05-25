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
    color: white;
    cursor: pointer;
    margin-bottom: 0.5em;
    background-color: ${theme.colors.light_main};
    transition: 0.2s all;
    
    &:hover, &:focus, &:active {
      background-color: ${theme.colors.main};
    }
  }
`
export const WideWrapper = styled.div`
  width: 46em;
  display: flex;
  flex-direction: column;
  flex-wrap: wrap;
  text-align: center;
`