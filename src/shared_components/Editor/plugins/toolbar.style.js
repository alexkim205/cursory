import React from 'react';
import styled from 'styled-components';

export const Button = styled.span`
  cursor: pointer;
  margin: 0 10px;
  color: ${props => props.active ? 'rgb(255, 88, 43)' : 'white'};
`;

export const Icon = styled(({className, ...rest}) => {
  return <span className={`material-icons ${className}`} {...rest} />;
})`
  font-size: 18px;
  vertical-align: text-bottom;
`;

export const Toolbar = styled.div`
  position: absolute;
  background-color: black;
  display: flex;
  flex-wrap: nowrap;
  justify-content: center;
  align-items: center;
  height: 50px;
  border-radius: 5px;
  padding: 0 10px;
  transition: transform 80ms ease;
  transform: scale(0.95);
  
  &.active {
    transform: scale(1) translate(0, -18px);
  }
  
  &:after {
    content: "";
    position: absolute;
    width: 0;
    height: 0;
    border-width: 12px;
    border-style: solid;
    border-color: black transparent transparent transparent;
    top: 100%;
    // left: 50%;
  }
`;

export const ShortcutsHelp = styled.div`
  position: absolute;
  bottom: 10px;
  right: 10px;
  border-radius: 50%;
  
`
