import styled from 'styled-components';
import {NavLink} from 'react-router-dom';

export const Navbar = styled.nav`
  display: flex;
  justify-content: center;
  height: 60px;
  vertical-align: middle;
  /* align-content: center; */
  align-items: center;
  padding: 0 8px;
  // background-color: antiquewhite;
  border-bottom: 1px solid #F3F4F8;
  
  .flex-grow {
    flex: 1;
  }
  
`;

export const NavbarItem = styled(NavLink)`
  margin: 0 10px;
  text-decoration: none;
  
  a {
    text-decoration: none;
  }

  &:focus, &:hover, &:visited, &:link, &:active {
      text-decoration: none;
  }
`;

export const OutlinedNavbarItem = styled(NavbarItem)`
  display: flex;
  align-items: center;
  border: 2px solid #F3F4F8;
  border-radius: 5px;
  padding: 3px 0;
  height: 30px;
`;
