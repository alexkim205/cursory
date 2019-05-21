import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import posed from 'react-pose';

export class DropdownMenu extends React.Component {
  static propTypes = {
    items: PropTypes.array.isRequired,
    isActive: PropTypes.bool.isRequired,
  };

  render() {
    const {items, isActive} = this.props;

    return (
        <MenuWrapper
            pose={isActive ? 'open' : 'closed'}
        >
          {items && items.map((item, key) =>
              <MenuItem key={key}>{item}</MenuItem>,
          )}
        </MenuWrapper>
    );
  }
}

const MenuWrapper = posed(styled.ul`
  position: relative;
  display: block;
  right:  20px;
  // top: -10px;
  // height: 300px;
  // transition: translate(-150px, 0);
  width: 150px;
  background-color: blue;
`)({
  open: {
    opacity: 1,
    y: '0%',
    delayChildren: 100,
    staggerChildren: 50,
  },
  closed: {
    opacity: 0,
    y: '-10%',
    delay: 300,
  },
});

const MenuItem = posed(styled.li`
  height: 50px;
  width: 100%;
  background-color: red;
`)({
  open: {y: 0, opacity: 1},
  closed: {y: 20, opacity: 0},
});
