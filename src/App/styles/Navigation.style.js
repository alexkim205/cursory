import styled from 'styled-components';
import {NavLink} from 'react-router-dom';

export const Navbar = styled.nav`
  display: flex;
  justify-content: center;
  height: 50px;
  vertical-align: middle;
  /* align-content: center; */
  align-items: center;
  padding: 0 20px;
  background-color: antiquewhite;
  
  .flex-grow {
    flex: 1;
  }
`;

export const NavbarItem = styled(NavLink)`
  margin: 0 10px;
  text-decoration: none;
  
`;
