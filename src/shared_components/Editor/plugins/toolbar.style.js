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
  // transition: transform 100ms ease-in-out;
  transition: transform 300ms ease-in-out;
  // transition: transform 300ms ease;
  transform: scale(0.9);
  
  &.active {
    transform: translateY(-10px);
    transform: scale(1);
  }
  
`;
