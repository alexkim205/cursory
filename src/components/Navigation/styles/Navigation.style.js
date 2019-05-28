import styled from 'styled-components';
import {NavLink} from 'react-router-dom';
import posed from 'react-pose';

import {theme} from '../../../_styles';

export const Navbar = styled.nav`
  display: flex;
  justify-content: center;
  height: 60px;
  vertical-align: middle;
  /* align-content: center; */
  align-items: center;
  padding: 0 8px;
  background-color: white;
  border-bottom: 1px solid #F3F4F8;
  
  .flex-grow {
    flex: 1;
  }
`

export const NavbarItem = styled(NavLink)`
  margin: 0 10px;
  transition: 0.1s all;
  opacity: 0.7;
  
  &:hover {
    opacity: 1;
  }
`;

export const OutlinedNavbarItem = styled(NavbarItem)`
  display: flex;
  align-items: center;
  border-radius: 5px;
  padding: 3px 8px;
  height: 30px;
  transition: 0.2s all;
  
  .icon{
    width: 20px;
    height: 20px;
    margin-right: 0.5em;
    align-items: center;
    svg {
      width: 100%;
      height: 100%;
    }
  }
  .main{
    // margin: auto 1em auto 0.5em;
  }
  
  ${props => props.solid ? `
    color: white !important;
    background-color: ${theme.colors.light_main};
    border: 2px solid ${theme.colors.light_main};
    &:hover {
      background-color: ${theme.colors.main};
      border: 2px solid ${theme.colors.main};
    }
    
  ` : `
    background-color: white;
    border: 2px solid ${theme.colors.light_gray};
    &:hover {
      background-color: ${theme.colors.light_gray};
    }
  `};
`;
